"""Schemas for the deterministic roadmap generator."""

from typing import Literal

from pydantic import BaseModel, Field

EducationStatus = Literal[
    "highschool", "bachelor_in_progress", "bachelor_done", "master_done"
]
TargetDegree = Literal["bachelor", "master"]
TargetIntake = Literal["winter", "summer"]
ApsStatus = Literal["required", "not_required", "unsure"]
StudyLanguage = Literal["English", "German"]
TestStatus = Literal["not_started", "preparing", "passed"]
AdmissionStatus = Literal["researching", "applied", "admitted"]
FinanceStatus = Literal["not_started", "in_progress", "ready"]
VisaStatus = Literal["not_started", "appointment_booked", "approved"]
Stage = Literal["plan", "prepare", "apply", "visa", "arrival"]


class RoadmapRequest(BaseModel):
    """A student profile used to derive the current stage and next actions."""

    education_status: EducationStatus
    target_degree: TargetDegree
    field: str = Field(min_length=1, max_length=120)
    target_intake: TargetIntake
    aps_status: ApsStatus
    study_language: StudyLanguage
    language_test_status: TestStatus
    admission_status: AdmissionStatus
    finance_status: FinanceStatus
    visa_status: VisaStatus


class RoadmapResource(BaseModel):
    """A curated official resource to verify."""

    label: str
    url: str
    last_verified: str


class WeeklyFocus(BaseModel):
    """One week of suggested focus in the current stage."""

    week: int
    focus: str


class RoadmapResponse(BaseModel):
    """The structured roadmap derived from a student profile."""

    stage: Stage
    stage_title: str
    stage_summary: str
    next_actions: list[str]
    documents_now: list[str]
    documents_later: list[str]
    weekly_plan: list[WeeklyFocus]
    common_mistakes: list[str]
    resources: list[RoadmapResource]
    disclaimer: str
