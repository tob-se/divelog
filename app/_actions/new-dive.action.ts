"use server";

import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import {
  DiveFormData,
  validateDiveForm,
} from "@/app/_actions/validations/validate-dive-form";
import { insertDive } from "@/infrastructure/data-access/insert-dive";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type NewDiveFormData = Omit<DiveFormData, "id">;

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

  try {
    await insertDive(validatedFields.data);
  } catch (e) {
    return {
      message: "Database Error: Failed to add dive.",
    };
  }

  revalidatePath("/");
  revalidatePath("/dives");
  revalidatePath("/new-dive");
  redirect(`/dives/${validatedFields.data.id}/observations`);
}
