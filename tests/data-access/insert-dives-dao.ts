import { DiveDAO } from "@/infrastructure/dive-dao";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";

export async function insertDivesDAO(dives: DiveDAO[]) {
  await db.insert(DiveTable).values(dives);
}
