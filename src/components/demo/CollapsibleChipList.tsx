"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function CollapsibleChipList({
  children,
  collapsedRowCount = 2,
  expandLabel = "Περισσότερα",
  collapseLabel = "Λιγότερα",
}: {
  children: ReactNode;
  collapsedRowCount?: number;
  expandLabel?: string;
  collapseLabel?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [overflows, setOverflows] = useState(false);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const first = list.firstElementChild;
    if (!first) {
      setOverflows(false);
      setCollapsedHeight(null);
      return;
    }
    const styles = window.getComputedStyle(list);
    const gap = Number.parseFloat(styles.rowGap || styles.gap || "0") || 0;
    const height = Math.round(
      first.getBoundingClientRect().height * collapsedRowCount + gap * Math.max(collapsedRowCount - 1, 0),
    );
    const doesOverflow = list.scrollHeight > height + 1;
    setCollapsedHeight((current) => (current === height ? current : height));
    setOverflows((current) => (current === doesOverflow ? current : doesOverflow));
  }, [collapsedRowCount]);

  useLayoutEffect(() => {
    measure();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const collapsed = overflows && !expanded;

  return (
    <div>
      <div className="relative" style={collapsed && collapsedHeight !== null ? { maxHeight: collapsedHeight, overflow: "hidden" } : undefined}>
        <div className="flex flex-wrap gap-2" ref={listRef}>
          {children}
        </div>
        {collapsed ? (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        ) : null}
      </div>
      {overflows ? (
        <button
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          <span>{expanded ? collapseLabel : expandLabel}</span>
          <span aria-hidden>{expanded ? "↑" : "↓"}</span>
        </button>
      ) : null}
    </div>
  );
}
