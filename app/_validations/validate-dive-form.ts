import { newDiveSchema } from "@/domain/new-dive";
import { EditDiveFormData } from "./edit-dive-form-data";

export const validateDiveForm = (
  formData: FormData,
  diveData: EditDiveFormData,
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
