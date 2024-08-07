"use client";

import EditObservationForm from "@/app/_components/edit-observations/edit-observation-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Specie } from "@/types/specie";

function ObservationAmountDialog({
  children,
  specie,
}: {
  specie: Specie;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[20%] sm:max-w-80">
        <DialogHeader>
          <DialogTitle>{specie.common_name}</DialogTitle>
          <DialogDescription>How many did you see?</DialogDescription>
        </DialogHeader>
        <EditObservationForm specie={specie} />
      </DialogContent>
    </Dialog>
  );
}

export default ObservationAmountDialog;
