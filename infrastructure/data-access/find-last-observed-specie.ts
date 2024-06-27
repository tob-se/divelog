import "server-only";

import { specieSchema } from "@/domain/specie";
import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable, SpecieTable } from "@/infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import { selectSpecie } from "../select-statements";
import { findLastDive } from "./find-last-dive";

export const findLastObservedSpecie = async () => {
  const lastDive = await findLastDive();

  if (!lastDive) {
    return undefined;
  }

  const lastSpecies = await db
    .select(selectSpecie)
    .from(ObservationTable)
    .where(eq(ObservationTable.dive_id, lastDive.id))
    .limit(1)
    .innerJoin(SpecieTable, eq(ObservationTable.specie_id, SpecieTable.id));

  return lastSpecies.length > 0
    ? specieSchema.parse(lastSpecies[0])
    : undefined;
};
