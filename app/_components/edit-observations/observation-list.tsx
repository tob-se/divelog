"use client";

import { ListSeparator } from "@/app/_components/ui/separator";
import { Observation } from "@/types/observation";
import { Fragment, useEffect } from "react";
import SpecieListItem from "../shared/specie-list-item";
import DeleteObservationButton from "./delete-observation-button";
import EditObservationButton from "./edit-observation-button";
import { useObservationContext } from "./observation-context";
import EmptyList from "../shared/empty-list";

const List = ({ observations }: { observations: Observation[] }) => {
  return (
    <ul className="flex flex-col gap-1 overflow-y-auto">
      {observations.map((o, index) => (
        <Fragment key={o.specie.id}>
          <SpecieListItem specie={o.specie} data-testid="observation-list-item">
            <div className="ml-auto flex flex-row gap-2">
              <EditObservationButton observation={o} />
              <DeleteObservationButton specieId={o.specie.id} />
            </div>
          </SpecieListItem>
          <ListSeparator length={observations.length} index={index} />
        </Fragment>
      ))}
    </ul>
  );
};

export default function ObservationList({
  initialObservations,
}: {
  initialObservations: Observation[];
}) {
  const { observations, setObservations } = useObservationContext();

  useEffect(() => {
    if (!observations) {
      setObservations(initialObservations);
    }
  }, [initialObservations, observations, setObservations]);

  if (
    (!observations && initialObservations.length === 0) ||
    observations?.length === 0
  ) {
    return <EmptyList testId="no-observations" message="no observations yet" />;
  }

  return <List observations={observations || initialObservations} />;
}
