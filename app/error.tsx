"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "./_components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter text-destructive">
          Oops!
        </h1>
        <p className="text-xl text-muted-foreground">
          Looks like something went wrong. Please try again later.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
