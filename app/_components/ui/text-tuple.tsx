import GenericTuple from "./generic-tuple";

function TextTuple({
  title,
  children,
  className,
  testId,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <GenericTuple title={title} className={className}>
      <div
        data-testid={testId}
        className="whitespace-pre-wrap text-muted-foreground"
      >
        {children}
      </div>
    </GenericTuple>
  );
}

export default TextTuple;
