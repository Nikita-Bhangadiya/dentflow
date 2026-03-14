"use client";

import Link from "next/link";
import { DentFlowBrand } from "@/components/shared/DentFlowBrand";
import { DoraGlassLink } from "@/components/ui/DoraGlassLink";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/10 border-b border-white/10">
      <div className="flex items-center gap-2">
        <DentFlowBrand />
      </div>
      <div className="hidden md:flex items-center gap-8 text-base font-medium">
        <Link href="#features" className="hover:text-primary transition-colors">
          Features
        </Link>
        <Link href="#solutions" className="hover:text-primary transition-colors">
          Solutions
        </Link>
        <Link href="#about" className="hover:text-primary transition-colors">
          About
        </Link>
        <Link href="#contact" className="hover:text-primary transition-colors">
          Contact
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-base font-medium hover:text-primary transition-colors">
          Log in
        </Link>
        <DoraGlassLink href="/signup" className="text-base">
          Get Started
        </DoraGlassLink>
      </div>
    </nav>
  );
}
