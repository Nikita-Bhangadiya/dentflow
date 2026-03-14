export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-border" />
        <div className="mt-1 h-4 w-64 animate-pulse rounded bg-border" />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-64 w-52 flex-none animate-pulse rounded-xl border border-border bg-accent/30" />
        ))}
      </div>
    </div>
  );
}
