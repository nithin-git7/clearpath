"""Tests for the deterministic document explainer."""

import unittest

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app
from app.models.explain import ExplainRequest
from app.services.explain import explain_text


ADMISSION_TEXT = (
    "Dear applicant, congratulations! We are pleased to inform you of your "
    "admission to the M.Sc. program. Please accept your offer by 15.08.2026 "
    "and pay the semester fee of 350 EUR."
)

VISA_TEXT = (
    "Your appointment at the German embassy is confirmed for 2026-09-01. "
    "Please bring your blocked account confirmation and proof of health "
    "insurance. Incomplete documents will lead to cancellation."
)

GENERIC_TEXT = (
    "Hello, thank you for contacting our office. We have received your "
    "message and will get back to you as soon as possible with an answer."
)


class ExplainServiceTests(unittest.TestCase):
    """The analyzer must classify, extract, and assess risk deterministically."""

    def test_admission_text_is_classified_and_extracted(self) -> None:
        result = explain_text(ExplainRequest(text=ADMISSION_TEXT))

        self.assertEqual(result.category, "admission")
        self.assertIn("15.08.2026", result.extracted_dates)
        self.assertTrue(any("350" in amount for amount in result.extracted_amounts))
        self.assertTrue(result.required_actions)
        self.assertTrue(result.email_draft.subject)

    def test_visa_text_is_high_risk(self) -> None:
        result = explain_text(ExplainRequest(text=VISA_TEXT))

        self.assertEqual(result.category, "visa")
        self.assertEqual(result.risk_level, "high")
        self.assertIn("2026-09-01", result.extracted_dates)

    def test_generic_text_is_low_risk_general(self) -> None:
        result = explain_text(ExplainRequest(text=GENERIC_TEXT))

        self.assertEqual(result.category, "general")
        self.assertEqual(result.risk_level, "low")
        self.assertEqual(result.extracted_dates, [])

    def test_same_input_gives_same_output(self) -> None:
        first = explain_text(ExplainRequest(text=ADMISSION_TEXT))
        second = explain_text(ExplainRequest(text=ADMISSION_TEXT))

        self.assertEqual(first, second)


class ExplainEndpointTests(unittest.TestCase):
    """Validate the public HTTP contract."""

    def setUp(self) -> None:
        settings = Settings(app_env="test", frontend_origin="https://frontend.example.test")
        self.client = TestClient(create_app(settings))

    def test_explain_returns_structured_result(self) -> None:
        response = self.client.post("/api/explain", json={"text": VISA_TEXT})

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["category"], "visa")
        self.assertIn("disclaimer", payload)

    def test_too_short_text_is_rejected(self) -> None:
        response = self.client.post("/api/explain", json={"text": "short"})

        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
