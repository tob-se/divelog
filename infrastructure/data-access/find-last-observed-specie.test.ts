import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { deleteObservations } from "@/test-utils/data-access/delete-observations";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { insertObservationsDAO } from "@/test-utils/data-access/insert-observations-dao";
import { insertSpeciesDAO } from "@/test-utils/data-access/insert-species-dao";
import { mockData } from "@/test-utils/mock-data";
import { beforeAll, beforeEach, expect, it } from "vitest";
import { findLastObservedSpecie } from "./find-last-observed-specie";

const { firstDive, secondDive, thirdDive } = mockData.dives;
const { secondDiveObservation1, secondDiveObservation2, thirdDiveObservation } =
  mockData.observations;

beforeAll(async () => {
  await insertSpeciesDAO(mockData.species);
});

beforeEach(async () => {
  await deleteDives();
  await deleteObservations();
});

it("finds last observed specie", async () => {
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
  await insertObservationsDAO([
    secondDiveObservation1,
    secondDiveObservation2,
    thirdDiveObservation,
  ]);

  const specie = await findLastObservedSpecie();

  expect(specie?.id).toBe(thirdDiveObservation.specie_id);
});

it("returns undefined without a dive", async () => {
  const specie = await findLastObservedSpecie();

  expect(specie).toBeUndefined();
});

it("returns undefined without a observation", async () => {
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
  const specie = await findLastObservedSpecie();

  expect(specie).toBeUndefined();
});
