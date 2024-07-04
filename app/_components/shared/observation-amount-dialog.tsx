import EditObservationForm from "@/app/_components/edit-observations/edit-observation-form";
import SpecieSummary from "@/app/_components/edit-observations/specie-summary";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Observation } from "@/types/observation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Fish } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function ObservationAmountDialog({
  children,
  observation,
}: {
  observation: Observation;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { specie } = observation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-sm gap-0 space-y-0 border-0 p-0">
        <VisuallyHidden.Root>
          <DialogTitle>Amount</DialogTitle>
        </VisuallyHidden.Root>
        <div className="relative aspect-[4/3]">
          {specie.medium_url ? (
            <Image
              src={specie.medium_url}
              fill
              style={{
                objectFit: "cover",
              }}
              alt="Fish"
              className="rounded-t-lg"
            />
          ) : (
            <Fish
              color="dimgray"
              height={80}
              width={80}
              className="m-auto h-full"
            />
          )}
        </div>
        {specie.wikipedia_url && (
          <SpecieSummary wikipedia_url={specie.wikipedia_url} />
        )}
        <EditObservationForm
          observation={observation}
          onSubmit={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ObservationAmountDialog;
