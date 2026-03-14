"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  label: string;
  autoComplete?: string;
}

export function PasswordInput({
  name,
  placeholder,
  label,
  autoComplete,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full min-h-[44px] rounded-xl border border-input bg-background/10 px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
