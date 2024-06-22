"use server";

import { DiveService } from "@/domain/service/dive-service";
import { z } from "zod";
import { DeleteDiveFormState } from "../_validations/delete-dive-form-state";

export const removeDive = async (
  id: string,
  prevState: DeleteDiveFormState,
  formData: FormData,
) => {
  const validatedId = z.string().uuid().safeParse(id);

  if (!validatedId.success) {
    return {
      message: "Malformed id",
    };
  }

  return await DiveService.removeDive(validatedId.data);
};
