import Dives from "@/app/_components/dives/dives";
import { Button } from "@/app/_components/ui/button";
import Search from "@/app/_components/ui/search";
import { Filter } from "lucide-react";
import { Suspense } from "react";

function DivesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  return (
    <>
      <div className="flex items-center gap-2">
        <Search query={query} placeholder="Search dive site or location" />
        <Button variant="outline" className="h-10 w-10 p-2.5">
          <Filter />
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="h-24 animate-pulse rounded-sm bg-slate-50 p-2 outline-none" />
        }
      >
        <Dives page={page} query={query} />
      </Suspense>
    </>
  );
}

export default DivesPage;
