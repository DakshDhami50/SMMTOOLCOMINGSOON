"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Sparkles, Workflow, Upload, Users, LineChart, Rocket } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  return (
    <>
    <div className="relative pb-24">
      <section className="mx-auto max-w-7xl px-6 pt-20 md:pt-24">
        <div className="text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-3.5 w-3.5" /> AI-assisted agency OS
            </span>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Run your social media agency in one place
          </motion.h1>
          <motion.p className="mx-auto max-w-2xl text-white/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Centralize assets, onboard clients with simple questions and AI summaries, plan your content calendar, gather approvals, and deliver monthly reports—smoothly.
          </motion.p>
          <motion.div className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button 
              onClick={() => setShowWaitlistModal(true)}
              className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Join the Waitlist
            </button>
            <Link href="/features" className="rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/5 transition">Explore features</Link>
          </motion.div>
        </div>

        <motion.div className="mt-14 md:mt-16"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-1">
            <div className="rounded-2xl bg-black/30 p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Upload, title: "Centralized Assets", desc: "Store brand kits, b-roll, briefs, and ready-to-post content." },
                  { icon: Users, title: "Client Onboarding", desc: "Send a link with simple questions and receive an AI summary." },
                  { icon: Calendar, title: "Content Calendar", desc: "Plan posts, assign editors, track statuses, and approvals." },
                  { icon: LineChart, title: "Reports & Timing", desc: "Monthly reports and best time to post analysis." },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <f.icon className="h-5 w-5 text-white/90" />
                    <div className="mt-3 font-medium">{f.title}</div>
                    <div className="text-sm text-white/70">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-16 md:mt-24 grid gap-8 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Approvals & Reviews</div>
          <h2 className="text-2xl md:text-3xl font-semibold">Frictionless client approvals for videos and posts</h2>
          <p className="text-white/70">
            Share preview links, collect timestamped feedback, and mark revisions as resolved. Clients can see status like Editing, In Review, Approved.
          </p>
          <ul className="text-white/75 space-y-2">
            {[
              "Timestamp comments and versioning",
              "Role-based access for creators, editors, clients",
              "Activity log and announcements via upcoming mobile app",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5" /> {item}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="glass rounded-2xl p-6 bg-black/30">
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Ideas Generator", desc: "AI suggests hooks and scripts." },
              { title: "Task Tracking", desc: "Editing, Review, Approved." },
              { title: "Brand Library", desc: "Logos, colors, fonts, presets." },
              { title: "Calendar", desc: "Drag-and-drop planning." },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium">{card.title}</div>
                <div className="text-sm text-white/70">{card.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-20">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-widest text-white/60">Workflow</div>
          <h2 className="text-2xl md:text-3xl font-semibold">From onboarding to reporting—designed for agencies</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Send onboarding links, collect briefs, get AI summaries of what clients need, collaborate on content, and deliver reports with recommended posting times.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, title: "Onboard", desc: "Questionnaire + AI summary" },
            { icon: Workflow, title: "Produce", desc: "Ideas, tasks, editing" },
            { icon: Calendar, title: "Plan", desc: "Calendar & approvals" },
            { icon: LineChart, title: "Report", desc: "Monthly insights & timing" },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <step.icon className="h-5 w-5 text-white/90" />
              <div className="mt-3 font-medium">{step.title}</div>
              <div className="text-sm text-white/70">{step.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/features" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/5 transition">
            <Rocket className="h-4 w-4" /> See all features
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-20">
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to streamline your agency?</h3>
          <p className="text-white/70 mt-2">Be the first to experience the future of social media management.</p>
          <div className="mt-5 flex justify-center gap-3">
            <button 
              onClick={() => setShowWaitlistModal(true)}
              className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition"
            >
              Join the Waitlist
            </button>
            <Link href="/features" className="rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/5 transition">Learn more</Link>
          </div>
        </div>
      </section>
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
