import { NextRequest, NextResponse } from "next/server";
import { getOnboardingByToken, submitOnboarding, markAsOpened } from "@/lib/onboardingStore";

export async function GET(_: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const item = await getOnboardingByToken(token);
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  
  // Mark as opened when accessed
  await markAsOpened(token);
  
  return NextResponse.json({ 
    token: item.token, 
    agencyName: item.agencyName, 
    clientName: item.clientName,
    clientEmail: item.clientEmail,
    createdAt: item.createdAt, 
    completedAt: item.completedAt 
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const { clientEmail, clientName, answers } = await req.json();
  if (!clientEmail || !clientName || !answers) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }
  const updated = await submitOnboarding(token, { clientEmail, clientName, answers });
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, summary: updated.summary });
}





