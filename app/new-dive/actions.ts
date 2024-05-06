"use server";

import { db } from "@/drizzle/db";
import { Specie, SpeciesTable } from "@/drizzle/schema";
import { ilike } from "drizzle-orm";

export const findSpeciesByCommonName = async (name: string) => {
  const species: Specie[] = await db
    .select()
    .from(SpeciesTable)
    .limit(20)
    .where(ilike(SpeciesTable.common_name, `%${name}%`));

  return species;
};
