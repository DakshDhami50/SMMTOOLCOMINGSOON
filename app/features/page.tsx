"use client";
import { Calendar, CheckCircle2, LineChart, MessagesSquare, Sparkles, Upload, Users, Workflow } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    { icon: Upload, title: "Centralized Assets", desc: "Brand kits, footage, briefs, export presets in one place." },
    { icon: Users, title: "Client Onboarding", desc: "Share a link, ask simple questions, get an AI summary." },
    { icon: Calendar, title: "Content Calendar", desc: "Drag-and-drop planning with deadlines and owners." },
    { icon: CheckCircle2, title: "Approvals", desc: "Timestamped feedback and status tracking for posts and videos." },
    { icon: Sparkles, title: "Ideas Generator", desc: "AI hooks, scripts, captions and content outlines." },
    { icon: LineChart, title: "Monthly Reports", desc: "Client-facing insights and best time to post analysis." },
    { icon: Workflow, title: "Workflow Stages", desc: "Briefing → Editing → Review → Approved → Scheduled." },
    { icon: MessagesSquare, title: "Announcements", desc: "Share updates with clients via the upcoming mobile app." },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
      <div className="text-center space-y-3">
        <div className="text-xs uppercase tracking-widest text-white/60">Features</div>
        <h1 className="text-3xl md:text-4xl font-semibold">Everything agencies need to scale</h1>
        <p className="text-white/70 max-w-2xl mx-auto">From onboarding to approvals and reporting—reduce admin, improve clarity, and ship content faster.</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <f.icon className="h-5 w-5" />
            <div className="mt-3 font-medium">{f.title}</div>
            <div className="text-sm text-white/70">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 mt-14 text-center">
        <h3 className="text-2xl font-semibold">Simplify onboarding with AI</h3>
        <p className="text-white/70 mt-2">Send a link. We ask the right questions, summarize what they need, and set priorities.</p>
      </div>
    </div>
  );
}




