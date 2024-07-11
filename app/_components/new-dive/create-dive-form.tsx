"use client";

import { DiveFormState } from "@/app/_actions/form-states/dive-form-state";
import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { todayWithoutTimezone } from "@/lib/utils";
import { DiveTime } from "@/types/dive-time";
import { Place } from "@/types/place";
import { useState } from "react";
import { useFormState } from "react-dom";
import { newDive } from "../../_actions/new-dive.action";
import DiveFormCard from "../shared/dive-form-card";

const isToday = (date: string) => {
  const today = todayWithoutTimezone();
  return date === today;
};

const getNextDiveTime = (date?: string, time?: DiveTime) => {
  if (!date || !isToday(date)) return "morning";

  if (time === "morning") return "noon";
  if (time === "noon") return "afternoon";
  if (time === "afternoon") return "night";

  return "morning";
};

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
