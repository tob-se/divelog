"use server";

import { saveObservations } from "@/infrastructure/data-access/save-observations";
import {
  EditObservations,
  editObservationsSchema,
} from "@/types/edit-observations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GenericFormState } from "./form-states/generic-form-state";

export const editObservations = async (
  editObservations: EditObservations,
  prevState: GenericFormState,
  formData: FormData,
) => {
  const validatedForm = editObservationsSchema.safeParse(editObservations);

  if (!validatedForm.success) {
    console.log(validatedForm.error);
    return {
      message: "Failed to validate observations.",
    };
  }

  try {
    await saveObservations(validatedForm.data);
  } catch (error) {
    return {
      message: "Database Error",
    };
  }

  const { diveId } = validatedForm.data;
  revalidatePath(`/dives/${diveId}/observations`);
  redirect(`/dives/${diveId}`);
};
