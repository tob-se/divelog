import "server-only";

import { findLastObservedSpecie } from "@/infrastructure/data-access/find-last-observed-specie";
import { findObservationsByDiveId } from "@/infrastructure/data-access/find-observations-by-id";
import { saveObservations } from "@/infrastructure/data-access/save-observations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditObservations } from "../edit-observations";

export const ObservationService = {
  editObservations: async function (observations: EditObservations) {
    const { diveId } = observations;

    try {
      await saveObservations(observations);
    } catch (error) {
      return {
        message: "Database Error",
      };
    }

    revalidatePath(`/dives/${diveId}/observations`);
    redirect(`/dives/${diveId}`);
  },

  getObservations: findObservationsByDiveId,

  getLastObservedSpecie: findLastObservedSpecie,
};
