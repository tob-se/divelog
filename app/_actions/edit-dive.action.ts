"use server";

import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import {
  DiveFormData,
  validateDiveForm,
} from "@/app/_actions/validations/validate-dive-form";
import { updateDive } from "@/infrastructure/data-access/update-dive";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editDive(
  editDive: DiveFormData,
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

  try {
    await updateDive(validatedFields.data);
  } catch (e) {
    return {
      message: "Database Error: Failed to update dive.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dives");
  revalidatePath("/new-dive");
  redirect(`/dives/${validatedFields.data.id}`);
}
