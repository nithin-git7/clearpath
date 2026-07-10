"""Tests for the curated catalog datasets, service filters, and endpoints."""

import unittest

from fastapi.testclient import TestClient

from app.config import Settings
from app.main import create_app
from app.services import catalog


class DatasetIntegrityTests(unittest.TestCase):
    """Validate the curated datasets load and stay internally consistent."""

    def test_universities_load_with_required_fields(self) -> None:
        universities = catalog.load_universities()

        self.assertGreater(len(universities), 0)
        for university in universities:
            self.assertTrue(university.id)
            self.assertTrue(university.official_link.startswith("http"))
            self.assertTrue(university.last_verified)

    def test_programs_reference_existing_universities(self) -> None:
        university_ids = {u.id for u in catalog.load_universities()}

        for program in catalog.load_programs():
            self.assertIn(program.university_id, university_ids)
            self.assertTrue(program.deadlines)
            self.assertTrue(program.last_verified)

    def test_program_ids_are_unique(self) -> None:
        ids = [p.id for p in catalog.load_programs()]

        self.assertEqual(len(ids), len(set(ids)))

    def test_cost_of_living_has_estimates(self) -> None:
        for entry in catalog.load_cost_of_living():
            self.assertGreater(entry.monthly_estimate_eur, 0)
            self.assertTrue(entry.last_verified)


class ServiceFilterTests(unittest.TestCase):
    """Validate each filter path in the catalog service."""

    def test_filter_universities_by_city(self) -> None:
        results = catalog.filter_universities(city="Munich")

        self.assertTrue(results)
        self.assertTrue(all(u.city == "Munich" for u in results))

    def test_filter_universities_by_search(self) -> None:
        results = catalog.filter_universities(search="Passau")

        self.assertEqual([university.id for university in results], ["uni-passau"])

    def test_filter_programs_by_university(self) -> None:
        results = catalog.filter_programs(university_id="uni-passau")

        self.assertTrue(results)
        self.assertTrue(all(program.university_id == "uni-passau" for program in results))

    def test_filter_programs_by_degree_and_language(self) -> None:
        results = catalog.filter_programs(degree_level="master", language="English")

        self.assertTrue(results)
        self.assertTrue(all(p.degree_level == "master" for p in results))
        self.assertTrue(all(p.language == "English" for p in results))

    def test_filter_programs_by_max_tuition(self) -> None:
        results = catalog.filter_programs(max_tuition_eur=0)

        self.assertTrue(all(p.tuition_eur <= 0 for p in results))

    def test_filter_programs_by_search_matches_university_name(self) -> None:
        results = catalog.filter_programs(search="Munich")

        self.assertTrue(results)

    def test_list_deadlines_sorted_and_filterable(self) -> None:
        winter = catalog.list_deadlines(intake="winter")

        self.assertTrue(winter)
        self.assertTrue(all(entry.intake == "winter" for entry in winter))
        self.assertEqual(
            [entry.deadline for entry in winter],
            sorted(entry.deadline for entry in winter),
        )


class CatalogEndpointTests(unittest.TestCase):
    """Validate the public catalog HTTP contract."""

    def setUp(self) -> None:
        settings = Settings(app_env="test", frontend_origin="https://frontend.example.test")
        self.client = TestClient(create_app(settings))

    def test_list_universities(self) -> None:
        response = self.client.get("/api/universities")

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    def test_list_universities_with_search(self) -> None:
        response = self.client.get("/api/universities", params={"search": "Passau"})

        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["id"] for item in response.json()], ["uni-passau"])

    def test_list_programs_with_filter(self) -> None:
        response = self.client.get("/api/programs", params={"degree_level": "master"})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(all(p["degree_level"] == "master" for p in response.json()))

    def test_list_programs_for_university(self) -> None:
        response = self.client.get("/api/programs", params={"university_id": "uni-passau"})

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json())
        self.assertTrue(all(p["university_id"] == "uni-passau" for p in response.json()))

    def test_get_program_not_found(self) -> None:
        response = self.client.get("/api/programs/does-not-exist")

        self.assertEqual(response.status_code, 404)

    def test_get_university_found(self) -> None:
        response = self.client.get("/api/universities/tum")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], "tum")

    def test_list_deadlines(self) -> None:
        response = self.client.get("/api/deadlines")

        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)


if __name__ == "__main__":
    unittest.main()
