"use server";

import { ObservationsFormState } from "@/app/_validations/observations-form-state";
import {
  EditObservations,
  editObservationsSchema,
} from "@/domain/edit-observations";
import { ObservationService } from "@/domain/service/observation-service";

export const editObservations = async (
  editObservations: EditObservations,
  prevState: ObservationsFormState,
  formData: FormData,
) => {
  const validatedForm = editObservationsSchema.safeParse(editObservations);

  if (!validatedForm.success) {
    console.log(validatedForm.error);
    return {
      message: "Failed to validate observations.",
    };
  }

  return await ObservationService.editObservations(validatedForm.data);
};
