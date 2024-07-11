import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { beforeAll, expect, test } from "vitest";
import { deleteDive } from "./delete-dive";
import { findDivesBySiteOrPlace } from "./find-dives-by-site-or-place";
import { randomDive } from "@/test-utils/random-dive";

const firstDive = randomDive({ date: "2021-07-22" });
const secondDive = randomDive({ date: "2022-07-22" });
const thirdDive = randomDive({ date: "2023-07-22" });

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
