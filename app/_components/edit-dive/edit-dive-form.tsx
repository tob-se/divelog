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
  const { date: initialDate, place: initialPlace, id, number } = dive;

  const [date, setDate] = useState<Date>(initialDate);
  const [place, setPlace] = useState<Place | undefined>(initialPlace);

  const actionWithState = editDive.bind(null, { date, place, id });
  const [state, dispatch] = useFormState(actionWithState, initialState);

  useMessageToast("Failed to edit dive", state);

  return (
    <form action={dispatch}>
      <DiveFormCard
        date={date}
        place={place}
        setDate={setDate}
        dive={dive}
        setPlace={setPlace}
        diveNumber={number}
        formState={state}
      />
    </form>
  );
}
