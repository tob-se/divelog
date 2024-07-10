import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { randomDive } from "@/e2e/utils";
import { beforeEach, expect, test } from "vitest";
import { findDivesBySiteOrPlace } from "./find-dives-by-site-or-place";

const firstDive = randomDive();
const secondDive = randomDive();
const thirdDive = randomDive();

beforeEach(async () => {
  await deleteDives();
});

test("find dives with same date but different time", async () => {
  thirdDive.date = "2000-07-22";
  thirdDive.dive_time = "afternoon";

  secondDive.date = "2000-07-22";
  secondDive.dive_time = "noon";

  firstDive.date = "2000-07-22";
  firstDive.dive_time = "morning";

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace("", 1);

  expect(dives[0].id).toBe(thirdDive.id);
  expect(dives[1].id).toBe(secondDive.id);
  expect(dives[2].id).toBe(firstDive.id);
});

test("find dives with same time but different date", async () => {
  thirdDive.date = "2024-07-22";
  thirdDive.dive_time = "morning";

  secondDive.date = "2023-07-22";
  secondDive.dive_time = "morning";

  firstDive.date = "2021-07-22";
  firstDive.dive_time = "morning";

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace("", 1);

  expect(dives[0].id).toBe(thirdDive.id);
  expect(dives[1].id).toBe(secondDive.id);
  expect(dives[2].id).toBe(firstDive.id);
});

test("find dives by dive site", async () => {
  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace(firstDive.dive_site, 1);

  expect(dives).toHaveLength(1);
  expect(dives[0].id).toBe(firstDive.id);
});

test("find dives by place", async () => {
  thirdDive.place_main_text = "third dive site";
  secondDive.place_main_text = "second dive site";
  firstDive.place_main_text = "first dive site";

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace(firstDive.place_main_text, 1);

  expect(dives).toHaveLength(1);
  expect(dives[0].id).toBe(firstDive.id);
});

test("find dives by page", async () => {
  const diveDAOs = Array.from({ length: 16 }, randomDive);

  await insertDivesDAO(diveDAOs);

  const firstPage = await findDivesBySiteOrPlace("", 1);

  expect(firstPage).toHaveLength(15);

  const secondPage = await findDivesBySiteOrPlace("", 2);

  expect(secondPage).toHaveLength(1);
});
