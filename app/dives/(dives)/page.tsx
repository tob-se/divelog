import DiveList from "@/app/_components/dives/dive-list";
import DivePagination from "@/app/_components/dives/dive-pagination";
import EmptyList from "@/app/_components/shared/empty-list";
import { Button } from "@/app/_components/ui/button";
import Search from "@/app/_components/ui/search";
import { countTotalDivePages } from "@/infrastructure/data-access/count-total-dive-pages";
import { findDivesBySiteOrPlace } from "@/infrastructure/data-access/find-dives-by-site-or-place";
import { Filter } from "lucide-react";

async function Dives({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  const divesPromise = findDivesBySiteOrPlace(query, page);
  const totalPagesPromise = countTotalDivePages(query);
  const [dives, totalPages] = await Promise.all([
    divesPromise,
    totalPagesPromise,
  ]);

  return (
    <>
      <div className="flex items-center gap-2">
        <Search query={query} placeholder="Search dive site or location" />
        <Button variant={"outline"} className="h-10 w-10 p-2.5">
          <Filter />
        </Button>
      </div>
      {dives.length > 0 ? (
        <DiveList dives={dives} key={page} />
      ) : (
        <EmptyList
          testId="no-dives"
          message={query ? "no dives found" : "no dives yet"}
        />
      )}

      <DivePagination totalPages={totalPages} />
    </>
  );
}

export default Dives;
