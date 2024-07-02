import { DiveDAO } from "@/infrastructure/dive-dao";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable, ObservationTable } from "@/infrastructure/drizzle/schema";
import { ObservationDAO } from "@/infrastructure/observation-dao";
import { createUTCDate } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import species from "./species.json";
import { INatSpecie } from "./types";

const randomDive = (): DiveDAO => {
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

async function main() {
  await db.delete(DiveTable);
  console.log("deleted dives");

  const dives: DiveDAO[] = Array.from({ length: 500 }, randomDive);
  await db.insert(DiveTable).values(dives);
  console.log("inserted dives");

  const newSpecies = (species as INatSpecie[])
    .filter((specie) => specie.observations > 100)
    .filter((specie) => !!specie.image)
    .filter((specie) => !!specie.common_name);

  const observations = dives
    .map((dive) => {
      return faker.helpers
        .arrayElements(newSpecies, { min: 1, max: 5 })
        .map((specie) => {
          const observation: ObservationDAO = {
            amount: faker.number.int({ min: 1, max: 3 }),
            dive_id: dive.id,
            specie_id: specie.id,
          };
          return observation;
        });
    })
    .flat();

  await db.insert(ObservationTable).values(observations);
  console.log("inserted observations");

  process.exit();
}

main();
