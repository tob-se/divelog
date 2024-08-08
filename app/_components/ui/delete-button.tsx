"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="sm"
      variant="destructive"
      disabled={pending}
      data-testid="delete-button"
    >
      Delete
    </Button>
  );
};
