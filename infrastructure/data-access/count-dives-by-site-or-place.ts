import { count, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";

export const countDivesBySiteOrPlace = async (query: string) => {
  const result = await db
    .select({ count: count() })
    .from(DiveTable)
    .where(
      or(
        ilike(DiveTable.place_main_text, `%${query}%`),
        ilike(DiveTable.dive_site, `%${query}%`),
      ),
    );

  return result.length > 0 ? result[0].count : 0;
};
