import costOfLivingData from "../../backend/app/data/cost_of_living.json";
import programsData from "../../backend/app/data/programs.json";
import universitiesData from "../../backend/app/data/universities.json";

type Stage = "plan" | "prepare" | "apply" | "visa" | "arrival";
type Category = "admission" | "rejection" | "visa" | "blocked_account" | "insurance" | "uni_assist" | "aps" | "payment" | "enrollment" | "general";
type RecordValue = Record<string, unknown>;

interface University extends RecordValue { id: string; name: string; city: string; state: string; type: string; languages: string[]; }
interface ProgramDeadline { intake: string; deadline: string; deadline_note?: string; }
interface Program extends RecordValue { id: string; university_id: string; title: string; degree_level: string; field: string; language: string; tuition_eur: number; intakes: string[]; deadlines: ProgramDeadline[]; official_link: string; last_verified: string; source_note?: string; }
interface RoadmapProfile extends RecordValue { education_status: string; target_degree: string; field: string; target_intake: string; aps_status: string; study_language: string; language_test_status: string; admission_status: string; finance_status: string; visa_status: string; }

const universities = universitiesData as University[];
const programs = programsData as Program[];
const universityById = new Map(universities.map((item) => [item.id, item]));
const headers = { "Content-Type": "application/json; charset=utf-8" };
const json = (payload: unknown, status = 200) => new Response(JSON.stringify(payload), { status, headers });
const detail = (message: string, status: number) => json({ detail: message }, status);
const same = (left: string, right: string) => left.toLocaleLowerCase() === right.toLocaleLowerCase();

function filteredUniversities(params: URLSearchParams): University[] {
  const city = params.get("city"), state = params.get("state"), type = params.get("type"), language = params.get("language");
  const search = params.get("search")?.toLocaleLowerCase();
  return universities.filter((item) =>
    (!city || same(item.city, city)) && (!state || same(item.state, state)) &&
    (!type || item.type === type.toLocaleLowerCase()) &&
    (!language || item.languages.some((value) => same(value, language))) &&
    (!search || item.name.toLocaleLowerCase().includes(search) || item.city.toLocaleLowerCase().includes(search) || item.state.toLocaleLowerCase().includes(search)),
  );
}

function filteredPrograms(params: URLSearchParams): Program[] | Response {
  const universityId = params.get("university_id"), degree = params.get("degree_level"), language = params.get("language"), city = params.get("city");
  const field = params.get("field")?.toLocaleLowerCase(), intake = params.get("intake")?.toLocaleLowerCase(), search = params.get("search")?.toLocaleLowerCase();
  const rawMaximum = params.get("max_tuition_eur"), maximum = rawMaximum === null ? null : Number(rawMaximum);
  if (maximum !== null && (!Number.isFinite(maximum) || maximum < 0)) return detail("max_tuition_eur must be a non-negative number.", 422);
  return programs.filter((item) => {
    const university = universityById.get(item.university_id);
    return (!universityId || item.university_id === universityId) && (!degree || item.degree_level === degree.toLocaleLowerCase()) &&
      (!language || same(item.language, language)) && (!field || item.field.toLocaleLowerCase().includes(field)) &&
      (!city || Boolean(university && same(university.city, city))) && (!intake || item.intakes.includes(intake)) &&
      (maximum === null || item.tuition_eur <= maximum) &&
      (!search || item.title.toLocaleLowerCase().includes(search) || item.field.toLocaleLowerCase().includes(search) || Boolean(university?.name.toLocaleLowerCase().includes(search)));
  });
}

function deadlines(params: URLSearchParams): RecordValue[] {
  const intake = params.get("intake")?.toLocaleLowerCase();
  return programs.flatMap((program) => {
    const university = universityById.get(program.university_id);
    if (!university) return [];
    return program.deadlines.filter((entry) => !intake || entry.intake === intake).map((entry) => ({
      program_id: program.id, program_title: program.title, university_id: university.id, university_name: university.name,
      city: university.city, intake: entry.intake, deadline: entry.deadline, official_link: program.official_link,
      last_verified: program.last_verified, ...(entry.deadline_note ? { deadline_note: entry.deadline_note } : {}),
      ...(program.source_note ? { source_note: program.source_note } : {}),
    }));
  }).sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
}

const roadmapEnums: Record<string, Set<string>> = {
  education_status: new Set(["highschool", "bachelor_in_progress", "bachelor_done", "master_done"]), target_degree: new Set(["bachelor", "master"]),
  target_intake: new Set(["winter", "summer"]), aps_status: new Set(["required", "not_required", "unsure"]), study_language: new Set(["English", "German"]),
  language_test_status: new Set(["not_started", "preparing", "passed"]), admission_status: new Set(["researching", "applied", "admitted"]),
  finance_status: new Set(["not_started", "in_progress", "ready"]), visa_status: new Set(["not_started", "appointment_booked", "approved"]),
};

function roadmapProfile(value: unknown): RoadmapProfile | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as RecordValue;
  if (typeof item.field !== "string" || item.field.length < 1 || item.field.length > 120) return null;
  for (const [key, allowed] of Object.entries(roadmapEnums)) if (typeof item[key] !== "string" || !allowed.has(item[key])) return null;
  return item as RoadmapProfile;
}

function stageFor(profile: RoadmapProfile): Stage {
  if (profile.visa_status === "approved") return "arrival";
  if (profile.admission_status === "admitted") return "visa";
  if (profile.admission_status === "applied") return "apply";
  if (profile.language_test_status === "passed" && profile.finance_status !== "not_started") return "apply";
  if (profile.language_test_status !== "not_started" || profile.aps_status === "required") return "prepare";
  return "plan";
}

const stageMeta: Record<Stage, [string, string]> = {
  plan: ["Planning your path", "You are at the start: lock in your goal, intake, and a realistic timeline before touching any forms."],
  prepare: ["Preparing requirements", "Your goal is set. Now close the gaps: language proof, verified documents, and the APS step if it applies to you."],
  apply: ["Application season", "You are ready to apply or already applied. Focus on deadlines, correct application routes, and tracking every submission."],
  visa: ["Admission to visa", "You are admitted. The priority now is finances, insurance, and the visa appointment, in that order."],
  arrival: ["Arrival and settling in", "Your visa is approved. Prepare the move and the first administrative steps after landing."],
};

function roadmapActions(profile: RoadmapProfile, stage: Stage): string[] {
  const actions: string[] = [];
  if (stage === "plan") {
    actions.push(`Shortlist 8-12 ${profile.target_degree} programs in ${profile.field} for the ${profile.target_intake} intake.`, "Confirm each program's application route: direct, uni-assist, or VPD.");
    if (profile.aps_status === "unsure") actions.push("Check whether your country requires an APS certificate; it can add months.");
    if (profile.language_test_status === "not_started") actions.push(`Book a ${profile.study_language === "English" ? "IELTS or TOEFL" : "TestDaF or DSH"} test date; slots fill up early.`);
    actions.push("List the academic documents you already have and note what is missing.", "Map each shortlisted program's deadline into a single calendar.", "Estimate your budget with living costs, semester fees, and the blocked account.");
  } else if (stage === "prepare") {
    if (profile.aps_status === "required") actions.push("Start the APS process now; universities and visas may require it first.");
    if (profile.language_test_status === "preparing") actions.push("Fix a test date and work back from it with a study plan.");
    else if (profile.language_test_status === "not_started") actions.push("Register for the language test your programs require.");
    actions.push("Get transcripts, degree certificates, and passport copies ready and, where required, officially certified.", "Check whether your target universities need a VPD from uni-assist and order it early if so.", "Draft your CV and statement of purpose; tailor them per program.");
    if (profile.finance_status === "not_started") actions.push("Plan how you will show financial proof; compare blocked account providers.");
    actions.push("Recheck every deadline for your target intake and set reminders two weeks before each.");
  } else if (stage === "apply") {
    if (profile.admission_status === "researching") actions.push("Submit your first applications; do not wait for a perfect list.");
    actions.push("Track each application's status, portal login, and required follow-ups in one place.", "Respond to university document requests within days, not weeks.");
    if (profile.finance_status !== "ready") actions.push("Open the blocked account process now so funds clear before a visa appointment.");
    actions.push("Research visa appointment wait times at your German mission and plan backwards.", "Keep alternates ready: 1-2 extra programs with later deadlines.");
  } else if (stage === "visa") {
    if (profile.finance_status !== "ready") actions.push("Finalize financial proof; the blocked account confirmation is usually required at the appointment.");
    actions.push("Book the visa appointment immediately; waits can be long.", "Arrange health insurance coverage valid from your arrival date.", "Gather the mission's exact document checklist and follow its order precisely.", "Accept your admission and complete any enrollment steps the university requires now.", "Start looking for accommodation; apply to student dormitories early.");
  } else actions.push("Book travel and temporary accommodation for your first weeks.", "Prepare original documents in your hand luggage: admission, insurance, financial proof.", "Register your address (Anmeldung) soon after moving in.", "Open a regular bank account and activate blocked account payouts.", "Enroll at the university and get your semester documents.", "Book the residence permit appointment at the Auslaenderbehoerde early.");
  actions.push("Verify every requirement above on the official page before acting on it.");
  return actions.slice(0, 10);
}

function roadmapDocuments(stage: Stage, profile: RoadmapProfile): [string[], string[]] {
  const now = ["Passport (valid well beyond your intended stay)", "Academic transcripts and certificates"];
  const later = ["Health insurance confirmation", "Accommodation proof after arrival"];
  if (stage === "plan" || stage === "prepare") { now.push("Language test registration or result"); if (profile.aps_status === "required") now.push("APS certificate (start early)"); later.push("Financial proof (blocked account confirmation)", "Visa application forms"); }
  else if (stage === "apply") { now.push("CV and statement of purpose", "Language certificate"); later.push("Admission letter", "Blocked account confirmation"); }
  else if (stage === "visa") { now.push("Admission letter", "Blocked account confirmation or equivalent financial proof", "Health insurance for the visa"); later.push("Residence permit documents after arrival"); }
  else { now.push("Admission and enrollment documents", "Visa and financial proof originals"); later.push("Anmeldung confirmation (needed for many services)"); }
  return [now, later];
}

const weeklyPlans: Record<Stage, string[]> = {
  plan: ["Define your goal, intake, and budget ceiling.", "Build the program shortlist with application routes.", "Map deadlines and document gaps.", "Book the language test and set your study rhythm."],
  prepare: ["Start APS/VPD steps that have the longest lead time.", "Collect and certify academic documents.", "Draft CV and statement of purpose.", "Do a full deadline and requirement recheck."],
  apply: ["Submit the applications closest to deadline.", "Track portals and answer requests fast.", "Start the blocked account process.", "Research visa appointment logistics."],
  visa: ["Book the visa appointment and insurance.", "Complete financial proof.", "Assemble the mission's document checklist.", "Apply for dormitories and housing."],
  arrival: ["Book travel and first accommodation.", "Prepare original documents for the border and enrollment.", "Complete Anmeldung and enrollment.", "Book the residence permit appointment."],
};
const mistakes: Record<Stage, string[]> = {
  plan: ["Choosing programs by ranking alone and ignoring the application route.", "Underestimating how early language test slots fill up.", "Discovering the APS requirement too late."],
  prepare: ["Ordering the VPD after deadlines are already close.", "Using uncertified copies where certified ones are required.", "Writing one generic statement of purpose for every program."],
  apply: ["Missing portal messages asking for missing documents.", "Waiting for one dream admission before applying elsewhere.", "Starting financial proof only after admission."],
  visa: ["Booking the visa appointment too late for the semester start.", "Bringing an incomplete or wrongly ordered document set.", "Leaving accommodation search until after the visa."],
  arrival: ["Missing the Anmeldung window after moving in.", "Packing original documents in checked luggage.", "Delaying the residence permit appointment."],
};
const commonResources = [
  { label: "DAAD: study programme search", url: "https://www.daad.de/en/studying-in-germany/", last_verified: "2026-07-04" },
  { label: "Make it in Germany: study guide", url: "https://www.make-it-in-germany.com/en/studying-training/studying", last_verified: "2026-07-04" },
];
const apsResource = { label: "APS: check whether your country requires it", url: "https://www.aps-india.de/", last_verified: "2026-07-04" };
const assistResource = { label: "uni-assist: application processing and VPD", url: "https://www.uni-assist.de/en/", last_verified: "2026-07-04" };
const visaResource = { label: "Federal Foreign Office: visa for study", url: "https://www.auswaertiges-amt.de/en/visa-service", last_verified: "2026-07-04" };

function generateRoadmap(profile: RoadmapProfile): RecordValue {
  const stage = stageFor(profile), [title, summary] = stageMeta[stage], [now, later] = roadmapDocuments(stage, profile);
  const resources = [...commonResources];
  if (profile.aps_status === "required" || profile.aps_status === "unsure") resources.push(apsResource);
  if (["plan", "prepare", "apply"].includes(stage)) resources.push(assistResource);
  if (["apply", "visa", "arrival"].includes(stage)) resources.push(visaResource);
  return { stage, stage_title: title, stage_summary: summary, next_actions: roadmapActions(profile, stage), documents_now: now, documents_later: later,
    weekly_plan: weeklyPlans[stage].map((focus, index) => ({ week: index + 1, focus })), common_mistakes: mistakes[stage], resources,
    disclaimer: "This roadmap is educational planning, not legal or immigration advice. Requirements change; verify every step with the official university, German mission, or authority before acting." };
}

const categories: Array<[Category, string, string[]]> = [
  ["rejection", "Rejection notice", ["regret to inform", "unfortunately we cannot", "not been admitted", "ablehnung", "rejected"]],
  ["visa", "Visa or embassy matter", ["visa", "embassy", "consulate", "german mission", "residence permit", "auslaenderbehoerde", "ausländerbehörde"]],
  ["blocked_account", "Blocked account matter", ["blocked account", "sperrkonto"]], ["aps", "APS process", ["aps certificate", "akademische pr", " aps "]],
  ["uni_assist", "uni-assist / VPD process", ["uni-assist", "vpd", "vorpruefungsdokumentation", "vorprüfungsdokumentation"]],
  ["insurance", "Health insurance matter", ["health insurance", "krankenversicherung", "insurance coverage"]],
  ["admission", "Admission or offer letter", ["admission", "zulassung", "pleased to inform", "congratulations", "offer of admission", "admitted"]],
  ["enrollment", "Enrollment / semester matter", ["enrollment", "enrolment", "immatrikulation", "semester fee", "semesterbeitrag", "re-registration"]],
  ["payment", "Payment or fee request", ["payment", "fee", "gebuehr", "gebühr", "invoice", "transfer the amount", "pay "]],
];
const meaning: Record<Category, string> = {
  admission: "This looks like an admission or offer message. It states that a place is being offered or confirmed, usually with conditions or next steps you must complete by a date.",
  rejection: "This looks like a rejection notice. It communicates that an application was not successful. Rejections often mention whether other intakes or appeals are possible.",
  visa: "This looks like a visa, embassy, or residence matter. These messages usually concern appointments, required documents, or a decision, and dates in them are strict.",
  blocked_account: "This concerns a blocked account: the financial proof many students use for the visa. It likely covers opening, funding, confirmation, or payout of the account.",
  insurance: "This concerns health insurance, which is mandatory for enrollment and usually for the visa. It likely covers coverage start, proof, or missing information.",
  uni_assist: "This concerns uni-assist or a VPD: the centralized checking of your documents. It likely covers received documents, missing items, fees, or the result of the evaluation.",
  aps: "This concerns the APS document verification step required for applicants from some countries. It likely covers your appointment, documents, or the certificate itself.",
  payment: "This looks like a payment or fee request. Before paying anything, confirm the amount, purpose, and account details on an official page or portal, not just this message.",
  enrollment: "This concerns enrollment or semester administration at a university, such as completing enrollment, paying the semester fee, or re-registration for the next semester.",
  general: "This appears to be an official or administrative message. The key is to identify who sent it, what they ask you to do, and by when.",
};
const actions: Record<Category, string[]> = {
  admission: ["Read every condition attached to the offer and note each deadline.", "Complete the acceptance step in the official portal, not by email reply, if a portal exists.", "Start visa and financial-proof steps immediately if you plan to accept."],
  rejection: ["Check whether the message mentions other intakes, programs, or an appeal window.", "Review your remaining applications and add alternatives if needed.", "Ask for the rejection reason if it is not stated; it may be fixable next cycle."],
  visa: ["Confirm the appointment date, location, and exact document checklist on the mission's website.", "Prepare documents in the exact order the checklist specifies.", "Do not book unchangeable travel before the decision is in your hands."],
  blocked_account: ["Verify the provider and amount against official guidance before transferring money.", "Keep every confirmation document; the visa appointment usually requires them.", "Track processing times so funds are confirmed before your appointment."],
  insurance: ["Confirm whether the request is about proof of coverage or missing information.", "Make sure coverage starts on or before your arrival or enrollment date.", "Send proof through the channel the university or insurer specifies."],
  uni_assist: ["Check your uni-assist account for the current status and any missing documents.", "Respond to missing-document requests quickly; processing restarts after each fix.", "Confirm whether your university needs the VPD result directly."],
  aps: ["Confirm the required documents and fees on the official APS site for your country.", "Book or confirm your appointment early; slots are limited.", "Keep the certificate safe; universities and the visa process may need it."],
  payment: ["Verify the amount and bank details on the official portal before paying.", "Pay by the stated deadline and keep the transaction receipt.", "Beware of payment requests arriving from unofficial email addresses."],
  enrollment: ["Complete the enrollment or re-registration step in the university portal.", "Pay the semester fee by the deadline and keep the confirmation.", "Check which original documents you must present in person."],
  general: ["Identify the sender and confirm the message through an official portal or website.", "List what is being asked of you and by when.", "Reply or act before any stated deadline, and keep a copy of everything."],
};
const questions: Record<Category, string[]> = {
  admission: ["Which conditions must I fulfill, and by which exact date?", "How do I formally accept, and is a deposit or fee required?"], rejection: ["Can you share the reason for the rejection?", "Am I eligible to reapply for the next intake?"],
  visa: ["Is my document set complete for the appointment, or is anything missing?", "How long is the current processing time after the appointment?"], blocked_account: ["When will the confirmation letter be issued after funding?", "Is the amount I deposited sufficient under the current requirement?"],
  insurance: ["From which date is my coverage active?", "Is this plan accepted for university enrollment and the visa?"], uni_assist: ["Which documents are still missing from my application?", "When can I expect the evaluation result?"],
  aps: ["Are my submitted documents complete for the verification?", "How long does the certificate currently take to issue?"], payment: ["Can you confirm the official bank details and the exact amount?", "What happens if the payment arrives after the deadline?"],
  enrollment: ["Which steps remain to complete my enrollment?", "Which original documents must I present, and where?"], general: ["Could you confirm exactly what you need from me, and by when?", "Is there an official portal where I can complete this step?"],
};
const subjects: Record<Category, string> = { admission: "Questions regarding my admission and next steps", rejection: "Request for feedback on my application decision", visa: "Question regarding my visa application documents", blocked_account: "Question regarding my blocked account confirmation", insurance: "Confirmation of my health insurance coverage", uni_assist: "Status inquiry regarding my uni-assist application", aps: "Question regarding my APS verification", payment: "Confirmation of payment details before transfer", enrollment: "Question regarding my enrollment steps", general: "Clarification regarding your message" };
const highRisk = ["deadline", "frist", "expire", "expires", "no later than", "final", "last date", "visa", "residence", "rejected", "rejection", "cancel", "cancellation", "immediately", "within 7", "within 14", "legal", "termination", "transfer"];
const mediumRisk = ["required", "must", "missing", "incomplete", "payment", "fee", "submit", "respond", "confirm", "appointment"];

function matches(text: string, patterns: RegExp[]): string[] {
  const found: string[] = [];
  for (const pattern of patterns) for (const match of text.matchAll(pattern)) { const value = match[0].trim(); if (value && !found.includes(value)) found.push(value); }
  return found.slice(0, 10);
}

function explain(text: string): RecordValue {
  const lower = ` ${text.toLocaleLowerCase()} `;
  const months = "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec";
  const dates = matches(text, [/\b\d{1,2}[./]\d{1,2}[./]\d{2,4}\b/g, /\b\d{4}-\d{2}-\d{2}\b/g, new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:${months})\\.?\\s+\\d{4}\\b`, "gi"), new RegExp(`\\b(?:${months})\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?,?\\s+\\d{4}\\b`, "gi")]);
  const amounts = matches(text, [/€\s?\d[\d.,]*/g, /\b\d[\d.,]*\s?(?:EUR|Euro|euros?)\b/gi]);
  const selected = categories.find(([, , words]) => words.some((word) => lower.includes(word)));
  const category = selected?.[0] ?? "general", label = selected?.[1] ?? "Official or administrative message";
  const highs = highRisk.filter((word) => lower.includes(word)), mediums = mediumRisk.filter((word) => lower.includes(word));
  let risk_level: "low" | "medium" | "high" = "low", risk_reason = "No urgent or high-stakes language was detected, but read it fully yourself.";
  if (highs.length && (dates.length || highs.length > 1)) { risk_level = "high"; risk_reason = `The text contains time-critical or high-stakes language (${[...new Set(highs)].sort().slice(0, 4).join(", ")}). Act before any stated date.`; }
  else if (highs.length || (mediums.length && dates.length)) { risk_level = "medium"; risk_reason = "The text asks for action and mentions dates or requirements. Missing them could delay your process."; }
  else if (mediums.length) { risk_level = "medium"; risk_reason = "The text asks you to do or confirm something. Respond promptly."; }
  return { category, category_label: label, meaning: meaning[category], risk_level, risk_reason, extracted_dates: dates, extracted_amounts: amounts, required_actions: actions[category], questions_to_ask: questions[category],
    email_draft: { subject: subjects[category], body: `Dear Sir or Madam,\n\nThank you for your message regarding ${label.toLocaleLowerCase()}.\n\nI would like to make sure I complete the required steps correctly. Could you please confirm:\n1. [Insert your first question here]\n2. [Insert your second question here]\n\nI want to complete everything before the relevant deadline, so I would appreciate your confirmation.\n\nThank you for your time and support.\n\nKind regards,\n[Your full name]\n[Your applicant or reference number]` },
    disclaimer: "This is an automated, educational explanation of the text you pasted. It may misread context and is not legal advice. Confirm anything important directly with the sender or the official authority." };
}

async function bodyOf(request: Request): Promise<unknown | Response> { try { return await request.json(); } catch { return detail("Request body must be valid JSON.", 422); } }

export async function handleClearPathApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;
  if (request.method === "GET") {
    if (url.pathname === "/api/health") return json({ status: "ok", service: "ClearPath Germany API", version: "0.1.0", environment: "production" });
    if (url.pathname === "/api/universities") return json(filteredUniversities(url.searchParams));
    if (url.pathname.startsWith("/api/universities/")) { const item = universityById.get(decodeURIComponent(url.pathname.slice(18))); return item ? json(item) : detail("University not found", 404); }
    if (url.pathname === "/api/programs") { const result = filteredPrograms(url.searchParams); return result instanceof Response ? result : json(result); }
    if (url.pathname.startsWith("/api/programs/")) { const id = decodeURIComponent(url.pathname.slice(14)), item = programs.find((program) => program.id === id); return item ? json(item) : detail("Program not found", 404); }
    if (url.pathname === "/api/deadlines") return json(deadlines(url.searchParams));
    if (url.pathname === "/api/cost-of-living") return json(costOfLivingData);
    return detail("Not found", 404);
  }
  if (request.method === "POST") {
    if (url.pathname === "/api/roadmap/generate") { const body = await bodyOf(request); if (body instanceof Response) return body; const profile = roadmapProfile(body); return profile ? json(generateRoadmap(profile)) : detail("Invalid roadmap profile.", 422); }
    if (url.pathname === "/api/explain") { const body = await bodyOf(request); if (body instanceof Response) return body; const text = body && typeof body === "object" && !Array.isArray(body) ? (body as RecordValue).text : null; return typeof text === "string" && text.length >= 40 && text.length <= 8000 ? json(explain(text)) : detail("Text must be between 40 and 8000 characters.", 422); }
    return detail("Not found", 404);
  }
  return detail("Method not allowed", 405);
}
