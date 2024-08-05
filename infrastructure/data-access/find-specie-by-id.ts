import "server-only";

import { specieSchema } from "@/types/specie";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { SpecieTable } from "../drizzle/schema";
import { SelectSpecie } from "../select-statements";

export const findSpecieById = async (id: number) => {
  const species = await db
    .select(SelectSpecie)
    .from(SpecieTable)
    .where(eq(SpecieTable.id, id));

  return species.length === 0 ? undefined : specieSchema.parse(species[0]);
};
