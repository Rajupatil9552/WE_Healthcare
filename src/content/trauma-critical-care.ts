/**
 * Content definition for Trauma and Critical Care Imaging page.
 * Route: /services/trauma-critical-care
 *
 * NOTE: Strictly adheres to approved clinical descriptions.
 * No unsupported turnaround guarantees, fabricated SLAs, or invented customer statistics.
 */

export const TRAUMA_PAGE_METADATA = {
  title: "Trauma & Critical Care Teleradiology | WE Healthcare",
  description:
    "Priority radiology reporting support for trauma and critical care imaging, including multi-study workflows and direct clinical communication.",
  canonical: "/services/trauma-critical-care",
} as const;

export const TRAUMA_HERO_CONTENT = {
  eyebrow: "TRAUMA & CRITICAL CARE IMAGING",
  heading: "Trauma and Critical Care Imaging",
  subheading: "Priority radiology support for trauma and critical care workflows.",
  body: "Trauma and critical care environments can generate high-priority imaging across multiple studies and modalities. WE Healthcare provides reporting support designed around defined priority workflows, communication requirements, and capacity needs.",
  // Internal verification note - do not display to public visitors
  verificationNote: "[VERIFY: trauma-specific capability]",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  image: "/images/trauma-critical-care/hero-trauma-radiology.webp",
  alt: "Diagnostic radiologist reviewing multi-study trauma CT imaging across multiple medical displays in a high-acuity reading room",
  // Conceptual multi-study workup illustrating concurrent trauma handling
  multiStudies: [
    {
      id: "study-ct-head",
      modality: "CT",
      name: "CT HEAD",
      region: "Acute Neuro",
      status: "Priority",
      accent: "sky",
    },
    {
      id: "study-ct-chest",
      modality: "CT",
      name: "CT CHEST",
      region: "Cardiothoracic",
      status: "Priority",
      accent: "sky",
    },
    {
      id: "study-ct-abdomen",
      modality: "CT",
      name: "CT ABDOMEN",
      region: "Abdominopelvic",
      status: "Review",
      accent: "slate",
    },
    {
      id: "study-xr",
      modality: "XR",
      name: "X-RAY",
      region: "Trauma Skeletal",
      status: "Review",
      accent: "slate",
    },
  ],
} as const;

export const HIGH_PRESSURE_ENVIRONMENTS_CONTENT = {
  eyebrow: "BUILT FOR HIGH-PRESSURE IMAGING ENVIRONMENTS",
  heading: "Built for High-Pressure Imaging Environments",
  statement: [
    "MULTIPLE STUDIES.",
    "CHANGING PRIORITIES.",
    "HIGH-PRESSURE IMAGING.",
  ],
  supportingCopy:
    "Trauma and critical care teams may need radiology support across multiple studies, changing priorities, overnight volume, and periods of increased demand.",
  microcopyLabel: "COORDINATED RADIOLOGY REVIEW",
  studies: [
    {
      id: "ct-head",
      modality: "CT",
      name: "CT HEAD",
      region: "Neuro / Calvarium",
      description: "Axial non-contrast & angiographic vascular survey",
      image: "/images/trauma-critical-care/trauma-multi-study-head-ct.webp",
      alt: "Axial brain CT cross-sections showing acute neuro trauma evaluation",
    },
    {
      id: "ct-chest",
      modality: "CT",
      name: "CT CHEST",
      region: "Cardiothoracic / Vascular",
      description: "Pneumothorax, parenchymal contusion & mediastinal integrity",
      image: "/images/trauma-critical-care/trauma-multi-study-chest-ct.webp",
      alt: "Thoracic CT scan showing high-acuity chest trauma assessment",
    },
    {
      id: "ct-abdomen",
      modality: "CT",
      name: "CT ABDOMEN",
      region: "Abdominopelvic Organs",
      description: "Solid organ laceration & retroperitoneal evaluation",
      image: "/images/trauma-critical-care/trauma-multi-study-abdomen-ct.webp",
      alt: "Abdominal CT scan displaying solid organ trauma cross-section",
    },
    {
      id: "xray",
      modality: "XR",
      name: "X-RAY",
      region: "Trauma Skeletal / Spine",
      description: "Rapid cervical spine & extremity skeletal series",
      image: "/images/trauma-critical-care/trauma-multi-study-xray.webp",
      alt: "Diagnostic skeletal radiography demonstrating trauma alignment evaluation",
    },
  ],
  reviewPoint: {
    title: "RADIOLOGY REVIEW",
    subtitle: "Coordinated Interpretation",
    description: "Concurrent multi-study cross-correlation performed by board-certified diagnostic radiologists.",
    statusBadge: "Coordinated Review",
  },
} as const;

export const OPERATIONAL_NEEDS_INCLUDED_CONTENT = {
  eyebrow: "OPERATIONAL ARCHITECTURE",
  heading: "Support for Complex Trauma and Critical Care Workflows",
  supportingText:
    "A unified operational framework aligning facility-specific trauma demands with prioritized teleradiology workflows, capacity buffers, and direct clinical communication pathways.",
  needsSection: {
    eyebrow: "COMMON OPERATIONAL NEEDS",
    items: [
      {
        number: "01",
        id: "trauma-center-coverage",
        title: "Trauma Center Coverage Requirements",
        description:
          "Coverage models structured around facility-established trauma activation guidelines and operational shifts.",
      },
      {
        number: "02",
        id: "multi-study-workups",
        title: "Multi-Study Trauma Workups",
        description:
          "Concurrent multi-region polytrauma studies requiring coordinated intake and multi-series cross-correlation.",
      },
      {
        number: "03",
        id: "overnight-volume",
        title: "Overnight Trauma Volume",
        description:
          "Dedicated off-hours and nocturnal diagnostic support for high-acuity admissions and night call demands.",
      },
      {
        number: "04",
        id: "critical-care-imaging",
        title: "Critical Care Imaging",
        description:
          "Time-sensitive imaging interpretation for intensive care units and urgent inpatient escalations.",
      },
      {
        number: "05",
        id: "surge-capacity",
        title: "Surge Capacity",
        description:
          "Capacity arrangements designed to absorb sudden influxes in acute imaging volume during peak departmental demands.",
      },
      {
        number: "06",
        id: "priority-workflows",
        title: "Priority Workflows",
        description:
          "Configured study priority logic to appropriately differentiate high-acuity trauma cases from routine imaging queues.",
      },
    ],
  },
  includedSection: {
    eyebrow: "WHAT'S INCLUDED",
    items: [
      {
        id: "priority-trauma-queue",
        title: "Priority Trauma Queue",
        description:
          "Dedicated priority worklist logic flagging incoming trauma imaging for accelerated assignment.",
        badge: "Routing Logic",
      },
      {
        id: "multi-study-batch-handling",
        title: "Multi-Study Batch Handling",
        description:
          "Grouped study handling ensuring all anatomical series for a trauma patient are reviewed with clinical context.",
        badge: "Batch Ingestion",
      },
      {
        id: "direct-communication",
        title: "Direct Communication With the Trauma Team",
        description:
          "Defined direct physician communication channels for immediate discussion of critical imaging findings.",
        verificationNote: "[VERIFY: direct communication with trauma team]",
        badge: "Clinical Outreach",
      },
      {
        id: "surge-capacity-protocol",
        title: "Surge Capacity Protocol",
        description:
          "Scalable operational protocols established to absorb sudden spikes in high-acuity trauma caseload.",
        verificationNote: "[VERIFY: surge capacity protocol]",
        badge: "Capacity Buffer",
      },
      {
        id: "critical-findings-escalation",
        title: "Critical Findings Escalation",
        description:
          "Documented closed-loop communication pathway ensuring life-sensitive findings reach treating clinicians promptly.",
        badge: "Closed-Loop Escalation",
      },
    ],
  },
  conceptualConnector: [
    { label: "OPERATIONAL NEEDS", sub: "Facility Demands" },
    { label: "CAPACITY", sub: "Dynamic Scalability" },
    { label: "RADIOLOGY SUPPORT", sub: "Clinical Interpretation" },
  ],
} as const;

export const TRAUMA_HOW_IT_WORKS_CONTENT = {
  eyebrow: "HOW IT WORKS",
  heading: "From Multiple Trauma Studies to Coordinated Clinical Communication",
  supportingText:
    "The workflow can be configured around facility requirements, helping organize priority studies, multi-study routing, radiologist review, and clinical communication.",
  disclaimer: "The exact workflow is configured around facility requirements.",
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

export const TRAUMA_PROTOCOL_CRITICAL_CONTENT = {
  protocolSection: {
    eyebrow: "PROTOCOL ALIGNMENT",
    heading: "Built Around Your Existing Trauma and Critical Care Process",
    content:
      "Protocols should align with the facility’s existing trauma and critical-care processes rather than impose a standard workflow.",
    verificationNote: "[VERIFY: confirm protocol customization capability]",
    governanceNote:
      "Workflow configurations, credentialing rules, and communication parameters are established in consultation with facility leadership prior to clinical launch.",
  },
  criticalSection: {
    eyebrow: "CRITICAL FINDINGS",
    heading: "Clear Communication for Critical Findings",
    content:
      "Critical findings are communicated through the agreed escalation process and documented according to the client’s requirements.",
    verificationNote: "[VERIFY: exact protocol]",
  },
  frameworkSteps: [
    {
      step: "01",
      id: "facility-requirements",
      label: "FACILITY REQUIREMENTS",
      detail: "Client-established clinical escalation criteria and contact rosters",
    },
    {
      step: "02",
      id: "protocol-alignment",
      label: "PROTOCOL ALIGNMENT",
      detail: "Configured teleradiology pathways matching trauma activation tiers",
    },
    {
      step: "03",
      id: "escalation",
      label: "ESCALATION",
      detail: "Rapid identification and immediate triggering of escalation protocol",
    },
    {
      step: "04",
      id: "communication",
      label: "COMMUNICATION",
      detail: "Direct verbal read-back with treating trauma physician or care team",
    },
    {
      step: "05",
      id: "documentation",
      label: "DOCUMENTATION",
      detail: "Closed-loop verbal confirmation recorded in final radiology report",
    },
  ],
} as const;

export const TRAUMA_FAQ_CONTENT = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "faq-01",
      number: "01",
      question: "Can teleradiology support trauma imaging?",
      answer:
        "Trauma and critical-care imaging workflows can be supported through defined priority workflows, communication requirements, and capacity needs, subject to the facility's requirements and verified capabilities.",
    },
    {
      id: "faq-02",
      number: "02",
      question: "Can multiple trauma studies be handled together?",
      answer:
        "The workflow can support multi-study trauma workups through defined batch routing and priority review processes, subject to the configured workflow.",
    },
    {
      id: "faq-03",
      number: "03",
      question: "Can overnight trauma volume be supported?",
      answer:
        "Overnight trauma volume can be incorporated into the workflow based on the facility's coverage and operational requirements.",
    },
    {
      id: "faq-04",
      number: "04",
      question: "How are priority studies routed?",
      answer:
        "Priority studies can be routed according to the facility's defined priority and workflow requirements.",
    },
    {
      id: "faq-05",
      number: "05",
      question: "How are critical findings communicated?",
      answer:
        "Critical findings are communicated through the agreed escalation process and documented according to the client's requirements.",
    },
    {
      id: "faq-06",
      number: "06",
      question: "Can the workflow align with facility requirements?",
      answer:
        "The workflow should align with the facility's existing trauma and critical-care processes rather than impose a standard workflow.",
    },
  ],
} as const;

export const TRAUMA_FINAL_CTA_CONTENT = {
  eyebrow: "READY TO DISCUSS YOUR TRAUMA WORKFLOW?",
  heading: "Let's Discuss Your Radiology Coverage Needs",
  body:
    "Tell us about your radiology coverage needs and the trauma and critical-care imaging workflow you need to support.",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  image: "/images/trauma-critical-care/trauma-cta-radiology.webp",
  alt: "Diagnostic radiologist reviewing acute trauma imaging on medical reading displays",
} as const;
