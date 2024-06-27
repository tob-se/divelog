"use client";

import { GenericFormState } from "@/app/_actions/form-states/generic-form-state";
import { Button } from "@/app/_components/ui/button";
import SubmitButton from "@/app/_components/ui/submit-button";
import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { toEditObservations } from "@/types/edit-observations";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFormState } from "react-dom";
import { editObservations } from "../../_actions/edit-observations.action";
import { useObservationContext } from "./observation-context";

const initialState: GenericFormState = {
  message: undefined,
};

function SubmitObservationForm() {
  const { id } = useParams<{ id: string }>();
  const { observations } = useObservationContext();

  const actionWithState = editObservations.bind(
    null,
    toEditObservations(id, observations),
  );

  const [state, dispatch] = useFormState(actionWithState, initialState);

  useMessageToast("Failed to edit observations", state);

  return (
    <form
      action={dispatch}
      className="flex w-full items-center justify-between gap-2"
    >
      <Link href={`/dives/${id}`}>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </Link>
      <SubmitButton />
    </form>
  );
}

export default SubmitObservationForm;
