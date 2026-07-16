import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clothbook (Iwe Aso) — Your exercise book, on your phone",
  description:
    "Clothbook replaces the paper exercise book Nigerian and African tailors use to run their shop. Fast entry, works offline, in your language.",
  openGraph: {
    title: "Clothbook (Iwe Aso)",
    description:
      "Your exercise book, now on your phone. Built for real tailor shops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
