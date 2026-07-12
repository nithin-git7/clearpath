"""Schemas and integrity validation for curated catalog data."""

from datetime import date
from typing import Literal
from urllib.parse import urlparse

from pydantic import BaseModel, field_validator

DegreeLevel = Literal["bachelor", "master"]
UniversityType = Literal["public", "private"]
ApplicationRoute = Literal["uni-assist", "direct", "mixed"]
Intake = Literal["winter", "summer"]


def _date_only(value: str, field_name: str) -> str:
    try:
        date.fromisoformat(value)
    except ValueError as exc:
        raise ValueError(f"{field_name} must use YYYY-MM-DD format") from exc
    return value


def _official_url(value: str, field_name: str) -> str:
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError(f"{field_name} must be an absolute HTTPS URL")
    return value


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

    @field_validator("website", "official_link")
    @classmethod
    def validate_urls(cls, value: str, info) -> str:
        return _official_url(value, info.field_name)

    @field_validator("last_verified")
    @classmethod
    def validate_verified_date(cls, value: str) -> str:
        return _date_only(value, "last_verified")


class ProgramDeadline(BaseModel):
    """An application deadline tied to a specific intake."""

    intake: Intake
    deadline: str
    deadline_note: str | None = None

    @field_validator("deadline")
    @classmethod
    def validate_deadline(cls, value: str) -> str:
        return _date_only(value, "deadline")


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

    @field_validator("official_link")
    @classmethod
    def validate_official_link(cls, value: str) -> str:
        return _official_url(value, "official_link")

    @field_validator("last_verified")
    @classmethod
    def validate_verified_date(cls, value: str) -> str:
        return _date_only(value, "last_verified")


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

    @field_validator("deadline", "last_verified")
    @classmethod
    def validate_dates(cls, value: str, info) -> str:
        return _date_only(value, info.field_name)

    @field_validator("official_link")
    @classmethod
    def validate_official_link(cls, value: str) -> str:
        return _official_url(value, "official_link")


class CostOfLiving(BaseModel):
    """A curated monthly planning estimate for a city."""

    city: str
    monthly_estimate_eur: int
    notes: str
    last_verified: str

    @field_validator("last_verified")
    @classmethod
    def validate_verified_date(cls, value: str) -> str:
        return _date_only(value, "last_verified")
