import { count, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { DiveTable } from "../drizzle/schema";
import { DIVES_PER_PAGE } from "./find-dives-by-site-or-place";

export const countTotalDivePages = async (query: string) => {
  const result = await db
    .select({ count: count() })
    .from(DiveTable)
    .where(
      or(
        ilike(DiveTable.place_main_text, `%${query}%`),
        ilike(DiveTable.dive_site, `%${query}%`),
      ),
    );

  return result.length > 0 ? Math.ceil(result[0].count / DIVES_PER_PAGE) : 0;
};
