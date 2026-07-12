export interface OfficialFact {
  id: string;
  title: string;
  summary: string;
  appliesTo: string;
  sourceLabel: string;
  sourceUrl: string;
  lastVerified: string;
  caution: string;
}

export const SITE_INFORMATION_LAST_REVIEWED = "2026-07-12";

export const OFFICIAL_FACTS = {
  studentFinance: {
    id: "student-finance-2026",
    title: "Student visa financial proof",
    summary: "For 2026, official student-visa guidance lists at least EUR 11,904 in a blocked account as one way to prove funds. A scholarship or declaration of commitment may also be accepted.",
    appliesTo: "Applicants using the student visa route in 2026",
    sourceLabel: "Make it in Germany: visa for studying",
    sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "Confirm the amount and accepted proof with the German mission handling your case before transferring money.",
  },
  studentWork: {
    id: "student-work-limits",
    title: "Work while studying",
    summary: "Official guidance states that many students from third countries may work up to 140 full days or 280 half days per year, or up to 20 hours per week. Student-assistant work can follow different treatment.",
    appliesTo: "Many third-country students holding a German study residence title",
    sourceLabel: "Make it in Germany: visa for studying",
    sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/studying",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "Your residence title, type of job, and study status can change what is allowed. Confirm before starting work.",
  },
  uniAssistTiming: {
    id: "uni-assist-processing",
    title: "uni-assist and VPD timing",
    summary: "uni-assist recommends applying at least eight weeks before a deadline where possible. A VPD usually takes four to six weeks, but current regional processing times can be longer.",
    appliesTo: "Applicants whose chosen university uses uni-assist or requires a VPD",
    sourceLabel: "uni-assist: deadlines and processing time",
    sourceUrl: "https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "For a VPD, you normally must still submit the VPD to the university before its own deadline.",
  },
  apsIndiaUndergraduate: {
    id: "aps-india-winter-2026",
    title: "APS India criteria from winter 2026/27",
    summary: "APS India states that updated undergraduate criteria apply from winter semester 2026/27, including a minimum 70% overall Class XII score for the described Studienkolleg and one-academic-year pathways.",
    appliesTo: "Indian undergraduate applicants using the pathways described by APS India",
    sourceLabel: "APS India: news and updates",
    sourceUrl: "https://aps-india.de/news/",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "This is not a universal admission guarantee. Universities make admission decisions and may impose additional requirements.",
  },
  apsIndiaDmat: {
    id: "aps-india-dmat-2026",
    title: "dMAT for selected master's applicants",
    summary: "APS India introduced dMAT for selected applicants whose previous degree is in listed engineering, commerce, finance, economics, business, or management fields, for summer 2027 and later intakes, subject to published transitional exemptions.",
    appliesTo: "Selected master's applicants from India whose previous degree appears in the official affected-fields list",
    sourceLabel: "APS India: dMAT",
    sourceUrl: "https://aps-india.de/dmat/",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "Use the official affected-fields list and transition rules; dMAT does not replace APS verification, anabin, or university admission review.",
  },
  visaPortal: {
    id: "consular-services-portal",
    title: "Online national visa applications",
    summary: "Germany's Federal Foreign Office says national visa applications can be prepared and submitted through the Consular Services Portal, with all visa sections connected since January 2025.",
    appliesTo: "Visa categories and locations supported by the portal",
    sourceLabel: "Federal Foreign Office: visas for Germany",
    sourceUrl: "https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "Follow the German mission responsible for your place of residence; local appointment and document steps can differ.",
  },
  arrivalRegistration: {
    id: "address-registration",
    title: "Registering after moving in",
    summary: "Official guidance says you should register your address with the local registration office within two weeks of moving into a residence in Germany.",
    appliesTo: "People moving into a registrable residence in Germany",
    sourceLabel: "Make it in Germany: housing and registration",
    sourceUrl: "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
    lastVerified: SITE_INFORMATION_LAST_REVIEWED,
    caution: "Appointment availability and requested documents are handled locally; check the website of your city or municipality.",
  },
} satisfies Record<string, OfficialFact>;

export const TRUSTED_OFFICIAL_RESOURCES = [
  { label: "DAAD", href: "https://www.daad.de/en/studying-in-germany/" },
  { label: "uni-assist", href: "https://www.uni-assist.de/en/" },
  { label: "Make it in Germany", href: "https://www.make-it-in-germany.com/en/" },
  { label: "Federal Foreign Office", href: "https://www.auswaertiges-amt.de/en/visa-service" },
] as const;
