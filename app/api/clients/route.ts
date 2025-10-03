import { NextRequest, NextResponse } from "next/server";
import { verifySessionJwt } from "@/lib/auth";
import { getUserByEmail } from "@/lib/userStore";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type DemoClient = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  agencyOwnerEmail: string;
  status: "active" | "pending" | "inactive";
  company?: string;
  phone?: string;
  industry?: string;
  notes?: string;
  createdAt: string;
  lastLoginAt?: string;
};

function getClientsPath() {
  return path.join(process.cwd(), "data", "clients.json");
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {}
}

async function readClients(): Promise<DemoClient[]> {
  try {
    const data = await fs.readFile(getClientsPath(), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeClients(clients: DemoClient[]) {
  await ensureDataDir();
  await fs.writeFile(getClientsPath(), JSON.stringify(clients, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const clients = await readClients();
    const userClients = clients.filter(client => client.agencyOwnerEmail === user.email);

    return NextResponse.json({ clients: userClients });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("zenithly_session")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifySessionJwt(token);
    const user = await getUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const { name, email, company, phone, industry, notes } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    const clients = await readClients();
    
    // Check if client already exists
    const existingClient = clients.find(client => client.email.toLowerCase() === email.toLowerCase());
    if (existingClient) {
      return NextResponse.json({ message: "Client with this email already exists" }, { status: 409 });
    }

    // Generate a temporary password for the client
    const tempPassword = "ClientPass123!";
    const passwordHash = await bcrypt.hash(tempPassword, 10);

    const newClient: DemoClient = {
      id: `client_${Date.now()}`,
      name,
      email,
      passwordHash,
      agencyOwnerEmail: user.email,
      status: "pending",
      company,
      phone,
      industry,
      notes,
      createdAt: new Date().toISOString(),
    };

    clients.push(newClient);
    await writeClients(clients);

    // Return client data without password hash
    const { passwordHash: _, ...clientData } = newClient;

    return NextResponse.json({ 
      client: clientData,
      message: "Client added successfully",
      tempPassword // In a real app, you'd send this via email instead
    });
  } catch (error) {
    console.error("Error adding client:", error);
    return NextResponse.json({ message: "Failed to add client" }, { status: 500 });
  }
}
