"""Tests for the deterministic roadmap generator."""

import unittest

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app
from app.models.roadmap import RoadmapRequest
from app.services.roadmap import detect_stage, generate_roadmap


def make_profile(**overrides: str) -> RoadmapRequest:
    base: dict[str, str] = {
        "education_status": "bachelor_done",
        "target_degree": "master",
        "field": "Computer Science",
        "target_intake": "winter",
        "aps_status": "required",
        "study_language": "English",
        "language_test_status": "not_started",
        "admission_status": "researching",
        "finance_status": "not_started",
        "visa_status": "not_started",
    }
    base.update(overrides)
    return RoadmapRequest(**base)


class StageDetectorTests(unittest.TestCase):
    """The stage detector must be deterministic and cover every stage."""

    def test_visa_approved_means_arrival(self) -> None:
        self.assertEqual(detect_stage(make_profile(visa_status="approved")), "arrival")

    def test_admitted_means_visa_stage(self) -> None:
        self.assertEqual(detect_stage(make_profile(admission_status="admitted")), "visa")

    def test_applied_means_apply_stage(self) -> None:
        self.assertEqual(detect_stage(make_profile(admission_status="applied")), "apply")

    def test_language_passed_with_finance_means_apply(self) -> None:
        profile = make_profile(language_test_status="passed", finance_status="in_progress")
        self.assertEqual(detect_stage(profile), "apply")

    def test_preparing_language_means_prepare(self) -> None:
        self.assertEqual(detect_stage(make_profile(language_test_status="preparing")), "prepare")

    def test_fresh_profile_without_aps_means_plan(self) -> None:
        self.assertEqual(detect_stage(make_profile(aps_status="not_required")), "plan")


class RoadmapGenerationTests(unittest.TestCase):
    """The generated roadmap must be complete and profile-aware."""

    def test_response_has_all_sections(self) -> None:
        result = generate_roadmap(make_profile())

        self.assertTrue(result.next_actions)
        self.assertLessEqual(len(result.next_actions), 10)
        self.assertTrue(result.documents_now)
        self.assertTrue(result.documents_later)
        self.assertEqual(len(result.weekly_plan), 4)
        self.assertTrue(result.common_mistakes)
        self.assertTrue(result.resources)
        self.assertIn("not legal", result.disclaimer)

    def test_aps_profile_gets_aps_resource(self) -> None:
        result = generate_roadmap(make_profile(aps_status="required"))

        self.assertTrue(any("APS" in r.label for r in result.resources))

    def test_resources_have_verification_dates(self) -> None:
        result = generate_roadmap(make_profile())

        for resource in result.resources:
            self.assertTrue(resource.last_verified)
            self.assertTrue(resource.url.startswith("http"))


class RoadmapEndpointTests(unittest.TestCase):
    """Validate the public HTTP contract."""

    def setUp(self) -> None:
        settings = Settings(app_env="test", frontend_origin="https://frontend.example.test")
        self.client = TestClient(create_app(settings))

    def test_generate_returns_structured_roadmap(self) -> None:
        response = self.client.post(
            "/api/roadmap/generate",
            json=make_profile(admission_status="admitted").model_dump(),
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["stage"], "visa")
        self.assertTrue(payload["next_actions"])

    def test_invalid_profile_is_rejected(self) -> None:
        response = self.client.post("/api/roadmap/generate", json={"field": ""})

        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
