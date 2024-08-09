import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { insertObservationsDAO } from "@/test-utils/data-access/insert-observations-dao";
import { insertSpeciesDAO } from "@/test-utils/data-access/insert-species-dao";
import { mockData } from "@/test-utils/mock-data";
import { beforeAll, expect, it } from "vitest";
import { findObservationsByDiveId } from "./find-observations-by-id";

const { firstDive, secondDive, thirdDive } = mockData.dives;
const { secondDiveObservation1, secondDiveObservation2, thirdDiveObservation } =
  mockData.observations;

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
  await insertSpeciesDAO(mockData.species);
  await insertObservationsDAO([
    secondDiveObservation1,
    secondDiveObservation2,
    thirdDiveObservation,
  ]);
});

it("finds second dive observations", async () => {
  const observations = await findObservationsByDiveId(secondDive.id);

  expect(observations).toHaveLength(2);
  expect(observations[0].amount).toBe(secondDiveObservation1.amount);
  expect(observations[0].specie.id).toBe(secondDiveObservation1.specie_id);
  expect(observations[1].amount).toBe(secondDiveObservation2.amount);
  expect(observations[1].specie.id).toBe(secondDiveObservation2.specie_id);
});

it("finds third dive observations", async () => {
  const observations = await findObservationsByDiveId(thirdDive.id);

  expect(observations).toHaveLength(1);
  expect(observations[0].amount).toBe(thirdDiveObservation.amount);
  expect(observations[0].specie.id).toBe(thirdDiveObservation.specie_id);
});

it("returns empty array when a dive has no observations", async () => {
  const observations = await findObservationsByDiveId(firstDive.id);

  expect(observations).toHaveLength(0);
});

it("returns empty array without a dive", async () => {
  await deleteDives();
  const observations = await findObservationsByDiveId(firstDive.id);

  expect(observations).toHaveLength(0);
});
