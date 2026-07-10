"""Read-only access to the curated university, program, and cost datasets."""

from functools import lru_cache
import json
from pathlib import Path

from app.models.catalog import (
    CostOfLiving,
    DeadlineEntry,
    Program,
    University,
)

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def _load_json(filename: str) -> list[dict]:
    path = _DATA_DIR / filename
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


@lru_cache(maxsize=1)
def load_universities() -> tuple[University, ...]:
    """Load and validate every curated university entry."""

    return tuple(University(**item) for item in _load_json("universities.json"))


@lru_cache(maxsize=1)
def load_programs() -> tuple[Program, ...]:
    """Load and validate every curated program entry."""

    return tuple(Program(**item) for item in _load_json("programs.json"))


@lru_cache(maxsize=1)
def load_cost_of_living() -> tuple[CostOfLiving, ...]:
    """Load and validate every curated cost-of-living entry."""

    return tuple(CostOfLiving(**item) for item in _load_json("cost_of_living.json"))


def get_university(university_id: str) -> University | None:
    """Return a single university by id, or None when it is unknown."""

    return next((u for u in load_universities() if u.id == university_id), None)


def get_program(program_id: str) -> Program | None:
    """Return a single program by id, or None when it is unknown."""

    return next((p for p in load_programs() if p.id == program_id), None)


def filter_universities(
    *,
    city: str | None = None,
    state: str | None = None,
    type_: str | None = None,
    language: str | None = None,
    search: str | None = None,
) -> list[University]:
    """Filter universities by optional, case-insensitive criteria."""

    results = list(load_universities())
    if city:
        results = [u for u in results if u.city.lower() == city.lower()]
    if state:
        results = [u for u in results if u.state.lower() == state.lower()]
    if type_:
        results = [u for u in results if u.type == type_.lower()]
    if language:
        needle = language.lower()
        results = [u for u in results if any(needle == lang.lower() for lang in u.languages)]
    if search:
        needle = search.lower()
        results = [
            u
            for u in results
            if needle in u.name.lower()
            or needle in u.city.lower()
            or needle in u.state.lower()
        ]
    return results


def filter_programs(
    *,
    university_id: str | None = None,
    degree_level: str | None = None,
    language: str | None = None,
    field: str | None = None,
    city: str | None = None,
    intake: str | None = None,
    max_tuition_eur: int | None = None,
    search: str | None = None,
) -> list[Program]:
    """Filter programs by optional, case-insensitive criteria."""

    universities = {u.id: u for u in load_universities()}
    results = list(load_programs())

    if university_id:
        results = [p for p in results if p.university_id == university_id]
    if degree_level:
        results = [p for p in results if p.degree_level == degree_level.lower()]
    if language:
        results = [p for p in results if p.language.lower() == language.lower()]
    if field:
        needle = field.lower()
        results = [p for p in results if needle in p.field.lower()]
    if intake:
        results = [p for p in results if intake.lower() in p.intakes]
    if max_tuition_eur is not None:
        results = [p for p in results if p.tuition_eur <= max_tuition_eur]
    if city:
        wanted = city.lower()
        results = [
            p
            for p in results
            if (u := universities.get(p.university_id)) is not None
            and u.city.lower() == wanted
        ]
    if search:
        needle = search.lower()
        results = [
            p
            for p in results
            if needle in p.title.lower()
            or needle in p.field.lower()
            or (
                (u := universities.get(p.university_id)) is not None
                and needle in u.name.lower()
            )
        ]
    return results


def list_deadlines(*, intake: str | None = None) -> list[DeadlineEntry]:
    """Flatten program deadlines into a sorted list for the deadline tracker."""

    universities = {u.id: u for u in load_universities()}
    entries: list[DeadlineEntry] = []

    for program in load_programs():
        university = universities.get(program.university_id)
        if university is None:
            continue
        for deadline in program.deadlines:
            if intake and deadline.intake != intake.lower():
                continue
            entries.append(
                DeadlineEntry(
                    program_id=program.id,
                    program_title=program.title,
                    university_id=university.id,
                    university_name=university.name,
                    city=university.city,
                    intake=deadline.intake,
                    deadline=deadline.deadline,
                    official_link=program.official_link,
                    last_verified=program.last_verified,
                    deadline_note=deadline.deadline_note,
                    source_note=program.source_note,
                )
            )

    entries.sort(key=lambda entry: entry.deadline)
    return entries


