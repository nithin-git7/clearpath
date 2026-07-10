"""Deterministic document explanation endpoint."""

from fastapi import APIRouter, status

from app.models.explain import ExplainRequest, ExplainResponse
from app.services.explain import explain_text

router = APIRouter(tags=["explain"])


@router.post(
    "/explain",
    response_model=ExplainResponse,
    status_code=status.HTTP_200_OK,
    summary="Explain pasted official text",
)
def explain(request: ExplainRequest) -> ExplainResponse:
    """Classify pasted text, extract dates and amounts, and suggest actions."""

    return explain_text(request)
