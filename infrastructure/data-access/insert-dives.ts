import "server-only";

import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";
import { DiveDAO } from "../dive-dao";

export const insertDives = async (dives: DiveDAO[]) => {
  await db.insert(DiveTable).values(dives);
};
