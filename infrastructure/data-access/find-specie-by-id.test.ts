import { insertSpecies } from "@/test-utils/data-access/insert-species";
import { beforeAll, expect, it } from "vitest";
import { SpecieDAO } from "../specie-dao";
import { findSpeciesByName } from "./find-species-by-name";
import { findSpecieById } from "./find-specie-by-id";

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

it("finds a specie", async () => {
  const specie = await findSpecieById(2);

  expect(specie?.id).toBe(2);
});

it("returns undefined when no specie is found", async () => {
  const specie = await findSpecieById(4);

  expect(specie).toBeUndefined();
});
