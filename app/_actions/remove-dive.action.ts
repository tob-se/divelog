"use server";

import { deleteDive } from "@/infrastructure/data-access/delete-dive";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { GenericFormState } from "./form-states/generic-form-state";

export const removeDive = async (
  id: string,
  prevState: GenericFormState,
  formData: FormData,
) => {
  const validatedId = z.string().uuid().safeParse(id);

  if (!validatedId.success) {
    return {
      message: "Malformed id",
    };
  }

  try {
    await deleteDive(id);
  } catch (e) {
    return {
      message: "Database Error",
    };
  }

  revalidatePath("/dives");
  redirect("/dives");
};
