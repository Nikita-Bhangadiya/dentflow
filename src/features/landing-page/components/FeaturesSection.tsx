"use client";

import { m, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { Settings2, Zap, Heart, BarChart3 } from "lucide-react";
import { MouseEvent as ReactMouseEvent } from "react";

const features = [
  {
    title: "Optimize Operations",
    description: "Streamline your daily dental practice tasks with AI-driven scheduling and resource management.",
    icon: Settings2,
    color: "text-blue-400",
  },
  {
    title: "Boost Efficiency",
    description: "Automate patient follow-ups and reminders to minimize no-shows and maximize throughput.",
    icon: Zap,
    color: "text-orange-400",
  },
  {
    title: "Patient Satisfaction",
    description: "Enhance the patient experience with personalized communication and seamless digital intake.",
    icon: Heart,
    color: "text-red-400",
  },
  {
    title: "Real-time Analytics",
    description: "Make data-driven decisions with comprehensive dashboards and predictive performance metrics.",
    icon: BarChart3,
    color: "text-green-400",
  },
];

function FeatureCard({ feature, idx }: { feature: typeof features[0], idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div
      key={idx}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative p-8 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-colors group cursor-default overflow-hidden"
    >
      {/* Local Spotlight Effect */}
      <m.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`relative w-12 h-12 mb-6 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 ${feature.color}`}>
        <feature.icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
        {feature.description}
      </p>

      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent -mr-12 -mt-12 rounded-full blur-2xl" />
    </m.div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Powerful Features for <br />
              <span className="text-brand-gradient">Modern Dental Groups</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of your dental group with DentFlow's comprehensive suite of tools designed for excellence.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
