"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface BoardScrollNavigatorProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

/**
 * Horizontal scroll position widget (Jira-style). Shows a thumb for viewport position;
 * click or drag on the track to scroll the board smoothly.
 */
export function BoardScrollNavigator({ scrollRef, className }: BoardScrollNavigatorProps) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateFromEl = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollLeft(el.scrollLeft);
    setScrollWidth(el.scrollWidth);
    setClientWidth(el.clientWidth);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFromEl();
    el.addEventListener("scroll", updateFromEl);
    const ro = new ResizeObserver(updateFromEl);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFromEl);
      ro.disconnect();
    };
  }, [scrollRef, updateFromEl]);

  const maxScroll = Math.max(0, scrollWidth - clientWidth);
  if (maxScroll <= 0) return null;

  const thumbWidthPct = (clientWidth / scrollWidth) * 100;
  const thumbLeftPct = (scrollLeft / scrollWidth) * 100;

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const el = scrollRef.current;
    if (!track || !el) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    el.scrollTo({ left: pct * maxScroll, behavior: "smooth" });
  }

  function handleThumbMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startScroll = scrollRef.current?.scrollLeft ?? 0;

    function onMove(moveEvent: MouseEvent) {
      const dx = moveEvent.clientX - startX;
      const track = trackRef.current;
      if (!track || !scrollRef.current) return;
      const scale = track.offsetWidth / maxScroll;
      const newLeft = Math.max(0, Math.min(maxScroll, startScroll + dx * scale));
      scrollRef.current.scrollLeft = newLeft;
    }
    function onUp() {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  return (
    <div
      role="scrollbar"
      aria-orientation="horizontal"
      aria-valuenow={scrollLeft}
      aria-valuemin={0}
      aria-valuemax={maxScroll}
      className={cn("flex items-center gap-2", className)}
    >
      <span className="text-xs text-muted-foreground whitespace-nowrap">Scroll</span>
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="h-2 flex-1 min-w-[80px] max-w-[200px] rounded-full bg-muted/60 cursor-pointer hover:bg-muted transition-colors relative"
      >
        <div
          className={cn(
            "absolute top-0 h-full rounded-full bg-primary/70 hover:bg-primary transition-colors",
            isDragging && "bg-primary"
          )}
          style={{
            width: `${thumbWidthPct}%`,
            left: `${thumbLeftPct}%`,
          }}
          onMouseDown={handleThumbMouseDown}
          role="slider"
          tabIndex={0}
          aria-valuenow={scrollLeft}
          aria-valuemin={0}
          aria-valuemax={maxScroll}
        />
      </div>
    </div>
  );
}
