import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="section-padding pt-32 pb-20 min-h-screen bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl font-light mb-8 italic">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <AccountSidebar signOutAction={handleSignOut} />

          {/* Main Content Area */}
          <main className="flex-1 bg-white rounded-3xl shadow-luxury p-6 md:p-10 border border-[#EFECE7]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
