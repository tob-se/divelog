import { ObservationTable, SpecieTable } from "@/infrastructure/drizzle/schema";
import species from "./species.json";
import { db } from "@/infrastructure/drizzle/db";
import { SpecieDAO } from "@/infrastructure/specie-dao";
import { INatSpecie } from "./types";

async function main() {
  const newSpecies: SpecieDAO[] = (species as INatSpecie[]).map((specie) => ({
    id: specie.id,
    name: specie.name,
    common_name: specie.common_name || null,
    observations: specie.observations,
    square_url: specie.image?.square_url || null,
    medium_url: specie.image?.medium_url || null,
    wikipedia_url: specie.wikipedia_url,
  }));

  await db.delete(SpecieTable);
  console.log("deleted specie table");

  for (let i = 0; i < newSpecies.length; i += 5000) {
    const batch = newSpecies.slice(i, i + 5000);
    await db.insert(SpecieTable).values(batch);
    console.log(`inserted batch ${i / 5000}`);
  }

  process.exit();
}

main();
