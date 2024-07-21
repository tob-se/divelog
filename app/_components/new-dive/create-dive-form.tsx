"use client";

import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { getNextDiveTime } from "@/lib/utils";
import { DiveTime } from "@/types/dive-time";
import { Place } from "@/types/place";
import { useState } from "react";
import { useFormState } from "react-dom";
import { newDive } from "../../_actions/new-dive.action";
import DiveFormCard from "../shared/dive-form-card";

const initialState: DiveFormState = { message: undefined, errors: undefined };

export default function CreateDiveForm({
  diveNumber,
  lastPlace,
  lastDate,
  lastDiveTime,
}: {
  diveNumber: number;
  lastPlace?: Place;
  lastDate?: string;
  lastDiveTime?: DiveTime;
}) {
  const [place, setPlace] = useState<Place | undefined>(lastPlace);

  const actionWithState = newDive.bind(null, { place });
  const [state, dispatch] = useFormState(actionWithState, initialState);

  useMessageToast("Failed to create dive", state);

  const nextDiveTime = getNextDiveTime(lastDate, lastDiveTime);

  return (
    <form action={dispatch}>
      <DiveFormCard
        place={place}
        setPlace={setPlace}
        diveNumber={diveNumber}
        nextDiveTime={nextDiveTime}
        formState={state}
      />
    </form>
  );
}
