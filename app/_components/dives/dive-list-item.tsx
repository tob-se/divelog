import DateAndTime from "@/app/_components/ui/date-and-time";
import { Dive } from "@/types/dive";
import Link from "next/link";

function DiveListItem({ dive }: { dive: Dive }) {
  const { id, place, dive_site, date, number, dive_time } = dive;

  return (
    <Link href={`/dives/${id}`}>
      <li
        data-testid="dive-item"
        className="flex flex-col flex-nowrap gap-1 rounded-sm bg-slate-50 p-2 text-sm outline-none hover:bg-slate-100 hover:text-slate-900"
      >
        <div className="flex justify-between">
          <span data-testid="dive-item-number" className="font-bold">
            #{number}
          </span>
          <DateAndTime date={date} time={dive_time} />
        </div>
        <div className="flex flex-col">
          <span data-testid="dive-item-site" className="font-medium">
            {dive_site}
          </span>
          <span data-testid="dive-item-place" className="text-muted-foreground">
            {place.main_text}
          </span>
        </div>
      </li>
    </Link>
  );
}

export default DiveListItem;
