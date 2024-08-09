import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { insertSpeciesDAO } from "@/test-utils/data-access/insert-species-dao";
import { mockData } from "@/test-utils/mock-data";
import { randomDive } from "@/test-utils/random-dive";
import { EditObservations } from "@/types/edit-observations";
import { beforeAll, expect, it } from "vitest";
import { findObservationsByDiveId } from "./find-observations-by-id";
import { saveObservations } from "./save-observations";

const dive = randomDive();

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO([dive]);
  await insertSpeciesDAO(mockData.species);
});

it("saves and clears observations", async () => {
  const newObservations: EditObservations = {
    diveId: dive.id,
    observations: [{ amount: 1, specieId: 1 }],
  };

  await saveObservations(newObservations);

  const addedObservations = await findObservationsByDiveId(dive.id);
  expect(addedObservations).toHaveLength(1);
  expect(addedObservations[0].specie.id).toBe(1);

  const removeObservations: EditObservations = {
    diveId: dive.id,
    observations: [],
  };

  await saveObservations(removeObservations);

  const removedObservations = await findObservationsByDiveId(dive.id);
  expect(removedObservations).toHaveLength(0);
});
