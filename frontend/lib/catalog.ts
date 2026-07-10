import { apiGet } from "@/lib/api";

export type DegreeLevel = "bachelor" | "master";
export type UniversityType = "public" | "private";
export type ApplicationRoute = "uni-assist" | "direct" | "mixed";
export type Intake = "winter" | "summer";

export interface University {
  id: string;
  name: string;
  city: string;
  state: string;
  type: UniversityType;
  website: string;
  application_route: ApplicationRoute;
  vpd_required: boolean;
  semester_fee_eur: number;
  languages: string[];
  official_link: string;
  last_verified: string;
  source_note?: string;
}

export interface ProgramDeadline {
  intake: Intake;
  deadline: string;
  deadline_note?: string;
}

export interface Program {
  id: string;
  university_id: string;
  title: string;
  degree_level: DegreeLevel;
  field: string;
  language: string;
  duration_semesters: number;
  tuition_eur: number;
  intakes: Intake[];
  deadlines: ProgramDeadline[];
  requirements_summary: string;
  official_link: string;
  last_verified: string;
  source_note?: string;
}

export interface DeadlineEntry {
  program_id: string;
  program_title: string;
  university_id: string;
  university_name: string;
  city: string;
  intake: Intake;
  deadline: string;
  official_link: string;
  last_verified: string;
  deadline_note?: string;
  source_note?: string;
}

export interface CostOfLiving {
  city: string;
  monthly_estimate_eur: number;
  notes: string;
  last_verified: string;
}

export interface ProgramFilters {
  university_id?: string;
  degree_level?: string;
  language?: string;
  field?: string;
  city?: string;
  intake?: string;
  max_tuition_eur?: number;
  search?: string;
}

export function getUniversities(params?: {
  city?: string;
  state?: string;
  type?: string;
  language?: string;
  search?: string;
}): Promise<University[]> {
  return apiGet<University[]>("/api/universities", params);
}

export function getUniversity(id: string): Promise<University> {
  return apiGet<University>(`/api/universities/${id}`);
}

export function getPrograms(params?: ProgramFilters): Promise<Program[]> {
  return apiGet<Program[]>(
    "/api/programs",
    params as Record<string, string | number | undefined> | undefined,
  );
}

export function getProgram(id: string): Promise<Program> {
  return apiGet<Program>(`/api/programs/${id}`);
}

export function getDeadlines(intake?: string): Promise<DeadlineEntry[]> {
  return apiGet<DeadlineEntry[]>("/api/deadlines", intake ? { intake } : undefined);
}

export function getCostOfLiving(): Promise<CostOfLiving[]> {
  return apiGet<CostOfLiving[]>("/api/cost-of-living");
}

export function formatEuro(amount: number): string {
  return amount === 0
    ? "No tuition fee"
    : new Intl.NumberFormat("en-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(amount);
}

export function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
