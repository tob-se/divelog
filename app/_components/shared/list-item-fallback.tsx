import { Skeleton } from "../ui/skeleton";

export default function ListItemFallback() {
  return (
    <div className="flex items-center gap-2 p-1">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
