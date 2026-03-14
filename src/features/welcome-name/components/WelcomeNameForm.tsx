"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { welcomeNameSchema, type WelcomeNameInput } from "../schemas";
import { saveWelcomeNameAction } from "../actions/saveWelcomeName";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WelcomeNameForm() {
  const [state, formAction, isPending] = useActionState(
    saveWelcomeNameAction,
    undefined
  );

  const {
    register,
    formState: { errors },
  } = useForm<WelcomeNameInput>({
    resolver: zodResolver(welcomeNameSchema),
    defaultValues: { name: "" },
  });

  const errorId = "name-error";

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground font-medium">
          Your name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          minLength={1}
          maxLength={100}
          disabled={isPending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId : undefined}
          className="min-h-[44px] border-border bg-background/80 transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          {...register("name")}
        />
        {errors.name && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      {state && !state.success && (
        <p id="form-state-error" className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}
      <Button
        type="submit"
        variant="gradient"
        disabled={isPending}
        className="w-full min-h-[44px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        {isPending ? "Saving…" : "Save name"}
      </Button>
    </form>
  );
}
