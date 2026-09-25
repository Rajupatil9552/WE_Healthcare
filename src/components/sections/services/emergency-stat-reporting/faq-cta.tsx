import { FaqSection } from "@/components/sections/services/shared/faq-section";
import { ServiceCta } from "@/components/sections/services/shared/service-cta";
import {
  EMERGENCY_FAQ_CONTENT as FAQ,
  EMERGENCY_FINAL_CTA_CONTENT as CTA,
} from "@/content/emergency-stat-reporting";

export function EmergencyFAQCTASection() {
  return (
    <>
      <FaqSection
        tone="urgent"
        eyebrow={FAQ.eyebrow}
        heading={FAQ.heading}
        intro={FAQ.supportingText}
        items={FAQ.items}
        aside={
          <div className="border-l-2 border-urgent/40 pl-4 text-sm text-foreground-muted leading-relaxed">
            <p className="font-semibold text-foreground">Clinical Workflow Governance</p>
            <p className="mt-1">
              Detailed turnaround targets, emergency escalation pathways, and medical staff credentialing
              guidelines are mutually formalized prior to launch.
            </p>
          </div>
        }
      />
      <ServiceCta
        tone="urgent"
        eyebrow={CTA.eyebrow}
        heading={CTA.heading}
        body={CTA.supportingText}
        bullets={[
          "Dedicated priority triage mapping for acute trauma & emergent protocols",
          "Direct radiologist-to-physician telephone consultation for critical findings",
        ]}
        primary={CTA.primaryBtn}
        secondary={CTA.secondaryBtn}
        image={{ src: CTA.image, alt: CTA.alt }}
      />
    </>
  );
}

export default EmergencyFAQCTASection;
