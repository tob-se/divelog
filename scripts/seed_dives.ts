import { randomDive } from "@/test-utils/random-dive";
import { DiveDAO } from "@/infrastructure/dive-dao";
import { db } from "@/infrastructure/drizzle/db";
import { DiveTable } from "@/infrastructure/drizzle/schema";
import { ObservationDAO } from "@/infrastructure/observation-dao";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { insertObservationsDAO } from "@/test-utils/data-access/insert-observations-dao";
import { faker } from "@faker-js/faker";
import species from "./test-species.json";
import { INatSpecie } from "./types";

async function main() {
  await db.delete(DiveTable);
  console.log("deleted dives");

  const dives: DiveDAO[] = Array.from({ length: 500 }, randomDive);
  await insertDivesDAO(dives);
  console.log("inserted dives");

  const popularSpecies: INatSpecie[] = (species as INatSpecie[]).filter(
    (s) => s.observations > 100,
  );

  const observations = dives
    .map((dive) => {
      return faker.helpers
        .arrayElements(popularSpecies, { min: 1, max: 5 })
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

  await insertObservationsDAO(observations);
  console.log("inserted observations");

  process.exit();
}

main();
