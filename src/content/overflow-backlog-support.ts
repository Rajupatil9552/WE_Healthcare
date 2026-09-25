/**
 * Content definition for Overflow & Backlog Reporting Support page.
 * Route: /services/overflow-backlog-support
 *
 * NOTE: Strictly adheres to approved clinical descriptions.
 * No unverified turnaround claims, fabricated SLAs, or invented customer statistics.
 */

export const OVERFLOW_PAGE_METADATA = {
  title: "Radiology Overflow & Backlog Support | WE Healthcare",
  description:
    "Flexible teleradiology support for imaging volume spikes, reporting backlogs, staffing gaps, and temporary radiology capacity constraints.",
  canonical: "/services/overflow-backlog-support",
} as const;

export const OVERFLOW_HERO_CONTENT = {
  eyebrow: "OVERFLOW & BACKLOG REPORTING SUPPORT",
  heading: "Overflow and Backlog Reporting Support",
  subheading: "Add reporting capacity when your imaging volume increases.",
  body: "When imaging volume rises faster than available reporting capacity, worklists can grow and reporting pressure can increase. WE Healthcare provides flexible support for overflow, backlog, and temporary capacity needs.",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  secondaryCta: {
    label: "See How It Works",
    href: "#how-it-works",
  },
  image: "/images/overflow-backlog-reporting/hero-radiology-worklist.jpg",
  alt: "Radiologist reviewing CT and MRI studies on multi-monitor PACS workstation in reading room",
} as const;

export const WHEN_WORKLIST_GROWS_CONTENT = {
  eyebrow: "CAPACITY & WORKLIST DYNAMICS",
  heading: "When Your Worklist Starts Growing",
  narrative:
    "Backlogs can develop after volume spikes, staffing changes, new imaging locations, seasonal demand, or temporary capacity constraints.",
  objective: "Add reporting capacity where it is needed.",
  detail:
    "Unaddressed backlog places disproportionate strain on on-site radiologists, risks diagnostic delays for outpatients, and complicates clinical scheduling across departments. Our operational model integrates directly with your existing imaging queue to restore steady-state turnaround.",
  image: "/images/overflow-backlog-reporting/radiologist-workstation.jpg",
  alt: "Diagnostic radiologist analyzing high-volume case worklist on medical display",
} as const;

export interface BacklogReason {
  readonly id: string;
  readonly number: string;
  readonly title: string;
}

export const COMMON_REASONS_CONTENT = {
  eyebrow: "OPERATIONAL CATALYSTS",
  heading: "Common Reasons Backlogs Develop",
  reasons: [
    {
      id: "volume-spikes",
      number: "01",
      title: "Volume Spikes",
    },
    {
      id: "staffing-gaps",
      number: "02",
      title: "Staffing Gaps",
    },
    {
      id: "new-imaging-sites",
      number: "03",
      title: "New Imaging Sites",
    },
    {
      id: "seasonal-demand",
      number: "04",
      title: "Seasonal Demand",
    },
    {
      id: "temporary-capacity-constraints",
      number: "05",
      title: "Temporary Capacity Constraints",
    },
  ],
} as const;

export interface CommonTrigger {
  number: string;
  title: string;
}

export const COMMON_TRIGGERS_CONTENT: CommonTrigger[] = COMMON_REASONS_CONTENT.reasons.map((r) => ({
  number: r.number,
  title: r.title,
}));

export interface WorkflowStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  visualMetrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export const HOW_IT_WORKS_CONTENT: WorkflowStep[] = [
  {
    step: "STEP 01",
    number: "01",
    title: "Assess Backlog",
    subtitle: "Triage backlog volume and categorize by clinical modality",
    description:
      "Our operations team works with your department leadership to evaluate queue depth, age of unread studies, modality mix (CT, MRI, X-ray, Ultrasound), and referring department requirements to establish clear scope.",
    badge: "Queue Audited",
    visualMetrics: [
      { label: "Modality Triage", value: "Multi-Modality", subtext: "CT, MRI, Radiography" },
      { label: "Queue Audit", value: "Prioritized", subtext: "Acuity & timestamp mapped" },
    ],
  },
  {
    step: "STEP 02",
    number: "02",
    title: "Prioritize",
    subtitle: "Establish clinical urgency hierarchy and routing protocols",
    description:
      "Studies are tagged and ordered by urgency—ensuring acute inpatient and time-sensitive cases are partitioned for accelerated reads, while routine outpatient studies are grouped into structured reading batches.",
    badge: "Hierarchy Applied",
    visualMetrics: [
      { label: "Acuity Stratification", value: "STAT / Routine", subtext: "Standardized clinical tiers" },
      { label: "SLA Alignment", value: "Agreed Targets", subtext: "Tailored to facility needs" },
    ],
  },
  {
    step: "STEP 03",
    number: "03",
    title: "Report in Batches",
    subtitle: "Subspecialty radiologists interpret structured case groups",
    description:
      "Credentialed radiologists interpret cases within designated batches matched to their fellowship subspecialty (neuro, MSK, body, thoracic), maintaining rigorous quality and seamless report transmission back to your PACS.",
    badge: "Active Reading",
    visualMetrics: [
      { label: "Subspecialty Routing", value: "Fellowship Match", subtext: "Neuro, Body, MSK, Chest" },
      { label: "Throughput", value: "Continuous", subtext: "Direct to facility PACS" },
    ],
  },
  {
    step: "STEP 04",
    number: "04",
    title: "Clear Queue",
    subtitle: "Systematic backlog depletion and steady-state transition",
    description:
      "As batches are completed and verified, your active backlog diminishes until normal operational turnaround is restored. Detailed completion metrics confirm queue normalization.",
    badge: "Queue Normalized",
    visualMetrics: [
      { label: "Worklist Status", value: "Cleared", subtext: "Steady-state restored" },
      { label: "Handoff", value: "Synchronized", subtext: "Clean internal transition" },
    ],
  },
];

export const WHATS_INCLUDED_ITEMS = [
  {
    title: "Flexible volume support",
    description: "Scale interpretation capacity up or down according to seasonal or temporary volume without punitive quotas.",
    verificationNote: "[VERIFY: exact volume tiers]",
  },
  {
    title: "Batch prioritization",
    description: "Categorize studies into structured reporting batches based on referral urgency, exam age, and clinical indication.",
    verificationNote: null,
  },
  {
    title: "Study routing",
    description: "Automated and rule-based DICOM routing that delivers scans directly to credentialed interpreting radiologists.",
    verificationNote: null,
  },
  {
    title: "Modality-based assignment",
    description: "Direct cross-sectional CT, MRI, ultrasound, and plain films to radiologists with relevant subspecialty expertise.",
    verificationNote: null,
  },
  {
    title: "Agreed workflow",
    description: "Aligned with your facility's dictation templates, addendum rules, and institutional communication protocols.",
    verificationNote: null,
  },
  {
    title: "Critical findings communication",
    description: "Direct telephone escalation and closed-loop read-back verification for unexpected acute findings.",
    verificationNote: null,
  },
  {
    title: "Client visibility",
    description: "Real-time visibility into study progress, completed batches, reporting activity, and remaining queue volume.",
    verificationNote: "[VERIFY: client dashboard capabilities]",
  },
];

export const CHALLENGE_SUPPORT_MATRIX = [
  {
    challenge: "Growing worklist",
    support: "Additional reporting capacity",
    description: "Inbound imaging outpaces department reading capacity, causing queue buildup.",
    solution: "Onboard remote diagnostic radiologists to absorb surge volume immediately.",
  },
  {
    challenge: "Temporary staffing constraint",
    support: "Flexible support",
    description: "Vacancies, leaves, or fellowship sabbaticals create short-term headcount deficits.",
    solution: "Targeted coverage bridges the gap without requiring permanent hiring commitments.",
  },
  {
    challenge: "Volume spike",
    support: "Batch reporting",
    description: "Sudden seasonal surges or post-holiday accumulations create concentrated backlogs.",
    solution: "Organize unread cases into high-efficiency batches read by dedicated subspecialists.",
  },
  {
    challenge: "New imaging site / service",
    support: "Scalable reporting support",
    description: "New clinical locations launch before on-site radiology staffing is fully established.",
    solution: "Scalable remote reading provides turnkey coverage from day one.",
    verificationNote: "[VERIFY: site onboarding timeline]",
  },
];

export const REPORTING_VISIBILITY_CONTENT = {
  eyebrow: "OPERATIONAL TRANSPARENCY",
  heading: "Real-Time Tracking & Reporting Visibility",
  subtitle:
    "Maintain clear oversight into your overflow queue with agreed metrics tracked throughout the engagement.",
  metrics: [
    {
      label: "Study Volume",
      description: "Accurate tracking of total studies ingested, queued, and processed across every imaging modality.",
      tag: "Volume Tracking",
    },
    {
      label: "Reporting Activity",
      description: "Hourly and shift-based monitoring of diagnostic reads in progress and completed by our radiologist network.",
      tag: "Activity Telemetry",
    },
    {
      label: "Coverage Periods",
      description: "Clear alignment on active reading windows—daytime overflow, evening surges, or weekend batch clears.",
      tag: "Scheduled Windows",
    },
    {
      label: "Backlog Status",
      description: "Live progression metrics demonstrating steady reduction of unread cases toward steady-state targets.",
      tag: "Queue Health",
    },
  ],
};

export const OVERFLOW_FAQ_CONTENT = [
  {
    id: "faq-what-is-overflow",
    question: "What is overflow and backlog reporting support?",
    answer:
      "Overflow and backlog reporting support provides supplemental teleradiology reading capacity when your imaging volume exceeds your in-house radiologist team's bandwidth. Whether caused by volume spikes, staffing gaps, or seasonal surges, our board-certified radiologists interpret studies to restore normal turnaround.",
  },
  {
    id: "faq-how-quickly-activated",
    question: "How quickly can overflow support be activated?",
    answer:
      "For existing partners with pre-configured PACS/RIS connectivity and credentialed radiologists, overflow capacity can be mobilized on short notice. For new engagements, our onboarding team coordinates connectivity, credentialing, and workflow alignment to initiate reading as rapidly as institutional governance allows.",
  },
  {
    id: "faq-prioritization-routing",
    question: "How are studies prioritized and routed during volume spikes?",
    answer:
      "Studies are ingested into an organized triage queue and stratified by clinical priority (STAT, urgent, routine) and modality (CT, MRI, X-ray, Ultrasound). Emergent cases receive immediate priority attention, while routine outpatient studies are batched for focused subspecialty review.",
  },
  {
    id: "faq-pacs-workflow",
    question: "Does our facility need to change its current PACS or RIS workflow?",
    answer:
      "No. We connect directly to your existing PACS and RIS infrastructure via standard DICOM and HL7 protocols over secure encrypted connections. Your technologists acquire and send scans normally, and completed reports return directly into your diagnostic system.",
  },
  {
    id: "faq-critical-findings",
    question: "How are critical and urgent findings communicated during backlog reads?",
    answer:
      "All critical or unexpected acute findings trigger an immediate closed-loop notification protocol. Our radiologist or clinical coordination team contacts the referring clinician directly by telephone and documents a verified read-back in the official diagnostic report.",
  },
  {
    id: "faq-temporary-adhoc",
    question: "Can backlog reporting support be scheduled on a temporary or ad-hoc basis?",
    answer:
      "Yes. Engagements can be structured for short-term backlog clearing (such as post-holiday queue reductions or locum tenens coverage) as well as ongoing flexible surge support that activates whenever your internal thresholds are reached.",
  },
];

export const OVERFLOW_FINAL_CTA_CONTENT = {
  eyebrow: "RESTORE WORKLIST BALANCE",
  heading: "Add Reporting Capacity Where and When You Need It",
  subheading:
    "Protect your clinical team from burnout and keep diagnostic turnaround on schedule with flexible overflow support.",
  primaryBtn: {
    label: "Request a Consultation",
    href: "/contact",
  },
  secondaryBtn: {
    label: "Explore Coverage Options",
    href: "/services",
  },
  image: "/images/overflow-backlog-reporting/reporting-workflow.jpg",
  alt: "Teleradiology team collaborating on diagnostic imaging case triage and reporting",
  bulletPoints: [
    "Board-certified subspecialty radiologists",
    "Direct PACS/RIS integration with zero technologist disruption",
    "Agreed prioritization protocols and closed-loop critical escalation",
  ],
};
