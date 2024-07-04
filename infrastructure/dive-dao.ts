// playwright problem
// import "server-only";

import { InferSelectModel } from "drizzle-orm";
import { DiveTable } from "./drizzle/schema";
import { NewDive } from "@/types/new-dive";

export type DiveDAO = InferSelectModel<typeof DiveTable>;

export const toDiveDAO = (dive: NewDive): DiveDAO => {
  const { comment, date, dive_site, highlight, id, place } = dive;

  return {
    comment,
    date,
    dive_site,
    highlight,
    id,
    place_id: place.id,
    place_main_text: place.main_text,
    place_secondary_text: place.secondary_text || null,
  };
};
