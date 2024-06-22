import GenericTuple from "@/app/_components/ui/generic-tuple";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { ObservationService } from "@/domain/service/observation-service";
import { Fish } from "lucide-react";
import Image from "next/image";

export function LastObservedSpecieFallback() {
  return (
    <GenericTuple title="Last Observation">
      <Skeleton className="aspect-[4/3] w-full" />
    </GenericTuple>
  );
}

export async function LastObservedSpecie() {
  const specie = await ObservationService.getLastObservedSpecie();

  if (!specie) {
    return null;
  }

  return (
    <GenericTuple title="Last Observation">
      <div className="relative aspect-[4/3]">
        <div className="absolute z-10 w-full rounded-t-lg bg-black/35 p-1.5 text-sm text-primary-foreground">
          {specie.common_name || specie.name}
        </div>
        {specie.medium_url ? (
          <Image
            src={specie.medium_url}
            fill
            style={{
              objectFit: "cover",
            }}
            alt="Specie Image"
            className="rounded-lg"
          />
        ) : (
          <Fish
            color="dimgray"
            height={80}
            width={80}
            className="m-auto h-full"
          />
        )}
      </div>
    </GenericTuple>
  );
}
