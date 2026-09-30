import { routes } from "@/config/routes";

/** Leadership (/about/leadership): management team profiles. */

export const LEADERSHIP_SEO = {
  title: "Leadership Team | WE Healthcare",
  description:
    "Meet the leadership team behind WE Healthcare and learn about their experience across healthcare, technology, finance, and business operations.",
  path: routes.about.leadership,
} as const;

export const LEADERSHIP_HERO = {
  eyebrow: "Leadership Team",
  heading: "Experienced Leadership.",
  accent: "Healthcare-Focused Perspective.",
  paragraphs: [
    "WE Healthcare is supported by an experienced leadership team with backgrounds spanning healthcare operations, business management, finance, technology, and healthcare services.",
    "Their combined experience supports the organization's focus on dependable service delivery, operational excellence, and long-term partnerships with healthcare organizations.",
  ],
  indexLabel: "The team",
} as const;

export type Leader = {
  id: string;
  name: string;
  role: string;
  /** First paragraph is set as the lead. */
  bio: readonly string[];
  /** Headline figure shown on the portrait card. */
  highlight: { value: string; label: string };
  credentials: readonly string[];
  photo: { src: string; alt: string };
};

export const LEADERS: readonly Leader[] = [
  {
    id: "jai-shukla",
    name: "Jai Shukla",
    role: "Co-founder & Director",
    bio: [
      "With a background in B.Com (Hons) and 17 years of experience as a Finance Controller, Jai plays a crucial role in ensuring the financial stability and growth of WE Healthcare.",
      "His experience in financial management and organizational oversight contributes to the company's long-term operational and business development.",
    ],
    highlight: { value: "17", label: "Years as Finance Controller" },
    credentials: ["B.Com (Hons)", "Financial management", "Organizational oversight"],
    photo: { src: "/images/leadership/jai-shukla.webp", alt: "Portrait of Jai Shukla, Co-founder and Director" },
  },
  {
    id: "rajendra-kango",
    name: "Rajendra Kango",
    role: "Executive Director & CEO",
    bio: [
      "An MBA professional, Rajendra Kango brings 23 years of diverse professional experience, including 3 years in the Health & Allied Industry.",
      "He is trained in Six Sigma methodologies and brings an approach focused on operational discipline, process improvement, and organizational growth.",
    ],
    highlight: { value: "23", label: "Years of professional experience" },
    credentials: ["MBA", "Six Sigma", "Health & Allied Industry"],
    photo: { src: "/images/leadership/rajendra-kango.webp", alt: "Portrait of Rajendra Kango, Executive Director and CEO" },
  },
  {
    id: "shubhendu-mandal",
    name: "Shubhendu Mandal",
    role: "Director, Advisor / Mentor",
    bio: [
      "A graduate of IIT Kanpur and an MBA holder from IIM Ahmedabad, Shubhendu brings over 20 years of professional experience working with some of the world's top brands.",
      "His experience includes enhancing service methods, refining functional processes, and improving customer interactions. As a Director and Advisor/Mentor, he contributes strategic perspective and guidance to the organization.",
    ],
    highlight: { value: "20+", label: "Years with global brands" },
    credentials: ["IIT Kanpur", "MBA, IIM Ahmedabad", "Strategic advisory"],
    photo: { src: "/images/leadership/shubhendu-mandal.webp", alt: "Portrait of Shubhendu Mandal, Director and Advisor/Mentor" },
  },
];

export type KeyFunction = { id: "finance" | "strategy" | "operations"; title: string; body: string };

export const KEY_FUNCTIONS = {
  eyebrow: "What Our Leaders Bring",
  heading: "Leadership Across Key Functions",
  functions: [
    {
      id: "finance",
      title: "Business & Financial Management",
      body: "Strategic financial oversight and long-term business growth.",
    },
    {
      id: "strategy",
      title: "Strategy & Advisory",
      body: "Business experience and strategic guidance supporting organizational development.",
    },
    {
      id: "operations",
      title: "Healthcare Operations & Leadership",
      body: "Healthcare-sector experience combined with operational and process-management expertise.",
    },
  ] satisfies KeyFunction[],
} as const;

export const PARTNERSHIPS = {
  eyebrow: "Our Focus",
  heading: "Building Long-Term Healthcare Partnerships",
  body: "Our leadership team brings together business, financial, strategic, and healthcare experience to support WE Healthcare's continued growth and its relationships with healthcare organizations.",
} as const;

export const LEADERSHIP_CTA = {
  heading: "Let's Build a Better Radiology Workflow Together.",
  cta: { label: "Request a Demo", href: routes.requestDemo },
} as const;
