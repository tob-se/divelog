export type GoogleSuggestion = {
  placePrediction: {
    placeId: string;
    structuredFormat: {
      mainText: {
        text: string;
      };
      secondaryText?: {
        text: string;
      };
    };
  };
};
