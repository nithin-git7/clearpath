"""Health-check response schema."""

from typing import Literal

from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Public service status returned by the health endpoint."""

    status: Literal["ok"]
    service: str
    version: str
    environment: str

