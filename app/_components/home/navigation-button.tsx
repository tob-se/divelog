import { Button } from "@/app/_components/ui/button";
import { Route } from "next";
import Link from "next/link";

function NavigationButton<T extends string>({
  href,
  children,
  name,
  testId,
}: {
  href: Route<T> | URL;
  name: string;
  testId?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} data-testid={testId}>
      <Button
        variant="outline"
        className="flex h-20 w-24 flex-col items-center gap-2"
      >
        {children}
        <span className="text-xs">{name}</span>
      </Button>
    </Link>
  );
}

export default NavigationButton;
