import { db } from "@/drizzle/db";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

async function main() {
  await migrate(db, { migrationsFolder: "./migrations" });
}

main();
