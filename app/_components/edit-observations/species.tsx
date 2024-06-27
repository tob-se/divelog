import { findSpeciesByName } from "@/infrastructure/data-access/find-species-by-name";
import SpecieList from "./specie-list";

async function Species({ query }: { query: string }) {
  const species = await findSpeciesByName(query);

  return <SpecieList species={species} />;
}

export default Species;
