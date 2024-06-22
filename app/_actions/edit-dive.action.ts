"use server";

import { DiveFormState } from "@/app/_validations/dive-form-state";
import { validateDiveForm } from "@/app/_validations/validate-dive-form";
import { DiveService } from "@/domain/service/dive-service";
import { EditDiveFormData } from "../_validations/edit-dive-form-data";

export async function editDive(
  editDive: EditDiveFormData,
  prevState: DiveFormState,
  formData: FormData,
) {
  const validatedFields = validateDiveForm(formData, editDive);

  if (!validatedFields.success) {
    const newState: DiveFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to edit dive.",
    };

    return newState;
  }

  return await DiveService.editDive(validatedFields.data);
}
