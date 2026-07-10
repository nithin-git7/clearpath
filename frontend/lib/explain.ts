import { apiPost } from "@/lib/api";

export type DocumentCategory =
  | "admission"
  | "rejection"
  | "visa"
  | "blocked_account"
  | "insurance"
  | "uni_assist"
  | "aps"
  | "payment"
  | "enrollment"
  | "general";
export type RiskLevel = "low" | "medium" | "high";

export interface ExplainRequest {
  text: string;
}

export interface EmailDraft {
  subject: string;
  body: string;
}

export interface ExplainResponse {
  category: DocumentCategory;
  category_label: string;
  meaning: string;
  risk_level: RiskLevel;
  risk_reason: string;
  extracted_dates: string[];
  extracted_amounts: string[];
  required_actions: string[];
  questions_to_ask: string[];
  email_draft: EmailDraft;
  disclaimer: string;
}

export function explainText(text: string): Promise<ExplainResponse> {
  return apiPost<ExplainResponse>("/api/explain", { text });
}

export const RISK_STYLES: Record<RiskLevel, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};
