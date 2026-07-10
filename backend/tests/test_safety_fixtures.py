"""Golden fixture smoke tests for deterministic roadmap and explainer safety."""

import json
from pathlib import Path
import unittest

from app.models.explain import ExplainRequest
from app.models.roadmap import RoadmapRequest
from app.services.explain import explain_text
from app.services.roadmap import generate_roadmap

_FIXTURES = Path(__file__).parent / "fixtures"
_FORBIDDEN_PROMISES = (
    "guaranteed admission",
    "guaranteed visa",
    "visa will be approved",
    "you will be admitted",
)


class RoadmapGoldenFixtureTests(unittest.TestCase):
    def test_profiles_match_expected_stage_and_safety_language(self) -> None:
        fixtures = json.loads(
            (_FIXTURES / "roadmap" / "profiles.json").read_text(encoding="utf-8")
        )

        for fixture in fixtures:
            with self.subTest(fixture=fixture["name"]):
                result = generate_roadmap(RoadmapRequest(**fixture["profile"]))
                payload = result.model_dump_json().lower()

                self.assertEqual(result.stage, fixture["expected_stage"])
                self.assertTrue(result.next_actions)
                self.assertTrue(result.documents_now)
                self.assertIn("not legal or immigration advice", result.disclaimer.lower())
                for phrase in _FORBIDDEN_PROMISES:
                    self.assertNotIn(phrase, payload)


class ExplainGoldenFixtureTests(unittest.TestCase):
    def test_samples_match_expected_category_risk_and_safety_language(self) -> None:
        fixtures = json.loads(
            (_FIXTURES / "explain" / "samples.json").read_text(encoding="utf-8")
        )

        for fixture in fixtures:
            with self.subTest(fixture=fixture["name"]):
                result = explain_text(ExplainRequest(text=fixture["text"]))
                payload = result.model_dump_json().lower()

                self.assertEqual(result.category, fixture["expected_category"])
                self.assertEqual(result.risk_level, fixture["expected_risk"])
                self.assertTrue(result.required_actions)
                self.assertTrue(result.email_draft.subject)
                self.assertIn("not legal", result.disclaimer.lower())
                for phrase in _FORBIDDEN_PROMISES:
                    self.assertNotIn(phrase, payload)


if __name__ == "__main__":
    unittest.main()
