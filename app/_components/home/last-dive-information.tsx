import DateAndTime from "@/app/_components/ui/date-and-time";
import GenericTuple from "@/app/_components/ui/generic-tuple";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import TextTuple from "../ui/text-tuple";

export async function LastDiveInformationFallback() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <GenericTuple title="Last Dive Date">
        <Skeleton className="h-5 w-[100px]" />
      </GenericTuple>
      <GenericTuple title="Number of dives">
        <Skeleton className="h-5 w-[70px]" />
      </GenericTuple>
    </div>
  );
}

export async function LastDiveInformation() {
  const dive = await findLastDive();

  if (!dive) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <TextTuple title="Last Dive Date">
        <DateAndTime date={dive.date} />
      </TextTuple>
      <TextTuple title="Number of dives">{dive.number}</TextTuple>
    </div>
  );
}
