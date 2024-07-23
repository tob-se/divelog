import GenericTuple from "@/app/_components/ui/generic-tuple";
import { Skeleton } from "@/app/_components/ui/skeleton";
import TextTuple from "@/app/_components/ui/text-tuple";
import { useSpecieSummary } from "../../_hooks/useSpecieSummary";

function SpecieSummary({ wikipedia_url }: { wikipedia_url: string }) {
  const { summary, isLoading } = useSpecieSummary(wikipedia_url);

  if (isLoading) {
    return (
      <GenericTuple className="p-3 pb-0 text-sm" title="Description">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[100px]" />
      </GenericTuple>
    );
  }

  return (
    <TextTuple className="overflow-auto p-3 pb-0" title="Description">
      {summary}
    </TextTuple>
  );
}

export default SpecieSummary;
