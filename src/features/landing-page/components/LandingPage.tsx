"use client";

import { useState, useEffect } from "react";
import { m, useSpring, useMotionValue } from "framer-motion";
import { LandingNav } from "./LandingNav";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { CTASection } from "./CTASection";
import { LandingFooter } from "./LandingFooter";

function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <m.div
      className="pointer-events-none fixed inset-0 z-30 opacity-30"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(113, 92, 222, 0.15), transparent 80%)`,
      }}
    />
  );
}

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <MouseSpotlight />
      <LandingNav />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
