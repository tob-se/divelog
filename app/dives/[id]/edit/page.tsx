import { findDiveById } from "@/infrastructure/data-access/find-dive-by-id";
import { notFound } from "next/navigation";
import EditDiveForm from "../../../_components/edit-dive/edit-dive-form";

export default async function EditDive({ params }: { params: { id: string } }) {
  const dive = await findDiveById(params.id);

  if (!dive) {
    notFound();
  }

  return <EditDiveForm dive={dive} />;
}
