import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

// Mock categories storage
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

    return NextResponse.json({ 
      success: true, 
      categories: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, color } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }

    const newCategory = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      color: color || "#6B7280"
    };

    // Check if category already exists
    const existingCategory = categories.find(cat => cat.id === newCategory.id);
    if (existingCategory) {
      return NextResponse.json({ message: "Category already exists" }, { status: 400 });
    }

    categories.push(newCategory);

    return NextResponse.json({ 
      success: true, 
      category: newCategory
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("id");

    if (!categoryId) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
    }

    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    categories.splice(categoryIndex, 1);

    return NextResponse.json({ 
      success: true, 
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
  }
}



