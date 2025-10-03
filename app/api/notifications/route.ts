import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";
import { readOnboardings } from "@/lib/onboardingStore";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get("zenithly_session")?.value;
  
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await verifySessionJwt(token);
    const onboardings = await readOnboardings();
    
    // Get onboardings that need approval for this user
    const pendingApprovals = onboardings.filter(link => 
      link.createdByEmail === payload.email && 
      link.needsApproval === true
    );

    const notifications = pendingApprovals.map(link => ({
      id: `approval_${link.id}`,
      type: "client_approval",
      title: "Client Approval Required",
      message: `${link.clientName} has completed their onboarding. Review and approve to add them to your workspace.`,
      linkId: link.id,
      createdAt: link.completedAt,
      clientName: link.clientName,
      clientEmail: link.clientEmail
    }));

    return NextResponse.json({ notifications });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
