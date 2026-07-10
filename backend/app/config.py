"""Application settings loaded from environment variables."""

from dataclasses import dataclass
import os


@dataclass(frozen=True, slots=True)
class Settings:
    """Runtime settings used by the FastAPI application."""

    app_name: str = "ClearPath Germany API"
    app_version: str = "0.1.0"
    app_env: str = "development"
    frontend_origin: str = "http://localhost:3000"


def get_settings() -> Settings:
    """Build settings from the current process environment."""

    return Settings(
        app_env=os.getenv("APP_ENV", "development"),
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:3000"),
    )

