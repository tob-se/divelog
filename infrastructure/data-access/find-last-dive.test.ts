import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { randomDive } from "@/test-utils/random-dive";
import { beforeEach, expect, it } from "vitest";

beforeEach(async () => {
  await deleteDives();
});

it("finds the last dive when date is equal but time is different", async () => {
  const firstDive = randomDive({ date: "2000-07-22", time: "morning" });
  const secondDive = randomDive({ date: "2000-07-22", time: "noon" });
  const thirdDive = randomDive({ date: "2000-07-22", time: "afternoon" });

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const lastDive = await findLastDive();

  expect(lastDive?.id).toBe(thirdDive.id);
  expect(lastDive?.number).toBe(3);
});

it("finds the last dive when dates are different but time is equal", async () => {
  const firstDive = randomDive({ date: "2000-07-22", time: "morning" });
  const secondDive = randomDive({ date: "2001-07-22", time: "morning" });
  const thirdDive = randomDive({ date: "2002-07-22", time: "morning" });

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const lastDive = await findLastDive();

  expect(lastDive?.id).toBe(thirdDive.id);
  expect(lastDive?.number).toBe(3);
});

it("returns undefined when no dives are present", async () => {
  const lastDive = await findLastDive();

  expect(lastDive).toBeUndefined();
});
