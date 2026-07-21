"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, ShoppingBag, Heart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountSidebar({ signOutAction }: { signOutAction: () => Promise<void> }) {
  const pathname = usePathname();

  const navItems = [
    { label: "My Profile", href: "/account/profile", icon: User },
    { label: "My Orders", href: "/account/orders", icon: ShoppingBag },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="bg-white rounded-3xl shadow-luxury p-4 flex flex-col space-y-2 border border-[#EFECE7]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/account/profile" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-[#C5A880]/10 text-[#C5A880] font-semibold"
                  : "text-[#121212] hover:bg-[#FAF8F5] hover:text-[#C5A880]"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-[#C5A880]" : "text-[#9a948f]")} />
              {item.label}
            </Link>
          );
        })}

        <div className="h-px bg-[#EFECE7] my-2 mx-4" />

        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </form>
      </nav>
    </aside>
  );
}
