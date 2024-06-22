import "server-only";

import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { selectDive } from "../select-statements";
import { diveSchema } from "@/domain/dive";

export const findDiveById = async (id: string) => {
  const sq = db.$with("sq").as(db.select(selectDive).from(DiveTable));
  const dives = await db.with(sq).select().from(sq).where(eq(sq.id, id));

  return dives.length > 0 ? diveSchema.parse(dives[0]) : undefined;
};
