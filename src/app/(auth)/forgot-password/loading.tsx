export default function ForgotPasswordLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="glass-surface rounded-[32px] p-8 sm:p-10 animate-pulse">
        <div className="h-8 w-52 rounded bg-white/10" />
        <div className="mt-1 h-4 w-full rounded bg-white/10" />
        <div className="mt-6 space-y-4">
          <div className="h-[44px] w-full rounded-lg bg-white/10" />
          <div className="h-[44px] w-full rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
