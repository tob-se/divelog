import { insertSpecies } from "@/test-utils/data-access/insert-species";
import { beforeAll, expect, it } from "vitest";
import { SpecieDAO } from "../specie-dao";
import { findSpeciesByName } from "./find-species-by-name";

const species: SpecieDAO[] = [
  {
    id: 1,
    name: "Pelecanus occidentalis",
    common_name: "Brown Pelican",
    observations: 84879,
    square_url:
      "https://inaturalist-open-data.s3.amazonaws.com/photos/74013719/square.jpg",
    medium_url:
      "https://inaturalist-open-data.s3.amazonaws.com/photos/74013719/medium.jpg",
    wikipedia_url: "http://en.wikipedia.org/wiki/Brown_pelican",
  },
  {
    id: 2,
    name: "Larus occidentalis",
    common_name: "Western Gull",
    observations: 43157,
    square_url:
      "https://inaturalist-open-data.s3.amazonaws.com/photos/1877/square.jpg",
    medium_url:
      "https://inaturalist-open-data.s3.amazonaws.com/photos/1877/medium.jpg",
    wikipedia_url: "http://en.wikipedia.org/wiki/Western_gull",
  },
  {
    id: 3,
    name: "Pisaster ochraceus",
    common_name: "Ochre Sea Star",
    observations: 42234,
    square_url: "https://static.inaturalist.org/photos/78877096/square.jpeg",
    medium_url: "https://static.inaturalist.org/photos/78877096/medium.jpeg",
    wikipedia_url: "http://en.wikipedia.org/wiki/Pisaster_ochraceus",
  },
];

beforeAll(async () => {
  await insertSpecies(species);
});

it("finds a single specie by name", async () => {
  const species = await findSpeciesByName("Pisaster");

  expect(species).toHaveLength(1);
  expect(species[0].id).toBe(3);
});

it("finds two species by name", async () => {
  const species = await findSpeciesByName("occidentalis");

  expect(species).toHaveLength(2);
  expect(species[0].id).toBe(1);
  expect(species[1].id).toBe(2);
});

it("finds a single specie by common name", async () => {
  const species = await findSpeciesByName("Ochre");

  expect(species).toHaveLength(1);
  expect(species[0].id).toBe(3);
});

it("finds no species with unknown name", async () => {
  const species = await findSpeciesByName("blub");

  expect(species).toHaveLength(0);
});
