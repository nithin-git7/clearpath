"""Deterministic analysis of pasted official text.

Regex-based entity extraction plus keyword classification. Pasted text is
treated as untrusted input: it is only pattern-matched, never executed or
forwarded anywhere.
"""

import re

from app.models.explain import (
    DocumentCategory,
    EmailDraft,
    ExplainRequest,
    ExplainResponse,
    RiskLevel,
)

DISCLAIMER = (
    "This is an automated, educational explanation of the text you pasted. "
    "It may misread context and is not legal advice. Confirm anything "
    "important directly with the sender or the official authority."
)

_MONTHS = (
    "january|february|march|april|may|june|july|august|september|october|november|december|"
    "jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec"
)

_DATE_PATTERNS = [
    re.compile(r"\b\d{1,2}[./]\d{1,2}[./]\d{2,4}\b"),
    re.compile(r"\b\d{4}-\d{2}-\d{2}\b"),
    re.compile(rf"\b\d{{1,2}}(?:st|nd|rd|th)?\s+(?:{_MONTHS})\.?\s+\d{{4}}\b", re.IGNORECASE),
    re.compile(rf"\b(?:{_MONTHS})\.?\s+\d{{1,2}}(?:st|nd|rd|th)?,?\s+\d{{4}}\b", re.IGNORECASE),
]

_AMOUNT_PATTERNS = [
    re.compile(r"€\s?\d[\d.,]*"),
    re.compile(r"\b\d[\d.,]*\s?(?:EUR|Euro|euros?)\b", re.IGNORECASE),
]

# Ordered: the first category whose keywords match wins, so more specific
# categories must come before broader ones (e.g. blocked_account before payment).
_CATEGORY_KEYWORDS: list[tuple[DocumentCategory, str, list[str]]] = [
    ("rejection", "Rejection notice", ["regret to inform", "unfortunately we cannot", "not been admitted", "ablehnung", "rejected"]),
    ("visa", "Visa or embassy matter", ["visa", "embassy", "consulate", "german mission", "residence permit", "auslaenderbehoerde", "ausländerbehörde"]),
    ("blocked_account", "Blocked account matter", ["blocked account", "sperrkonto"]),
    ("aps", "APS process", ["aps certificate", "akademische pr", " aps "]),
    ("uni_assist", "uni-assist / VPD process", ["uni-assist", "vpd", "vorpruefungsdokumentation", "vorprüfungsdokumentation"]),
    ("insurance", "Health insurance matter", ["health insurance", "krankenversicherung", "insurance coverage"]),
    ("admission", "Admission or offer letter", ["admission", "zulassung", "pleased to inform", "congratulations", "offer of admission", "admitted"]),
    ("enrollment", "Enrollment / semester matter", ["enrollment", "enrolment", "immatrikulation", "semester fee", "semesterbeitrag", "re-registration"]),
    ("payment", "Payment or fee request", ["payment", "fee", "gebuehr", "gebühr", "invoice", "transfer the amount", "pay "]),
]

_CATEGORY_MEANING: dict[DocumentCategory, str] = {
    "admission": "This looks like an admission or offer message. It states that a place is being offered or confirmed, usually with conditions or next steps you must complete by a date.",
    "rejection": "This looks like a rejection notice. It communicates that an application was not successful. Rejections often mention whether other intakes or appeals are possible.",
    "visa": "This looks like a visa, embassy, or residence matter. These messages usually concern appointments, required documents, or a decision, and dates in them are strict.",
    "blocked_account": "This concerns a blocked account: the financial proof many students use for the visa. It likely covers opening, funding, confirmation, or payout of the account.",
    "insurance": "This concerns health insurance, which is mandatory for enrollment and usually for the visa. It likely covers coverage start, proof, or missing information.",
    "uni_assist": "This concerns uni-assist or a VPD: the centralized checking of your documents. It likely covers received documents, missing items, fees, or the result of the evaluation.",
    "aps": "This concerns the APS document verification step required for applicants from some countries. It likely covers your appointment, documents, or the certificate itself.",
    "payment": "This looks like a payment or fee request. Before paying anything, confirm the amount, purpose, and account details on an official page or portal, not just this message.",
    "enrollment": "This concerns enrollment or semester administration at a university, such as completing enrollment, paying the semester fee, or re-registration for the next semester.",
    "general": "This appears to be an official or administrative message. The key is to identify who sent it, what they ask you to do, and by when.",
}

_CATEGORY_ACTIONS: dict[DocumentCategory, list[str]] = {
    "admission": [
        "Read every condition attached to the offer and note each deadline.",
        "Complete the acceptance step in the official portal, not by email reply, if a portal exists.",
        "Start visa and financial-proof steps immediately if you plan to accept.",
    ],
    "rejection": [
        "Check whether the message mentions other intakes, programs, or an appeal window.",
        "Review your remaining applications and add alternatives if needed.",
        "Ask for the rejection reason if it is not stated; it may be fixable next cycle.",
    ],
    "visa": [
        "Confirm the appointment date, location, and exact document checklist on the mission's website.",
        "Prepare documents in the exact order the checklist specifies.",
        "Do not book unchangeable travel before the decision is in your hands.",
    ],
    "blocked_account": [
        "Verify the provider and amount against official guidance before transferring money.",
        "Keep every confirmation document; the visa appointment usually requires them.",
        "Track processing times so funds are confirmed before your appointment.",
    ],
    "insurance": [
        "Confirm whether the request is about proof of coverage or missing information.",
        "Make sure coverage starts on or before your arrival or enrollment date.",
        "Send proof through the channel the university or insurer specifies.",
    ],
    "uni_assist": [
        "Check your uni-assist account for the current status and any missing documents.",
        "Respond to missing-document requests quickly; processing restarts after each fix.",
        "Confirm whether your university needs the VPD result directly.",
    ],
    "aps": [
        "Confirm the required documents and fees on the official APS site for your country.",
        "Book or confirm your appointment early; slots are limited.",
        "Keep the certificate safe; universities and the visa process may need it.",
    ],
    "payment": [
        "Verify the amount and bank details on the official portal before paying.",
        "Pay by the stated deadline and keep the transaction receipt.",
        "Beware of payment requests arriving from unofficial email addresses.",
    ],
    "enrollment": [
        "Complete the enrollment or re-registration step in the university portal.",
        "Pay the semester fee by the deadline and keep the confirmation.",
        "Check which original documents you must present in person.",
    ],
    "general": [
        "Identify the sender and confirm the message through an official portal or website.",
        "List what is being asked of you and by when.",
        "Reply or act before any stated deadline, and keep a copy of everything.",
    ],
}

_CATEGORY_QUESTIONS: dict[DocumentCategory, list[str]] = {
    "admission": [
        "Which conditions must I fulfill, and by which exact date?",
        "How do I formally accept, and is a deposit or fee required?",
    ],
    "rejection": [
        "Can you share the reason for the rejection?",
        "Am I eligible to reapply for the next intake?",
    ],
    "visa": [
        "Is my document set complete for the appointment, or is anything missing?",
        "How long is the current processing time after the appointment?",
    ],
    "blocked_account": [
        "When will the confirmation letter be issued after funding?",
        "Is the amount I deposited sufficient under the current requirement?",
    ],
    "insurance": [
        "From which date is my coverage active?",
        "Is this plan accepted for university enrollment and the visa?",
    ],
    "uni_assist": [
        "Which documents are still missing from my application?",
        "When can I expect the evaluation result?",
    ],
    "aps": [
        "Are my submitted documents complete for the verification?",
        "How long does the certificate currently take to issue?",
    ],
    "payment": [
        "Can you confirm the official bank details and the exact amount?",
        "What happens if the payment arrives after the deadline?",
    ],
    "enrollment": [
        "Which steps remain to complete my enrollment?",
        "Which original documents must I present, and where?",
    ],
    "general": [
        "Could you confirm exactly what you need from me, and by when?",
        "Is there an official portal where I can complete this step?",
    ],
}

_HIGH_RISK_WORDS = [
    "deadline", "frist", "expire", "expires", "no later than", "final", "last date",
    "visa", "residence", "rejected", "rejection", "cancel", "cancellation",
    "immediately", "within 7", "within 14", "legal", "termination", "transfer",
]
_MEDIUM_RISK_WORDS = [
    "required", "must", "missing", "incomplete", "payment", "fee", "submit",
    "respond", "confirm", "appointment",
]


def _extract(patterns: list[re.Pattern[str]], text: str) -> list[str]:
    found: list[str] = []
    for pattern in patterns:
        for match in pattern.findall(text):
            cleaned = match.strip()
            if cleaned and cleaned not in found:
                found.append(cleaned)
    return found[:10]


def _classify(text_lower: str) -> tuple[DocumentCategory, str]:
    for category, label, keywords in _CATEGORY_KEYWORDS:
        if any(keyword in text_lower for keyword in keywords):
            return category, label
    return "general", "Official or administrative message"


def _risk(text_lower: str, has_dates: bool) -> tuple[RiskLevel, str]:
    high_hits = [w for w in _HIGH_RISK_WORDS if w in text_lower]
    medium_hits = [w for w in _MEDIUM_RISK_WORDS if w in text_lower]

    if high_hits and (has_dates or len(high_hits) > 1):
        return "high", (
            "The text contains time-critical or high-stakes language "
            f"({', '.join(sorted(set(high_hits))[:4])}). Act before any stated date."
        )
    if high_hits or (medium_hits and has_dates):
        return "medium", (
            "The text asks for action and mentions dates or requirements. "
            "Missing them could delay your process."
        )
    if medium_hits:
        return "medium", "The text asks you to do or confirm something. Respond promptly."
    return "low", "No urgent or high-stakes language was detected, but read it fully yourself."


def _email_draft(category: DocumentCategory, label: str) -> EmailDraft:
    subjects: dict[DocumentCategory, str] = {
        "admission": "Questions regarding my admission and next steps",
        "rejection": "Request for feedback on my application decision",
        "visa": "Question regarding my visa application documents",
        "blocked_account": "Question regarding my blocked account confirmation",
        "insurance": "Confirmation of my health insurance coverage",
        "uni_assist": "Status inquiry regarding my uni-assist application",
        "aps": "Question regarding my APS verification",
        "payment": "Confirmation of payment details before transfer",
        "enrollment": "Question regarding my enrollment steps",
        "general": "Clarification regarding your message",
    }
    body = (
        "Dear Sir or Madam,\n\n"
        f"Thank you for your message regarding {label.lower()}.\n\n"
        "I would like to make sure I complete the required steps correctly. "
        "Could you please confirm:\n"
        "1. [Insert your first question here]\n"
        "2. [Insert your second question here]\n\n"
        "I want to complete everything before the relevant deadline, so I would "
        "appreciate your confirmation.\n\n"
        "Thank you for your time and support.\n\n"
        "Kind regards,\n"
        "[Your full name]\n"
        "[Your applicant or reference number]"
    )
    return EmailDraft(subject=subjects[category], body=body)


def explain_text(request: ExplainRequest) -> ExplainResponse:
    """Produce a structured, deterministic explanation of pasted text."""

    text = request.text
    text_lower = f" {text.lower()} "

    dates = _extract(_DATE_PATTERNS, text)
    amounts = _extract(_AMOUNT_PATTERNS, text)
    category, label = _classify(text_lower)
    risk_level, risk_reason = _risk(text_lower, bool(dates))

    return ExplainResponse(
        category=category,
        category_label=label,
        meaning=_CATEGORY_MEANING[category],
        risk_level=risk_level,
        risk_reason=risk_reason,
        extracted_dates=dates,
        extracted_amounts=amounts,
        required_actions=_CATEGORY_ACTIONS[category],
        questions_to_ask=_CATEGORY_QUESTIONS[category],
        email_draft=_email_draft(category, label),
        disclaimer=DISCLAIMER,
    )
