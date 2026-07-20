import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as { role?: string })?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAdminLoginRoute = nextUrl.pathname === "/admin/login";
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAdminApiRoute = nextUrl.pathname.startsWith("/api/admin");

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle Admin Routes
  if (isAdminRoute || isAdminApiRoute) {
    if (isAdminLoginRoute) {
      if (isLoggedIn && userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      return NextResponse.next();
    }

    if (!isLoggedIn || userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
  }

  // Handle Customer Account Routes
  const isAccountRoute = nextUrl.pathname.startsWith("/account");
  const isAccountApiRoute = nextUrl.pathname.startsWith("/api/account") && !nextUrl.pathname.includes("/forgot-password") && !nextUrl.pathname.includes("/reset-password");

  if (isAccountRoute || isAccountApiRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login?callbackUrl=" + nextUrl.pathname, nextUrl));
    }
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
