import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import DiveForm from "./dive-form";

export default function NewDive() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Log new dive
        </h1>
      </div>
      <DiveForm />
    </>
  );
}
