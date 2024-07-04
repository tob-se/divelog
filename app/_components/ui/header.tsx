import { ChevronLeft, X } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { Button } from "./button";

function Header<T extends string>({
  href,
  name,
}: {
  href: Route<T> | URL;
  name: string;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <Link href={href}>
          <Button
            data-testid="back-button"
            variant="outline"
            size="icon"
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name}
        </h1>
      </div>
      <Link href={"/"}>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          data-testid="close-button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
    </div>
  );
}

export default Header;
