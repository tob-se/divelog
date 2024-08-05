import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Observation } from "@/types/observation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useObservationContext } from "./observation-context";

function EditObservationForm({ observation }: { observation: Observation }) {
  const { editObservation } = useObservationContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const action = (formData: FormData) => {
    const amountText = formData.get("amount")?.toString();

    if (amountText) {
      const amount = parseInt(amountText);
      editObservation({ amount, specie: observation.specie });

      const params = new URLSearchParams(searchParams);
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form action={action}>
      <div className="flex items-center gap-4">
        <Label htmlFor="amount" className="text-right">
          Amount
        </Label>
        <Input
          id="amount"
          name="amount"
          className="w-full"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={observation.amount}
          data-testid="amount-input"
          required
        />
      </div>
      <DialogFooter className="pt-5">
        <DialogClose asChild>
          <Button
            size="sm"
            type="submit"
            data-testid="submit-observation-button"
          >
            Confirm
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}

export default EditObservationForm;
