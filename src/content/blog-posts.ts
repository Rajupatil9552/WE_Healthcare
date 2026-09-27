import type { BlogAuthor, BlogCategory, BlogPost } from "@/lib/blog/types";

/**
 * PLACEHOLDER blog data. Dummy posts for building the layout until the admin
 * panel / CMS is connected (see lib/blog). Delete this file at that point.
 */

const CATEGORIES = {
  coverage: { slug: "coverage", name: "Coverage" },
  workflow: { slug: "workflow", name: "Workflow" },
  clinical: { slug: "clinical", name: "Clinical" },
  quality: { slug: "quality", name: "Quality" },
  technology: { slug: "technology", name: "Technology" },
  guides: { slug: "guides", name: "Guides" },
} satisfies Record<string, BlogCategory>;

const EDITORIAL: BlogAuthor = { name: "WE Healthcare Editorial Team", role: "Teleradiology & Operations" };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "teleradiology-overnight-weekend-coverage",
    title: "How Teleradiology Supports Overnight and Weekend Radiology Coverage",
    excerpt:
      "After-hours imaging does not slow down when the reading room empties. Here is how remote reporting helps hospitals keep coverage consistent overnight and at weekends.",
    cover: {
      src: "/images/overnight-weekend-coverage/morning-radiology-handoff.webp",
      alt: "Two clinicians reviewing a radiology worklist together at a workstation",
    },
    category: CATEGORIES.coverage,
    tags: ["After-hours", "Hospitals", "Coverage"],
    author: EDITORIAL,
    publishedAt: "2026-09-18T09:00:00Z",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Emergency departments, inpatient units, and trauma teams generate imaging around the clock. For many hospitals the challenge is not the daytime workload but keeping the same reporting standard at 2 a.m. on a Sunday.",
      },
      { type: "heading", text: "The after-hours coverage gap" },
      {
        type: "paragraph",
        text: "In-house radiologists cannot be on site every hour of every day without burning out. Relying on on-call rotations alone can stretch turnaround times and put pressure on the morning team, who inherit whatever was not read overnight.",
      },
      {
        type: "list",
        items: [
          "Emergency and inpatient studies continue to arrive overnight",
          "On-call fatigue affects both staff wellbeing and consistency",
          "Unread overnight studies become the next morning's backlog",
        ],
      },
      { type: "heading", text: "How remote reporting fills the gap" },
      {
        type: "paragraph",
        text: "A teleradiology partner reads studies from outside the hospital, using secure access to the imaging and reporting systems already in place. Coverage can be scheduled for nights only, weekends only, holidays, or any mix that matches the hospital's staffing plan.",
      },
      {
        type: "callout",
        title: "Tip",
        text: "Define coverage windows by the hour, not just by shift name. 'Nights' means different things in different departments.",
      },
      { type: "heading", text: "Making the morning handoff smooth" },
      {
        type: "paragraph",
        text: "Good after-hours coverage ends with a clear handoff: what was read, what was escalated, and anything that needs follow-up. Agreeing this format up front keeps the day team from repeating work.",
      },
      {
        type: "quote",
        text: "The best overnight coverage is the kind the morning team barely notices, because nothing is waiting for them.",
      },
      { type: "heading", text: "Questions to settle before you start" },
      {
        type: "list",
        ordered: true,
        items: [
          "Which modalities and study types are in scope after hours?",
          "What turnaround expectations apply to STAT versus routine studies?",
          "Who is contacted for critical findings, and how?",
          "How are preliminary and final reports handled?",
        ],
      },
    ],
  },
  {
    slug: "managing-radiology-backlog-overflow-reporting",
    title: "Managing Radiology Backlogs: A Practical Guide to Overflow Reporting",
    excerpt:
      "Volume spikes, staff absences, and new service lines can all leave studies waiting. A structured overflow model keeps the worklist moving without overloading your team.",
    cover: {
      src: "/images/overflow-backlog-reporting/worklist-backlog.webp",
      alt: "Radiologist reviewing chest CT images with a busy worklist on a side monitor",
    },
    category: CATEGORIES.workflow,
    tags: ["Overflow", "Backlog", "Worklist"],
    author: EDITORIAL,
    publishedAt: "2026-09-04T09:00:00Z",
    content: [
      {
        type: "paragraph",
        text: "Backlogs rarely have a single cause. A radiologist on leave, a new outpatient contract, or a seasonal surge can each push the worklist beyond what the in-house team can clear in a normal day.",
      },
      { type: "heading", text: "Spotting a backlog early" },
      {
        type: "list",
        items: [
          "Routine studies waiting longer than your usual turnaround target",
          "Referring clinicians chasing reports more often",
          "Radiologists regularly reading past the end of their shift",
        ],
      },
      { type: "heading", text: "Building an overflow model" },
      {
        type: "paragraph",
        text: "Overflow reporting routes a defined share of studies to an external team when volume passes a threshold. The rules can be based on study age, modality, or simply the number of unread studies on the list.",
      },
      {
        type: "callout",
        title: "Keep it rule-based",
        text: "Clear routing rules make overflow predictable for everyone: which studies go out, when, and who owns follow-up.",
      },
      { type: "heading", text: "Prioritizing what gets read first" },
      {
        type: "paragraph",
        text: "Not every study in a backlog carries the same urgency. Prioritize by clinical need first, then by age, so that time-sensitive studies are never stuck behind routine follow-ups.",
      },
      { type: "heading", text: "Measuring whether it is working" },
      {
        type: "paragraph",
        text: "Track the size and age of the worklist week by week. A good overflow arrangement should bring both back within target and keep them there, rather than just clearing a one-off spike.",
      },
    ],
  },
  {
    slug: "stroke-imaging-turnaround-time",
    title: "Why Turnaround Time Matters in Stroke Imaging",
    excerpt:
      "In suspected stroke, imaging drives treatment decisions. A look at how reporting workflows can be structured around time-sensitive neuro studies.",
    cover: {
      src: "/images/stroke-imaging-protocol/hero-stroke-ct-imaging.webp",
      alt: "Radiologist reviewing CT brain and CT angiography images on dual monitors",
    },
    category: CATEGORIES.clinical,
    tags: ["Stroke", "Neuro", "STAT"],
    author: EDITORIAL,
    publishedAt: "2026-08-21T09:00:00Z",
    content: [
      {
        type: "paragraph",
        text: "When a patient arrives with suspected stroke, the imaging team is part of a tightly timed pathway. The report is one of the inputs the treating team relies on, so how it is prioritized and communicated matters.",
      },
      { type: "heading", text: "Where imaging sits in the stroke pathway" },
      {
        type: "paragraph",
        text: "Protocols vary by facility, but commonly include non-contrast CT, CT angiography, and sometimes perfusion imaging. Each needs to be recognized as a stroke study the moment it reaches the worklist.",
      },
      { type: "heading", text: "Designing the workflow around speed" },
      {
        type: "list",
        items: [
          "Flag stroke protocol studies so they move to the top of the worklist",
          "Agree how preliminary findings are communicated to the stroke team",
          "Make sure prior imaging is available to the reading radiologist",
          "Document the escalation path for time-critical findings",
        ],
      },
      {
        type: "callout",
        title: "Note",
        text: "Turnaround expectations for stroke studies should be agreed with each facility and reflected in the service arrangement.",
      },
      { type: "heading", text: "Reviewing performance" },
      {
        type: "paragraph",
        text: "Regularly reviewing how stroke studies moved through the workflow, from arrival to final report, helps both the facility and the reporting team find and fix delays.",
      },
    ],
  },
  {
    slug: "critical-findings-communication",
    title: "Critical Findings Communication: Building a Reliable Escalation Process",
    excerpt:
      "A critical finding is only useful once the right clinician knows about it. How to design escalation paths that work across remote and on-site teams.",
    cover: {
      src: "/images/overnight-weekend-coverage/escalation-critical-finding.webp",
      alt: "Radiologist on the phone pointing to a finding on a CT head study",
    },
    category: CATEGORIES.quality,
    tags: ["Critical findings", "Communication", "Quality"],
    author: EDITORIAL,
    publishedAt: "2026-08-07T09:00:00Z",
    content: [
      {
        type: "paragraph",
        text: "Every radiology service needs a dependable way to get urgent results to the care team. With remote reporting, that process has to work across organizations, not just across a corridor.",
      },
      { type: "heading", text: "Define what counts as critical" },
      {
        type: "paragraph",
        text: "Start with a shared list of findings that require direct communication, aligned with the facility's own policy. Everyone reading studies should work from the same definitions.",
      },
      { type: "heading", text: "Map the escalation path" },
      {
        type: "list",
        ordered: true,
        items: [
          "Who is contacted first for each department and time of day",
          "Who is contacted next if the first person cannot be reached",
          "Which communication channels are approved",
          "How the communication is documented in the report",
        ],
      },
      {
        type: "quote",
        text: "An escalation path that has never been tested is only a plan on paper.",
      },
      { type: "heading", text: "Close the loop" },
      {
        type: "paragraph",
        text: "Record who received the result and when. Periodic audits of critical-finding communication help confirm the process works in practice, not just in policy.",
      },
    ],
  },
  {
    slug: "integrating-teleradiology-pacs-ris",
    title: "Integrating Teleradiology with Your Existing PACS and RIS",
    excerpt:
      "Remote reporting should fit the systems you already use. What to plan for when connecting a teleradiology partner to your imaging and reporting environment.",
    cover: {
      src: "/images/emergency-stat-reporting/priority-radiology-worklist.webp",
      alt: "Radiologist at a four-monitor reading station reviewing CT, MRI and X-ray images",
    },
    category: CATEGORIES.technology,
    tags: ["PACS", "RIS", "Integration"],
    author: EDITORIAL,
    publishedAt: "2026-07-24T09:00:00Z",
    content: [
      {
        type: "paragraph",
        text: "Most facilities already have an established PACS, RIS, and reporting setup. A teleradiology service should work within that environment rather than asking staff to change how they send studies or receive reports.",
      },
      { type: "heading", text: "Study delivery" },
      {
        type: "paragraph",
        text: "Studies typically reach the reporting team through a secure connection from the facility's PACS. Agree which studies are routed, how priors are made available, and how the connection is monitored.",
      },
      { type: "heading", text: "Orders and reports" },
      {
        type: "paragraph",
        text: "Reports need to land back where referring clinicians already look for them. That usually means returning results into the facility's RIS or EHR in the format it expects.",
      },
      {
        type: "list",
        items: [
          "Confirm how orders and patient context reach the radiologist",
          "Agree report formats and templates",
          "Test how addenda and corrections are handled",
        ],
      },
      { type: "heading", text: "Security and access" },
      {
        type: "callout",
        title: "Plan early",
        text: "Involve your IT and security teams from the start. Access controls, encryption, and audit requirements are easier to design in than to add later.",
      },
      {
        type: "paragraph",
        text: "A short test period with real workflow scenarios, including urgent studies and after-hours cases, is the best way to confirm everything works before go-live.",
      },
    ],
  },
  {
    slug: "choosing-teleradiology-partner-imaging-centers",
    title: "What Imaging Centers Should Look for in a Teleradiology Partner",
    excerpt:
      "Outpatient imaging centers have their own priorities: consistent turnaround, subspecialty reads, and reports referrers trust. A checklist for evaluating partners.",
    cover: {
      src: "/images/audiences/imaging-center.webp",
      alt: "Outpatient imaging center scanner suite",
    },
    category: CATEGORIES.guides,
    tags: ["Imaging centers", "Outpatient", "Partner selection"],
    author: EDITORIAL,
    publishedAt: "2026-07-10T09:00:00Z",
    content: [
      {
        type: "paragraph",
        text: "For an outpatient imaging center, the reading radiologist is part of the experience referrers and patients have with the center. Choosing a reporting partner is as much about reliability and communication as it is about capacity.",
      },
      { type: "heading", text: "Turnaround you can plan around" },
      {
        type: "paragraph",
        text: "Referrers expect reports on a predictable schedule. Ask how turnaround is defined, how it is tracked, and what happens when volume rises unexpectedly.",
      },
      { type: "heading", text: "The right subspecialty mix" },
      {
        type: "paragraph",
        text: "Musculoskeletal MRI, neuro imaging, and body imaging may each benefit from subspecialty reads. Match the partner's coverage to the studies you actually perform.",
      },
      { type: "heading", text: "An evaluation checklist" },
      {
        type: "list",
        items: [
          "Coverage hours and turnaround expectations in writing",
          "Subspecialty availability for your modality mix",
          "Integration with your existing PACS and RIS",
          "A defined critical findings process",
          "Clear quality review and feedback channels",
          "A named contact for operational questions",
        ],
      },
      {
        type: "quote",
        text: "The right partner should feel like an extension of your reading room, not a separate service you have to manage.",
      },
    ],
  },
];
