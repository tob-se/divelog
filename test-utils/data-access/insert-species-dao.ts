import { db } from "@/infrastructure/drizzle/db";
import { SpecieTable } from "@/infrastructure/drizzle/schema";
import { SpecieDAO } from "@/infrastructure/specie-dao";

export const insertSpeciesDAO = async (species: SpecieDAO[]) => {
  await db.insert(SpecieTable).values(species);
};
