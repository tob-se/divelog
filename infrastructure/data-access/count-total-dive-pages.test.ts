import { randomDive } from "@/test-utils/random-dive";
import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { beforeAll, expect, test } from "vitest";
import { countTotalDivePages } from "./count-total-dive-pages";

const dives = Array.from({ length: 25 }, randomDive);

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO(dives);
});

test("page size is 2 if every dive matches", async () => {
  const count1 = await countTotalDivePages(dives[0].place_main_text);

  expect(count1).toBe(2);

  const count2 = await countTotalDivePages("");

  expect(count2).toBe(2);
});

test("page size is 1 if there is only one matching dive", async () => {
  const count = await countTotalDivePages(dives[0].dive_site);

  expect(count).toBe(1);
});
