import "server-only";

import { desc, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { SpecieTable } from "../drizzle/schema";
import { SelectSpecie } from "../select-statements";
import { specieSchema } from "@/types/specie";

export const findSpeciesByName = async (name: string) => {
  const species = await db
    .select(SelectSpecie)
    .from(SpecieTable)
    .limit(20)
    .where(
      or(
        ilike(SpecieTable.common_name, `%${name}%`),
        ilike(SpecieTable.name, `%${name}%`),
      ),
    )
    .orderBy(desc(SpecieTable.observations));

  return species.map((s) => specieSchema.parse(s));
};
