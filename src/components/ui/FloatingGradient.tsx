"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type FloatingGradientProps = {
  className?: string;
  delay?: number;
};

export function FloatingGradient({ className, delay = 0 }: FloatingGradientProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        "bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]",
        className,
      )}
      initial={{ opacity: 0.4 }}
      animate={
        reducedMotion
          ? { opacity: 0.55, y: 0, x: 0, scale: 1 }
          : {
              opacity: [0.45, 0.65, 0.45],
              scale: [1, 1.04, 1],
              y: [0, -18, 0],
              x: [0, 12, 0],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay },
              y: { duration: 9, repeat: Infinity, ease: "easeInOut", delay },
              x: {
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.5,
              },
            }
      }
    />
  );
}
