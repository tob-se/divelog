import { ListSeparator } from "@/app/_components/ui/separator";
import { Specie } from "@/types/specie";
import { Fragment } from "react";
import ObservationAmountDialog from "../shared/observation-amount-dialog";
import SpecieListItem from "../shared/specie-list-item";
import AddObservationButton from "./add-observation-button";

function SpecieList({ species }: { species: Specie[] }) {
  return (
    <ul className="flex flex-col gap-1 overflow-y-auto">
      {species.map((specie, index) => (
        <Fragment key={specie.id}>
          <ObservationAmountDialog specie={specie}>
            <SpecieListItem
              specie={specie}
              className="cursor-pointer hover:bg-slate-100 hover:text-slate-900"
              data-testid="specie-list-item"
            >
              <AddObservationButton specie={specie} />
            </SpecieListItem>
          </ObservationAmountDialog>
          <ListSeparator length={species.length} index={index} />
        </Fragment>
      ))}
    </ul>
  );
}

export default SpecieList;
