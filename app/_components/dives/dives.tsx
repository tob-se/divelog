import { findDivesBySiteOrPlace } from "@/infrastructure/data-access/find-dives-by-site-or-place";
import EmptyList from "../shared/empty-list";
import DiveList from "./dive-list";

async function Dives({ page, query }: { page: number; query: string }) {
  const dives = await findDivesBySiteOrPlace(query, page);

  if (dives.length === 0) {
    return <EmptyList message={query ? "no dives found" : "no dives yet"} />;
  }

  return <DiveList dives={dives} key={page} />;
}

export default Dives;
