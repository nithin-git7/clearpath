"""Focused regression tests for catalog source and date integrity."""

import unittest

from pydantic import ValidationError

from app.models.catalog import ProgramDeadline, University


class CatalogValidationTests(unittest.TestCase):
    def test_deadline_rejects_non_calendar_date(self) -> None:
        with self.assertRaises(ValidationError):
            ProgramDeadline(intake="winter", deadline="2026-02-30")

    def test_official_source_rejects_insecure_or_relative_url(self) -> None:
        payload = {
            "id": "example",
            "name": "Example University",
            "city": "Berlin",
            "state": "Berlin",
            "type": "public",
            "website": "https://example.edu",
            "application_route": "direct",
            "vpd_required": False,
            "semester_fee_eur": 300,
            "languages": ["English"],
            "official_link": "/apply",
            "last_verified": "2026-07-11",
        }
        with self.assertRaises(ValidationError):
            University.model_validate(payload)


if __name__ == "__main__":
    unittest.main()
