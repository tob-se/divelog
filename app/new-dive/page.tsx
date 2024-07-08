import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import CreateDiveForm from "../_components/new-dive/create-dive-form";

export default async function NewDive() {
  const dive = await findLastDive();

  if (!dive) {
    return <CreateDiveForm diveNumber={1} />;
  }

  return (
    <CreateDiveForm
      diveNumber={dive.number + 1}
      lastPlace={dive.place}
      lastDate={dive.date}
      lastDiveTime={dive.dive_time}
    />
  );
}
