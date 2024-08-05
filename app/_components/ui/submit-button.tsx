"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function SubmitButton({ testId = "submit-button", text = "Save" }) {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" type="submit" disabled={pending} data-testid={testId}>
      {text}
    </Button>
  );
}

export default SubmitButton;
