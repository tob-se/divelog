import { ObservationService } from "@/domain/service/observation-service";
import ObservationList from "./observation-list";

export default async function Observations({ diveId }: { diveId: string }) {
  const observations = await ObservationService.getObservations(diveId);

  return <ObservationList initialObservations={observations} />;
}
