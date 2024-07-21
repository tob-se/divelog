import { GoogleSuggestion } from "@/types/google-suggestion";

export const placesMock: GoogleSuggestion[] = [
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
];
