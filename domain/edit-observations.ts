import { z } from "zod";
import { Observation } from "./observation";

export const editObservationsSchema = z
  .object({
    diveId: z.string().uuid(),
    observations: z.array(
      z.object({
        amount: z.number().min(1),
        specieId: z.number(),
      }),
    ),
  })
  .strict();

export type EditObservations = z.infer<typeof editObservationsSchema>;

export const toEditObservations = (
  diveId: string,
  observations: Observation[] | undefined = [],
): EditObservations => {
  return {
    diveId,
    observations: observations.map((o) => ({
      specieId: o.specie.id,
      amount: o.amount,
    })),
  };
};
