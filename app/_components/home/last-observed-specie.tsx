import GenericTuple from "@/app/_components/ui/generic-tuple";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { findLastObservedSpecie } from "@/infrastructure/data-access/find-last-observed-specie";
import SpecieImage from "../shared/specie-image";

export function LastObservedSpecieFallback() {
  return (
    <GenericTuple title="Last Observation">
      <Skeleton className="aspect-[4/3] w-full" />
    </GenericTuple>
  );
}

export async function LastObservedSpecie() {
  const specie = await findLastObservedSpecie();

  if (!specie) {
    return null;
  }

  return (
    <GenericTuple title="Last Observation">
      <div className="relative aspect-[4/3]">
        <div
          data-testid="last-observation"
          className="absolute z-10 w-full rounded-t-lg bg-black/35 p-1.5 text-primary-foreground"
        >
          {specie.common_name || specie.name}
        </div>
        <SpecieImage imageUrl={specie.medium_url} />
      </div>
    </GenericTuple>
  );
}
