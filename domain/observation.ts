import { z } from "zod";
import { specieSchema } from "./specie";

export const observationSchema = z
  .object({
    amount: z.number().min(1),
    specie: specieSchema,
  })
  .strict();

export type Observation = z.infer<typeof observationSchema>;
