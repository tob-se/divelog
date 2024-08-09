import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { mockData } from "@/test-utils/mock-data";
import { randomUUID } from "crypto";
import { beforeAll, expect, it, test } from "vitest";
import { findDiveById } from "./find-dive-by-id";

const { firstDive, secondDive, thirdDive } = mockData.dives;

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
});

it("finds the second dive", async () => {
  const dive = await findDiveById(secondDive.id);

  expect(dive?.id).toBe(secondDive.id);
  expect(dive?.number).toBe(2);
});

it("finds the first dive", async () => {
  const dive = await findDiveById(firstDive.id);

  expect(dive?.id).toBe(firstDive.id);
  expect(dive?.number).toBe(1);
});

it("finds the third dive", async () => {
  const dive = await findDiveById(thirdDive.id);

  expect(dive?.id).toBe(thirdDive.id);
  expect(dive?.number).toBe(3);
});

test("unknown dive returns undefined", async () => {
  const dive = await findDiveById(randomUUID());

  expect(dive).toBeUndefined();
});
