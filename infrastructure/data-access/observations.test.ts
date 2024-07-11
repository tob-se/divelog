import { deleteDives } from "@/test-utils/data-access/delete-dives";
import { insertDivesDAO } from "@/test-utils/data-access/insert-dives-dao";
import { insertObservationsDAO } from "@/test-utils/data-access/insert-observations-dao";
import { insertSpecies } from "@/test-utils/data-access/insert-species";
import { randomDive } from "@/test-utils/random-dive";
import { EditObservations } from "@/types/edit-observations";
import { faker } from "@faker-js/faker";
import { beforeAll, expect, it } from "vitest";
import { ObservationDAO } from "../observation-dao";
import { SpecieDAO } from "../specie-dao";
import { findLastObservedSpecie } from "./find-last-observed-specie";
import { findObservationsByDiveId } from "./find-observations-by-id";
import { saveObservations } from "./save-observations";

const firstDive = randomDive({ date: "2000-07-22" });
const secondDive = randomDive({ date: "2001-07-22" });
const thirdDive = randomDive({ date: "2002-07-22" });

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

const thirdDiveObservation: ObservationDAO = {
  amount: faker.number.int({ min: 1, max: 3 }),
  dive_id: thirdDive.id,
  specie_id: 3,
};

const secondDiveObservation1: ObservationDAO = {
  amount: faker.number.int({ min: 1, max: 3 }),
  dive_id: secondDive.id,
  specie_id: 1,
};

const secondDiveObservation2: ObservationDAO = {
  amount: faker.number.int({ min: 1, max: 3 }),
  dive_id: secondDive.id,
  specie_id: 2,
};

beforeAll(async () => {
  await deleteDives();
  await insertDivesDAO([firstDive, secondDive, thirdDive]);
  await insertSpecies(species);
  await insertObservationsDAO([
    secondDiveObservation1,
    secondDiveObservation2,
    thirdDiveObservation,
  ]);
});

it("finds last observed specie", async () => {
  const specie = await findLastObservedSpecie();

  expect(specie?.id).toBe(thirdDiveObservation.specie_id);
});

it("finds second dive observations", async () => {
  const observations = await findObservationsByDiveId(secondDive.id);

  expect(observations).toHaveLength(2);
  expect(observations[0].amount).toBe(secondDiveObservation1.amount);
  expect(observations[0].specie.id).toBe(secondDiveObservation1.specie_id);
  expect(observations[1].amount).toBe(secondDiveObservation2.amount);
  expect(observations[1].specie.id).toBe(secondDiveObservation2.specie_id);
});

it("finds first dive observations", async () => {
  const observations = await findObservationsByDiveId(firstDive.id);

  expect(observations).toHaveLength(0);
});

it("adds and removes observations for first dive", async () => {
  const newObservations: EditObservations = {
    diveId: firstDive.id,
    observations: [{ amount: 1, specieId: 1 }],
  };

  await saveObservations(newObservations);

  const addedObservations = await findObservationsByDiveId(firstDive.id);
  expect(addedObservations).toHaveLength(1);

  const removeObservations: EditObservations = {
    diveId: firstDive.id,
    observations: [],
  };

  await saveObservations(removeObservations);

  const removedObservations = await findObservationsByDiveId(firstDive.id);
  expect(removedObservations).toHaveLength(0);
});
