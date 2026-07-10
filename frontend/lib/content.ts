export interface GuideSection {
  heading: string;
  body: string;
}

export interface GuideResource {
  label: string;
  url: string;
  last_verified: string;
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  highRisk: boolean;
  readingMinutes: number;
  sections: GuideSection[];
  resources: GuideResource[];
}

export const guides: Guide[] = [
  {
    slug: "india-application-path",
    title: "India-first application path",
    summary:
      "A practical sequence for Indian students, from APS and university shortlisting to documents, applications, and visa preparation.",
    highRisk: true,
    readingMinutes: 8,
    sections: [
      {
        heading: "1. Start APS and research in parallel",
        body: "Indian academic documents commonly need APS verification for the Germany study and visa process. Check the current APS India procedure early and begin it while you shortlist programs; processing time can otherwise become your critical path.",
      },
      {
        heading: "2. Check the 2026 APS eligibility updates",
        body: "For admissions from winter 2026/27, APS India has published updated undergraduate criteria, including a 70% Class XII threshold for the subject-restricted Studienkolleg route described in its notice. For summer 2027 and later, APS says dMAT applies to selected master's applicants whose previous degree is in specified Engineering, Commerce, Accounting, Finance, Economics, Business, or Management fields. Read the official scope because neither update applies universally.",
      },
      {
        heading: "3. Build a source-backed shortlist",
        body: "Use DAAD to discover programs, then confirm every requirement on the university's own program and application pages. Record the exact degree, intake, applicant category, application route, deadline, language level, tuition, and semester fee. A university may use direct application, uni-assist, or a VPD route depending on the program.",
      },
      {
        heading: "4. Prepare the core document set",
        body: "A typical academic application may ask for your passport, APS certificate, school-leaving records, bachelor's degree or provisional certificate, semester-wise transcripts, grading scale, language certificate, CV, and program-specific motivation letter or references. These are common documents, not a universal mandatory list; the official program checklist decides what is required.",
      },
      {
        heading: "5. Check format rules before uploading",
        body: "Confirm whether the university wants certified copies, translations, a specific transcript format, module descriptions, or documents sent separately to uni-assist. Match names and dates across your passport, APS record, test scores, and academic documents, and do not upload unrelated sensitive records.",
      },
      {
        heading: "6. Work backward from four deadlines",
        body: "Track the university deadline, uni-assist or VPD processing time, APS progress, and the visa appointment separately. Submit well before the last day because payment, document review, or portal issues can leave an application incomplete even when you started before the deadline.",
      },
      {
        heading: "7. Move to visa preparation after admission",
        body: "Use the checklist for the German mission responsible for your place of residence in India. Financial proof, insurance, forms, and appointment rules can change, so verify them again on the official mission or Federal Foreign Office pages before paying or booking.",
      },
    ],
    resources: [
      {
        label: "DAAD India: studying in Germany",
        url: "https://www.daad.in/en/study-research-in-germany/studying-in-germany/",
        last_verified: "2026-07-09",
      },
      {
        label: "APS India",
        url: "https://www.aps-india.de/",
        last_verified: "2026-07-09",
      },
      {
        label: "APS India: 2026 eligibility updates",
        url: "https://aps-india.de/news/",
        last_verified: "2026-07-10",
      },
      {
        label: "APS India: dMAT scope",
        url: "https://aps-india.de/dmat/",
        last_verified: "2026-07-10",
      },
      {
        label: "DAAD: application process",
        url: "https://www.daad.de/en/studying-in-germany/requirements/application-process/",
        last_verified: "2026-07-09",
      },
      {
        label: "DAAD International Programmes",
        url: "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/",
        last_verified: "2026-07-09",
      },
    ],
  },
  {
    slug: "visa-steps",
    title: "German student visa steps",
    summary:
      "Understand the typical sequence for a national visa for study, from admission to the embassy appointment.",
    highRisk: true,
    readingMinutes: 6,
    sections: [
      {
        heading: "When to start",
        body: "Begin as soon as you have an admission or a strong shortlist. Appointment availability at German missions varies widely by country and season, so treat early booking as a priority.",
      },
      {
        heading: "Common building blocks",
        body: "Most applications ask for admission or an application confirmation, proof of financial resources (often a blocked account), health insurance, a valid passport, and the visa application forms. The exact checklist depends on your local German mission.",
      },
      {
        heading: "Verify before you act",
        body: "Requirements, fees, and financial-proof amounts change. Always confirm the current checklist on your responsible German mission's website before booking or paying for anything.",
      },
    ],
    resources: [
      {
        label: "Federal Foreign Office: visa for study",
        url: "https://www.auswaertiges-amt.de/en/visa-service",
        last_verified: "2026-07-04",
      },
      {
        label: "Make it in Germany: student visa",
        url: "https://www.make-it-in-germany.com/en/studying-training/studying/visa",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "aps-certificate",
    title: "APS certificate explained",
    summary:
      "What the APS is, who needs it, and how it fits into applications for students from certain countries.",
    highRisk: true,
    readingMinutes: 5,
    sections: [
      {
        heading: "What it is",
        body: "The APS (Akademische Prüfstelle) verifies academic documents for applicants from some countries, including India, China, and Vietnam. The process and whether you need it depend entirely on your country of study.",
      },
      {
        heading: "Why it matters",
        body: "Where required, an APS certificate is often needed before you can apply to universities or for a visa. Missing it can block your application, so check early whether your country has an APS requirement.",
      },
    ],
    resources: [
      {
        label: "APS India",
        url: "https://www.aps-india.de/",
        last_verified: "2026-07-04",
      },
      {
        label: "APS China",
        url: "https://www.aps.org.cn/",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "uni-assist-vpd",
    title: "uni-assist and VPD",
    summary:
      "How centralized application processing and the preliminary documentation check (VPD) work.",
    highRisk: false,
    readingMinutes: 4,
    sections: [
      {
        heading: "uni-assist",
        body: "Many universities process international applications through uni-assist, which checks documents and forwards eligible applications. Some universities accept direct applications instead. Always confirm the route on the program page.",
      },
      {
        heading: "VPD",
        body: "A VPD (Vorpruefungsdokumentation) is a preliminary review of your qualifications, sometimes required by universities that accept direct applications. It states your converted grade and eligibility.",
      },
    ],
    resources: [
      {
        label: "uni-assist official site",
        url: "https://www.uni-assist.de/en/",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "blocked-account",
    title: "Blocked account and finances",
    summary:
      "How the blocked account demonstrates financial resources for your student visa.",
    highRisk: true,
    readingMinutes: 5,
    sections: [
      {
        heading: "Purpose",
        body: "A blocked account is a common way to prove you can cover living costs during your studies. You deposit a set amount and can withdraw a limited sum each month after arrival.",
      },
      {
        heading: "The amount changes",
        body: "The required minimum is set by the authorities and is updated periodically. Never rely on a figure you saw in an old forum post; confirm the current amount on an official source before opening an account.",
      },
    ],
    resources: [
      {
        label: "Federal Foreign Office: financing your studies",
        url: "https://www.auswaertiges-amt.de/en/visa-service",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "health-insurance",
    title: "Health insurance basics",
    summary:
      "Why health insurance is mandatory and how public and private options differ for students.",
    highRisk: true,
    readingMinutes: 4,
    sections: [
      {
        heading: "Mandatory coverage",
        body: "Health insurance is required to enroll and usually to obtain a visa. Students under a certain age typically qualify for public statutory insurance at student rates, but eligibility rules vary.",
      },
      {
        heading: "Confirm eligibility",
        body: "Whether you can use public insurance depends on your age, program, and status. Confirm your options with an insurer and your university before you enroll.",
      },
    ],
    resources: [
      {
        label: "Make it in Germany: insurance",
        url: "https://www.make-it-in-germany.com/en/living-in-germany/insurance",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "accommodation",
    title: "Finding accommodation",
    summary:
      "Where students look for housing and how to avoid common rental scams.",
    highRisk: false,
    readingMinutes: 4,
    sections: [
      {
        heading: "Where to look",
        body: "Student unions (Studierendenwerk) offer dormitories, though waiting lists are common. Shared flats (WGs) and private rentals are alternatives. Apply to dormitories as early as possible.",
      },
      {
        heading: "Avoid scams",
        body: "Never pay a deposit before viewing a place or verifying the landlord, and be cautious of listings that ask for money before any contract. If an offer feels too good, treat it as a warning sign.",
      },
    ],
    resources: [
      {
        label: "Deutsches Studierendenwerk",
        url: "https://www.studierendenwerke.de/en/",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "working-while-studying",
    title: "Working while studying",
    summary:
      "The general framework for part-time work on a student visa and why limits matter.",
    highRisk: true,
    readingMinutes: 4,
    sections: [
      {
        heading: "Work allowance",
        body: "International students are generally allowed to work a limited number of days per year. Exceeding the allowance can affect your residence status, so track your working days carefully.",
      },
      {
        heading: "Check current rules",
        body: "Work rules for students can change. Confirm the current allowance and any conditions with the Ausländerbehörde or an official source before taking a job.",
      },
    ],
    resources: [
      {
        label: "Make it in Germany: working as a student",
        url: "https://www.make-it-in-germany.com/en/studying-training/studying/work",
        last_verified: "2026-07-04",
      },
    ],
  },
  {
    slug: "arrival-checklist",
    title: "After you arrive",
    summary:
      "The first administrative steps most students complete soon after arriving in Germany.",
    highRisk: false,
    readingMinutes: 4,
    sections: [
      {
        heading: "Register your address",
        body: "Most people must register their address (Anmeldung) at the local registration office within a set window after moving in. You usually need this before opening some services.",
      },
      {
        heading: "Residence permit and enrollment",
        body: "You will typically enroll at your university and apply for a residence permit at the Ausländerbehörde. Book appointments early, as they can be scarce.",
      },
    ],
    resources: [
      {
        label: "Make it in Germany: after arrival",
        url: "https://www.make-it-in-germany.com/en/living-in-germany",
        last_verified: "2026-07-04",
      },
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Is ClearPath Germany a consultancy?",
    answer:
      "No. It is a free, self-guided planning tool. It organizes your steps and points you to official sources, but it does not replace legal or immigration advice.",
  },
  {
    question: "Are the deadlines and fees guaranteed to be correct?",
    answer:
      "The catalog is a hand-curated seed with a verification date on each entry. Requirements change, so always confirm details on the university's official page before acting.",
  },
  {
    question: "Do I need APS?",
    answer:
      "It depends on your country of study. Some countries, such as India, China, and Vietnam, have an APS requirement. Check the APS guide and your local office.",
  },
  {
    question: "How much money do I need for the visa?",
    answer:
      "Financial-proof amounts, including the blocked account minimum, are set by the authorities and updated over time. Confirm the current figure on an official source.",
  },
  {
    question: "Can I work while studying?",
    answer:
      "International students are usually allowed limited part-time work, but the allowance and conditions can change. Verify current rules before taking a job.",
  },
];

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "APS",
    definition:
      "Akademische Pruefstelle. An academic verification step required for applicants from certain countries.",
  },
  {
    term: "uni-assist",
    definition:
      "A central service that checks and forwards international applications for many German universities.",
  },
  {
    term: "VPD",
    definition:
      "Vorpruefungsdokumentation. A preliminary documentation of your qualifications, sometimes required for direct applications.",
  },
  {
    term: "Blocked account",
    definition:
      "A bank account holding a set sum to prove you can fund your living costs, with limited monthly withdrawals.",
  },
  {
    term: "Anmeldung",
    definition:
      "Registration of your residential address at the local registration office after you move in.",
  },
  {
    term: "Auslaenderbehoerde",
    definition:
      "The local immigration office that handles residence permits and related matters.",
  },
  {
    term: "Studierendenwerk",
    definition:
      "The student services organization that runs dormitories, canteens, and support services.",
  },
  {
    term: "Semester fee",
    definition:
      "A recurring administrative fee most public universities charge each semester, often including a transport pass.",
  },
  {
    term: "Winter intake",
    definition:
      "The main start of the academic year, typically beginning around October, with earlier application deadlines.",
  },
  {
    term: "Summer intake",
    definition:
      "A secondary start, typically beginning around April, offered for a smaller set of programs.",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
