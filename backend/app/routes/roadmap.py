"""Deterministic roadmap generation endpoint."""

from fastapi import APIRouter, status

from app.models.roadmap import RoadmapRequest, RoadmapResponse
from app.services.roadmap import generate_roadmap

router = APIRouter(tags=["roadmap"])


@router.post(
    "/roadmap/generate",
    response_model=RoadmapResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate a personalized roadmap",
)
def roadmap_generate(request: RoadmapRequest) -> RoadmapResponse:
    """Derive the current stage and structured next steps from a profile."""

    return generate_roadmap(request)
