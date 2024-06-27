import { findObservationsByDiveId } from "@/infrastructure/data-access/find-observations-by-id";
import ObservationList from "./observation-list";

export default async function Observations({ diveId }: { diveId: string }) {
  const observations = await findObservationsByDiveId(diveId);

  return <ObservationList initialObservations={observations} />;
}
