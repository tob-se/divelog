import DiveList from "@/app/_components/dives/dive-list";
import DivePagination from "@/app/_components/dives/dive-pagination";
import { Button } from "@/app/_components/ui/button";
import Search from "@/app/_components/ui/search";
import { countTotalDivePages } from "@/infrastructure/data-access/count-dives-by-site-or-place";
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
        <div
          data-testid="no-dives"
          className="rounded-sm bg-slate-50 p-2 outline-none"
        >
          <span className="text-sm text-muted-foreground">no dives found</span>
        </div>
      )}

      <DivePagination totalPages={totalPages} />
    </>
  );
}

export default Dives;
