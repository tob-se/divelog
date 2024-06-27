"use client";

import ObservationAmountDialog from "@/app/_components/shared/observation-amount-dialog";
import { ListSeparator } from "@/app/_components/ui/separator";
import { Fragment } from "react";
import SpecieListItem from "../shared/specie-list-item";
import { useObservationContext } from "./observation-context";
import { Specie } from "@/types/specie";

export default function SpecieList({ species }: { species: Specie[] }) {
  const { observations } = useObservationContext();

  const toIgnore = observations?.map((o) => o.specie.id) || [];
  const filteredSpecies = species.filter((s) => !toIgnore.includes(s.id));

  return (
    <ul className="flex flex-col gap-1 overflow-y-auto">
      {filteredSpecies.map((specie, index) => (
        <Fragment key={specie.id}>
          <ObservationAmountDialog observation={{ specie, amount: 1 }}>
            <SpecieListItem
              specie={specie}
              className="cursor-pointer hover:bg-slate-100 hover:text-slate-900"
            />
          </ObservationAmountDialog>
          <ListSeparator length={filteredSpecies.length} index={index} />
        </Fragment>
      ))}
    </ul>
  );
}
