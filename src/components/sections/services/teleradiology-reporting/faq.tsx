"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, Minus, Question } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: "who-can-use",
    question: "Who can use teleradiology reporting support?",
    answer:
      "WE Healthcare provides teleradiology reporting support for hospitals, health systems, outpatient imaging centers, emergency departments, urgent care centers, and independent radiology groups across the United States seeking reliable diagnostic capacity.",
  },
  {
    id: "pacs-connectivity",
    question: "How does WE Healthcare connect with an existing PACS or RIS?",
    answer:
      "We establish secure, bidirectional connections with your facility's existing PACS, RIS, and EHR systems using standard DICOM and HL7 protocols over encrypted TLS 1.3 VPN tunnels or lightweight virtual appliances. Your technologists maintain their normal scanning workflow with no disruptive proprietary software required.",
  },
  {
    id: "overflow-coverage",
    question: "Can reporting support be used for overflow or after-hours coverage?",
    answer:
      "Yes. Our reporting models are fully customizable around your operational needs—including dedicated overnight shifts, weekend call coverage, holiday relief, scheduled daytime overflow surges, or secondary subspecialty consultations with no punitive minimum volume mandates.",
  },
  {
    id: "routing-logic",
    question: "How are studies routed to radiologists?",
    answer:
      "Studies are ingested into our intelligent clinical worklist and automatically routed according to modality, clinical acuity (STAT vs. routine), facility bylaws, and state medical licensing, ensuring each case is interpreted by an appropriately credentialed, board-certified radiologist.",
  },
  {
    id: "critical-findings",
    question: "How are critical findings communicated?",
    answer:
      "When unexpected or acute critical findings are identified, our radiologist or 24/7 clinical coordination desk immediately initiates direct telephone contact with the referring physician or clinical care team. A closed-loop timestamped read-back confirmation is documented directly in the diagnostic report.",
  },
  {
    id: "supported-modalities",
    question: "Which modalities are supported?",
    answer:
      "We support all major diagnostic imaging modalities, including Magnetic Resonance Imaging (MRI), Computed Tomography (CT), Diagnostic Ultrasound, Digital Radiography (X-Ray), and Mammography across neuroradiology, musculoskeletal, body/abdominal, pediatric, and emergency subspecialties.",
  },
  {
    id: "start-engagement",
    question: "What information is needed to start an engagement?",
    answer:
      "To initiate discovery, our team reviews your facility's estimated study volumes, modality breakdown, desired coverage windows, medical staff credentialing bylaws, and local PACS/RIS integration endpoints to design a seamless operational workflow.",
  },
];

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openId, setOpenId] = React.useState<string | null>("who-can-use");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const fadeUp = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: shouldReduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#070d11] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800/60 bg-sky-50/90 dark:bg-sky-950/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300"
          >
            <Question size={14} weight="bold" className="text-sky-500" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.16 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Common operational and clinical questions regarding our teleradiology reporting services.
          </motion.p>
        </div>

        {/* Accessible Premium Accordion */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQ_LIST.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0c141a] overflow-hidden shadow-xs transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:text-sky-600 dark:hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </span>

                  {/* Plus / Minus Animated Icon */}
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 transition-colors">
                    {isOpen ? (
                      <Minus size={16} weight="bold" className="text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Plus size={16} weight="bold" />
                    )}
                  </div>
                </button>

                {/* Animated Accordion Content (250–350ms duration) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3, // 300ms, exactly within 250-350ms
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-800/60 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FAQSection;
