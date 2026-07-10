"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import Settings, get_settings
from app.routes.catalog import router as catalog_router
from app.routes.explain import router as explain_router
from app.routes.health import router as health_router
from app.routes.roadmap import router as roadmap_router


def create_app(settings: Settings | None = None) -> FastAPI:
    """Create and configure the ClearPath Germany API."""

    active_settings = settings or get_settings()
    application = FastAPI(
        title=active_settings.app_name,
        version=active_settings.app_version,
        description="Backend API for the ClearPath Germany self-guided navigator.",
    )
    application.state.settings = active_settings

    allowed_origins = [
        origin.strip()
        for origin in active_settings.frontend_origin.split(",")
        if origin.strip()
    ]
    application.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )

    application.include_router(health_router, prefix="/api")
    application.include_router(catalog_router, prefix="/api")
    application.include_router(roadmap_router, prefix="/api")
    application.include_router(explain_router, prefix="/api")
    return application


app = create_app()

