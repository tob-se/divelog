"use client";

import { GenericFormState } from "@/app/_actions/form-states/generic-form-state";
import { DeleteButton } from "@/app/_components/ui/delete-button";
import { useMessageToast } from "@/app/_hooks/useMessageToast";
import { useFormState } from "react-dom";
import { removeDive } from "../../_actions/remove-dive.action";

const initialState: GenericFormState = {
  message: undefined,
};

function DeleteDiveForm({ id }: { id: string }) {
  const deleteDiveWithId = removeDive.bind(null, id);
  const [state, dispatch] = useFormState(deleteDiveWithId, initialState);

  useMessageToast("Failed to delete dive", state);

  return (
    <form action={dispatch}>
      <DeleteButton />
    </form>
  );
}

export default DeleteDiveForm;
