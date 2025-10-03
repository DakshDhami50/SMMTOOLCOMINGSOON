"use client";
import { useEffect, useState, use } from "react";

export default function PublicOnboardingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [meta, setMeta] = useState<{ agencyName: string } | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({ goals: "", audience: "", platforms: "", cadence: "", brand: "" });
  const [status, setStatus] = useState<{ success?: string; error?: string }>({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/onboarding/${token}`);
      if (res.ok) {
        const data = await res.json();
        setMeta({ agencyName: data.agencyName });
      }
    })();
  }, [token]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({});
    if (!clientName || !clientEmail) {
      setStatus({ error: "Please provide your name and email" });
      return;
    }
    const res = await fetch(`/api/onboarding/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName, clientEmail, answers }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus({ error: data?.message || "Submission failed" });
      return;
    }
    setStatus({ success: data.summary });
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Onboarding – {meta?.agencyName || "Agency"}</h1>
      <p className="text-white/70 mt-1">Please answer a few short questions to help us get started.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Your name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <input className="rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Your email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
        </div>
        <input className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="What are your goals?" value={answers.goals} onChange={(e) => setAnswers({ ...answers, goals: e.target.value })} />
        <input className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Who is your target audience?" value={answers.audience} onChange={(e) => setAnswers({ ...answers, audience: e.target.value })} />
        <input className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Preferred platforms (e.g., IG, TikTok)" value={answers.platforms} onChange={(e) => setAnswers({ ...answers, platforms: e.target.value })} />
        <input className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Posting cadence (e.g., 3x/week)" value={answers.cadence} onChange={(e) => setAnswers({ ...answers, cadence: e.target.value })} />
        <textarea className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2" placeholder="Brand voice and notes" value={answers.brand} onChange={(e) => setAnswers({ ...answers, brand: e.target.value })} />
        {status.error && <div className="text-sm text-red-400">{status.error}</div>}
        {status.success && (
          <div className="text-sm text-emerald-400 whitespace-pre-wrap">
            <div className="font-medium text-white mb-1">AI summary</div>
            {status.success}
          </div>
        )}
        <button type="submit" className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold">Submit</button>
      </form>
    </div>
  );
}




