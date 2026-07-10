"""Service health-check endpoint."""

from fastapi import APIRouter, Request, status

from app.config import Settings
from app.models.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Check API health",
)
def health_check(request: Request) -> HealthResponse:
    """Confirm that the API process is running and ready for requests."""

    settings: Settings = request.app.state.settings
    return HealthResponse(
        status="ok",
        service=settings.app_name,
        version=settings.app_version,
        environment=settings.app_env,
    )

