import { PrismaClient } from "@prisma/client";

async function main() {
  const p = new PrismaClient();
  const r = await p.heroSlide.findMany({ orderBy: { sortOrder: "asc" } });
  console.log(JSON.stringify(r, null, 2));
  await p.$disconnect();
}
main();
