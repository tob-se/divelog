import EditObservationForm from "@/app/_components/edit-observations/edit-observation-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Observation } from "@/types/observation";

function ObservationAmountDialog({
  children,
  observation,
}: {
  observation: Observation;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-80">
        <DialogHeader>
          <DialogTitle>{observation.specie.common_name}</DialogTitle>
          <DialogDescription>How many did you see?</DialogDescription>
        </DialogHeader>
        <EditObservationForm observation={observation} />
      </DialogContent>
    </Dialog>
  );
}

export default ObservationAmountDialog;
