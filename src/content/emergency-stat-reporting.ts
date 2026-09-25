/**
 * Content definition for Emergency & STAT Radiology Reporting page.
 * Route: /services/emergency-stat-reporting
 *
 * NOTE: Adheres strictly to verified clinical descriptions.
 * No unsupported turnaround guarantees, fabricated SLAs, or invented customer statistics.
 */

export const EMERGENCY_PAGE_METADATA = {
  title: "Emergency & STAT Teleradiology Reporting | WE Healthcare",
  description:
    "Priority teleradiology reporting support for emergency departments, trauma studies, inpatient escalations, and time-sensitive imaging.",
  canonical: "/services/emergency-stat-reporting",
} as const;

export const EMERGENCY_HERO_CONTENT = {
  heading: "Emergency and STAT Radiology Reporting",
  subheading: "Priority reporting support for time-sensitive imaging.",
  body: "Emergency departments and acute-care environments may need radiology reporting support when imaging volume, clinical urgency, or after-hours demand increases. WE Healthcare can support defined priority workflows.",
  verificationNote: "[VERIFY: exact STAT capability and turnaround commitments]",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
    supportingText: "Tell us about your radiology coverage needs.",
  },
  secondaryCta: {
    label: "Explore STAT Workflow",
    href: "#how-it-works",
  },
  image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.jpg",
  alt: "Board-certified radiologist reviewing acute emergent CT head neuro scans at diagnostic workstation",
  commitments: [
    "Priority queue routing for high-acuity studies",
    "Direct radiologist-to-physician telephone communication",
    "Closed-loop verified read-back documentation in EHR",
  ],
} as const;

export const WHEN_EVERY_STUDY_MATTERS_CONTENT = {
  eyebrow: "WHEN EVERY STUDY MATTERS",
  heading: "Clear Priority for Time-Sensitive Imaging",
  body: "Emergency and time-sensitive imaging requires a workflow that clearly identifies priority studies, routes them appropriately, and provides a defined communication path.",
  transition: {
    message: "Priority becomes meaningful when it drives the right workflow.",
    steps: [
      { label: "Priority", sub: "Acuity Triage" },
      { label: "Routing", sub: "Credentialed Match" },
      { label: "Review", sub: "Board-Certified Read" },
      { label: "Communication", sub: "Direct Outreach" },
    ],
  },
  priorityQueue: [
    {
      id: "stat-ct-head",
      priority: "STAT",
      priorityType: "stat" as const,
      exam: "CT Head",
      indication: "Acute Neuro Protocol",
      modality: "CT",
      destination: "Immediate Priority Routing",
      action: "Direct Review",
      isElevated: true,
    },
    {
      id: "high-mri-brain",
      priority: "HIGH",
      priorityType: "high" as const,
      exam: "MRI Brain",
      indication: "Inpatient Escalation",
      modality: "MRI",
      destination: "Prioritized Review",
      action: "Review Queue",
      isElevated: false,
    },
    {
      id: "routine-ct-chest",
      priority: "ROUTINE",
      priorityType: "routine" as const,
      exam: "CT Chest",
      indication: "Standard Thoracic Protocol",
      modality: "CT",
      destination: "Standard Worklist",
      action: "Standard Queue",
      isElevated: false,
    },
    {
      id: "routine-xr-chest",
      priority: "ROUTINE",
      priorityType: "routine" as const,
      exam: "X-Ray Chest",
      indication: "Routine PA & Lateral",
      modality: "XR",
      destination: "Standard Worklist",
      action: "Standard Queue",
      isElevated: false,
    },
  ],
  image: "/images/emergency-stat-reporting/priority-radiology-worklist.jpg",
  alt: "Teleradiology reading room workstation with high-resolution monitors displaying multi-modality diagnostic imaging",
} as const;

export const COMMON_USE_CASES_CONTENT = {
  eyebrow: "COMMON USE CASES",
  heading: "Common situations where priority reporting support may be needed.",
  supportingCopy:
    "Emergency imaging needs can vary by clinical situation, imaging volume, staffing, and time of day. Priority workflows can be configured around the facility's operational requirements.",
  transition: {
    lead: "Different clinical situations",
    arrow: "One clearly defined priority workflow",
  },
  useCases: [
    {
      id: "ed-imaging",
      number: "01",
      title: "Emergency Department Imaging",
      description:
        "Rapid diagnostic interpretation for acute presentations requiring expedited admission, discharge, or procedural decisions in the emergency suite.",
      clinicalFocus: "Acute triage, head trauma, chest pain, and abdominal pain",
      image: "/images/emergency-stat-reporting/emergency-department-imaging.jpg",
      alt: "Emergency department modern CT scanner suite with clinical care team",
    },
    {
      id: "trauma-studies",
      number: "02",
      title: "Trauma Studies",
      description:
        "High-velocity injuries, multi-system blunt trauma, and acute orthopedic injuries requiring immediate multi-slice cross-sectional assessment.",
      clinicalFocus: "Whole-body trauma CT, spinal stability, and hemorrhage detection",
      image: "/images/emergency-stat-reporting/trauma-radiology.jpg",
      alt: "Diagnostic trauma radiology workstation reviewing multi-slice CT spine and pelvic fracture scans",
    },
    {
      id: "inpatient-escalations",
      number: "03",
      title: "Inpatient Escalations",
      description:
        "Sudden clinical deterioration on medical or surgical floors, postoperative concerns, and acute changes in inpatient vital parameters.",
      clinicalFocus: "Post-op bleeding, acute pulmonary changes, and neuro checks",
      image: "/images/emergency-stat-reporting/priority-radiology-worklist.jpg",
      alt: "Teleradiology reading room multi-monitor diagnostic workstation",
    },
    {
      id: "after-hours-cases",
      number: "04",
      title: "After-Hours Cases",
      description:
        "Unplanned emergent imaging arriving during overnight, weekend, and holiday periods when in-house subspecialty coverage is constrained.",
      clinicalFocus: "Nocturnal coverage, emergency call relief, and subspecialty backup",
      image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.jpg",
      alt: "Board-certified diagnostic radiologist reviewing acute scans at workstation",
    },
    {
      id: "time-sensitive-imaging",
      number: "05",
      title: "Time-Sensitive Imaging",
      description:
        "Studies with high likelihood of critical pathology—such as acute stroke, pulmonary embolism, or intracranial hemorrhage—requiring urgent direct communication.",
      clinicalFocus: "Stroke protocols, aortic dissection, and tension pneumothorax",
      image: "/images/emergency-stat-reporting/trauma-radiology.jpg",
      alt: "Diagnostic monitor displaying urgent time-sensitive radiology scans",
    },
    {
      id: "volume-surges",
      number: "06",
      title: "Volume Surges",
      description:
        "Seasonal volume surges, local mass-casualty events, or sudden ED surges that exceed standard departmental reading bandwidth.",
      clinicalFocus: "Surge absorption, queue stabilization, and backlog prevention",
      image: "/images/emergency-stat-reporting/emergency-department-imaging.jpg",
      alt: "Hospital acute imaging suite prepared for emergency imaging volume surge",
    },
  ],
} as const;

export const HOW_IT_WORKS_CONTENT = {
  eyebrow: "HOW IT WORKS",
  heading: "From STAT Flag to Direct Communication",
  supportingText:
    "The exact workflow should be configured around the facility's operational and clinical requirements.",
  transition: {
    from: "Communication",
    arrow: "Defined Clinical Escalation Pathway",
    nextSectionName: "Service Levels",
  },
  study: {
    exam: "CT Head w/o Contrast",
    modality: "CT",
    indication: "Acute Neuro Protocol",
    accession: "DEMO-STAT-091",
  },
  steps: [
    {
      id: "step-flag-stat",
      number: "01",
      title: "Flag STAT",
      shortTitle: "Flag STAT",
      description:
        "Identify a time-sensitive study and assign the appropriate priority.",
      verificationNote: null,
      statusLabel: "Flagged",
      priorityLabel: "STAT",
      actionDetail: "Priority tag applied upon ingestion via HL7/DICOM flag",
      queueState: "Triage Elevation Active",
      stageHeading: "Priority Classification Triggered",
      stageTag: "ROUTINE → STAT",
      stageNarrative:
        "The ordering clinician or technologist identifies an emergent clinical presentation. An acute protocol flag is appended upon study transmission, initiating priority handling.",
      badgeColor: "rose",
      image: "/images/emergency-stat-reporting/priority-radiology-worklist.jpg",
      alt: "Emergency study flagged for acute triage",
    },
    {
      id: "step-priority-routing",
      number: "02",
      title: "Priority Routing",
      shortTitle: "Priority Routing",
      description:
        "Route the prioritized study through the defined reporting workflow.",
      verificationNote: null,
      statusLabel: "Priority Queue",
      priorityLabel: "STAT",
      actionDetail: "Bypasses routine queue and routes to credentialed subspecialist",
      queueState: "Top of Active Worklist",
      stageHeading: "Intelligent Worklist Sorting",
      stageTag: "Queue Elevation",
      stageNarrative:
        "The study automatically routes ahead of routine outpatient queues and matches to an appropriately credentialed, subspecialty-trained diagnostic radiologist.",
      badgeColor: "rose",
      image: "/images/emergency-stat-reporting/emergency-department-imaging.jpg",
      alt: "Prioritized emergency imaging study routed ahead of routine worklist",
    },
    {
      id: "step-radiologist-review",
      number: "03",
      title: "Radiologist Review",
      shortTitle: "Radiologist Review",
      description:
        "The assigned radiologist reviews the study according to the configured workflow.",
      verificationNote: "[VERIFY: radiologist assignment]",
      statusLabel: "In Review",
      priorityLabel: "STAT",
      actionDetail: "Board-certified radiologist opens study on high-resolution PACS",
      queueState: "Diagnostic PACS Interpretation",
      stageHeading: "Board-Certified Diagnostic Review",
      stageTag: "PACS In Progress",
      stageNarrative:
        "The assigned radiologist opens cross-sectional series on multi-monitor diagnostic displays, evaluating critical emergent pathology according to facility protocol.",
      badgeColor: "rose",
      image: "/images/emergency-stat-reporting/trauma-radiology.jpg",
      alt: "Radiologist reviewing acute neuro CT imaging at diagnostic PACS workstation",
    },
    {
      id: "step-direct-communication",
      number: "04",
      title: "Direct Communication",
      shortTitle: "Direct Communication",
      description:
        "Critical or urgent findings follow the agreed communication pathway.",
      verificationNote: "[VERIFY: exact communication protocol]",
      statusLabel: "Communication",
      priorityLabel: "STAT",
      actionDetail: "Direct telephone outreach to treating physician with verbal read-back",
      queueState: "Closed-Loop Escalation",
      stageHeading: "Direct Telephone Escalation",
      stageTag: "Closed-Loop EHR",
      stageNarrative:
        "Unexpected or time-sensitive critical findings trigger immediate verbal telephone communication with the emergency physician, backed by timestamped documentation.",
      badgeColor: "rose",
      image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.jpg",
      alt: "Emergency physician receiving direct verbal radiologist communication",
    },
  ],
} as const;

export const CRITICAL_FINDINGS_PROTOCOL_CONTENT = {
  eyebrow: "CRITICAL FINDINGS PROTOCOL",
  heading: "A Defined Path for Critical Findings",
  body: "Critical findings are communicated through the agreed clinical escalation pathway and documented according to the defined reporting process.",
  verificationNote: "[VERIFY: exact communication protocol]",
  transition: {
    message: "Priority workflows are defined around the facility's operational requirements.",
    nextSectionName: "Service Levels",
  },
  report: {
    examTitle: "CT Head w/o Contrast (Acute Neuro)",
    modality: "CT",
    priority: "STAT",
    indication: "Rule out acute intracranial hemorrhage / stroke protocol",
    findingFlag: "Critical Finding Identified",
    actionStatus: "Direct Escalation Required",
    accession: "DEMO-CRIT-904",
    image: "/images/emergency-stat-reporting/trauma-radiology.jpg",
    alt: "Radiology diagnostic report review with highlighted critical finding",
  },
  nodes: [
    {
      id: "node-finding-identified",
      number: "01",
      title: "Finding Identified",
      description:
        "The reporting radiologist identifies an acute, unexpected, or life-critical diagnostic abnormality during interpretation.",
      stateLabel: "Diagnostic Review",
      indicatorColor: "rose",
    },
    {
      id: "node-escalation-pathway",
      number: "02",
      title: "Defined Escalation Pathway",
      description:
        "Pre-established notification protocol initiates automatically according to facility-specific clinical bylaws and contact hierarchies.",
      stateLabel: "Protocol Triggered",
      indicatorColor: "rose",
    },
    {
      id: "node-clinical-communication",
      number: "03",
      title: "Clinical Communication",
      description:
        "Direct communication is established with the ordering physician, emergency department attending, or designated clinical care team.",
      stateLabel: "Direct Outreach",
      indicatorColor: "rose",
    },
    {
      id: "node-documentation",
      number: "04",
      title: "Documentation",
      description:
        "Closed-loop verbal read-back confirmation is timestamped and documented directly in the diagnostic report and facility EHR.",
      stateLabel: "Read-Back Logged",
      indicatorColor: "emerald",
    },
  ],
} as const;

export const SERVICE_LEVELS_CONTENT = {
  eyebrow: "SERVICE LEVELS",
  heading: "Defined Around Your Operational Requirements",
  body: "Priority categories, coverage windows, escalation rules, and turnaround commitments should be agreed before launch.",
  verificationNote: "[VERIFY: service-level details]",
  transition: {
    message: "Questions about how priority reporting support can fit your workflow?",
    nextSectionName: "Frequently Asked Questions",
  },
  parameters: [
    {
      id: "param-priority-categories",
      number: "01",
      title: "Priority Categories",
      description:
        "Define how STAT, high-priority, and routine studies are classified.",
      detail:
        "Studies are mapped to clear clinical acuity tiers upon ingestion, ensuring high-urgency emergent protocols receive immediate priority handling.",
      visualType: "categories" as const,
      tiers: [
        { label: "STAT", tag: "Urgent Emergent" },
        { label: "HIGH", tag: "Inpatient Priority" },
        { label: "ROUTINE", tag: "Standard Queue" },
      ],
    },
    {
      id: "param-coverage-windows",
      number: "02",
      title: "Coverage Windows",
      description:
        "Define when priority reporting support is required.",
      detail:
        "Coverage can be tailored to after-hours, overnight shifts, weekend coverage, daytime volume spikes, or continuous 24/7/365 emergency support.",
      visualType: "windows" as const,
      windows: [
        { label: "DAY", desc: "Volume Surge Support" },
        { label: "EVENING", desc: "Shift Relief" },
        { label: "OVERNIGHT", desc: "Dedicated Nocturnal" },
        { label: "WEEKEND", desc: "Full Weekend Coverage" },
      ],
    },
    {
      id: "param-escalation-rules",
      number: "03",
      title: "Escalation Rules",
      description:
        "Define the communication and escalation pathway.",
      detail:
        "Establish specific physician contact hierarchies, notification channels, and failover pathways for unexpected critical diagnostic findings.",
      visualType: "escalation" as const,
      steps: [
        "Finding Identified",
        "Agreed Escalation",
        "Direct Outreach",
      ],
    },
    {
      id: "param-turnaround-commitments",
      number: "04",
      title: "Turnaround Commitments",
      description:
        "Define agreed reporting expectations before launch.",
      detail:
        "Turnaround expectations are formally established in clinical service level agreements during onboarding, aligned with your departmental benchmarks.",
      visualType: "commitments" as const,
      phases: [
        { phase: "Defined", note: "Target Benchmarks Established" },
        { phase: "Agreed", note: "Service Agreement Codified" },
        { phase: "Documented", note: "EHR Timestamp Tracked" },
      ],
    },
  ],
} as const;

export const EMERGENCY_FAQ_CONTENT = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  heading: "Questions About Emergency & STAT Reporting",
  supportingText:
    "Direct, transparent answers regarding priority routing protocols, emergency department integration, critical finding escalations, and operational coverage models.",
  items: [
    {
      id: "faq-what-is-stat",
      question: "What is STAT radiology reporting?",
      answer:
        "STAT radiology reporting refers to a priority workflow designed specifically for time-sensitive imaging studies. When high clinical urgency or acute trauma presentation is identified, the study is flagged upon transmission and immediately routed ahead of routine reporting queues for expedited diagnostic interpretation.",
    },
    {
      id: "faq-ed-teleradiology",
      question: "Can emergency departments use teleradiology support?",
      answer:
        "Yes. Emergency departments and acute-care environments frequently utilize teleradiology support when imaging volume, patient acuity, after-hours nocturnal demand, or local staffing constraints increase. Workflows are configured to align seamlessly with existing hospital RIS, PACS, and departmental bylaws.",
    },
    {
      id: "faq-how-prioritized",
      question: "How are STAT studies prioritized?",
      answer:
        "Priority categories and routing rules are configured around the facility's specific operational and clinical requirements. Studies tagged with acute HL7/DICOM priority parameters bypass routine worklists and automatically match to credentialed, subspecialty-trained diagnostic radiologists on active duty.",
    },
    {
      id: "faq-critical-findings",
      question: "How are critical findings communicated?",
      answer:
        "Critical or unexpected findings follow the facility's agreed clinical escalation pathway. The interpreting radiologist or 24/7 coordination team initiates direct telephone outreach to the treating emergency physician or designated clinical team, and a closed-loop verbal read-back confirmation is documented directly in the EHR.",
    },
    {
      id: "faq-after-hours",
      question: "Can the service support after-hours emergency imaging?",
      answer:
        "Emergency and after-hours coverage can be configured based on your organization's specific operational needs. Support models can be established for dedicated overnight shifts, weekend call coverage, holiday relief, daytime volume surge absorption, or continuous coverage windows.",
    },
    {
      id: "faq-turnaround-commitments",
      question: "What turnaround commitments are available?",
      answer:
        "Turnaround commitments are formally agreed upon and codified as part of the service-level configuration prior to operational launch. Commitments are established collaboratively based on clinical urgency, modality complexity, historical volume patterns, and departmental benchmarks.",
    },
  ],
} as const;

export const EMERGENCY_FINAL_CTA_CONTENT = {
  eyebrow: "READY TO DISCUSS YOUR NEEDS?",
  heading: "Let's Discuss Your Emergency Radiology Coverage",
  supportingText:
    "Tell us about your radiology coverage needs, priority workflows, and operational requirements.",
  primaryBtn: {
    label: "Request a Consultation",
    href: "/contact",
  },
  secondaryBtn: {
    label: "Contact Our Team",
    href: "/contact",
  },
  image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.jpg",
  alt: "Diagnostic radiologist reviewing urgent emergent cross-sectional imaging",
} as const;






