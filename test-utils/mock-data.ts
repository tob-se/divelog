import { ObservationDAO } from "@/infrastructure/observation-dao";
import { faker } from "@faker-js/faker";
import { randomDive } from "./random-dive";

const firstDive = randomDive({ date: "2000-07-22" });
const secondDive = randomDive({ date: "2001-07-22" });
const thirdDive = randomDive({ date: "2002-07-22" });

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

export const mockData = {
  dives: { firstDive, secondDive, thirdDive },
  observations: {
    thirdDiveObservation,
    secondDiveObservation1,
    secondDiveObservation2,
  },
  species: [
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
  ],
  places: [
    {
      placePrediction: {
        placeId: "1",
        structuredFormat: {
          mainText: {
            text: "Komodo",
          },
          secondaryText: {
            text: "Indonesia",
          },
        },
      },
    },
    {
      placePrediction: {
        placeId: "2",
        structuredFormat: {
          mainText: {
            text: "Alor",
          },
          secondaryText: {
            text: "Indonesia",
          },
        },
      },
    },
    {
      placePrediction: {
        placeId: "3",
        structuredFormat: {
          mainText: {
            text: "Germany",
          },
        },
      },
    },
  ],
};
