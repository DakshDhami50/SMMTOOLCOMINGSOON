import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";
import { readOnboardings, writeOnboardings } from "@/lib/onboardingStore";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = (await cookies()).get("zenithly_session")?.value;
  
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifySessionJwt(token);
    const { approve } = await req.json();
    
    const onboardings = await readOnboardings();
    const linkIndex = onboardings.findIndex(link => link.id === id);
    
    if (linkIndex === -1) {
      return NextResponse.json({ message: "Onboarding link not found" }, { status: 404 });
    }

    if (approve) {
      // Approve the client - remove the approval flag
      onboardings[linkIndex].needsApproval = false;
      onboardings[linkIndex].status = "completed";
    } else {
      // Reject the client - reset to pending
      onboardings[linkIndex].needsApproval = false;
      onboardings[linkIndex].status = "pending";
      onboardings[linkIndex].answers = undefined;
      onboardings[linkIndex].summary = undefined;
      onboardings[linkIndex].completedAt = undefined;
    }

    await writeOnboardings(onboardings);

    return NextResponse.json({ 
      message: approve ? "Client approved successfully" : "Client submission rejected",
      approved: approve 
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
