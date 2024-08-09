import { insertSpeciesDAO } from "@/test-utils/data-access/insert-species-dao";
import { mockData } from "@/test-utils/mock-data";
import { beforeAll, expect, it } from "vitest";
import { findSpeciesByName } from "./find-species-by-name";

beforeAll(async () => {
  await insertSpeciesDAO(mockData.species);
});

it("finds a single specie by name", async () => {
  const species = await findSpeciesByName("Pisaster");

  expect(species).toHaveLength(1);
  expect(species[0].id).toBe(3);
});

it("finds two species by name", async () => {
  const species = await findSpeciesByName("occidentalis");

  expect(species).toHaveLength(2);
  expect(species[0].id).toBe(1);
  expect(species[1].id).toBe(2);
});

it("finds a single specie by common name", async () => {
  const species = await findSpeciesByName("Ochre");

  expect(species).toHaveLength(1);
  expect(species[0].id).toBe(3);
});

it("finds no species with unknown name", async () => {
  const species = await findSpeciesByName("blub");

  expect(species).toHaveLength(0);
});
