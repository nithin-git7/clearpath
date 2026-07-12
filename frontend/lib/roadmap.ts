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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isRoadmapRequest(value: unknown): value is RoadmapRequest {
  if (!isRecord(value)) return false;
  return ["highschool", "bachelor_in_progress", "bachelor_done", "master_done"].includes(String(value.education_status)) &&
    ["bachelor", "master"].includes(String(value.target_degree)) &&
    typeof value.field === "string" && value.field.length > 0 && value.field.length <= 120 &&
    ["winter", "summer"].includes(String(value.target_intake)) &&
    ["required", "not_required", "unsure"].includes(String(value.aps_status)) &&
    ["English", "German"].includes(String(value.study_language)) &&
    ["not_started", "preparing", "passed"].includes(String(value.language_test_status)) &&
    ["researching", "applied", "admitted"].includes(String(value.admission_status)) &&
    ["not_started", "in_progress", "ready"].includes(String(value.finance_status)) &&
    ["not_started", "appointment_booked", "approved"].includes(String(value.visa_status));
}

export function isRoadmapResponse(value: unknown): value is RoadmapResponse {
  if (!isRecord(value) || !["plan", "prepare", "apply", "visa", "arrival"].includes(String(value.stage))) {
    return false;
  }
  if (typeof value.stage_title !== "string" || typeof value.stage_summary !== "string" || typeof value.disclaimer !== "string") {
    return false;
  }
  if (![value.next_actions, value.documents_now, value.documents_later, value.common_mistakes].every(isStringArray)) {
    return false;
  }
  if (!Array.isArray(value.weekly_plan) || !value.weekly_plan.every(
    (item) => isRecord(item) && typeof item.week === "number" && typeof item.focus === "string",
  )) {
    return false;
  }
  return Array.isArray(value.resources) && value.resources.every(
    (item) => isRecord(item) && typeof item.label === "string" && typeof item.url === "string" && typeof item.last_verified === "string",
  );
}

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
