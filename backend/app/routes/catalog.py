"""Read-only endpoints for the curated university and program catalog."""

from fastapi import APIRouter, HTTPException, Query, status

from app.models.catalog import (
    CostOfLiving,
    DeadlineEntry,
    Program,
    University,
)
from app.services import catalog

router = APIRouter(tags=["catalog"])


@router.get("/universities", response_model=list[University], summary="List universities")
def list_universities(
    city: str | None = Query(default=None),
    state: str | None = Query(default=None),
    type: str | None = Query(default=None),
    language: str | None = Query(default=None),
    search: str | None = Query(default=None),
) -> list[University]:
    """Return curated universities filtered by optional criteria."""

    return catalog.filter_universities(
        city=city,
        state=state,
        type_=type,
        language=language,
        search=search,
    )


@router.get(
    "/universities/{university_id}",
    response_model=University,
    summary="Get one university",
)
def get_university(university_id: str) -> University:
    """Return a single curated university or 404 when it is unknown."""

    university = catalog.get_university(university_id)
    if university is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    return university


@router.get("/programs", response_model=list[Program], summary="List programs")
def list_programs(
    university_id: str | None = Query(default=None),
    degree_level: str | None = Query(default=None),
    language: str | None = Query(default=None),
    field: str | None = Query(default=None),
    city: str | None = Query(default=None),
    intake: str | None = Query(default=None),
    max_tuition_eur: int | None = Query(default=None, ge=0),
    search: str | None = Query(default=None),
) -> list[Program]:
    """Return curated programs filtered by optional criteria."""

    return catalog.filter_programs(
        university_id=university_id,
        degree_level=degree_level,
        language=language,
        field=field,
        city=city,
        intake=intake,
        max_tuition_eur=max_tuition_eur,
        search=search,
    )


@router.get("/programs/{program_id}", response_model=Program, summary="Get one program")
def get_program(program_id: str) -> Program:
    """Return a single curated program or 404 when it is unknown."""

    program = catalog.get_program(program_id)
    if program is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Program not found")
    return program


@router.get("/deadlines", response_model=list[DeadlineEntry], summary="List deadlines")
def list_deadlines(intake: str | None = Query(default=None)) -> list[DeadlineEntry]:
    """Return upcoming program deadlines, optionally filtered by intake."""

    return catalog.list_deadlines(intake=intake)


@router.get(
    "/cost-of-living",
    response_model=list[CostOfLiving],
    summary="List cost-of-living estimates",
)
def list_cost_of_living() -> list[CostOfLiving]:
    """Return curated monthly cost-of-living estimates by city."""

    return list(catalog.load_cost_of_living())
