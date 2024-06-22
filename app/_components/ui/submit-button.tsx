"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" type="submit" disabled={pending}>
      Save
    </Button>
  );
}

export default SubmitButton;
