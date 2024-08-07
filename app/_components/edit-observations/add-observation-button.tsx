"use client";

import { Specie } from "@/types/specie";
import { MouseEvent } from "react";
import { Button } from "../ui/button";
import { useObservationContext } from "./observation-context";
import { Plus } from "lucide-react";

function AddObservationButton({ specie }: { specie: Specie }) {
  const { editObservation, findObservation } = useObservationContext();

  const observation = findObservation(specie.id);

  const addObservation = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (observation) {
      editObservation({ amount: observation.amount + 1, specie });
    } else {
      editObservation({ amount: 1, specie });
    }
  };

  return (
    <Button
      data-testid="add-observation-button"
      variant="outline"
      className="ml-auto h-8 w-8 p-1.5"
      onClick={addObservation}
    >
      {observation?.amount || <Plus />}
    </Button>
  );
}

export default AddObservationButton;
