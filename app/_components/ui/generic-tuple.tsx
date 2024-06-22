import { cn } from "@/lib/utils";

function GenericTuple({
  title,
  children,
  className,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid auto-rows-max gap-1", className)}>
      <div className="font-semibold">{title}</div>
      {children}
    </div>
  );
}

export default GenericTuple;
