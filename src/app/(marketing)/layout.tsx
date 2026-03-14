import type { ReactNode } from "react";
import { MarketingThemeWrapper } from "@/components/theme/MarketingThemeWrapper";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <MarketingThemeWrapper>{children}</MarketingThemeWrapper>;
}
