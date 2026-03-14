"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { SlideUp } from "@/components/motion/SlideUp";
import { DoraGlassLink } from "@/components/ui/DoraGlassLink";
import { DoraGlassButton } from "@/components/ui/DoraGlassButton";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8 z-10 text-center lg:text-left">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Elevate Your <br />
              <span className="text-brand-gradient">Dental Practice</span>
            </h1>
          </SlideUp>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              An AI-powered dental practice operations platform for dental groups (DSOs). 
              Streamline workflows, boost efficiency, and improve patient satisfaction.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <DoraGlassLink 
                href="/signup" 
                className="text-lg"
                innerClassName="px-10 py-4 min-w-[180px]"
              >
                Get Started
              </DoraGlassLink>
              <DoraGlassButton 
                variant="ghost"
                showSweep={false}
                className="text-lg border-white/20"
                innerClassName="px-10 py-4 min-w-[180px] bg-white/5 backdrop-blur-sm"
              >
                Watch Demo
              </DoraGlassButton>
            </div>
          </FadeIn>
        </div>

        <div className="relative z-0 flex justify-center lg:justify-end">
          <FadeIn delay={0.6} className="relative w-full aspect-square max-w-[600px]">
            <div className="absolute inset-0 bg-brand/10 blur-[100px] rounded-full" />
            <Image
              src="/assets/landing-page/HUvthn3EnVMHGxt6gPlzOw.webp"
              alt="DentFlow Hero"
              fill
              className="object-contain"
              priority
            />
          </FadeIn>
        </div>
      </div>

      {/* Background orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full" />
    </section>
  );
}
