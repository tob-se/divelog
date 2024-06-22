import "server-only";

import { findSpeciesByName } from "@/infrastructure/data-access/find-species-by-name";

export const SpecieService = {
  getSpecies: findSpeciesByName,
};
