"use client";

import { Container } from "@/components/layout/Container";
import { FadeInWrapper } from "@/components/project/cinematic/FadeInWrapper";
import { StrategyNarrativeSection } from "@/components/project/gaode-poi/StrategyNarrativeSection";
import { ImageBlock } from "@/components/project/cinematic/ImageBlock";
import { MetricsGrid } from "@/components/project/cinematic/MetricsGrid";
import { SectionTitle } from "@/components/project/cinematic/SectionTitle";
import {
  normalizeProjectMetrics,
  type Project,
  type ProjectSection,
  type ProjectSectionImage,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CinematicSectionsProps = {
  project: Project;
};

export function CinematicSections({ project }: CinematicSectionsProps) {
  const sections =
    project.sections?.filter((s) => s.layout !== "hero") ?? [];

  return (
    <div className="relative -mt-12 overflow-visible bg-transparent sm:-mt-16 lg:-mt-20">
      {sections.map((section, index) => {
        if (section.layout === "strategy-narrative") {
          return <StrategyNarrativeSection key={section.id} />;
        }

        const isFirst = index === 0;

        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "relative overflow-visible scroll-mt-6 py-20 sm:py-28 lg:py-32",
              isFirst && "pt-12 sm:pt-16 lg:pt-20",
            )}
            aria-labelledby={`${section.id}-title`}
          >
            {!isFirst && <SectionAmbientGlow index={index} />}
            <Container className="relative bg-transparent">
              <FadeInWrapper>
                <SectionRenderer
                  section={section}
                  project={project}
                  index={index}
                />
              </FadeInWrapper>
            </Container>
          </section>
        );
      })}

      {project.nextProject && (
        <section className="relative py-20 sm:py-28">
          <Container>
            <FadeInWrapper>
              <Link
                href={`/projects/${project.nextProject.slug}`}
                className="glass-card group flex items-center justify-between gap-6 rounded-3xl p-8 transition-all hover:border-white/20 sm:p-10"
              >
                <div>
                  <p className="cinematic-text-muted text-[10px] font-medium uppercase tracking-[0.2em]">
                    Next project
                  </p>
                  <p className="cinematic-title-gradient mt-3 font-serif text-2xl tracking-tight sm:text-3xl">
                    {project.nextProject.title}
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-[var(--accent)] group-hover:text-black">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </FadeInWrapper>
          </Container>
        </section>
      )}
    </div>
  );
}

function SectionAmbientGlow({ index }: { index: number }) {
  const isPurple = index % 2 === 0;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 rounded-full blur-[100px] sm:blur-[120px]",
        isPurple
          ? "-right-[5%] h-64 w-64 sm:h-80 sm:w-80"
          : "-left-[5%] bottom-0 h-48 w-48 sm:h-64 sm:w-64",
        isPurple ? "top-0" : "",
      )}
      style={{
        background: isPurple
          ? "radial-gradient(circle, rgba(86, 65, 255, 0.28) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(255, 108, 210, 0.26) 0%, transparent 70%)",
      }}
    />
  );
}

type SectionRendererProps = {
  section: ProjectSection;
  project: Project;
  index: number;
};

function SectionRenderer({ section, project }: SectionRendererProps) {
  const layout = section.layout as string;

  switch (layout) {
    case "full":
      return <VerticalImageLayout section={section} />;
    case "split":
    case "story":
      return <VerticalImageLayout section={section} />;
    case "stack":
      return <StackLayout section={section} />;
    case "gallery":
    case "grid":
      return <VerticalImageLayout section={section} />;
    case "metrics":
      return <MetricsLayout section={section} project={project} />;
    case "text":
      return <TextLayout section={section} />;
    case "strategy-narrative":
      return <StrategyNarrativeSection />;
    default:
      return <VerticalImageLayout section={section} />;
  }
}

function VerticalImageLayout({ section }: { section: ProjectSection }) {
  const images: ProjectSectionImage[] =
    section.images ??
    (section.image
      ? [
          {
            image: section.image,
            imageAspect: section.imageAspect,
            imageFit: section.imageFit,
          },
        ]
      : []);

  return (
    <div className="mx-auto max-w-5xl space-y-10 lg:space-y-12">
      <SectionTitle
        id={`${section.id}-title`}
        title={section.title}
        description={section.description}
        align="center"
      />
      {images.map((item, index) => (
        <ImageBlock
          key={`${section.id}-image-${index}`}
          src={item.image}
          alt={item.alt ?? section.title}
          imageAspect={item.imageAspect}
          imageFit={item.imageFit ?? section.imageFit ?? "contain"}
        />
      ))}
    </div>
  );
}

function StackLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <SectionTitle
        id={`${section.id}-title`}
        title={section.title}
        description={section.description}
        align="center"
      />
      {section.items && section.items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {section.items.map((item, i) => (
            <FadeInWrapper key={item.title} delay={i * 0.1}>
              <article className="glass-card flex h-full flex-col overflow-hidden rounded-3xl">
                {item.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
                  <h3 className="cinematic-title-gradient font-serif text-xl tracking-tight lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="cinematic-text-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            </FadeInWrapper>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricsLayout({
  section,
  project,
}: {
  section: ProjectSection;
  project: Project;
}) {
  const metrics = normalizeProjectMetrics(project.metrics);

  return (
    <div className="mx-auto max-w-5xl space-y-10 lg:space-y-12">
      <SectionTitle
        id={`${section.id}-title`}
        title={section.title}
        description={section.description}
        align="center"
      />
      {section.image && (
        <ImageBlock
          src={section.image}
          alt={section.title}
          imageAspect={section.imageAspect}
          imageFit={section.imageFit ?? "contain"}
        />
      )}
      {metrics.length > 0 && <MetricsGrid metrics={metrics} />}
    </div>
  );
}

function TextLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionTitle
        id={`${section.id}-title`}
        title={section.title}
        description={section.description}
        align="center"
      />
    </div>
  );
}
