"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function SubmitButton({ testId = "submit-button" }) {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" type="submit" disabled={pending} data-testid={testId}>
      Save
    </Button>
  );
}

export default SubmitButton;
