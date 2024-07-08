import { newDiveSchema } from "@/types/new-dive";
import { Place } from "@/types/place";

export type DiveFormData = {
  place?: Place;
  id: string;
};

export const validateDiveForm = (
  formData: FormData,
  diveData: DiveFormData,
) => {
  const { id, place } = diveData;

  return newDiveSchema.safeParse({
    comment: formData.get("comment"),
    dive_site: formData.get("dive_site"),
    highlight: formData.get("highlight"),
    date: formData.get("date"),
    dive_time: formData.get("dive_time"),
    id,
    place,
  });
};
