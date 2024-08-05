type JsonResponse = {
  extract: string;
};

export const fetchSpecieDescription = async (wikipediaUrl: string) => {
  const title = wikipediaUrl.substring(wikipediaUrl.lastIndexOf("/") + 1);

  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
  );

  const { extract }: JsonResponse = await response.json();

  if (response.ok) {
    return extract;
  } else {
    const e = new Error("Failed to fetch specie summary");
    return Promise.reject(e);
  }
};
