/**
 * Company contact details and social profiles. Single source for the footer
 * and the contact page.
 */

export const contactEmail = "sales@wehealthcare.us";

export const contactPhones = [
   { label: "USA", display: "+1 202 810 6050", tel: "+12028106050" },
  { label: "India", display: "+18883767812", tel: "+18883767812" },
 
] as const;

export const offices = [
  {
    id: "florida",
    label: "USA Office",
    lines: ["10080 Reflections Blvd West", "Sunrise, Florida 33351, USA"],
    short: "10080 Reflections Blvd West, Sunrise, Florida, 33351, USA",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=10080+Reflections+Blvd+West+Sunrise+FL+33351",
  },
  // {
  //   id: "pune",
  //   label: "India Office",
  //   lines: ["Amanora Chambers, 4th Floor, Office No. 421", "Pune - 411028, Maharashtra, India"],
  //   /** Single-line form, used by the footer. */
  //   short: "Amanora chambers, 4th floor, Office no. 421, Pune - 411028, Maharashtra, India.",
  //   mapUrl: "https://www.google.com/maps/search/?api=1&query=Amanora+Chambers+Pune+411028",
  // },
  
] as const;

export const socialLinks = [
  { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/company/we-healthcare" },
  { id: "instagram", name: "Instagram", href: "https://www.instagram.com/wehealthcare.us" },
  { id: "facebook", name: "Facebook", href: "https://www.facebook.com/profile.php?id=61593309185866" },
  { id: "youtube", name: "YouTube", href: "https://www.youtube.com/@WeHealthcare-x6r" },
  { id: "x", name: "X (Twitter)", href: "https://x.com/wehealthcare26" },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];
