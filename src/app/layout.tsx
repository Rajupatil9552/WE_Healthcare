import type { Metadata } from "next";
import { Figtree, Noto_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Display + heading font: geometric, accessible, healthcare-appropriate.
// Deliberately not Inter (see design-taste-frontend skill, Section 4.1).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Body font: highly legible at small sizes, pairs cleanly with Figtree
// for long-form clinical/informational copy.
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
  // Fallback only (Figtree covers all Latin copy), so don't preload it on every
  // page; the browser fetches it only if a glyph ever needs it.
  preload: false,
});

// Numeric/data emphasis (stats, turnaround times, tabular figures).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const googleSearchSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: ["WEHealthcare", "WE Healthcare Teleradiology"],
      description: siteConfig.description,
      inLanguage: "en-US",
    },
    {
      "@type": "MedicalOrganization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon-512.png`,
        width: 512,
        height: 512,
        caption: "WE Healthcare",
      },
      image: `${siteConfig.url}/icon-512.png`,
      description: siteConfig.description,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${notoSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(googleSearchSchema) }}
        />
        {/*
          Light-first by brand decision (matches most trust-first healthcare
          sites). enableSystem is off until a visible theme toggle ships -
          dark tokens exist in tokens.css and are ready to wire up then.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CookieConsent />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
