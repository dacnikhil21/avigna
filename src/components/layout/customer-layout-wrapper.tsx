"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SessionProvider } from "next-auth/react";
import { StateSync } from "./state-sync";

export function CustomerLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Admin layout is completely standalone and does not have customer padding
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <StateSync />
      <Header />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer />
      <CartDrawer />
    </SessionProvider>
  );
}
