import { apiPost } from "@/lib/api";

export type EducationStatus =
  | "highschool"
  | "bachelor_in_progress"
  | "bachelor_done"
  | "master_done";
export type TargetDegree = "bachelor" | "master";
export type TargetIntake = "winter" | "summer";
export type ApsStatus = "required" | "not_required" | "unsure";
export type StudyLanguage = "English" | "German";
export type TestStatus = "not_started" | "preparing" | "passed";
export type AdmissionStatus = "researching" | "applied" | "admitted";
export type FinanceStatus = "not_started" | "in_progress" | "ready";
export type VisaStatus = "not_started" | "appointment_booked" | "approved";
export type Stage = "plan" | "prepare" | "apply" | "visa" | "arrival";

export interface RoadmapRequest {
  education_status: EducationStatus;
  target_degree: TargetDegree;
  field: string;
  target_intake: TargetIntake;
  aps_status: ApsStatus;
  study_language: StudyLanguage;
  language_test_status: TestStatus;
  admission_status: AdmissionStatus;
  finance_status: FinanceStatus;
  visa_status: VisaStatus;
}

export interface RoadmapResource {
  label: string;
  url: string;
  last_verified: string;
}

export interface WeeklyFocus {
  week: number;
  focus: string;
}

export interface RoadmapResponse {
  stage: Stage;
  stage_title: string;
  stage_summary: string;
  next_actions: string[];
  documents_now: string[];
  documents_later: string[];
  weekly_plan: WeeklyFocus[];
  common_mistakes: string[];
  resources: RoadmapResource[];
  disclaimer: string;
}

export const DEFAULT_ROADMAP_REQUEST: RoadmapRequest = {
  education_status: "bachelor_done",
  target_degree: "master",
  field: "Computer Science",
  target_intake: "winter",
  aps_status: "unsure",
  study_language: "English",
  language_test_status: "not_started",
  admission_status: "researching",
  finance_status: "not_started",
  visa_status: "not_started",
};

export function generateRoadmap(profile: RoadmapRequest): Promise<RoadmapResponse> {
  return apiPost<RoadmapResponse>("/api/roadmap/generate", profile);
}

export const STAGE_LABELS: Record<Stage, string> = {
  plan: "Stage 1 — Plan",
  prepare: "Stage 2 — Prepare",
  apply: "Stage 3 — Apply",
  visa: "Stage 4 — Visa",
  arrival: "Stage 5 — Arrival",
};
