import { newDiveSchema } from "@/types/new-dive";
import { Place } from "@/types/place";

export type DiveFormData = {
  date: Date;
  place?: Place;
  id: string;
};

export const validateDiveForm = (
  formData: FormData,
  diveData: DiveFormData,
) => {
  const { id, place, date } = diveData;

  return newDiveSchema.safeParse({
    comment: formData.get("comment"),
    dive_site: formData.get("dive_site"),
    highlight: formData.get("highlight"),
    id,
    place,
    date,
  });
};
