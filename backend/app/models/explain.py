"""Schemas for the deterministic document explainer."""

from typing import Literal

from pydantic import BaseModel, Field

DocumentCategory = Literal[
    "admission",
    "rejection",
    "visa",
    "blocked_account",
    "insurance",
    "uni_assist",
    "aps",
    "payment",
    "enrollment",
    "general",
]
RiskLevel = Literal["low", "medium", "high"]


class ExplainRequest(BaseModel):
    """Pasted text from a letter, email, or portal message."""

    text: str = Field(min_length=40, max_length=8000)


class EmailDraft(BaseModel):
    """A professional reply template the student can adapt."""

    subject: str
    body: str


class ExplainResponse(BaseModel):
    """The structured explanation of pasted text."""

    category: DocumentCategory
    category_label: str
    meaning: str
    risk_level: RiskLevel
    risk_reason: str
    extracted_dates: list[str]
    extracted_amounts: list[str]
    required_actions: list[str]
    questions_to_ask: list[str]
    email_draft: EmailDraft
    disclaimer: str
