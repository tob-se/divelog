import { GoogleSuggestion } from "@/types/google-suggestion";

type JsonResponse = {
  data?: Array<GoogleSuggestion>;
  error?: string;
};

export const fetchPlaces = (url: string) =>
  fetch(url).then(async (response) => {
    const { data, error }: JsonResponse = await response.json();

    if (response.ok) {
      return data
        ? data
            .map((suggestion) => suggestion.placePrediction)
            .map((prediction) => {
              const { placeId, structuredFormat } = prediction;

              return {
                id: placeId,
                main_text: structuredFormat.mainText.text,
                secondary_text: structuredFormat.secondaryText?.text || null,
              };
            })
        : [];
    } else {
      const e = new Error(error);
      return Promise.reject(e);
    }
  });
