export default function EmptyList({ message }: { message: string }) {
  return (
    <div
      data-testid="empty-list"
      className="rounded-sm bg-slate-50 p-2 outline-none"
    >
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
}
