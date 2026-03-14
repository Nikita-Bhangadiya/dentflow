import { AuthCard } from "@/features/auth/components/AuthCard";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset password" subtitle="We'll email you a reset link">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
