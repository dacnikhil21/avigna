import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    if (phone && phone.length < 10) {
      return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
    }

    const cleanPhone = phone ? phone.trim() : null;

    // Check duplicate email
    const existingEmail = await prisma.customer.findUnique({
      where: { email }
    });
    if (existingEmail) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
    }

    // Check duplicate phone if provided
    if (cleanPhone) {
      const existingPhone = await prisma.customer.findUnique({
        where: { phone: cleanPhone }
      });
      if (existingPhone) {
        return NextResponse.json({ error: "Mobile number is already registered" }, { status: 409 });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone: cleanPhone,
        passwordHash,
      }
    });

    return NextResponse.json({ message: "User registered successfully", userId: customer.id }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
