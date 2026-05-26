"use client";

import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/content";
import { UnicornStudioHero } from "@/components/sections/UnicornStudioHero";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden bg-background pt-[var(--nav-height)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 gradient-mesh opacity-60"
      />

      <Container className="relative max-w-6xl">
        <motion.div
          className="grid min-h-[calc(100svh-var(--nav-height))] grid-cols-1 items-center gap-10 py-14 sm:gap-12 sm:py-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:py-20 lg:gap-14 lg:py-24 xl:py-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 左栏 — 文案 */}
          <div className="flex min-w-0 flex-col md:pr-6 lg:pr-10">
            <motion.p
              variants={itemVariants}
              className="font-mono text-xs uppercase tracking-[0.28em] text-muted"
            >
              {hero.eyebrow} · {siteConfig.year}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:mt-7 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06] xl:text-6xl"
            >
              {hero.title}
              <span className="mt-1 block text-muted">{hero.titleMuted}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg whitespace-pre-line text-base leading-[1.75] text-pretty text-muted sm:mt-7 sm:text-[17px] sm:leading-[1.8]"
            >
              {hero.description}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base font-medium leading-[1.7] text-pretty sm:mt-7 sm:text-lg"
            >
              <span className="text-gradient-hero">{hero.highlight}</span>
            </motion.p>
          </div>

          {/* 右栏 — Unicorn Studio 动画 */}
          <motion.div
            variants={itemVariants}
            className="flex shrink-0 justify-center md:justify-end"
          >
            <div className="relative aspect-square w-[13.5rem] max-w-full overflow-hidden rounded-[1.75rem] border border-border/50 bg-transparent shadow-[0_12px_48px_rgba(0,0,0,0.06)] sm:w-[14.5rem] lg:w-[16rem] xl:w-[17rem]">
              <UnicornStudioHero
                projectId={hero.unicornStudioProjectId}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
