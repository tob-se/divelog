import { DiveService } from "@/domain/service/dive-service";
import CreateDiveForm from "../_components/new-dive/create-dive-form";

export default async function NewDive() {
  const dive = await DiveService.getLastDive();

  return (
    <CreateDiveForm
      diveNumber={dive ? dive.number + 1 : 1}
      lastPlace={dive?.place}
      lastDate={dive?.date}
    />
  );
}
