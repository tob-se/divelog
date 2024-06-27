import "server-only";

import { observationSchema } from "@/types/observation";
import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable, SpecieTable } from "@/infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import { SelectSpecie } from "../select-statements";

export const findObservationsByDiveId = async (diveId: string) => {
  const observations = await db
    .select({ amount: ObservationTable.amount, specie: SelectSpecie })
    .from(ObservationTable)
    .where(eq(ObservationTable.dive_id, diveId))
    .innerJoin(SpecieTable, eq(ObservationTable.specie_id, SpecieTable.id));

  return observations.map((o) => observationSchema.parse(o));
};
