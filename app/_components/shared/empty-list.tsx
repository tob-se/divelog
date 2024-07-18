export default function EmptyList({
  testId,
  message,
}: {
  testId: string;
  message: string;
}) {
  return (
    <div
      data-testid={testId}
      className="rounded-sm bg-slate-50 p-2 outline-none"
    >
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
