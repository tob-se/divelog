export type INatSpecie = {
  id: number;
  name: string;
  observations: number;
  common_name?: string;
  image?: {
    square_url: string;
    medium_url: string;
  };
  wikipedia_url: string | null;
};
