import { Specie, SpeciesTable } from "@/drizzle/schema";
import species from "./species.json";
import { db } from "@/drizzle/db";

type INatSpecie = {
  id: number;
  name: string;
  observations: number;
  common_name?: string;
  image?: {
    square_url: string;
    medium_url: string;
    original_dimensions: {
      height: number;
      width: number;
    };
  };
};

async function main() {
  // @ts-ignore
  const newSpecies: Specie[] = species.map((specie: INatSpecie) => ({
    id: specie.id,
    name: specie.name,
    common_name: specie.common_name,
    observations: specie.observations,
    square_url: specie.image?.square_url,
    medium_url: specie.image?.medium_url,
  }));

  const first = newSpecies.slice(0, 10000);
  const second = newSpecies.slice(10000, 20000);
  const third = newSpecies.slice(20000);

  await db.insert(SpeciesTable).values(first).returning();
  await db.insert(SpeciesTable).values(second).returning();
  await db.insert(SpeciesTable).values(third).returning();

  process.exit();
}

main();
