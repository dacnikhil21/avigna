import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    }
  },
  providers: [], // Add providers with Edge-incompatible Node APIs in auth.ts instead
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret_for_dev",
} satisfies NextAuthConfig;
