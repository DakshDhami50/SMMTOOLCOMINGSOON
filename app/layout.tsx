import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenithly – Social Media Management for Agencies",
  description:
    "Centralized assets, client onboarding with AI summaries, reports, content calendar, ideas, approvals, and more.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Zenithly – Social Media Management for Agencies",
    description:
      "Centralized assets, client onboarding with AI summaries, reports, content calendar, ideas, approvals, and more.",
    url: "https://example.com",
    siteName: "Zenithly",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Aura Social" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Social – Social Media Management for Agencies",
    description:
      "Centralized assets, client onboarding with AI summaries, reports, content calendar, ideas, approvals, and more.",
    images: ["/og.png"],
  },
};


function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400" />
            <span className="font-semibold">Zenithly</span>
          </div>
          <p className="text-white/60">Run your agency with clarity. Create, approve, publish.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="font-medium">Product</div>
            <Link href="/features" className="block text-white/70 hover:text-white">Features</Link>
            <Link href="/pricing" className="block text-white/70 hover:text-white">Pricing</Link>
            <a href="#" className="block text-white/70 hover:text-white">Changelog</a>
          </div>
          <div className="space-y-2">
            <div className="font-medium">Company</div>
            <a href="#" className="block text-white/70 hover:text-white">About</a>
            <a href="#" className="block text-white/70 hover:text-white">Careers</a>
            <a href="#" className="block text-white/70 hover:text-white">Contact</a>
          </div>
        </div>
        <div className="space-y-2 md:text-right">
          <div>© {new Date().getFullYear()} Aura Social</div>
          <div className="text-white/60">All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-gray-900 text-white min-h-screen`}> 
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}