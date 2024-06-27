import "server-only";

import { desc } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { SelectDive } from "../select-statements";
import { diveSchema } from "@/types/dive";

export const findLastDive = async () => {
  const lastDives = await db
    .select(SelectDive)
    .from(DiveTable)
    .orderBy(desc(DiveTable.date))
    .limit(1);

  return lastDives.length > 0 ? diveSchema.parse(lastDives[0]) : undefined;
};
