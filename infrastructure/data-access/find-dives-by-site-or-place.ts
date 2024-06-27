import "server-only";

import { diveSchema } from "@/types/dive";
import { desc, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { SelectDive } from "../select-statements";

export const DIVES_PER_PAGE = 15;

export const findDivesBySiteOrPlace = async (query: string, page: number) => {
  const dives = await db
    .select(SelectDive)
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
    .limit(DIVES_PER_PAGE)
    .offset((page - 1) * DIVES_PER_PAGE); // the number of rows to skip;

  return dives.map((d) => diveSchema.parse(d));
};
