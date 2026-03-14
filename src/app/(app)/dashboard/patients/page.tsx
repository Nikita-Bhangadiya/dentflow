import { FadeIn } from "@/components/motion/FadeIn";

export default function PatientsPage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <h1 className="text-2xl font-semibold text-foreground">Patients</h1>
        <p className="mt-1 text-muted-foreground">Patient list — open from Schedule board.</p>
      </FadeIn>
    </div>
  );
}
