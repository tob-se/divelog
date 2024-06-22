import ObservationAmountDialog from "@/app/_components/shared/observation-amount-dialog";
import { Button } from "@/app/_components/ui/button";
import { Observation } from "@/domain/observation";

function EditObservationButton({ observation }: { observation: Observation }) {
  return (
    <ObservationAmountDialog observation={observation}>
      <Button variant="outline" className="h-8 w-8 p-1.5">
        {observation.amount}
      </Button>
    </ObservationAmountDialog>
  );
}

export default EditObservationButton;
