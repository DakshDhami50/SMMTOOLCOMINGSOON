import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

// Mock calendar content storage
let calendarContent = [
  {
    id: "1",
    clientEmail: "sarah@techstartup.com",
    title: "Product Launch Announcement",
    description: "Announcing our new AI-powered feature",
    platforms: ["Instagram", "Facebook"],
    contentType: "Post",
    contentUrl: "/uploads/content/product-launch.jpg",
    scheduledDate: "2024-01-15",
    scheduledTime: "09:00",
    status: "scheduled",
    approvalStatus: "approved",
    assignedTo: "admin@zenithly.app",
    createdAt: "2024-01-10",
    tags: ["product", "launch", "announcement"]
  },
  {
    id: "2",
    clientEmail: "sarah@techstartup.com",
    title: "Behind the Scenes Video",
    description: "Team working on the new feature",
    platforms: ["TikTok", "Instagram"],
    contentType: "Video",
    contentUrl: "/uploads/content/behind-scenes.mp4",
    scheduledDate: "2024-01-16",
    scheduledTime: "14:00",
    status: "draft",
    approvalStatus: "pending",
    assignedTo: "admin@zenithly.app",
    createdAt: "2024-01-11",
    tags: ["behind-the-scenes", "team", "video"]
  },
  {
    id: "3",
    clientEmail: "mike@restaurant.com",
    title: "Weekend Special Menu",
    description: "Showcasing our weekend special dishes",
    platforms: ["Instagram", "Facebook"],
    contentType: "Carousel",
    contentUrl: "/uploads/content/weekend-menu.jpg",
    scheduledDate: "2024-01-18",
    scheduledTime: "11:00",
    status: "scheduled",
    approvalStatus: "approved",
    assignedTo: "admin@zenithly.app",
    createdAt: "2024-01-12",
    tags: ["food", "menu", "weekend"]
  },
  {
    id: "4",
    clientEmail: "emma@fashionbrand.com",
    title: "New Collection Teaser",
    description: "Teasing our spring collection",
    platforms: ["Instagram", "TikTok"],
    contentType: "Story",
    contentUrl: "/uploads/content/collection-teaser.jpg",
    scheduledDate: "2024-01-20",
    scheduledTime: "16:00",
    status: "scheduled",
    approvalStatus: "revision-requested",
    assignedTo: "admin@zenithly.app",
    createdAt: "2024-01-13",
    tags: ["fashion", "collection", "teaser"]
  }
];

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { searchParams } = new URL(req.url);
    const clientEmail = searchParams.get("clientEmail");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!clientEmail) {
      return NextResponse.json({ message: "Client email is required" }, { status: 400 });
    }

    let filteredContent = calendarContent.filter(content => content.clientEmail === clientEmail);

    // Filter by month/year if provided
    if (month && year) {
      filteredContent = filteredContent.filter(content => {
        const contentDate = new Date(content.scheduledDate);
        return contentDate.getMonth() === parseInt(month) - 1 && contentDate.getFullYear() === parseInt(year);
      });
    }

    return NextResponse.json({ 
      success: true, 
      content: filteredContent
    });
  } catch (error) {
    console.error("Error fetching calendar content:", error);
    return NextResponse.json({ message: "Failed to fetch calendar content" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { 
      clientEmail, 
      title, 
      description, 
      platforms, 
      contentType, 
      scheduledDate, 
      scheduledTime,
      tags,
      contentUrl
    } = await req.json();

    if (!clientEmail || !title || !platforms || platforms.length === 0 || !scheduledDate) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newContent = {
      id: `content_${Date.now()}`,
      clientEmail,
      title,
      description: description || "",
      platforms,
      contentType: contentType || "Post",
      scheduledDate,
      scheduledTime: scheduledTime || "09:00",
      status: "draft",
      approvalStatus: "pending",
      assignedTo: payload.email,
      createdAt: new Date().toISOString().split('T')[0],
      tags: tags || [],
      contentUrl: contentUrl || null,
      revisionNotes: null,
      clientFeedback: null
    };

    calendarContent.push(newContent);

    return NextResponse.json({ 
      success: true, 
      content: newContent
    });
  } catch (error) {
    console.error("Error creating calendar content:", error);
    return NextResponse.json({ message: "Failed to create calendar content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { 
      id,
      title, 
      description, 
      platform, 
      contentType, 
      scheduledDate, 
      scheduledTime,
      status,
      approvalStatus,
      tags 
    } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Content ID is required" }, { status: 400 });
    }

    const contentIndex = calendarContent.findIndex(content => content.id === id);
    if (contentIndex === -1) {
      return NextResponse.json({ message: "Content not found" }, { status: 404 });
    }

    // Update the content
    calendarContent[contentIndex] = {
      ...calendarContent[contentIndex],
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(platform && { platform }),
      ...(contentType && { contentType }),
      ...(scheduledDate && { scheduledDate }),
      ...(scheduledTime && { scheduledTime }),
      ...(status && { status }),
      ...(approvalStatus && { approvalStatus }),
      ...(tags && { tags })
    };

    return NextResponse.json({ 
      success: true, 
      content: calendarContent[contentIndex]
    });
  } catch (error) {
    console.error("Error updating calendar content:", error);
    return NextResponse.json({ message: "Failed to update calendar content" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const contentId = searchParams.get("id");

    if (!contentId) {
      return NextResponse.json({ message: "Content ID is required" }, { status: 400 });
    }

    const contentIndex = calendarContent.findIndex(content => content.id === contentId);
    if (contentIndex === -1) {
      return NextResponse.json({ message: "Content not found" }, { status: 404 });
    }

    calendarContent.splice(contentIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: "Content deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting calendar content:", error);
    return NextResponse.json({ message: "Failed to delete calendar content" }, { status: 500 });
  }
}
