import { z } from "zod";

export const placeSchema = z
  .object({
    id: z.string(),
    main_text: z.string(),
    secondary_text: z.string().nullable(),
  })
  .strict();

export type Place = z.infer<typeof placeSchema>;
