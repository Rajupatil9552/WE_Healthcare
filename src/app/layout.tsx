import type { Metadata } from "next";
import { Figtree, Noto_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
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
});

// Numeric/data emphasis (stats, turnaround times, tabular figures).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/images/WE_Logo-removebg-preview.png", type: "image/png" },
    ],
    shortcut: "/images/WE_Logo-removebg-preview.png",
    apple: "/images/WE_Logo-removebg-preview.png",
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
