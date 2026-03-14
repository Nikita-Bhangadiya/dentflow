export default function AnalyticsLoading() {
  return (
    <div className="p-6 sm:p-8 animate-pulse space-y-6">
      <div className="h-8 w-40 rounded bg-muted" />
      <div className="h-4 w-64 rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-24 rounded-lg bg-muted" />
        <div className="h-24 rounded-lg bg-muted" />
      </div>
      <div className="h-[200px] rounded-lg bg-muted" />
    </div>
  );
}
