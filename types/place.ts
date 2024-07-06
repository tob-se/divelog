import { z } from "zod";

export const placeSchema = z
  .object({
    id: z.string(),
    main_text: z.string(),
    secondary_text: z.string().nullable(),
  })
  .strict();

export type Place = z.infer<typeof placeSchema>;

export const toPlaceFromPrediction = (
  prediction: google.maps.places.AutocompletePrediction,
): Place => {
  return {
    id: prediction.place_id,
    main_text: prediction.structured_formatting.main_text,
    secondary_text: prediction.structured_formatting.secondary_text,
  };
};
