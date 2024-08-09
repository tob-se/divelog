import { insertSpeciesDAO } from "@/test-utils/data-access/insert-species-dao";
import { beforeAll, expect, it } from "vitest";
import { findSpecieById } from "./find-specie-by-id";
import { mockData } from "@/test-utils/mock-data";

beforeAll(async () => {
  await insertSpeciesDAO(mockData.species);
});

it("finds a specie", async () => {
  const specie = await findSpecieById(2);

  expect(specie?.id).toBe(2);
});

it("returns undefined when no specie is found", async () => {
  const specie = await findSpecieById(4);

  expect(specie).toBeUndefined();
});
