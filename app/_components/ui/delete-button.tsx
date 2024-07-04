"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="sm"
      variant="outline"
      className="h-8 bg-red-100 hover:bg-red-300"
      disabled={pending}
      data-testid="delete-button"
    >
      Delete
    </Button>
  );
};
