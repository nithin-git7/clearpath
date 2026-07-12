"""Deterministic, rule-based roadmap generation.

No LLM is involved: the stage detector and action builder are plain rules over
the profile so results are reproducible and auditable.
"""

from app.models.roadmap import (
    RoadmapRequest,
    RoadmapResource,
    RoadmapResponse,
    Stage,
    WeeklyFocus,
)

DISCLAIMER = (
    "This roadmap is educational planning, not legal or immigration advice. "
    "Requirements change; verify every step with the official university, "
    "German mission, or authority before acting."
)

_COMMON_RESOURCES = [
    RoadmapResource(
        label="DAAD: study programme search",
        url="https://www.daad.de/en/studying-in-germany/",
        last_verified="2026-07-11",
    ),
    RoadmapResource(
        label="Make it in Germany: study guide",
        url="https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany",
        last_verified="2026-07-11",
    ),
]

_APS_RESOURCE = RoadmapResource(
    label="APS: check whether your country requires it",
    url="https://www.aps-india.de/",
    last_verified="2026-07-11",
)

_UNI_ASSIST_RESOURCE = RoadmapResource(
    label="uni-assist: application processing and VPD",
    url="https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/",
    last_verified="2026-07-11",
)

_VISA_RESOURCE = RoadmapResource(
    label="Federal Foreign Office: visas for Germany",
    url="https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
    last_verified="2026-07-11",
)


def detect_stage(profile: RoadmapRequest) -> Stage:
    """Derive the current stage from the profile with deterministic rules."""

    if profile.visa_status == "approved":
        return "arrival"
    if profile.admission_status == "admitted":
        return "visa"
    if profile.admission_status == "applied":
        return "apply"
    if profile.language_test_status == "passed" and profile.finance_status != "not_started":
        return "apply"
    if profile.language_test_status != "not_started" or profile.aps_status == "required":
        return "prepare"
    return "plan"


_STAGE_META: dict[Stage, tuple[str, str]] = {
    "plan": (
        "Planning your path",
        "You are at the start: lock in your goal, intake, and a realistic timeline before touching any forms.",
    ),
    "prepare": (
        "Preparing requirements",
        "Your goal is set. Now close the gaps: language proof, verified documents, and the APS step if it applies to you.",
    ),
    "apply": (
        "Application season",
        "You are ready to apply or already applied. Focus on deadlines, correct application routes, and tracking every submission.",
    ),
    "visa": (
        "Admission to visa",
        "You are admitted. The priority now is finances, insurance, and the visa appointment, in that order.",
    ),
    "arrival": (
        "Arrival and settling in",
        "Your visa is approved. Prepare the move and the first administrative steps after landing.",
    ),
}


def _build_actions(profile: RoadmapRequest, stage: Stage) -> list[str]:
    actions: list[str] = []

    if stage == "plan":
        actions.append(
            f"Shortlist 8-12 {profile.target_degree} programs in {profile.field} for the {profile.target_intake} intake."
        )
        actions.append("Confirm each program's application route: direct, uni-assist, or VPD.")
        if profile.aps_status == "unsure":
            actions.append("Check whether your qualifications require APS verification; treat it as a potentially long-lead step.")
        if profile.language_test_status == "not_started":
            test = "IELTS or TOEFL" if profile.study_language == "English" else "TestDaF or DSH"
            actions.append(f"Book a {test} test date; slots fill up early.")
        actions.append("List the academic documents you already have and note what is missing.")
        actions.append("Map each shortlisted program's deadline into a single calendar.")
        actions.append("Estimate your budget with living costs, semester fees, and the blocked account.")

    if stage == "prepare":
        if profile.aps_status == "required":
            actions.append("Start the APS process now; universities and visas may require it first.")
        if profile.language_test_status == "preparing":
            actions.append("Fix a test date and work back from it with a study plan.")
        elif profile.language_test_status == "not_started":
            actions.append("Register for the language test your programs require.")
        actions.append("Get transcripts, degree certificates, and passport copies ready and, where required, officially certified.")
        actions.append("Check whether your target universities need a VPD from uni-assist and order it early if so.")
        actions.append("Draft your CV and statement of purpose; tailor them per program.")
        if profile.finance_status == "not_started":
            actions.append("Plan how you will show financial proof; compare blocked account providers.")
        actions.append("Recheck every deadline for your target intake and set reminders two weeks before each.")

    if stage == "apply":
        if profile.admission_status == "researching":
            actions.append("Submit your first applications; do not wait for a perfect list.")
        actions.append("Track each application's status, portal login, and required follow-ups in one place.")
        actions.append("Respond to university document requests within days, not weeks.")
        if profile.finance_status != "ready":
            actions.append("Open the blocked account process now so funds clear before a visa appointment.")
        actions.append("Research visa appointment wait times at your German mission and plan backwards.")
        actions.append("Keep alternates ready: 1-2 extra programs with later deadlines.")

    if stage == "visa":
        if profile.finance_status != "ready":
            actions.append("Finalize financial proof; the blocked account confirmation is usually required at the appointment.")
        actions.append("Book the visa appointment immediately; waits can be long.")
        actions.append("Arrange health insurance coverage valid from your arrival date.")
        actions.append("Gather the mission's exact document checklist and follow its order precisely.")
        actions.append("Accept your admission and complete any enrollment steps the university requires now.")
        actions.append("Start looking for accommodation; apply to student dormitories early.")

    if stage == "arrival":
        actions.append("Book travel and temporary accommodation for your first weeks.")
        actions.append("Prepare original documents in your hand luggage: admission, insurance, financial proof.")
        actions.append("Register your address (Anmeldung) within the official local window after moving in.")
        actions.append("Open a regular bank account and activate blocked account payouts.")
        actions.append("Enroll at the university and get your semester documents.")
        actions.append("Check the local foreigners authority's residence-permit process early.")

    actions.append("Verify every requirement above on the official page before acting on it.")
    return actions[:10]


def _documents(stage: Stage, profile: RoadmapRequest) -> tuple[list[str], list[str]]:
    now = ["Passport (valid well beyond your intended stay)", "Academic transcripts and certificates"]
    later = ["Health insurance confirmation", "Accommodation proof after arrival"]

    if stage in ("plan", "prepare"):
        now.append("Language test registration or result")
        if profile.aps_status == "required":
            now.append("APS certificate (start early)")
        later.append("Financial proof (blocked account confirmation)")
        later.append("Visa application forms")
    if stage == "apply":
        now.append("CV and statement of purpose")
        now.append("Language certificate")
        later.append("Admission letter")
        later.append("Blocked account confirmation")
    if stage == "visa":
        now.append("Admission letter")
        now.append("Blocked account confirmation or equivalent financial proof")
        now.append("Health insurance for the visa")
        later.append("Residence permit documents after arrival")
    if stage == "arrival":
        now.append("Admission and enrollment documents")
        now.append("Visa and financial proof originals")
        later.append("Anmeldung confirmation (needed for many services)")

    return now, later


def _weekly_plan(stage: Stage) -> list[WeeklyFocus]:
    plans: dict[Stage, list[str]] = {
        "plan": [
            "Define your goal, intake, and budget ceiling.",
            "Build the program shortlist with application routes.",
            "Map deadlines and document gaps.",
            "Book the language test and set your study rhythm.",
        ],
        "prepare": [
            "Start APS/VPD steps that have the longest lead time.",
            "Collect and certify academic documents.",
            "Draft CV and statement of purpose.",
            "Do a full deadline and requirement recheck.",
        ],
        "apply": [
            "Submit the applications closest to deadline.",
            "Track portals and answer requests fast.",
            "Start the blocked account process.",
            "Research visa appointment logistics.",
        ],
        "visa": [
            "Book the visa appointment and insurance.",
            "Complete financial proof.",
            "Assemble the mission's document checklist.",
            "Apply for dormitories and housing.",
        ],
        "arrival": [
            "Book travel and first accommodation.",
            "Prepare original documents for the border and enrollment.",
            "Complete Anmeldung and enrollment.",
            "Book the residence permit appointment.",
        ],
    }
    return [WeeklyFocus(week=i + 1, focus=text) for i, text in enumerate(plans[stage])]


def _mistakes(stage: Stage) -> list[str]:
    common = {
        "plan": [
            "Choosing programs by ranking alone and ignoring the application route.",
            "Underestimating how early language test slots fill up.",
            "Discovering the APS requirement too late.",
        ],
        "prepare": [
            "Ordering the VPD after deadlines are already close.",
            "Using uncertified copies where certified ones are required.",
            "Writing one generic statement of purpose for every program.",
        ],
        "apply": [
            "Missing portal messages asking for missing documents.",
            "Waiting for one dream admission before applying elsewhere.",
            "Starting financial proof only after admission.",
        ],
        "visa": [
            "Booking the visa appointment too late for the semester start.",
            "Bringing an incomplete or wrongly ordered document set.",
            "Leaving accommodation search until after the visa.",
        ],
        "arrival": [
            "Missing the Anmeldung window after moving in.",
            "Packing original documents in checked luggage.",
            "Delaying the residence permit appointment.",
        ],
    }
    return common[stage]


def _resources(profile: RoadmapRequest, stage: Stage) -> list[RoadmapResource]:
    resources = list(_COMMON_RESOURCES)
    if profile.aps_status in ("required", "unsure"):
        resources.append(_APS_RESOURCE)
    if stage in ("plan", "prepare", "apply"):
        resources.append(_UNI_ASSIST_RESOURCE)
    if stage in ("apply", "visa", "arrival"):
        resources.append(_VISA_RESOURCE)
    return resources


def generate_roadmap(profile: RoadmapRequest) -> RoadmapResponse:
    """Generate the full structured roadmap for a profile."""

    stage = detect_stage(profile)
    title, summary = _STAGE_META[stage]
    documents_now, documents_later = _documents(stage, profile)

    return RoadmapResponse(
        stage=stage,
        stage_title=title,
        stage_summary=summary,
        next_actions=_build_actions(profile, stage),
        documents_now=documents_now,
        documents_later=documents_later,
        weekly_plan=_weekly_plan(stage),
        common_mistakes=_mistakes(stage),
        resources=_resources(profile, stage),
        disclaimer=DISCLAIMER,
    )
