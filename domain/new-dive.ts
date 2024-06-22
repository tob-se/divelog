import { z } from "zod";
import { diveSchema } from "./dive";

export const newDiveSchema = diveSchema
  .omit({ number: true })
  .extend({ highlight: z.literal("on").nullable().transform(Boolean) })
  .strict();

export type NewDive = z.infer<typeof newDiveSchema>;
