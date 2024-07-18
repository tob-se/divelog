import { findSpeciesByName } from "@/infrastructure/data-access/find-species-by-name";
import SpecieList from "./specie-list";
import EmptyList from "../shared/empty-list";

async function Species({ query }: { query: string }) {
  const species = await findSpeciesByName(query);

  if (species.length === 0) {
    return <EmptyList testId="no-species" message="no species found" />;
  }

  return <SpecieList species={species} />;
}

export default Species;
