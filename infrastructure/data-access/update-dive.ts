import "server-only";

import { NewDive } from "@/domain/new-dive";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import { toDiveDAO } from "../dive-dao";

export async function updateDive(dive: NewDive) {
  await db
    .update(DiveTable)
    .set(toDiveDAO(dive))
    .where(eq(DiveTable.id, dive.id));
}
