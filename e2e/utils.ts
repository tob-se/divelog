import { DiveDAO } from "@/infrastructure/dive-dao";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

export const randomDive = (): DiveDAO => {
  return {
    id: randomUUID(),
    comment: faker.lorem.lines(),
    date: faker.date.past().toISOString().substring(0, 10),
    dive_time: faker.helpers.arrayElement([
      "morning",
      "noon",
      "afternoon",
      "night",
    ]),
    dive_site: faker.lorem.words({ min: 1, max: 3 }),
    highlight: faker.datatype.boolean(),
    place_id: "ChIJwXCwpM5z0i0RvfNzf6n-8KY",
    place_main_text: "Scuba Junkie Penida",
    place_secondary_text: "Ped, Klungkung Regency, Bali, Indonesia",
  };
};
