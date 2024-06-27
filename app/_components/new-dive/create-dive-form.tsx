"use client";

import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import { Place } from "@/types/place";
import { createUTCDate } from "@/lib/utils";
import { useState } from "react";
import { useFormState } from "react-dom";
import { newDive } from "../../_actions/new-dive.action";
import DiveFormCard from "../shared/dive-form-card";

const initialState: DiveFormState = { message: undefined, errors: undefined };

const initDate = (lastDate?: Date) => {
  const today = createUTCDate(new Date(), 0);

  if (
    lastDate &&
    today.getUTCDate() === lastDate.getUTCDate() &&
    today.getUTCMonth() === lastDate.getUTCMonth() &&
    today.getUTCFullYear() === lastDate.getUTCFullYear() &&
    lastDate.getUTCHours() < 18
  ) {
    return createUTCDate(new Date(), lastDate.getUTCHours() + 4);
  }

  return createUTCDate(new Date(), 6);
};

export default function CreateDiveForm({
  diveNumber,
  lastPlace,
  lastDate,
}: {
  diveNumber: number;
  lastPlace?: Place;
  lastDate?: Date;
}) {
  const [date, setDate] = useState<Date>(initDate(lastDate));
  const [place, setPlace] = useState<Place | undefined>(lastPlace);

  const actionWithState = newDive.bind(null, { date, place });
  const [state, dispatch] = useFormState(actionWithState, initialState);

  useMessageToast("Failed to create dive", state);

  return (
    <form action={dispatch}>
      <DiveFormCard
        date={date}
        place={place}
        setDate={setDate}
        setPlace={setPlace}
        diveNumber={diveNumber}
        formState={state}
      />
    </form>
  );
}
