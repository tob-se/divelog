import GenericTuple from "./generic-tuple";

function TextTuple({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GenericTuple title={title} className={className}>
      <div className="text-muted-foreground">{children}</div>
    </GenericTuple>
  );
}

export default TextTuple;
