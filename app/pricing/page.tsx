"use client";
import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    highlight: false,
    features: [
      "Up to 2 clients",
      "Content calendar",
      "Ideas generator",
      "Basic approvals",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    highlight: true,
    features: [
      "Up to 10 clients",
      "Client onboarding with AI summary",
      "Centralized assets",
      "Monthly reports & best time analysis",
    ],
  },
  {
    name: "Agency",
    price: "$79",
    period: "/mo",
    highlight: false,
    features: [
      "Unlimited clients",
      "Advanced approvals & versioning",
      "Team roles & permissions",
      "Announcements (mobile app)",
    ],
  },
];

export default function PricingPage() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest text-white/60">Coming Soon</div>
        <h1 className="text-3xl md:text-4xl font-semibold">Pricing plans are being finalized</h1>
        <p className="text-white/70 max-w-2xl mx-auto">We're putting the finishing touches on our pricing structure. Join our waitlist to be the first to know when we launch.</p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className={`rounded-2xl p-6 border ${t.highlight ? "glass bg-black/30" : "border-white/10 bg-white/5"}`}>
            <div className="text-sm text-white/60">{t.name}</div>
            <div className="mt-2 flex items-end gap-1">
              <div className="text-4xl font-semibold">{t.price}</div>
              <div className="text-white/60">{t.period}</div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setShowWaitlistModal(true)}
              className={`inline-block mt-6 rounded-full px-5 py-3 text-sm ${t.highlight ? "bg-white text-black font-semibold hover:bg-white/90" : "border border-white/20 hover:bg-white/5"}`}
            >
              Join Waitlist
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 glass rounded-2xl p-8">
        <h3 className="text-lg font-medium">FAQ</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="font-medium">Can I change plans later?</div>
            <div className="text-sm text-white/70">Yes, upgrade or downgrade anytime. We pro-rate fairly.</div>
          </div>
          <div>
            <div className="font-medium">Is there a free trial?</div>
            <div className="text-sm text-white/70">The Starter plan is free. Pro and Agency include a 14-day trial.</div>
          </div>
        </div>
      </div>
    </div>

    {/* Waitlist Modal */}
    {showWaitlistModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold">Join the Waitlist</h3>
            <p className="text-white/70">
              Be the first to know when Zenithly launches. We'll send you early access and exclusive updates.
            </p>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission here
              alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
              setShowWaitlistModal(false);
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <input
                type="text"
                placeholder="Your name (optional)"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <input
                type="text"
                placeholder="Company name (optional)"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWaitlistModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    </>
  );
}




