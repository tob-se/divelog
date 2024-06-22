import "server-only";

import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable, SpecieTable } from "@/infrastructure/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { findLastDive } from "./find-last-dive";
import { specieSchema } from "@/domain/specie";
import { selectSpecie } from "../select-statements";

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
