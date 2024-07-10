import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { randomDive } from "@/e2e/utils";
import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import { beforeEach, expect, test } from "vitest";

const firstDive = randomDive();
const secondDive = randomDive();
const thirdDive = randomDive();

beforeEach(async () => {
  await deleteDives();
});

test("find last dive when date is equal but time is different", async () => {
  thirdDive.date = "2000-07-22";
  thirdDive.dive_time = "afternoon";

  secondDive.date = "2000-07-22";
  secondDive.dive_time = "noon";

  firstDive.date = "2000-07-22";
  firstDive.dive_time = "morning";

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const lastDive = await findLastDive();

  expect(lastDive?.id).toBe(thirdDive.id);
});

test("find last dive when dates are different", async () => {
  thirdDive.date = "2024-07-22";
  thirdDive.dive_time = "morning";

  secondDive.date = "2023-07-22";
  secondDive.dive_time = "morning";

  firstDive.date = "2021-07-22";
  firstDive.dive_time = "morning";

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const lastDive = await findLastDive();

  expect(lastDive?.id).toBe(thirdDive.id);
});
