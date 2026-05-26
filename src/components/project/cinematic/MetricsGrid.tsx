"use client";

import type { ProjectMetricItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type MetricsGridProps = {
  metrics: ProjectMetricItem[];
  className?: string;
};

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  const reducedMotion = useReducedMotion();

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6",
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={`${metric.label}-${metric.value}`}
          className="glass-card cinematic-metric-card group rounded-2xl p-5 sm:p-6 lg:p-7"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 0.7,
            delay: reducedMotion ? 0 : index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={reducedMotion ? undefined : { y: -4 }}
        >
          {metric.label ? (
            <>
              <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs">
                {metric.label}
              </dt>
              <dd className="cinematic-title-gradient mt-3 font-serif text-2xl tracking-tight transition-opacity group-hover:opacity-90 sm:text-3xl lg:text-4xl">
                {metric.value}
              </dd>
            </>
          ) : (
            <dd className="cinematic-text-secondary text-sm leading-relaxed sm:text-base">
              {metric.value}
            </dd>
          )}
        </motion.div>
      ))}
    </dl>
  );
}
