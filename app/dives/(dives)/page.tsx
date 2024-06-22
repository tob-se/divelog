import DivePagination from "@/app/_components/dives/dive-pagination";
import Search from "@/app/_components/ui/search";
import { Button } from "@/app/_components/ui/button";
import DateAndTime from "@/app/_components/ui/date-and-time";
import { DiveService } from "@/domain/service/dive-service";
import { Filter } from "lucide-react";
import Link from "next/link";

async function DiveList({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: number;
  };
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  const divesPromise = DiveService.getDives(query, page);
  const totalPagesPromise = DiveService.getTotalDivePages(query);
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
      <ul className="flex h-full flex-col gap-2 overflow-auto" key={page}>
        {dives.map((dive, i) => {
          const { id, place, dive_site, date, number } = dive;

          return (
            <Link key={id} href={`/dives/${id}`}>
              <li className="flex flex-col flex-nowrap gap-1 rounded-sm bg-slate-50 p-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900">
                <div className="flex justify-between">
                  <span className="font-bold">#{number}</span>
                  <DateAndTime date={date} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{dive_site}</span>
                  <span className="text-muted-foreground">
                    {place.main_text}
                  </span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <DivePagination totalPages={totalPages} />
    </>
  );
}

export default DiveList;
