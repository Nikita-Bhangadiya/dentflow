"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { useTheme } from "next-themes";
import type { HourlySlot } from "@/features/analytics/types";

const GRADIENT_ID = "brandBarGradient";

interface ThroughputChartProps {
  data: HourlySlot[];
}

function ChartTooltipContent({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value ?? 0;
  return (
    <div className="rounded-lg border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value} patients</p>
    </div>
  );
}

export function ThroughputChart({ data }: ThroughputChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tickFill = isDark ? "hsl(0, 0%, 98%)" : "hsl(222, 35%, 11%)";

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff8040" />
            <stop offset="100%" stopColor="#0c2354" />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="hour"
          tick={{ fontSize: 12, fill: tickFill }}
          axisLine={{ stroke: tickFill }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: tickFill }}
          axisLine={{ stroke: tickFill }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="patients"
          fill={`url(#${GRADIENT_ID})`}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
