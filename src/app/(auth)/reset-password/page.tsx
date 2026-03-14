import { AuthCard } from "@/features/auth/components/AuthCard";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Set new password">
      <ResetPasswordForm />
    </AuthCard>
  );
}
