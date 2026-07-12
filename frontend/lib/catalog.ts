import { apiGet } from "@/lib/api";

export type DegreeLevel = "bachelor" | "master";
export type UniversityType = "public" | "private";
export type ApplicationRoute = "uni-assist" | "direct" | "mixed";
export type Intake = "winter" | "summer";
export type DeadlineStatus = "unknown" | "passed" | "near" | "upcoming";

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

export function getUniversities(params?: { city?: string; state?: string; type?: string; language?: string; search?: string }): Promise<University[]> {
  return apiGet<University[]>("/api/universities", params);
}

export function getUniversity(id: string): Promise<University> {
  return apiGet<University>(`/api/universities/${id}`);
}

export function getPrograms(params?: ProgramFilters): Promise<Program[]> {
  return apiGet<Program[]>("/api/programs", params as Record<string, string | number | undefined> | undefined);
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
    : new Intl.NumberFormat("en-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function dateOnlyParts(value: string): [number, number, number] | null {
  const match = DATE_ONLY_PATTERN.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day
    ? [year, month, day]
    : null;
}

export function isValidDateOnly(value: string): boolean {
  return dateOnlyParts(value) !== null;
}

export function formatDate(value: string): string {
  const parts = dateOnlyParts(value);
  const parsed = parts ? new Date(parts[0], parts[1] - 1, parts[2]) : new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function daysUntilDate(value: string, today = new Date()): number {
  const parts = dateOnlyParts(value);
  if (!parts) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? Number.NaN : Math.ceil((parsed.getTime() - today.getTime()) / DAY_MS);
  }
  const targetDay = Date.UTC(parts[0], parts[1] - 1, parts[2]);
  const currentDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((targetDay - currentDay) / DAY_MS);
}

export function getDeadlineStatus(value: string, today = new Date()): DeadlineStatus {
  const days = daysUntilDate(value, today);
  if (!Number.isFinite(days)) return "unknown";
  if (days < 0) return "passed";
  if (days <= 45) return "near";
  return "upcoming";
}

export function deadlineStatusLabel(value: string, today = new Date()): string {
  const days = daysUntilDate(value, today);
  const status = getDeadlineStatus(value, today);
  if (status === "unknown") return "Confirm date";
  if (status === "passed") return "Passed for this cycle";
  if (days === 0) return "Due today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export function getNextDeadline(deadlines: ProgramDeadline[], today = new Date()): ProgramDeadline | undefined {
  return deadlines
    .filter((entry) => getDeadlineStatus(entry.deadline, today) === "near" || getDeadlineStatus(entry.deadline, today) === "upcoming")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
}
