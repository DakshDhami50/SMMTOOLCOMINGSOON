import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

// This would normally be in a database
let calendarContent = []; // Import from main calendar route in real app

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { contentId, action, feedback, revisionNotes } = await req.json();

    if (!contentId || !action) {
      return NextResponse.json({ message: "Content ID and action are required" }, { status: 400 });
    }

    // Find the content (in real app, this would be a database query)
    const contentIndex = calendarContent.findIndex(content => content.id === contentId);
    if (contentIndex === -1) {
      return NextResponse.json({ message: "Content not found" }, { status: 404 });
    }

    const content = calendarContent[contentIndex];

    // Update approval status based on action
    let newApprovalStatus;
    let newStatus = content.status;

    switch (action) {
      case "approve":
        newApprovalStatus = "approved";
        if (content.status === "draft") {
          newStatus = "scheduled";
        }
        break;
      case "request-revision":
        newApprovalStatus = "revision-requested";
        newStatus = "draft";
        break;
      case "decline":
        newApprovalStatus = "declined";
        newStatus = "declined";
        break;
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Update the content
    calendarContent[contentIndex] = {
      ...content,
      approvalStatus: newApprovalStatus,
      status: newStatus,
      clientFeedback: feedback || content.clientFeedback,
      revisionNotes: revisionNotes || content.revisionNotes,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      content: calendarContent[contentIndex],
      message: `Content ${action.replace('-', ' ')}d successfully`
    });
  } catch (error) {
    console.error("Error processing approval:", error);
    return NextResponse.json({ message: "Failed to process approval" }, { status: 500 });
  }
}



