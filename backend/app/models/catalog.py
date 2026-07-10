"""Schemas for the curated university, program, and cost datasets."""

from typing import Literal

from pydantic import BaseModel

DegreeLevel = Literal["bachelor", "master"]
UniversityType = Literal["public", "private"]
ApplicationRoute = Literal["uni-assist", "direct", "mixed"]
Intake = Literal["winter", "summer"]


class University(BaseModel):
    """A curated German university entry."""

    id: str
    name: str
    city: str
    state: str
    type: UniversityType
    website: str
    application_route: ApplicationRoute
    vpd_required: bool
    semester_fee_eur: int
    languages: list[str]
    official_link: str
    last_verified: str
    source_note: str | None = None


class ProgramDeadline(BaseModel):
    """An application deadline tied to a specific intake."""

    intake: Intake
    deadline: str
    deadline_note: str | None = None


class Program(BaseModel):
    """A curated study program offered by a university."""

    id: str
    university_id: str
    title: str
    degree_level: DegreeLevel
    field: str
    language: str
    duration_semesters: int
    tuition_eur: int
    intakes: list[Intake]
    deadlines: list[ProgramDeadline]
    requirements_summary: str
    official_link: str
    last_verified: str
    source_note: str | None = None


class DeadlineEntry(BaseModel):
    """A flattened program deadline used by the deadline tracker."""

    program_id: str
    program_title: str
    university_id: str
    university_name: str
    city: str
    intake: Intake
    deadline: str
    official_link: str
    last_verified: str
    deadline_note: str | None = None
    source_note: str | None = None


class CostOfLiving(BaseModel):
    """A curated monthly cost-of-living estimate for a city."""

    city: str
    monthly_estimate_eur: int
    notes: str
    last_verified: str
