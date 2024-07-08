"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="sm"
      variant="destructive"
      className="h-8"
      disabled={pending}
      data-testid="delete-button"
    >
      Delete
    </Button>
  );
};
