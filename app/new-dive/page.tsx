import { findLastDive } from "@/infrastructure/data-access/find-last-dive";
import CreateDiveForm from "../_components/new-dive/create-dive-form";

export default async function NewDive() {
  const dive = await findLastDive();

  return (
    <CreateDiveForm
      diveNumber={dive ? dive.number + 1 : 1}
      lastPlace={dive?.place}
      lastDate={dive?.date}
    />
  );
}
