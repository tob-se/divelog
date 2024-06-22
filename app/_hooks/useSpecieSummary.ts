import ky from "ky";
import useSWR from "swr";

type Response = {
  extract: string;
};

const fetcher = (url: string) => ky.get(url).json<Response>();

export const useSpecieSummary = (wikipediaUrl: string) => {
  const title = wikipediaUrl.substring(wikipediaUrl.lastIndexOf("/") + 1);

  const { data, isLoading } = useSWR(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
    fetcher,
  );

  return {
    summary: data?.extract,
    isLoading,
  };
};
