"use client";

import { ListSeparator } from "@/app/_components/ui/separator";
import { Specie } from "@/types/specie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import ObservationAmountDialog from "../shared/observation-amount-dialog";
import SpecieListItem from "../shared/specie-list-item";
import { Button } from "../ui/button";
import { useObservationContext } from "./observation-context";

export default function SpecieList({ species }: { species: Specie[] }) {
  const { observations, editObservation } = useObservationContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toIgnore = observations?.map((o) => o.specie.id) || [];
  const filteredSpecies = species.filter((s) => !toIgnore.includes(s.id));

  const addObservation = (specie: Specie) => {
    editObservation({ amount: 1, specie });

    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="flex flex-col gap-1 overflow-y-auto">
      {filteredSpecies.map((specie, index) => (
        <Fragment key={specie.id}>
          <ObservationAmountDialog observation={{ specie, amount: 1 }}>
            <SpecieListItem
              specie={specie}
              className="cursor-pointer hover:bg-slate-100 hover:text-slate-900"
              data-testid="specie-list-item"
            >
              <Button
                data-testid="edit-observation-button"
                variant="outline"
                className="ml-auto h-8 w-8 p-1.5"
                onClick={(e) => addObservation(specie)}
              >
                1
              </Button>
            </SpecieListItem>
          </ObservationAmountDialog>
          <ListSeparator length={filteredSpecies.length} index={index} />
        </Fragment>
      ))}
    </ul>
  );
}
