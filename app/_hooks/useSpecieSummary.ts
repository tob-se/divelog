import useSWR from "swr";
import { useToast } from "../_components/ui/use-toast";

type JsonResponse = {
  extract: string;
};

const fetcher = (url: string) =>
  fetch(url).then(async (response) => {
    const { extract }: JsonResponse = await response.json();

    if (response.ok) {
      return extract;
    } else {
      const e = new Error("Failed to fetch specie summary");
      return Promise.reject(e);
    }
  });

export const useSpecieSummary = (wikipediaUrl: string) => {
  const { toast } = useToast();

  const title = wikipediaUrl.substring(wikipediaUrl.lastIndexOf("/") + 1);

  const { data, isLoading } = useSWR(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    fetcher,
    {
      onError: (error) =>
        toast({
          title: "Failed to fetch summary",
          description: error?.message,
          variant: "destructive",
        }),
    },
  );

  return {
    summary: data,
    isLoading,
  };
};
