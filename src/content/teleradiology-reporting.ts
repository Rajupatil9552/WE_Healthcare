/**
 * Content definition for Teleradiology Reporting Services page.
 * Route: /services/teleradiology-reporting
 *
 * NOTE: All copy adheres strictly to verified clinical descriptions.
 * No unverified statistics, invented certifications, or fabricated SLAs are included.
 */

// Temporary radiology placeholder imagery.
// Replace with approved production photography later.

export const TELERADIOLOGY_PAGE_METADATA = {
  title: "Teleradiology Services & Radiology Reporting | WE Healthcare",
  description:
    "Subspecialty teleradiology reporting support for U.S. hospitals, imaging centers, emergency departments, and healthcare networks.",
} as const;

export interface SectionHeader {
  badge: string;
  title: string;
  description: string;
}

export const HERO_CONTENT = {
  badge: "Teleradiology Reporting Services",
  title: "Subspecialty Teleradiology Reporting & Diagnostic Support",
  description:
    "Reliable, high-quality preliminary and final radiology reads for hospitals, imaging centers, emergency departments, and healthcare networks across the United States.",
  primaryCta: {
    label: "Request Consultation",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explore Coverage Models",
    href: "#coverage-models",
  },
  image: "/images/teleradiology-reporting/hero-radiologist-workstation.jpg",
  alt: "Board-certified radiologist analyzing diagnostic medical imaging at a multi-monitor diagnostic workstation",
  trustHighlights: [
    { title: "U.S. Board-Certified", desc: "ABR / AOBR certified diagnostic radiologists" },
    { title: "24/7/365 Availability", desc: "Continuous daytime, off-hours, and emergency coverage" },
    { title: "Flexible Reporting", desc: "Tailored preliminary & final-read clinical protocols" },
    { title: "Seamless Integration", desc: "Bi-directional PACS, RIS, and EHR interoperability" },
  ],
} as const;

export const REPORTING_SUPPORT_CONTENT = {
  header: {
    badge: "Reporting Support",
    title: "Comprehensive Reporting Support Across Every Shift",
    description:
      "Whether addressing routine overflow, seasonal backlog, or emergency night shifts, our clinical team extends your diagnostic capacity without operational friction.",
  },
  image: "/images/teleradiology-reporting/reporting-support-radiology-room.jpg",
  alt: "Clinical radiology reading suite equipped with diagnostic imaging workstations",
  supportModels: [
    {
      id: "daytime-overflow",
      title: "Routine Daytime & Overflow Support",
      description:
        "Augment your internal staff during peak reading hours to prevent study backlogs and maintain consistent reporting turnaround.",
      features: [
        "Capacity buffering during high outpatient volume",
        "Subspecialty study assignment",
        "Seamless integration with on-site worklists",
      ],
    },
    {
      id: "off-hours-coverage",
      title: "Overnight & Weekend Coverage",
      description:
        "Dependable off-hours coverage designed to relieve staff fatigue and ensure emergency imaging is evaluated promptly around the clock.",
      features: [
        "Uninterrupted 24/7/365 coverage schedule",
        "Emergency STAT read prioritization",
        "Direct radiologist-to-physician communication",
      ],
    },
    {
      id: "preliminary-final",
      title: "Preliminary & Final Interpretations",
      description:
        "Flexible diagnostic reporting models tailored to your institution’s medical bylaws, clinical protocols, and billing structures.",
      features: [
        "Rapid preliminary wet reads for acute triage",
        "Complete, structured final signed reports",
        "Customized facility reporting templates",
      ],
    },
    {
      id: "subspecialty-consultation",
      title: "Subspecialty Consultative Reads",
      description:
        "Direct access to fellowship-trained radiologists across complex neuro, musculoskeletal, body, and cardiothoracic cases.",
      features: [
        "Complex case secondary reviews",
        "Oncology and cross-sectional specialty reads",
        "Collaborative clinical dialogue on demand",
      ],
    },
  ],
} as const;

export const SUBSPECIALTY_COVERAGE_CONTENT = {
  header: {
    badge: "Subspecialties & Coverage",
    title: "Subspecialty Expertise Matched to Clinical Acuity",
    description:
      "Our radiologists bring specialized fellowship training across core imaging modalities, ensuring each study is interpreted with diagnostic precision.",
  },
  subspecialties: [
    {
      title: "Neuroradiology",
      modalities: "CT / MRI",
      description: "Interpretation of acute stroke, head trauma, spinal cord pathology, and complex intracranial disease.",
      image: "/images/teleradiology-reporting/subspecialty-mri.jpg",
      alt: "Diagnostic high-resolution MRI scan evaluation in neuroradiology",
    },
    {
      title: "Musculoskeletal (MSK)",
      modalities: "X-Ray / CT / MRI",
      description: "Specialized reads for sports medicine, joint arthrography, orthopedic trauma, and degenerative joint disease.",
      image: "/images/teleradiology-reporting/flexible-coverage-radiology.jpg",
      alt: "Radiologist reviewing musculoskeletal diagnostic images",
    },
    {
      title: "Body & Abdominal Imaging",
      modalities: "CT / MRI / Ultrasound",
      description: "Comprehensive evaluation of abdominal, pelvic, gastrointestinal, and oncologic cross-sectional studies.",
      image: "/images/teleradiology-reporting/workflow-radiology.jpg",
      alt: "Abdominal cross-sectional medical imaging displayed on diagnostic monitors",
    },
    {
      title: "Cardiothoracic Imaging",
      modalities: "CT / Chest X-Ray",
      description: "Evaluation of pulmonary parenchyma, mediastinal abnormalities, acute chest trauma, and cardiac CT studies.",
      image: "/images/teleradiology-reporting/final-cta-radiology.jpg",
      alt: "Cardiothoracic imaging evaluation on workstation",
    },
    {
      title: "Pediatric Radiology",
      modalities: "X-Ray / Ultrasound / MRI",
      description: "Pediatric-adapted diagnostic protocols respecting pediatric anatomy, development, and radiation sensitivity.",
      image: "/images/audiences/hospital.jpg",
      alt: "Pediatric and general healthcare hospital facility",
    },
    {
      title: "Emergency & Trauma",
      modalities: "Multimodal Emergency",
      description: "Time-critical assessment for acute polytrauma, acute abdomen, vascular emergencies, and critical patient care.",
      image: "/images/audiences/emergency-department.jpg",
      alt: "Emergency department clinical acute care imaging environment",
    },
  ],
  coverageModels: [
    {
      title: "Full Turnkey Coverage",
      tagline: "Comprehensive 24/7/365 diagnostic department support",
      points: [
        "Acts as your primary diagnostic imaging service",
        "Handles both routine outpatients and acute inpatient care",
        "Includes complete credentialing and quality assurance oversight",
      ],
    },
    {
      title: "Scheduled Shift Relief",
      tagline: "Targeted coverage for nights, weekends, and holidays",
      points: [
        "Protects on-site radiologists from burnout and excessive call",
        "Guarantees seamless handoffs at shift boundaries",
        "Flexible staffing scaled to your historical volume patterns",
      ],
    },
    {
      title: "Backlog & Overflow Support",
      tagline: "Elastic reading capacity for volume surges and leaves",
      points: [
        "Rapid ramp-up during sudden surges or physician leaves",
        "No minimum commitment or volume penalties",
        "Clear per-study or per-shift operational pricing models",
      ],
    },
  ],
} as const;

export const EXISTING_WORKFLOW_CONTENT = {
  header: {
    badge: "Technical Workflow",
    title: "Built Around Your Existing Workflow",
    description:
      "We integrate with your existing PACS, RIS, and EHR systems. Your technologists send studies exactly as they do today, with no disruptive proprietary software required.",
  },
  image: "/images/teleradiology-reporting/workflow-radiology.jpg",
  alt: "Connected diagnostic radiology workflow across hospital PACS and RIS systems",
  workflowSteps: [
    {
      step: "01",
      name: "Image Acquisition & Local Send",
      summary: "Modality sends DICOM images to your local PACS or directly to our secure DICOM gateway.",
      details: "Standard DICOM 3.0 protocol over TLS 1.3 encrypted VPN tunnel with automatic metadata preservation.",
    },
    {
      step: "02",
      name: "Automated Routing & Worklist Ingestion",
      summary: "Studies are normalized, prior studies are matched, and cases are routed to credentialed specialists.",
      details: "Intelligent subspecialty and state-license matching with automated notification of urgent clinical priors.",
    },
    {
      step: "03",
      name: "Diagnostic Interpretation & Verification",
      summary: "Board-certified radiologist reviews the complete imaging series and clinical requisition.",
      details: "Diagnostic DICOM viewing with voice recognition reporting aligned to your preferred clinical formatting.",
    },
    {
      step: "04",
      name: "Bi-directional HL7 Report Return",
      summary: "Signed final reports deliver automatically into your facility's EHR and local PACS archive.",
      details: "Standard HL7 ORU^R01 return, PDF report insertion, and automated verification confirmation.",
    },
  ],
  integrationPillars: [
    {
      title: "Zero Hardware Burden",
      description: "Cloud-native gateway or lightweight virtual appliance connects with any standard PACS/RIS.",
    },
    {
      title: "HIPAA & SOC2 Aligned",
      description: "End-to-end encryption in transit and at rest with strict audit logging and access controls.",
    },
    {
      title: "Preserved Facility Workflows",
      description: "Technologists maintain existing accession and scanning procedures with zero retraining required.",
    },
    {
      title: "Continuous 24/7 Monitoring",
      description: "Our technical operations center monitors transmission latency, gateway health, and HL7 flow 24/7.",
    },
  ],
} as const;

export const WHATS_INCLUDED_CONTENT = {
  header: {
    badge: "Service Features",
    title: "Everything Required for High-Performance Teleradiology",
    description:
      "A complete clinical partnership engineered to deliver accurate diagnostic reporting, streamlined communications, and operational peace of mind.",
  },
  features: [
    {
      title: "U.S. Board-Certified Interpretations",
      description: "Every study is read and signed by an ABR or AOBR certified radiologist licensed in your state.",
      icon: "ShieldCheck",
    },
    {
      title: "Structured Clinical Reports",
      description: "Clear, standardized report formats highlighting key findings, technique, and concise diagnostic impressions.",
      icon: "FileText",
    },
    {
      title: "Direct Radiologist Communication",
      description: "Immediate telephone access to the interpreting radiologist for clinical consultations or question clarification.",
      icon: "PhoneCall",
    },
    {
      title: "Closed-Loop Critical Findings",
      description: "Dedicated clinical coordinator alerts the referring care team immediately upon urgent or unexpected findings.",
      icon: "WarningCircle",
    },
    {
      title: "Comprehensive Quality Assurance",
      description: "Multilevel QA checks, systematic peer review sampling, and discrepancy tracking adhering to ACR guidelines.",
      icon: "CheckCircle",
    },
    {
      title: "Dedicated Account & IT Support",
      description: "Assigned account manager and 24/7 technical support desk assisting with onboarding and day-to-day operations.",
      icon: "Headset",
    },
  ],
} as const;

export const HOW_IT_WORKS_CONTENT = {
  header: {
    badge: "Onboarding & Implementation",
    title: "From Initial Setup to Live Reporting",
    description:
      "Our proven onboarding framework enables swift, secure implementation without disrupting your daily clinical workflow.",
  },
  steps: [
    {
      step: "01",
      title: "Workflow & Licensing Review",
      description: "We evaluate your imaging volume patterns, modality mix, credentialing requirements, and target turnaround times.",
      timeline: "Phase 1: Discovery & Scoping",
    },
    {
      step: "02",
      title: "Connectivity & Technical Integration",
      description: "Our IT team establishes secure DICOM/HL7 connections with your PACS/RIS, validates test studies, and configures reporting templates.",
      timeline: "Phase 2: Secure Setup & Testing",
    },
    {
      step: "03",
      title: "Medical Staff Credentialing",
      description: "We coordinate all provider licensing, hospital credentialing, and malpractice documentation through our dedicated medical staff office.",
      timeline: "Phase 3: Licensure & Credentialing",
    },
    {
      step: "04",
      title: "Go-Live & Ongoing Quality Review",
      description: "Seamless transition to live reading with active monitoring, regular performance reviews, and dedicated clinical support.",
      timeline: "Phase 4: Clinical Launch & Partnership",
    },
  ],
} as const;

export const CRITICAL_FINDINGS_CONTENT = {
  header: {
    badge: "Clinical Safety",
    title: "Rapid, Direct Communication for Critical Findings",
    description:
      "When unexpected or life-threatening pathology is discovered, our structured communication protocol ensures the treating provider is notified without delay.",
  },
  protocols: [
    {
      level: "Category 1 — Urgent / Critical",
      definition: "Findings requiring immediate medical intervention (e.g., acute intracranial hemorrhage, tension pneumothorax, aortic dissection).",
      action: "Direct telephonic contact with treating provider; closed-loop confirmation required within target clinical window.",
      color: "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400",
    },
    {
      level: "Category 2 — Priority / Emergent",
      definition: "Findings requiring prompt medical attention within hours (e.g., acute appendicitis, deep venous thrombosis, acute fracture).",
      action: "Direct phone contact or verified secure escalation to treating care team; documented confirmation in medical report.",
      color: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400",
    },
    {
      level: "Category 3 — Significant Incidental",
      definition: "Unexpected findings requiring scheduled outpatient follow-up (e.g., suspicious pulmonary nodule, unexpected mass).",
      action: "Flagged distinctly in report impression with clear follow-up recommendation guidelines highlighted.",
      color: "border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-400",
    },
  ],
  safeguards: [
    "24/7 Clinical Coordination Desk dedicated to facilitating physician contacts",
    "Closed-loop timestamped logging of recipient name, time, and read-back acknowledgment",
    "Report annotation documenting communication details directly within the patient permanent record",
    "Escalation protocols to administrative or charge staff if primary provider is initially unreachable",
  ],
} as const;

export const REPORTING_VISIBILITY_CONTENT = {
  header: {
    badge: "Operational Transparency",
    title: "Real-Time Visibility into Reporting Metrics",
    description:
      "Gain complete operational transparency with clear turnaround time tracking, case status visibility, and detailed volume analytics.",
  },
  metrics: [
    {
      label: "Turnaround Time Tracking",
      value: "Real-Time",
      description: "Continuous monitoring of study acquisition, transmission, and final report sign-off timestamps.",
    },
    {
      label: "Quality Assurance Concordance",
      value: "Multilevel QA",
      description: "Systematic peer review sampling and diagnostic agreement tracking aligned with ACR recommendations.",
    },
    {
      label: "Subspecialty Distribution",
      value: "Case-by-Case",
      description: "Detailed analytics on study modality mix, subspecialty volume trends, and peak service periods.",
    },
    {
      label: "Critical Alerts Log",
      value: "100% Documented",
      description: "Audit-ready historical logs of all physician-to-physician critical finding notifications.",
    },
  ],
} as const;

export const WHO_WE_SUPPORT_CONTENT = {
  header: {
    badge: "Facility Types",
    title: "Tailored Teleradiology for Diverse Healthcare Facilities",
    description:
      "Every healthcare setting faces distinct clinical pressures. Our service models adapt to your facility’s unique operational requirements.",
  },
  facilities: [
    {
      id: "hospitals",
      title: "Hospitals & Health Systems",
      tagline: "Scalable 24/7/365 inpatient and emergency diagnostic support",
      description:
        "Provide your medical staff with reliable subspecialty coverage, reduce on-call burden for hospital-employed radiologists, and guarantee rapid emergency reads.",
      image: "/images/audiences/hospital.jpg",
      alt: "Modern hospital and health system clinical facility exterior",
      highlights: [
        "Inpatient, outpatient, and emergency room coverage",
        "Subspecialty consultation across complex case mix",
        "Seamless integration with hospital EHR and enterprise PACS",
      ],
    },
    {
      id: "imaging-centers",
      title: "Outpatient Imaging Centers",
      tagline: "Consistent routine turnaround and specialized clinical reads",
      description:
        "Attract referring physicians with high-quality subspecialty reports across MRI, CT, and ultrasound, delivered with dependable, predictable turnaround.",
      image: "/images/audiences/imaging-center.jpg",
      alt: "Outpatient medical imaging center diagnostic suite",
      highlights: [
        "Specialized MSK, Neuro, and Body imaging reads",
        "Rapid turnaround supporting referring physician satisfaction",
        "Flexible scaling for volume spikes without fixed overhead",
      ],
    },
    {
      id: "emergency-departments",
      title: "Emergency Departments",
      tagline: "High-acuity STAT reporting for urgent clinical decisions",
      description:
        "Support emergency physicians with rapid diagnostic preliminary and final interpretations for trauma, acute stroke, and critical cardiopulmonary emergencies.",
      image: "/images/audiences/emergency-department.jpg",
      alt: "Hospital emergency department clinical triage and trauma setting",
      highlights: [
        "Immediate prioritization for emergency studies",
        "Direct phone access for urgent radiologist discussions",
        "Closed-loop critical findings notification protocols",
      ],
    },
    {
      id: "healthcare-networks",
      title: "Regional Healthcare Networks",
      tagline: "Centralized teleradiology bridging multi-site clinical operations",
      description:
        "Standardize diagnostic interpretation quality and reporting templates across regional clinics, critical access hospitals, and ambulatory care centers.",
      image: "/images/audiences/healthcare-network.jpg",
      alt: "Regional healthcare network facilities and collaborative clinical team",
      highlights: [
        "Unified worklist and cross-facility routing",
        "Standardized reporting templates across all network locations",
        "Consolidated operational reporting and volume visibility",
      ],
    },
  ],
} as const;

export const FAQ_CONTENT = {
  header: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    description: "Common questions regarding our teleradiology reporting services, technical integration, and clinical processes.",
  },
  items: [
    {
      question: "What turnaround times can our facility expect?",
      answer:
        "Turnaround times are tailored to clinical urgency. Emergency and STAT studies receive prioritized rapid interpretation, while routine inpatient and outpatient studies are delivered within agreed service windows (typically 12 to 24 hours).",
    },
    {
      question: "How does integration with our existing PACS and RIS work?",
      answer:
        "We establish standard, encrypted DICOM and HL7 connections directly with your existing infrastructure via secure VPN or cloud gateway. Your technologists send studies exactly as they do currently, and signed reports return automatically into your local systems.",
    },
    {
      question: "Are your radiologists U.S. board-certified and licensed in our state?",
      answer:
        "Yes. All interpreting radiologists are U.S. board-certified (ABR or AOBR) and individually licensed in the state where your patient underwent the examination, fulfilling all local hospital medical staff bylaws.",
    },
    {
      question: "What is the protocol when a critical finding is identified?",
      answer:
        "When an acute or life-threatening finding is detected, our radiologist initiates direct phone contact with the referring care team. A dedicated clinical coordination desk confirms closed-loop communication, and timestamped documentation is incorporated into the diagnostic report.",
    },
    {
      question: "Can our facility utilize teleradiology support for overflow or vacation coverage only?",
      answer:
        "Yes. We offer flexible service models ranging from full 24/7/365 coverage to scheduled night and weekend shifts, seasonal support, or on-demand volume overflow coverage without punitive minimum volume mandates.",
    },
    {
      question: "How do we get started with onboarding and credentialing?",
      answer:
        "Our onboarding team manages the complete process, including PACS/RIS connectivity testing, report template alignment, and provider credentialing documentation, targeting a smooth and timely clinical go-live.",
    },
  ],
} as const;

export const FINAL_CTA_CONTENT = {
  badge: "Get Started",
  title: "Ready to Strengthen Your Radiology Reporting Capacity?",
  description:
    "Contact our clinical partnership team to discuss your facility's coverage requirements, turnaround targets, and technical workflow integration.",
  primaryCta: {
    label: "Schedule Consultation",
    href: "/contact",
  },
  secondaryCta: {
    label: "Request a Demo",
    href: "/request-a-demo",
  },
  image: "/images/teleradiology-reporting/final-cta-radiology.jpg",
  alt: "Healthcare leadership and radiology team discussing clinical teleradiology partnership",
} as const;
