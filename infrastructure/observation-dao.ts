import { InferInsertModel } from "drizzle-orm";
import { ObservationTable } from "./drizzle/schema";
import { EditObservations } from "@/types/edit-observations";

export type ObservationDAO = InferInsertModel<typeof ObservationTable>;

export const toObservationDAOs = (
  observations: EditObservations,
): ObservationDAO[] => {
  return observations.observations.map((observation) => ({
    amount: observation.amount,
    specie_id: observation.specieId,
    dive_id: observations.diveId,
  }));
};
