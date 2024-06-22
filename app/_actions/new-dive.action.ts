"use server";

import { DiveFormState } from "@/app/_validations/dive-form-state";
import { validateDiveForm } from "@/app/_validations/validate-dive-form";
import { DiveService } from "@/domain/service/dive-service";
import { randomUUID } from "crypto";
import { EditDiveFormData } from "../_validations/edit-dive-form-data";

type NewDiveFormData = Omit<EditDiveFormData, "id">;

export async function newDive(
  diveData: NewDiveFormData,
  prevState: DiveFormState,
  formData: FormData,
) {
  const validatedFields = validateDiveForm(formData, {
    id: randomUUID(),
    ...diveData,
  });

  if (!validatedFields.success) {
    const newState: DiveFormState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create dive.",
    };

    return newState;
  }

  return await DiveService.addDive(validatedFields.data);
}
