import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { randomDive } from "@/test-utils/random-dive";
import { Dive } from "@/types/dive";
import { beforeEach, expect, it, test } from "vitest";
import { DiveDAO } from "../dive-dao";
import { findDivesBySiteOrPlace } from "./find-dives-by-site-or-place";

beforeEach(async () => {
  await deleteDives();
});

it("returns dives in order when date is equal but time is different", async () => {
  const firstDive = randomDive({ date: "2000-07-22", time: "morning" });
  const secondDive = randomDive({ date: "2000-07-22", time: "noon" });
  const thirdDive = randomDive({ date: "2000-07-22", time: "afternoon" });

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace("", 1);

  assertDiveOrderAndNumber(dives, firstDive, secondDive, thirdDive);
});

it("returns dives in order when time is equal but date is different", async () => {
  const firstDive = randomDive({ date: "2000-07-22", time: "morning" });
  const secondDive = randomDive({ date: "2001-07-22", time: "morning" });
  const thirdDive = randomDive({ date: "2002-07-22", time: "morning" });

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace("", 1);

  assertDiveOrderAndNumber(dives, firstDive, secondDive, thirdDive);
});

it("finds dives by dive site", async () => {
  const diveDAOs = [randomDive(), randomDive(), randomDive()];
  await insertDivesDAO(diveDAOs);

  const expectedDive = diveDAOs[0];
  const dives = await findDivesBySiteOrPlace(expectedDive.dive_site, 1);

  expect(dives).toHaveLength(1);
  expect(dives[0].id).toBe(expectedDive.id);
});

it("finds dives by place", async () => {
  const firstDive = randomDive({ place_main_text: "first dive site" });
  const secondDive = randomDive({ place_main_text: "second dive site" });
  const thirdDive = randomDive({ place_main_text: "third dive site" });

  await insertDivesDAO([firstDive, secondDive, thirdDive]);

  const dives = await findDivesBySiteOrPlace(firstDive.place_main_text, 1);

  expect(dives).toHaveLength(1);
  expect(dives[0].id).toBe(firstDive.id);
});

test("two pages when number of dives is greater then 15", async () => {
  const diveDAOs = Array.from({ length: 16 }, randomDive);

  await insertDivesDAO(diveDAOs);

  const firstPage = await findDivesBySiteOrPlace("", 1);

  expect(firstPage).toHaveLength(15);

  const secondPage = await findDivesBySiteOrPlace("", 2);

  expect(secondPage).toHaveLength(1);
});

const assertDiveOrderAndNumber = (
  dives: Dive[],
  first: DiveDAO,
  second: DiveDAO,
  third: DiveDAO,
) => {
  expect(dives[0].id).toBe(third.id);
  expect(dives[0].number).toBe(3);
  expect(dives[1].id).toBe(second.id);
  expect(dives[1].number).toBe(2);
  expect(dives[2].id).toBe(first.id);
  expect(dives[2].number).toBe(1);
};
