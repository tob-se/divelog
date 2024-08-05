import useSWRImmutable from "swr/immutable";
import { useToast } from "../_components/ui/use-toast";
import { fetchPlaces } from "../_fetching/fetch-places";

export const usePlaces = (input: string) => {
  const { toast } = useToast();

  const response = useSWRImmutable(
    input ? `/api/autocomplete?input=${input}` : null,
    fetchPlaces,
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
