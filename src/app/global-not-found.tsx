import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-foreground">
        <h1 className="font-heading text-2xl font-semibold">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Go home
        </Link>
      </body>
    </html>
  );
}
