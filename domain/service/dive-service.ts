import "server-only";

import { deleteDive } from "@/infrastructure/data-access/delete-dive";
import { findDivesBySiteOrPlace } from "@/infrastructure/data-access/find-dives-by-site-or-place";
import { findDiveById } from "@/infrastructure/data-access/find-dive-by-id";
import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import { insertDive } from "@/infrastructure/data-access/insert-dive";
import { updateDive } from "@/infrastructure/data-access/update-dive";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { NewDive } from "../new-dive";
import { countDivesBySiteOrPlace } from "@/infrastructure/data-access/count-dives-by-site-or-place";

export const DiveService = {
  addDive: async function (dive: NewDive) {
    try {
      await insertDive(dive);
    } catch (e) {
      return {
        message: "Database Error: Failed to add dive.",
      };
    }

    revalidatePath("/");
    revalidatePath("/dives");
    redirect(`/dives/${dive.id}/observations`);
  },

  removeDive: async function (id: string) {
    try {
      await deleteDive(id);
    } catch (e) {
      return {
        message: "Database Error",
      };
    }

    revalidatePath("/dives");
    redirect("/dives");
  },

  editDive: async function (dive: NewDive) {
    try {
      await updateDive(dive);
    } catch (e) {
      return {
        message: "Database Error: Failed to update dive.",
      };
    }

    redirect(`/dives/${dive.id}`);
  },

  getDive: async function (id: string) {
    const dive = await findDiveById(id);

    if (!dive) {
      notFound();
    }

    return dive;
  },

  getLastDive: findLastDive,

  getDives: findDivesBySiteOrPlace,

  getTotalDivePages: async function (query: string) {
    const numberOfDives = await countDivesBySiteOrPlace(query);
    return Math.ceil(Number(numberOfDives) / 15);
  },
};
