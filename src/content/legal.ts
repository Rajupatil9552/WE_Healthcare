/**
 * Website legal pages: Privacy Policy, Terms of Service, Cookie Policy.
 *
 * DRAFT - must be reviewed by legal counsel before going live.
 *
 * Inline markup in any string:
 *   [label](/path)  -> link
 *   [text]          -> placeholder, rendered highlighted in yellow. Replace
 *                      every placeholder with the confirmed detail before
 *                      publishing (search this file for "[" to find them).
 *
 * Cookie Policy section 3 lists the tools planned for launch. Update the
 * table to match what is actually installed once analytics and the LinkedIn
 * Insight Tag are set up, and bump CONSENT_VERSION in lib/cookie-consent.ts
 * if categories change.
 */

import { contactEmail } from "@/config/contact";
import { routes } from "@/config/routes";

export type LegalBlock =
  | string
  | { list: string[] }
  | { subheading: string }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  /** Meta description. */
  description: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

const LAST_UPDATED = "[Publication date]";
const COMPANY = "WE Healthcare";
const LEGAL_ENTITY = "[Registered legal entity name]";
const PRIVACY_EMAIL = `[Privacy contact email, e.g. ${contactEmail}]`;
const US_ADDRESS = "10080 Reflections Blvd West, Sunrise, Florida 33351, USA";
const INDIA_ADDRESS = "Amanora Chambers, 4th Floor, Office No. 421, Pune 411028, Maharashtra, India";

/* -------------------------------------------------------------------------- */
/* Privacy Policy                                                             */
/* -------------------------------------------------------------------------- */

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${COMPANY} collects, uses and protects personal information through this website.`,
  lastUpdated: LAST_UPDATED,
  intro: [
    `This Privacy Policy explains how ${LEGAL_ENTITY} ("${COMPANY}", "we", "us" or "our") collects, uses, shares and protects personal information when you visit this website or contact us through it.`,
    "This policy covers our website only. It does not cover patient information or medical images that we process when providing teleradiology services to healthcare organizations. That information is handled under our agreements with those organizations, including Business Associate Agreements where HIPAA applies.",
  ],
  sections: [
    {
      id: "information-we-collect",
      heading: "Information we collect",
      blocks: [
        { subheading: "Information you give us" },
        {
          list: [
            "Contact and demo requests: your first and last name, work email, phone number, organization, job title (optional), organization type (optional), areas of interest (optional) and your message.",
            "Newsletter sign-ups: your email address.",
            "Any other information you choose to send us by email or phone.",
          ],
        },
        "Please do not send patient health information through this website's forms or by email to our general addresses.",
        { subheading: "Information collected automatically" },
        {
          list: [
            "Technical data such as your IP address, browser type, device type, operating system, referring page and the date and time of your visit, recorded in our hosting provider's server logs.",
            "Usage data such as pages viewed and how you move through the site, collected through analytics cookies only if you allow them.",
            "Advertising measurement data collected through the LinkedIn Insight Tag only if you allow marketing cookies.",
          ],
        },
        `For details of the cookies we use, see our [Cookie Policy](${routes.legal.cookies}).`,
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How we use your information",
      blocks: [
        "We use personal information to:",
        {
          list: [
            "Respond to your inquiry, arrange a demo and discuss our services with you.",
            "Send you our newsletter and insights, if you have signed up. You can unsubscribe at any time.",
            "Operate, secure and improve the website, including detecting spam and abuse of our forms.",
            "Understand how the website is used and measure our marketing, where you have agreed to analytics or marketing cookies.",
            "Comply with legal obligations and protect our rights.",
          ],
        },
        "We do not sell your personal information, and we do not use it for automated decision-making that has legal or similarly significant effects on you.",
      ],
    },
    {
      id: "legal-bases",
      heading: "Legal bases for processing",
      blocks: [
        "Where data protection laws such as the GDPR, UK GDPR or India's Digital Personal Data Protection Act 2023 apply, we rely on the following grounds:",
        {
          list: [
            "Consent: for newsletter emails, analytics and marketing cookies, and when you tick the consent box on our contact form. You can withdraw consent at any time.",
            "Legitimate interests: to respond to business inquiries, keep the website secure and improve our services, where those interests are not overridden by your rights.",
            "Legal obligation: where we must keep or disclose information by law.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      heading: "How we share information",
      blocks: [
        "We share personal information only with:",
        {
          list: [
            "Service providers who help us run the website and our business, such as our website host [hosting provider], our email delivery provider [email/SMTP provider], our newsletter platform [newsletter provider] and our analytics provider [analytics provider]. They may use the information only to provide services to us.",
            "LinkedIn, if you allow marketing cookies (see our Cookie Policy).",
            `Our affiliated entities in the United States and India, so the right team can respond to you.`,
            "Professional advisers, regulators, courts or law enforcement where required by law or to protect our rights.",
            "A buyer or successor if our business is reorganized, merged or sold, subject to this policy.",
          ],
        },
      ],
    },
    {
      id: "international-transfers",
      heading: "International transfers",
      blocks: [
        "We operate from the United States and India, and our service providers may process information in other countries. Where we transfer personal information across borders, we take steps required by applicable law to protect it, such as standard contractual clauses.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep information",
      blocks: [
        "We keep personal information only as long as needed for the purposes described in this policy:",
        {
          list: [
            "Inquiry and contact form data: [retention period, e.g. 24 months after our last contact with you], unless you become a client.",
            "Newsletter data: until you unsubscribe, after which we keep only what is needed to respect your choice.",
            "Server logs: [retention period, e.g. 90 days].",
            `Cookie data: as listed in our [Cookie Policy](${routes.legal.cookies}).`,
          ],
        },
      ],
    },
    {
      id: "security",
      heading: "How we protect information",
      blocks: [
        "We use technical and organizational measures designed to protect personal information, including encrypted connections (HTTPS), access controls and restricted access to inquiry data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights and choices",
      blocks: [
        "Depending on where you live, you may have the right to:",
        {
          list: [
            "Access the personal information we hold about you and get a copy of it.",
            "Correct inaccurate or incomplete information.",
            "Delete your information.",
            "Object to or restrict certain processing.",
            "Withdraw consent at any time, without affecting processing that has already taken place.",
            "Receive your information in a portable format.",
            "Opt out of targeted advertising, and not be discriminated against for exercising your rights (for California and other US state residents).",
            "Nominate someone to exercise your rights if you die or become incapacitated (India).",
            "Complain to your local data protection authority.",
          ],
        },
        `To exercise any of these rights, email us at ${PRIVACY_EMAIL}. We may need to verify your identity before responding. You can change cookie choices at any time using the Cookie Settings link in the website footer.`,
      ],
    },
    {
      id: "children",
      heading: "Children's privacy",
      blocks: [
        "This website is intended for healthcare professionals and organizations. It is not directed at children, and we do not knowingly collect personal information from anyone under 18.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party websites",
      blocks: [
        "Our website links to third-party sites, including our social media pages on LinkedIn, Instagram, Facebook, YouTube and X. Those sites have their own privacy practices, and we are not responsible for them.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        'We may update this Privacy Policy from time to time. We will post the updated version on this page and change the "Last updated" date. If changes are significant, we will take reasonable steps to let you know.',
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [
        "If you have questions about this Privacy Policy or how we handle your information, contact us:",
        {
          list: [
            `Email: ${PRIVACY_EMAIL}`,
            `United States: ${LEGAL_ENTITY}, ${US_ADDRESS}`,
            `India: ${INDIA_ADDRESS}`,
            "Grievance Officer (India): [name and email of Grievance Officer]",
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Terms of Service                                                           */
/* -------------------------------------------------------------------------- */

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description: `The terms that apply to your use of the ${COMPANY} website.`,
  lastUpdated: LAST_UPDATED,
  intro: [
    `These Terms of Service ("Terms") apply to your use of this website, operated by ${LEGAL_ENTITY} ("${COMPANY}", "we", "us" or "our"). By using the website, you agree to these Terms. If you do not agree, please do not use the website.`,
    "These Terms cover the website only. Teleradiology services are provided under separate written agreements with healthcare organizations, and those agreements take precedence over these Terms for the services they cover.",
  ],
  sections: [
    {
      id: "use-of-website",
      heading: "Use of the website",
      blocks: [
        "You may use this website for lawful purposes, to learn about our services and to contact us. You agree not to:",
        {
          list: [
            "Use the website in a way that breaks any law or regulation.",
            "Try to gain unauthorized access to the website, its servers or any connected systems.",
            "Interfere with the website's operation, including by introducing viruses or malicious code or by overloading it.",
            "Scrape, copy or harvest content or data from the website by automated means without our written permission.",
            "Submit false information, or impersonate any person or organization.",
            "Send patient health information or other sensitive personal data through the website's forms.",
          ],
        },
      ],
    },
    {
      id: "no-medical-advice",
      heading: "No medical advice",
      blocks: [
        "Content on this website, including articles, case studies, sample reports and FAQs, is for general information only. It is not medical advice, a diagnosis or a substitute for the judgment of a qualified healthcare professional. Using this website or contacting us through it does not create a clinician-patient relationship or a service agreement.",
        "If you have a medical emergency, contact your local emergency services immediately.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      blocks: [
        `The website and its content, including text, graphics, logos, images, video and design, are owned by or licensed to ${COMPANY} and are protected by copyright, trademark and other laws. "WE Healthcare" and our logo are our trademarks.`,
        "You may view, download and print pages for your own non-commercial reference. You may not otherwise copy, modify, distribute, publish or use our content without our prior written permission.",
        "Some images are used under licence from third parties and are credited where required.",
      ],
    },
    {
      id: "submissions",
      heading: "Information you send us",
      blocks: [
        `When you submit a form or contact us, you confirm that the information is accurate and that you are entitled to share it. We handle personal information as described in our [Privacy Policy](${routes.legal.privacy}).`,
        "If you send us ideas or feedback, we may use them without any obligation to you.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      blocks: [
        "The website may link to third-party websites and social media platforms. We do not control them and are not responsible for their content, policies or practices. Your use of them is at your own risk and subject to their terms.",
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers",
      blocks: [
        'We work to keep the website accurate and available, but it is provided "as is" and "as available". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including warranties of accuracy, completeness, merchantability, fitness for a particular purpose or non-infringement. We do not guarantee that the website will be uninterrupted, secure or free of errors.',
        "Descriptions of turnaround times, coverage and service levels on this website are general. The terms that apply to any engagement are set out in the written agreement for that engagement.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      blocks: [
        `To the fullest extent permitted by law, ${COMPANY} and its officers, employees, radiologists and partners will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, profits or business, arising from your use of, or inability to use, the website. Our total liability for any claim relating to the website is limited to [amount, e.g. USD 100].`,
        "Nothing in these Terms limits liability that cannot be limited by law.",
      ],
    },
    {
      id: "indemnity",
      heading: "Indemnity",
      blocks: [
        `You agree to indemnify and hold ${COMPANY} harmless from any claims, losses and expenses, including reasonable legal fees, arising from your breach of these Terms or your misuse of the website.`,
      ],
    },
    {
      id: "changes",
      heading: "Changes to the website and these Terms",
      blocks: [
        'We may change, suspend or withdraw any part of the website at any time. We may also update these Terms. The updated Terms will be posted on this page with a new "Last updated" date, and your continued use of the website means you accept them.',
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      blocks: [
        "These Terms are governed by the laws of [the State of Florida, USA], without regard to its conflict of law rules. Any dispute relating to the website will be subject to the exclusive jurisdiction of the courts of [Broward County, Florida].",
        "If any part of these Terms is found unenforceable, the rest will remain in effect.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [
        "If you have questions about these Terms, contact us:",
        {
          list: [`Email: ${PRIVACY_EMAIL}`, `Post: ${LEGAL_ENTITY}, ${US_ADDRESS}`],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Cookie Policy                                                              */
/* -------------------------------------------------------------------------- */

export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  description: `Which cookies the ${COMPANY} website uses, why, and how to manage your choices.`,
  lastUpdated: LAST_UPDATED,
  intro: [
    `This Cookie Policy explains how ${LEGAL_ENTITY} ("${COMPANY}", "we" or "us") uses cookies and similar technologies on this website. It should be read with our [Privacy Policy](${routes.legal.privacy}).`,
  ],
  sections: [
    {
      id: "what-are-cookies",
      heading: "What cookies are",
      blocks: [
        "Cookies are small text files that a website stores on your device when you visit. They let the site remember your actions and preferences, and help site owners understand how their site is used. Similar technologies, such as pixels and tags, work in a similar way, and this policy covers them too.",
        "Cookies set by us are first-party cookies. Cookies set by another company, such as an analytics or advertising provider, are third-party cookies.",
      ],
    },
    {
      id: "how-we-use-cookies",
      heading: "How we use cookies",
      blocks: [
        "We group the cookies we use into three categories:",
        {
          list: [
            "Strictly necessary: required for the website to work and to remember your cookie choices. These cannot be switched off.",
            "Analytics: help us understand how visitors find and use the website, such as which pages are visited most, so we can improve it. These are set only if you allow them.",
            "Marketing: let us measure how our LinkedIn campaigns perform and show relevant ads to professionals on LinkedIn. These are set only if you allow them.",
          ],
        },
        "Optional cookies are not set until you choose Accept or turn them on in Cookie Settings.",
      ],
    },
    {
      id: "cookies-we-use",
      heading: "Cookies we use",
      blocks: [
        "The table below lists the cookies we plan to use at launch. Names and durations may change when providers update their services.",
        {
          table: {
            caption: "Cookies used on this website",
            head: ["Cookie", "Provider", "Category", "Purpose", "Duration"],
            rows: [
              ["we_cookie_consent", COMPANY, "Strictly necessary", "Stores your cookie choices", "6 months"],
              ["_ga", "[Google Analytics 4]", "Analytics", "Distinguishes unique visitors", "2 years"],
              ["_ga_[ID]", "[Google Analytics 4]", "Analytics", "Keeps track of the current session", "2 years"],
              ["li_sugr", "LinkedIn", "Marketing", "Browser identifier for measuring ad performance", "3 months"],
              ["bcookie", "LinkedIn", "Marketing", "Browser identifier set by LinkedIn", "1 year"],
              ["lidc", "LinkedIn", "Marketing", "Routes requests to LinkedIn's data centers", "1 day"],
              ["UserMatchHistory", "LinkedIn", "Marketing", "Syncs LinkedIn ad IDs", "30 days"],
              ["AnalyticsSyncHistory", "LinkedIn", "Marketing", "Records when data was last synced with LinkedIn", "30 days"],
            ],
          },
        },
        "For more on how these providers use data, see the [Google Privacy Policy](https://policies.google.com/privacy) and the [LinkedIn Cookie Policy](https://www.linkedin.com/legal/cookie-policy).",
      ],
    },
    {
      id: "managing-cookies",
      heading: "Managing your choices",
      blocks: [
        "When you first visit, a banner lets you accept all optional cookies, reject them, or choose by category in Settings. You can change your choice at any time using the Cookie Settings link in the website footer or the button on this page. If you withdraw consent, we stop setting optional cookies from that point.",
        "You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies means we cannot remember your cookie choices, so you may see the banner again.",
        "To opt out of Google Analytics on all websites, you can install the [Google Analytics opt-out browser add-on](https://tools.google.com/dlpage/gaoptout). You can manage LinkedIn advertising preferences in your [LinkedIn ad settings](https://www.linkedin.com/psettings/advertising).",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        'We will update this Cookie Policy when we add or change the tools we use. The updated version will be posted on this page with a new "Last updated" date. If we add a new category of optional cookies, we will ask for your consent again.',
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [`If you have questions about our use of cookies, email us at ${PRIVACY_EMAIL}.`],
    },
  ],
};

export const legalDocuments = [
  { href: routes.legal.privacy, doc: privacyPolicy },
  { href: routes.legal.terms, doc: termsOfService },
  { href: routes.legal.cookies, doc: cookiePolicy },
] as const;
