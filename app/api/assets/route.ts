import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

// Mock asset storage (in production, use a database)
let assets = [
  {
    id: "1",
    clientEmail: "sarah@techstartup.com",
    name: "Brand Logo - Primary",
    type: "brand-kit",
    category: "Branding",
    url: "/api/assets/download/1",
    fileSize: "2.4 MB",
    format: "PNG",
    uploadedAt: "2024-01-15",
    uploadedBy: "admin@zenithly.app",
    tags: ["logo", "branding", "primary"],
    description: "Main brand logo for all marketing materials"
  },
  {
    id: "2",
    clientEmail: "sarah@techstartup.com",
    name: "Product Screenshots",
    type: "image",
    category: "Product",
    url: "/api/assets/download/2",
    fileSize: "8.1 MB",
    format: "JPG",
    uploadedAt: "2024-01-14",
    uploadedBy: "admin@zenithly.app",
    tags: ["product", "screenshots", "app"],
    description: "High-quality product screenshots for social media"
  },
  {
    id: "3",
    clientEmail: "sarah@techstartup.com",
    name: "Brand Guidelines PDF",
    type: "document",
    category: "Branding",
    url: "/api/assets/download/3",
    fileSize: "5.2 MB",
    format: "PDF",
    uploadedAt: "2024-01-13",
    uploadedBy: "admin@zenithly.app",
    tags: ["guidelines", "branding", "reference"],
    description: "Complete brand guidelines and style guide"
  },
  {
    id: "4",
    clientEmail: "mike@restaurant.com",
    name: "Food Photography Collection",
    type: "image",
    category: "Content",
    url: "/api/assets/download/4",
    fileSize: "15.7 MB",
    format: "JPG",
    uploadedAt: "2024-01-12",
    uploadedBy: "admin@zenithly.app",
    tags: ["food", "photography", "menu"],
    description: "Professional food photography for social posts"
  },
  {
    id: "5",
    clientEmail: "emma@fashionbrand.com",
    name: "Fashion Lookbook",
    type: "image",
    category: "Product",
    url: "/api/assets/download/5",
    fileSize: "12.3 MB",
    format: "JPG",
    uploadedAt: "2024-01-11",
    uploadedBy: "admin@zenithly.app",
    tags: ["fashion", "lookbook", "collection"],
    description: "Latest fashion collection lookbook images"
  }
];

let categories = [
  { id: "branding", name: "Branding", color: "#3B82F6" },
  { id: "product", name: "Product", color: "#10B981" },
  { id: "content", name: "Content", color: "#F59E0B" },
  { id: "marketing", name: "Marketing", color: "#EF4444" },
  { id: "templates", name: "Templates", color: "#8B5CF6" },
  { id: "videos", name: "Videos", color: "#EC4899" }
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
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    if (!clientEmail) {
      return NextResponse.json({ message: "Client email is required" }, { status: 400 });
    }

    let filteredAssets = assets.filter(asset => asset.clientEmail === clientEmail);

    if (category && category !== "all") {
      filteredAssets = filteredAssets.filter(asset => 
        asset.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (type && type !== "all") {
      filteredAssets = filteredAssets.filter(asset => asset.type === type);
    }

    return NextResponse.json({ 
      success: true, 
      assets: filteredAssets,
      categories: categories
    });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json({ message: "Failed to fetch assets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { clientEmail, name, type, category, tags, description } = await req.json();

    if (!clientEmail || !name || !type || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newAsset = {
      id: `asset_${Date.now()}`,
      clientEmail,
      name,
      type,
      category,
      url: `/api/assets/download/${Date.now()}`,
      fileSize: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
      format: type === "image" ? "JPG" : type === "document" ? "PDF" : "MP4",
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: payload.email,
      tags: tags || [],
      description: description || ""
    };

    assets.push(newAsset);

    return NextResponse.json({ 
      success: true, 
      asset: newAsset
    });
  } catch (error) {
    console.error("Error uploading asset:", error);
    return NextResponse.json({ message: "Failed to upload asset" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const { searchParams } = new URL(req.url);
    const assetId = searchParams.get("id");

    if (!assetId) {
      return NextResponse.json({ message: "Asset ID is required" }, { status: 400 });
    }

    const assetIndex = assets.findIndex(asset => asset.id === assetId);
    if (assetIndex === -1) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    assets.splice(assetIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: "Asset deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return NextResponse.json({ message: "Failed to delete asset" }, { status: 500 });
  }
}



