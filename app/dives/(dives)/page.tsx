import DivePaginationWrapper from "@/app/_components/dives/dive-pagination-wrapper";
import Dives from "@/app/_components/dives/dives";
import PaginationFallback from "@/app/_components/dives/pagination-fallback";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
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
      <Card className="overflow-hidden">
        <CardContent className="flex h-full flex-col gap-3">
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
        </CardContent>
      </Card>
      <CardFooter>
        <Suspense fallback={<PaginationFallback />}>
          <DivePaginationWrapper query={query} />
        </Suspense>
      </CardFooter>
    </>
  );
}

export default DivesPage;
