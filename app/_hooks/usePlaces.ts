import { GoogleSuggestion } from "@/types/google-suggestion";
import useSWRImmutable from "swr/immutable";
import { useToast } from "../_components/ui/use-toast";

type JsonResponse = {
  data?: Array<GoogleSuggestion>;
  error?: string;
};

const fetcher = (url: string) =>
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

export const usePlaces = (input: string) => {
  const { toast } = useToast();

  const response = useSWRImmutable(
    input ? `/api/autocomplete?input=${input}` : null,
    fetcher,
    {
      onError: (error) =>
        toast({
          title: "Failed to fetch places",
          description: error?.message,
          variant: "destructive",
        }),
    },
  );

  return response;
};
