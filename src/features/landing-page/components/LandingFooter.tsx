"use client";

import Link from "next/link";
import { DentFlowBrand } from "@/components/shared/DentFlowBrand";
import { FadeIn } from "@/components/motion/FadeIn";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Solutions", href: "#solutions" },
      { label: "Pricing", href: "#" },
      { label: "Releases", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="relative pb-12 pt-0 px-6 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <DentFlowBrand />
            <p className="mt-6 text-muted-foreground max-w-xs leading-relaxed">
              The AI-powered operations platform built for modern dental groups and DSOs looking to scale with efficiency.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DentFlow. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              {/* Simple dot for placeholder icon */}
              <div className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <div className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer background glow to connect with CTA orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-brand/5 to-transparent pointer-events-none -z-10" />
    </footer>
  );
}
