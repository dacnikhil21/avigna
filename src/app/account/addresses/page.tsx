import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AddressClient } from "./address-client";

export default async function AddressesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/");

  const customer = await prisma.customer.findUnique({
    where: { email: session.user.email },
    include: { addresses: { orderBy: { isDefault: 'desc' } } },
  });

  if (!customer) redirect("/");

  return <AddressClient initialAddresses={customer.addresses} />;
}
