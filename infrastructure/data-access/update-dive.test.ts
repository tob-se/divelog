import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { NewDive } from "@/types/new-dive";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { beforeAll, expect, it } from "vitest";
import { findDiveById } from "./find-dive-by-id";
import { insertDive } from "./insert-dive";
import { updateDive } from "./update-dive";

const dive: NewDive = {
  id: randomUUID(),
  comment: "",
  date: faker.date.past().toISOString().substring(0, 10),
  dive_site: "Barracuda Point",
  dive_time: "afternoon",
  highlight: false,
  place: {
    id: "1",
    main_text: "Scuba Junkie Penida",
    secondary_text: "Bali, Indonesia",
  },
};

const newDive: NewDive = {
  id: dive.id,
  comment: "updated",
  date: faker.date.past().toISOString().substring(0, 10),
  dive_site: "Manta Point",
  dive_time: "morning",
  highlight: true,
  place: {
    id: "2",
    main_text: "Scuba Junkie Komodo",
    secondary_text: "Komodo, Indonesia",
  },
};

beforeAll(async () => {
  await deleteDives();
  await insertDive(dive);
});

it("updates the dive", async () => {
  await updateDive(newDive);
  const updatedDive = await findDiveById(newDive.id);

  expect(updatedDive).toStrictEqual({ ...newDive, number: 1 });
});
