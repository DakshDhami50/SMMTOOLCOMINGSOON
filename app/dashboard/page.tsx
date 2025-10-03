import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";
import { getUserByEmail } from "@/lib/userStore";
import { getDemoAnalytics } from "@/lib/demoData";
import Link from "next/link";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const token = (await cookies()).get("zenithly_session")?.value;
  let email = "";
  let agencyName = "";
  let plan: string | undefined = undefined;
  let analytics = null;
  
  try {
    if (token) {
      const payload = await verifySessionJwt(token);
      email = payload.email;
      const user = await getUserByEmail(email);
      if (user) {
        agencyName = user.agencyName || "";
        plan = user.plan;
        analytics = await getDemoAnalytics();
      }
    }
  } catch {}

  return (
    <DashboardClient 
      initialAnalytics={analytics}
      userEmail={email}
      agencyName={agencyName}
      plan={plan}
    />
  );
}


