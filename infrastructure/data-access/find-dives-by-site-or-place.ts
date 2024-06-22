import "server-only";

import { diveSchema } from "@/domain/dive";
import { desc, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { selectDive } from "../select-statements";

export const findDivesBySiteOrPlace = async (query: string, page: number) => {
  const dives = await db
    .select(selectDive)
    .from(DiveTable)
    .orderBy(desc(DiveTable.date))
    .where(
      query
        ? or(
            ilike(DiveTable.dive_site, `%${query}%`),
            ilike(DiveTable.place_main_text, `%${query}%`),
          )
        : undefined,
    )
    .limit(15)
    .offset((page - 1) * 15); // the number of rows to skip;

  return dives.map((d) => diveSchema.parse(d));
};
