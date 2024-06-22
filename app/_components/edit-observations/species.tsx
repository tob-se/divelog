import { SpecieService } from "@/domain/service/specie-service";
import SpecieList from "./specie-list";

async function Species({ query }: { query: string }) {
  const species = await SpecieService.getSpecies(query);
  return <SpecieList species={species} />;
}

export default Species;
