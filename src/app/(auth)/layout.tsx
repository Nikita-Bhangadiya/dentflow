import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="marketing"
      className="hero-cosmic relative min-h-screen flex items-center justify-center p-4"
    >
      {children}
    </div>
  );
}
