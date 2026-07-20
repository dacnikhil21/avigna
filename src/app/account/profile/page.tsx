import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/");

  const customer = await prisma.customer.findUnique({
    where: { email: session.user.email },
  });

  if (!customer) redirect("/");

  return (
    <div>
      <h2 className="text-xl font-serif mb-6">Profile Details</h2>
      <ProfileForm customer={customer} />
    </div>
  );
}
