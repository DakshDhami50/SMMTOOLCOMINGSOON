import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJwt } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = (await cookies()).get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const assetId = params.id;

    // In a real application, you would:
    // 1. Verify the user has access to this asset
    // 2. Fetch the actual file from storage (AWS S3, etc.)
    // 3. Return the file with proper headers

    // For demo purposes, we'll return a placeholder response
    const demoFileContent = `Demo file content for asset ${assetId}`;
    
    return new NextResponse(demoFileContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="asset-${assetId}.txt"`,
        'Content-Length': demoFileContent.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error downloading asset:", error);
    return NextResponse.json({ message: "Failed to download asset" }, { status: 500 });
  }
}



