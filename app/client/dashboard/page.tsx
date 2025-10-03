"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, FileStack, LineChart, MessagesSquare, Sparkles, Upload, Users, Workflow } from "lucide-react";

export default function ClientDashboardPage() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate getting client data
    setClientName("Sarah Johnson");
    setLoading(false);
  }, []);

  const features = [
    {
      icon: Upload,
      title: "Centralized Assets",
      desc: "Brand kits, footage, briefs, export presets in one place.",
      href: "/client/assets"
    },
    {
      icon: Users,
      title: "Client Onboarding",
      desc: "Share a link, ask simple questions, get an AI summary.",
      href: "/client/onboarding"
    },
    {
      icon: Calendar,
      title: "Content Calendar",
      desc: "Drag-and-drop planning with deadlines and owners.",
      href: "/client/calendar"
    },
    {
      icon: CheckCircle2,
      title: "Approvals",
      desc: "Timestamped feedback and status tracking for posts and videos.",
      href: "/client/approvals"
    },
    {
      icon: Sparkles,
      title: "Ideas Generator",
      desc: "AI hooks, scripts, captions and content outlines.",
      href: "/client/ideas"
    },
    {
      icon: LineChart,
      title: "Monthly Reports",
      desc: "Client-facing insights and best time to post analysis.",
      href: "/client/reports"
    },
    {
      icon: Workflow,
      title: "Workflow Stages",
      desc: "Briefing → Editing → Review → Approved → Scheduled.",
      href: "/client/workflow"
    },
    {
      icon: MessagesSquare,
      title: "Announcements",
      desc: "Share updates with clients via the upcoming mobile app.",
      href: "/client/announcements"
    },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {clientName}!</h1>
          <p className="text-white/70 mt-1">Manage your social media content and collaborate with your agency.</p>
        </div>
        <form action="/api/signout" method="post">
          <button className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/5" type="submit">Sign out</button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Your Tools & Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.href}
              className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <feature.icon className="h-8 w-8 text-white/90 mb-3" />
              <div className="font-medium text-lg mb-2">{feature.title}</div>
              <div className="text-white/70 text-sm">{feature.desc}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Content approved for Instagram post</span>
              <span className="text-white/60 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span>New content ideas generated</span>
              <span className="text-white/60 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-orange-400" />
              <span>Monthly report ready for review</span>
              <span className="text-white/60 ml-auto">3 days ago</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/60">Posts This Month</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div>
              <div className="text-white/60">Pending Approvals</div>
              <div className="text-2xl font-bold text-orange-400">3</div>
            </div>
            <div>
              <div className="text-white/60">Ideas Generated</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div>
              <div className="text-white/60">Response Time</div>
              <div className="text-2xl font-bold">2.1h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



