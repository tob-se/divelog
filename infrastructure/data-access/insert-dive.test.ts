import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { NewDive } from "@/types/new-dive";
import { randomUUID } from "crypto";
import { beforeAll, expect, it, test } from "vitest";
import { findDiveById } from "./find-dive-by-id";
import { insertDive } from "./insert-dive";
import { faker } from "@faker-js/faker";

const newDive: NewDive = {
  id: randomUUID(),
  comment: "",
  date: faker.date.past().toISOString().substring(0, 10),
  dive_site: "Barracuda Point",
  dive_time: "afternoon",
  highlight: false,
  place: {
    id: "ChIJwXCwpM5z0i0RvfNzf6n-8KY",
    main_text: "Scuba Junkie Penida",
    secondary_text: "Ped, Klungkung Regency, Bali, Indonesia",
  },
};

beforeAll(async () => {
  await deleteDives();
});

it("inserts dive", async () => {
  await insertDive(newDive);
  const dive = await findDiveById(newDive.id);

  expect(dive).toStrictEqual({ ...newDive, number: 1 });
  expect(dive).toStrictEqual({ ...newDive, number: 1 });
});
