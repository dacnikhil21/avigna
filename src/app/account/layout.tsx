import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, MapPin, ShoppingBag, Heart, LogOut } from "lucide-react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="section-padding pt-32 pb-20 min-h-screen bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl font-light mb-8 italic">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="bg-white rounded-3xl shadow-luxury p-4 flex flex-col space-y-2">
              <Link
                href="/account/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-luxury-cream transition-colors text-luxury-black"
              >
                <User className="w-4 h-4 text-luxury-muted" />
                My Profile
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-luxury-cream transition-colors text-luxury-black"
              >
                <ShoppingBag className="w-4 h-4 text-luxury-muted" />
                My Orders
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-luxury-cream transition-colors text-luxury-black"
              >
                <Heart className="w-4 h-4 text-luxury-muted" />
                Wishlist
              </Link>
              <Link
                href="/account/addresses"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-luxury-cream transition-colors text-luxury-black"
              >
                <MapPin className="w-4 h-4 text-luxury-muted" />
                Saved Addresses
              </Link>

              <div className="h-px bg-[#EFECE7] my-2 mx-4" />

              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
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

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-3xl shadow-luxury p-6 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
