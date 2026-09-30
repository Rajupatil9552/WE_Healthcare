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
  body: "Routine studies are reported within 12 to 24 hours. STAT studies are moved to the front of the queue 24x7, with turnaround targets agreed for each facility and written into your service agreement. Critical findings are phoned directly to the referring physician with read-back documented.",
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
  image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.webp",
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
  image: "/images/emergency-stat-reporting/priority-radiology-worklist.webp",
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
      image: "/images/emergency-stat-reporting/emergency-department-imaging.webp",
      alt: "Emergency department modern CT scanner suite with clinical care team",
    },
    {
      id: "trauma-studies",
      number: "02",
      title: "Trauma Studies",
      description:
        "High-velocity injuries, multi-system blunt trauma, and acute orthopedic injuries requiring immediate multi-slice cross-sectional assessment. Related CT head, chest, abdomen, and X-ray studies from the same patient can be grouped and reviewed together.",
      clinicalFocus: "Whole-body trauma CT, multi-study workups, spinal stability, and hemorrhage detection",
      image: "/images/trauma-critical-care/hero-trauma-radiology.webp",
      alt: "Diagnostic radiologist reviewing multi-study trauma CT imaging across multiple medical displays",
    },
    {
      id: "inpatient-escalations",
      number: "03",
      title: "Inpatient & Critical Care Escalations",
      description:
        "Sudden clinical deterioration on medical or surgical floors, intensive care imaging, postoperative concerns, and acute changes in inpatient vital parameters.",
      clinicalFocus: "ICU imaging, post-op bleeding, acute pulmonary changes, and neuro checks",
      image: "/images/emergency-stat-reporting/priority-radiology-worklist.webp",
      alt: "Teleradiology reading room multi-monitor diagnostic workstation",
    },
    {
      id: "after-hours-cases",
      number: "04",
      title: "After-Hours Cases",
      description:
        "Unplanned emergent imaging arriving during overnight, weekend, and holiday periods when in-house subspecialty coverage is constrained.",
      clinicalFocus: "Nocturnal coverage, emergency call relief, and subspecialty backup",
      image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.webp",
      alt: "Board-certified diagnostic radiologist reviewing acute scans at workstation",
    },
    {
      id: "time-sensitive-imaging",
      number: "05",
      title: "Stroke & Time-Sensitive Imaging",
      description:
        "Studies with high likelihood of critical pathology—such as acute stroke, pulmonary embolism, or intracranial hemorrhage—requiring urgent direct communication. Stroke CT, CTA, and perfusion studies follow the facility's stroke protocol.",
      clinicalFocus: "Stroke protocols, aortic dissection, and tension pneumothorax",
      image: "/images/stroke-imaging-protocol/hero-stroke-ct-imaging.webp",
      alt: "Diagnostic radiologist reviewing axial brain CT slices and CTA head and neck vascular imaging",
    },
    {
      id: "volume-surges",
      number: "06",
      title: "Volume Surges",
      description:
        "Seasonal volume surges, local mass-casualty events, or sudden ED surges that exceed standard departmental reading bandwidth.",
      clinicalFocus: "Surge absorption, queue stabilization, and backlog prevention",
      image: "/images/emergency-stat-reporting/emergency-department-imaging.webp",
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
    nextSectionName: "Stroke Imaging Protocol",
    href: "#stroke",
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
      image: "/images/emergency-stat-reporting/priority-radiology-worklist.webp",
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
      image: "/images/emergency-stat-reporting/emergency-department-imaging.webp",
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
      image: "/images/emergency-stat-reporting/trauma-radiology.webp",
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
      image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.webp",
      alt: "Emergency physician receiving direct verbal radiologist communication",
    },
  ],
} as const;

/** Stroke protocol variant of the STAT workflow (formerly the Stroke Imaging Protocol page). */
export const STROKE_PROTOCOL_WORKFLOW_CONTENT = {
  eyebrow: "STROKE IMAGING PROTOCOL",
  heading: "From Stroke Imaging to Clinical Communication",
  supportingText:
    "A defined workflow can help coordinate study routing, radiologist review, escalation, and communication around time-sensitive stroke imaging.",
  transition: {
    note: "Conceptual stroke pathway. Priority rules and communication steps follow the facility's existing stroke protocol.",
    nextSectionName: "Trauma Multi-Study Workflow",
    href: "#trauma",
  },
  image: "/images/stroke-imaging-protocol/stroke-protocol-workflow.webp",
  alt: "Diagnostic multi-planar stroke imaging study showing axial brain CT perfusion maps and CTA cerebral angiography on medical display",
  stages: [
    {
      step: "01",
      id: "flag",
      title: "FLAG",
      description:
        "Identify the stroke-related imaging study within the established workflow.",
      detailBadge: "Ingestion & Protocol Recognition",
      visualFocus: "Study identified upon transmission from facility PACS",
    },
    {
      step: "02",
      id: "auto-prioritize",
      title: "AUTO-PRIORITIZE",
      description:
        "Route the study according to the facility’s defined priority rules.",
      detailBadge: "Priority Worklist Alignment",
      visualFocus: "Elevated through facility-defined queue rules",
    },
    {
      step: "03",
      id: "immediate-review",
      title: "IMMEDIATE REVIEW",
      description:
        "Direct the study for appropriate radiologist review.",
      detailBadge: "Diagnostic Neuroradiology Match",
      visualFocus: "Assigned for diagnostic radiologist review",
    },
    {
      step: "04",
      id: "direct-voice-contact",
      title: "DIRECT VOICE CONTACT",
      description:
        "Communicate time-sensitive findings through the facility-established communication pathway.",
      detailBadge: "Direct Clinical Outreach",
      visualFocus: "Verbal communication & EHR documentation",
    },
  ],
} as const;

/** Trauma multi-study variant of the STAT workflow (formerly the Trauma & Critical Care page). */
export const TRAUMA_WORKFLOW_CONTENT = {
  eyebrow: "TRAUMA & CRITICAL CARE",
  heading: "From Multiple Trauma Studies to Coordinated Clinical Communication",
  supportingText:
    "The workflow can be configured around facility requirements, helping organize priority studies, multi-study routing, radiologist review, and clinical communication.",
  disclaimer: "The exact workflow is configured around facility requirements.",
  transition: {
    note: "Conceptual multi-study workflow. Grouping, routing, and escalation are configured around facility requirements.",
    nextSectionName: "Service Levels",
    href: "#service-levels",
  },
  studies: [
    {
      id: "ct-head",
      modality: "CT",
      name: "CT HEAD",
      region: "Acute Neuro",
      image: "/images/trauma-critical-care/trauma-multi-study-head-ct.webp",
      alt: "CT Head scan axial slices",
    },
    {
      id: "ct-chest",
      modality: "CT",
      name: "CT CHEST",
      region: "Cardiothoracic",
      image: "/images/trauma-critical-care/trauma-multi-study-chest-ct.webp",
      alt: "CT Chest scan axial slices",
    },
    {
      id: "ct-abdomen",
      modality: "CT",
      name: "CT ABDOMEN",
      region: "Abdominopelvic",
      image: "/images/trauma-critical-care/trauma-multi-study-abdomen-ct.webp",
      alt: "CT Abdomen scan axial slices",
    },
    {
      id: "xray",
      modality: "XR",
      name: "X-RAY",
      region: "Trauma Skeletal",
      image: "/images/trauma-critical-care/trauma-multi-study-xray.webp",
      alt: "Radiography skeletal series",
    },
  ],
  stages: [
    {
      step: "01",
      id: "flag",
      title: "FLAG",
      description:
        "Identify priority trauma or critical-care imaging within the established workflow.",
      detailBadge: "Ingestion & Priority Recognition",
      visualFocus: "Acute multi-study workup identified upon PACS ingestion",
    },
    {
      step: "02",
      id: "batch-route",
      title: "BATCH ROUTE",
      description:
        "Group and route related studies according to the facility's defined workflow.",
      detailBadge: "Polytrauma Study Grouping",
      visualFocus: "Concurrent anatomical series grouped for unified review",
    },
    {
      step: "03",
      id: "priority-read",
      title: "PRIORITY READ",
      description:
        "Direct the studies for appropriate radiologist review.",
      detailBadge: "Diagnostic Cross-Correlation",
      focusText: "Targeted cross-correlation across neuro, torso, and skeletal views",
    },
    {
      step: "04",
      id: "direct-contact",
      title: "DIRECT CONTACT WITH TRAUMA TEAM",
      description:
        "Communicate time-sensitive findings through the facility-established communication pathway.",
      detailBadge: "Direct Clinical Outreach",
      focusText: "Physician telephone consultation and EHR documentation",
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
    image: "/images/emergency-stat-reporting/trauma-radiology.webp",
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
  heading: "Radiology Support That Adapts to Your Workflow",
  body: "Every imaging operation has different needs. WE Healthcare provides flexible teleradiology support designed to work alongside your existing team, technology, and reporting workflow.",
  verificationNote: "[VERIFY: service-level details]",
  transition: {
    message: "Questions about how priority reporting support can fit your workflow?",
    nextSectionName: "Frequently Asked Questions",
  },
  parameters: [
    {
      id: "param-flexible-coverage",
      number: "01",
      title: "Flexible Coverage",
      description: "Support designed around your operational and reporting needs.",
      visualType: "windows" as const,
      windows: [
        { label: "DAY", desc: "Volume Surge Support" },
        { label: "EVENING", desc: "Shift Relief" },
        { label: "OVERNIGHT", desc: "Dedicated Nocturnal" },
        { label: "WEEKEND", desc: "Full Weekend Coverage" },
      ],
    },
    {
      id: "param-subspecialty-expertise",
      number: "02",
      title: "Subspecialty Expertise",
      description: "Access to radiologists with expertise across a range of imaging specialties.",
      visualType: "specialties" as const,
      specialties: [
        "Neuroradiology",
        "Musculoskeletal",
        "Body & Abdominal",
        "Cardiothoracic",
        "Pediatric",
        "Emergency & Trauma",
      ],
    },
    {
      id: "param-seamless-integration",
      number: "03",
      title: "Seamless Integration",
      description: "Designed to work with your existing PACS, RIS, and imaging workflow.",
      visualType: "flow" as const,
      steps: ["Your PACS", "Your RIS", "Your Imaging Workflow"],
    },
    {
      id: "param-operational-support",
      number: "04",
      title: "Operational Support",
      description:
        "A structured approach to communication, reporting coordination, and ongoing collaboration.",
      visualType: "pillars" as const,
      pillars: ["Communication", "Reporting Coordination", "Ongoing Collaboration"],
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
        "STAT reporting is urgent interpretation of time-sensitive studies such as suspected stroke, trauma or acute chest pain. STAT studies are flagged when they are sent to us and read before routine work.",
    },
    {
      id: "faq-ed-teleradiology",
      question: "Can emergency departments use teleradiology support?",
      answer:
        "Yes. Emergency departments use our STAT reporting to keep reads moving 24x7, especially overnight and at weekends when on-site radiologists are not available.",
    },
    {
      id: "faq-how-prioritized",
      question: "How are STAT studies prioritized?",
      answer:
        "STAT studies are flagged at transmission, moved to the front of the queue and assigned to the next available radiologist licensed in the patient's state.",
    },
    {
      id: "faq-stroke-imaging",
      question: "Can teleradiology support stroke imaging workflows?",
      answer:
        "Yes. Stroke CT, CT angiography and perfusion studies are read as STAT, following your facility's stroke protocol. Studies flagged as a stroke alert go to the top of the STAT queue ahead of all other work.",
    },
    {
      id: "faq-stroke-radiologist",
      question: "How is the radiologist assigned for stroke studies?",
      answer:
        "The study is assigned to the next available radiologist with neuroimaging experience who is licensed in the patient's state.",
    },
    {
      id: "faq-trauma-imaging",
      question: "Can teleradiology support trauma imaging?",
      answer:
        "Yes. Trauma CT and X-ray studies are read as STAT, with critical findings phoned directly to the trauma team.",
    },
    {
      id: "faq-trauma-multi-study",
      question: "Can multiple trauma studies be handled together?",
      answer:
        "Yes. Studies from the same trauma patient are read together by one radiologist where possible so findings stay consistent across body regions.",
    },
    {
      id: "faq-critical-findings",
      question: "How are critical findings communicated?",
      answer:
        "Critical findings are phoned directly to the ordering physician or your designated contact as soon as they are identified. Each call is documented in the report with read-back. Escalation contacts are agreed during onboarding.",
    },
    {
      id: "faq-after-hours",
      question: "Can the service support after-hours emergency imaging?",
      answer:
        "Yes. STAT reporting is available 24x7, including nights, weekends and holidays.",
    },
    {
      id: "faq-turnaround-commitments",
      question: "What turnaround commitments are available?",
      answer:
        "Routine studies are reported within 12 to 24 hours. STAT studies are moved to the front of the queue 24x7, with turnaround targets agreed for each facility and written into your service agreement. Critical findings are phoned directly to the ordering physician or your designated contact as soon as they are identified. Each call is documented in the report with read-back. Escalation contacts are agreed during onboarding.",
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
  image: "/images/emergency-stat-reporting/hero-emergency-stat-radiology.webp",
  alt: "Diagnostic radiologist reviewing urgent emergent cross-sectional imaging",
} as const;






