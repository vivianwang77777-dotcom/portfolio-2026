"use client";

import { Container } from "@/components/layout/Container";
import {
  navLinkCompactStyles,
  navLinkDarkIdleStyles,
  navLinkIdleStyles,
  navPillCompactPadding,
  navPillDarkStyles,
  navPillStyles,
} from "@/components/layout/nav-styles";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ProjectBackNavProps = {
  /** 深色项目页使用暗色胶囊，浅色页使用与首页一致的亮色胶囊 */
  tone?: "light" | "dark";
  className?: string;
};

export function ProjectBackNav({ tone = "light", className }: ProjectBackNavProps) {
  const reducedMotion = useReducedMotion();
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 pt-6 pb-5 sm:pt-8 sm:pb-6",
        className,
      )}
    >
      <Container className="pointer-events-auto flex justify-start">
        <motion.div
          className={cn(
            "inline-flex items-center",
            navPillCompactPadding,
            isDark ? navPillDarkStyles : navPillStyles,
          )}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/#work"
            className={cn(
              navLinkCompactStyles,
              isDark ? navLinkDarkIdleStyles : navLinkIdleStyles,
              "inline-flex items-center gap-1.5",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Back to work
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
