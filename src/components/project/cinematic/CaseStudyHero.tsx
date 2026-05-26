"use client";

import { Container } from "@/components/layout/Container";
import { FadeInWrapper } from "@/components/project/cinematic/FadeInWrapper";
import { ImageBlock } from "@/components/project/cinematic/ImageBlock";
import type { Project } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

type CaseStudyHeroProps = {
  project: Project;
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <header className="project-hero-shell relative z-[1] overflow-visible bg-transparent">
      <Container className="project-hero-content relative bg-transparent py-12 pb-16 sm:py-20 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <FadeInWrapper delay={0.1}>
              <p className="cinematic-text-muted font-mono text-xs uppercase tracking-[0.2em]">
                {project.category} · {project.year}
              </p>
            </FadeInWrapper>

            <FadeInWrapper delay={0.18}>
              <motion.h1
                className="cinematic-title-gradient mt-4 font-serif text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h1>
            </FadeInWrapper>

            <FadeInWrapper delay={0.28}>
              <p className="section-description mt-4 max-w-xl text-lg font-normal text-pretty sm:text-xl">
                {project.subtitle}
              </p>
            </FadeInWrapper>

            <FadeInWrapper delay={0.36}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="glass-card rounded-full px-3 py-1.5 text-xs font-medium cinematic-text-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeInWrapper>
          </div>

          <motion.div
            className="w-full min-w-0 lg:max-w-xl lg:justify-self-end"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageBlock
              src={project.image}
              alt={project.imageAlt}
              imageAspect={project.imageAspect}
              imageFit="contain"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="shadow-[0_0_56px_rgba(255,108,210,0.18),0_0_80px_rgba(86,65,255,0.12),0_24px_64px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </div>
      </Container>
    </header>
  );
}
