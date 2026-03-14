"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { DoraGlassLink } from "@/components/ui/DoraGlassLink";

export function CTASection() {
  return (
    <section className="pt-24 pb-12 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="glass-surface p-12 lg:p-24 text-center relative z-10 overflow-hidden">
          {/* Subtle inner card glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/10 blur-[100px] -z-10" />
          
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8">
              Discover the Future of <br />
              <span className="text-brand-gradient">Dental Practice</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Join leading dental groups using DentFlow to transform their operations and patient experience.
            </p>
            <DoraGlassLink 
              href="/signup" 
              className="text-xl"
              innerClassName="px-12 py-5 min-w-[220px]"
            >
              Get Started Now
            </DoraGlassLink>
          </FadeIn>
        </div>
      </div>

      {/* Decorative background elements that bridge to footer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full" />
    </section>
  );
}
