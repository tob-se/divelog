import "server-only";

import { diveSchema } from "@/types/dive";
import { desc } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { SelectDive } from "../select-statements";

export const findLastDive = async () => {
  const lastDives = await db
    .select(SelectDive)
    .from(DiveTable)
    .orderBy(desc(DiveTable.date), desc(DiveTable.dive_time))
    .limit(1);

  return lastDives.length > 0 ? diveSchema.parse(lastDives[0]) : undefined;
};
