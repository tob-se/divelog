import "server-only";

import { NewDive } from "@/domain/new-dive";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";
import { toDiveDAO } from "../dive-dao";

export async function insertDive(dive: NewDive) {
  await db.insert(DiveTable).values(toDiveDAO(dive));
}
