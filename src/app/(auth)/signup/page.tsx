import { AuthCard } from "@/features/auth/components/AuthCard";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <AuthCard title="Create account" subtitle="Join your dental group">
      <SignupForm />
    </AuthCard>
  );
}
