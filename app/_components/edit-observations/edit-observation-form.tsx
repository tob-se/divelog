import { DialogFooter } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Observation } from "@/types/observation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "../ui/submit-button";
import { useObservationContext } from "./observation-context";

function EditObservationForm({
  observation,
  onSubmit,
}: {
  observation: Observation;
  onSubmit: () => void;
}) {
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

      onSubmit();
    }
  };

  return (
    <form action={action} className="p-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          autoFocus
          className="w-24"
          type="number"
          min={1}
          defaultValue={observation.amount}
          data-testid="amount-input"
          required
        />
      </div>
      <DialogFooter className="pt-5">
        <SubmitButton testId="submit-observation-button" />
      </DialogFooter>
    </form>
  );
}

export default EditObservationForm;
