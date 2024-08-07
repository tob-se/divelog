"use client";

import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import { Dive } from "@/types/dive";
import { Place } from "@/types/place";
import { useState } from "react";
import { useFormState } from "react-dom";
import { editDive } from "../../_actions/edit-dive.action";
import DiveFormCard from "../shared/dive-form-card";

const initialState: DiveFormState = { message: undefined, errors: undefined };

export default function EditDiveForm({ dive }: { dive: Dive }) {
  const { place: initialPlace, id, number } = dive;

  const [place, setPlace] = useState<Place | undefined>(initialPlace);

  const actionWithState = editDive.bind(null, { place, id });
  const [state, dispatch] = useFormState(actionWithState, initialState);

  useMessageToast("Failed to edit dive", state);

  return (
    <form action={dispatch} className="flex h-full flex-col">
      <DiveFormCard
        place={place}
        dive={dive}
        setPlace={setPlace}
        diveNumber={number}
        formState={state}
      />
    </form>
  );
}
