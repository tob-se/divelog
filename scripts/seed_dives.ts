import { DiveDAO } from "@/infrastructure/dive-dao";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable, ObservationTable } from "@/infrastructure/drizzle/schema";
import { ObservationDAO } from "@/infrastructure/observation-dao";
import { faker } from "@faker-js/faker";
import species from "./species.json";
import { INatSpecie } from "./types";
import { randomDive } from "@/tests/utils";

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
