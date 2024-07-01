import { DiveDAO } from "@/infrastructure/dive-dao";
import { createUTCDate } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export const randomDive = (): DiveDAO => {
  const date = createUTCDate(
    faker.date.past(),
    faker.helpers.arrayElement([6, 10, 14, 18]),
  );

  return {
    id: randomUUID(),
    comment: faker.lorem.lines(),
    date: date,
    dive_site: faker.lorem.words({ min: 1, max: 3 }),
    highlight: faker.datatype.boolean(),
    place_id: "ChIJwXCwpM5z0i0RvfNzf6n-8KY",
    place_main_text: "Scuba Junkie Penida",
    place_secondary_text: "Ped, Klungkung Regency, Bali, Indonesia",
  };
};
