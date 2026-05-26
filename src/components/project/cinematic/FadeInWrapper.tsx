"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type FadeInWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeInWrapper({
  children,
  className,
  delay = 0,
  y = 28,
}: FadeInWrapperProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.9,
        delay: reducedMotion ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
