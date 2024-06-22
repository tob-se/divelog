import { DiveService } from "@/domain/service/dive-service";
import EditDiveForm from "../../../_components/edit-dive/edit-dive-form";

export default async function EditDive({ params }: { params: { id: string } }) {
  const dive = await DiveService.getDive(params.id);

  return <EditDiveForm dive={dive} />;
}
