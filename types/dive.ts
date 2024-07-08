import { z } from "zod";
import { placeSchema } from "./place";

export const diveSchema = z
  .object({
    id: z.string().uuid(),
    comment: z.string(),
    date: z.coerce.date(),
    dive_site: z.string().min(1),
    highlight: z.boolean(),
    place: placeSchema,
    number: z.number(),
    dive_time: z.enum(["morning", "noon", "afternoon", "night"]),
  })
  .strict();

export type Dive = z.infer<typeof diveSchema>;
