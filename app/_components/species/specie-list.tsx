import { findSpeciesByName } from "@/infrastructure/data-access/find-species-by-name";
import EmptyList from "../shared/empty-list";
import { Fragment } from "react";
import SpecieListItem from "../shared/specie-list-item";
import { ListSeparator } from "../ui/separator";
import Link from "next/link";

async function SpecieList({ query }: { query: string }) {
  if (!query) {
    return <EmptyList message="start searching" />;
  }

  const species = await findSpeciesByName(query);

  if (species.length === 0) {
    return <EmptyList message="no species found" />;
  }

  return (
    <ul className="flex flex-col gap-1 overflow-y-auto">
      {species.map((specie, index) => (
        <Fragment key={specie.id}>
          <Link href={`/species/${specie.id}`}>
            <SpecieListItem
              specie={specie}
              className="cursor-pointer hover:bg-slate-100 hover:text-slate-900"
              data-testid="specie-list-item"
            />
          </Link>
          <ListSeparator length={species.length} index={index} />
        </Fragment>
      ))}
    </ul>
  );
}

export default SpecieList;
