"""Tests for the FastAPI application skeleton and health route."""

import unittest

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app


class HealthEndpointTests(unittest.TestCase):
    """Verify the public health contract and local frontend CORS policy."""

    def setUp(self) -> None:
        self.frontend_origin = "https://frontend.example.test"
        settings = Settings(
            app_env="test",
            frontend_origin=self.frontend_origin,
        )
        self.client = TestClient(create_app(settings))

    def test_health_returns_service_status(self) -> None:
        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "status": "ok",
                "service": "ClearPath Germany API",
                "version": "0.1.0",
                "environment": "test",
            },
        )

    def test_health_allows_configured_frontend_origin(self) -> None:
        response = self.client.options(
            "/api/health",
            headers={
                "Origin": self.frontend_origin,
                "Access-Control-Request-Method": "GET",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.headers["access-control-allow-origin"],
            self.frontend_origin,
        )


if __name__ == "__main__":
    unittest.main()

