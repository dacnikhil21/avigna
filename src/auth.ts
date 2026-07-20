import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      id: "customer",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const cleanEmail = (credentials.email as string).trim().toLowerCase();
        
        const customer = await prisma.customer.findUnique({
          where: { email: cleanEmail }
        });
        
        if (!customer || !customer.passwordHash) {
          throw new Error("Invalid credentials");
        }
        
        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          customer.passwordHash
        );
        
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        
        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          role: "CUSTOMER"
        };
      }
    }),
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        
        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string }
        });
        
        if (!admin || !admin.isActive || !admin.passwordHash) {
          throw new Error("Invalid admin credentials");
        }
        
        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        );
        
        if (!isCorrectPassword) {
          throw new Error("Invalid admin credentials");
        }
        
        // Update last login
        await prisma.adminUser.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() }
        });
        
        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: "ADMIN"
        };
      }
    })
  ]
});
