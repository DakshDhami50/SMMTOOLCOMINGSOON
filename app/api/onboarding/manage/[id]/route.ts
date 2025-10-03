import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";
import { cancelOnboarding } from "@/lib/onboardingStore";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = (await cookies()).get("zenithly_session")?.value;
  
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifySessionJwt(token);
    const result = await cancelOnboarding(id);
    
    if (!result) {
      return NextResponse.json({ message: "Onboarding link not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Onboarding link cancelled successfully" });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
