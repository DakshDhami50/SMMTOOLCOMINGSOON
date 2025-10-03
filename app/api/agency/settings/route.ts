import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

// Mock agency settings storage
let agencySettings = {
  "admin@zenithly.app": {
    allowClientDecline: true,
    requireApprovalForScheduling: true,
    allowClientRevisions: true,
    maxRevisionsPerContent: 3,
    autoScheduleAfterApproval: false,
    notifyClientOnStatusChange: true,
    allowedPlatforms: ["Instagram", "TikTok", "LinkedIn", "Facebook", "Twitter", "YouTube"],
    defaultApprovalDeadline: 48, // hours
    brandingSettings: {
      logoUrl: null,
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981"
    }
  }
};

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const settings = agencySettings[payload.email] || getDefaultSettings();

    return NextResponse.json({ 
      success: true, 
      settings: settings
    });
  } catch (error) {
    console.error("Error fetching agency settings:", error);
    return NextResponse.json({ message: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const updates = await req.json();

    // Get current settings or create default
    const currentSettings = agencySettings[payload.email] || getDefaultSettings();
    
    // Update settings
    agencySettings[payload.email] = {
      ...currentSettings,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      settings: agencySettings[payload.email],
      message: "Settings updated successfully"
    });
  } catch (error) {
    console.error("Error updating agency settings:", error);
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
  }
}

function getDefaultSettings() {
  return {
    allowClientDecline: true,
    requireApprovalForScheduling: true,
    allowClientRevisions: true,
    maxRevisionsPerContent: 3,
    autoScheduleAfterApproval: false,
    notifyClientOnStatusChange: true,
    allowedPlatforms: ["Instagram", "TikTok", "LinkedIn", "Facebook", "Twitter", "YouTube"],
    defaultApprovalDeadline: 48,
    brandingSettings: {
      logoUrl: null,
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981"
    }
  };
}



