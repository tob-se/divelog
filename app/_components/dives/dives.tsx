import { countTotalDivePages } from "@/infrastructure/data-access/count-total-dive-pages";
import { findDivesBySiteOrPlace } from "@/infrastructure/data-access/find-dives-by-site-or-place";
import EmptyList from "../shared/empty-list";
import DiveList from "./dive-list";
import DivePagination from "./dive-pagination";

async function Dives({ page, query }: { page: number; query: string }) {
  const divesPromise = findDivesBySiteOrPlace(query, page);
  const totalPagesPromise = countTotalDivePages(query);
  const [dives, totalPages] = await Promise.all([
    divesPromise,
    totalPagesPromise,
  ]);

  if (dives.length === 0) {
    return <EmptyList message={query ? "no dives found" : "no dives yet"} />;
  }

  return (
    <>
      <DiveList dives={dives} key={page} />
      <DivePagination totalPages={totalPages} />
    </>
  );
}

export default Dives;
