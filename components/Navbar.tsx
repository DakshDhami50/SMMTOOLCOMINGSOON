"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-white">Zenithly</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">SMM Agency</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/features" className="hover:opacity-80 transition">Features</Link>
            <Link href="/pricing" className="hover:opacity-80 transition">Pricing</Link>
            <a href="#" className="hover:opacity-80 transition">Docs</a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWaitlistModal(true)}
              className="rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </header>

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