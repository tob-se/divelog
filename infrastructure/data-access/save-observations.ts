import "server-only";

import { EditObservations } from "@/types/edit-observations";
import { db } from "@/infrastructure/drizzle/db";
import { ObservationTable } from "@/infrastructure/drizzle/schema";
import { eq } from "drizzle-orm";
import { toObservationDAOs } from "../observation-dao";

export const saveObservations = async (editObservations: EditObservations) => {
  const { diveId, observations } = editObservations;

  await db.transaction(async (tx) => {
    await tx
      .delete(ObservationTable)
      .where(eq(ObservationTable.dive_id, diveId));

    if (observations.length > 0) {
      await tx
        .insert(ObservationTable)
        .values(toObservationDAOs(editObservations));
    }
  });
};
