import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { mockData } from "@/test-utils/mock-data";
import { beforeAll, expect, test } from "vitest";
import { deleteDive } from "./delete-dive";
import { findDivesBySiteOrPlace } from "./find-dives-by-site-or-place";

const { firstDive, secondDive, thirdDive } = mockData.dives;

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
});

test("deleting the second dive leaves first and third dive", async () => {
  await deleteDive(secondDive.id);

  const dives = await findDivesBySiteOrPlace("", 1);
  expect(dives).toHaveLength(2);
  expect(dives[0].id).toBe(thirdDive.id);
  expect(dives[1].id).toBe(firstDive.id);
});
