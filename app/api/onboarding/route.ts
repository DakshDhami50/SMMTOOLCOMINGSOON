import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";
import { createOnboardingLink, listOnboardingsForUser } from "@/lib/onboardingStore";
import { getUserByEmail } from "@/lib/userStore";

export async function GET() {
  const token = (await cookies()).get("zenithly_session")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const payload = await verifySessionJwt(token);
    const items = await listOnboardingsForUser(payload.email);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  const token = (await cookies()).get("zenithly_session")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const payload = await verifySessionJwt(token);
    const user = await getUserByEmail(payload.email);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const { clientName, clientEmail, company, phone, industry, notes } = await req.json();
    
    if (!clientName || !clientEmail) {
      return NextResponse.json({ message: "Client name and email are required" }, { status: 400 });
    }
    
    const link = await createOnboardingLink({ 
      createdByEmail: payload.email, 
      agencyName: user.agencyName || "Your Agency",
      clientName,
      clientEmail,
      company,
      phone,
      industry,
      notes
    });
    return NextResponse.json({ token: link.token });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}




