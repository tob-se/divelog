import { z } from "zod";

export const specieSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    common_name: z.string().nullable(),
    medium_url: z.string().nullable(),
    square_url: z.string().nullable(),
    wikipedia_url: z.string().nullable(),
  })
  .strict();

export type Specie = z.infer<typeof specieSchema>;
