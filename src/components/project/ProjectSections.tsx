import { Container } from "@/components/layout/Container";
import { StrategyNarrativeSection } from "@/components/project/gaode-poi/StrategyNarrativeSection";
import {
  isProjectDarkTheme,
  normalizeProjectMetrics,
  type Project,
  type ProjectSection,
  type ProjectSectionItem,
} from "@/lib/content";
import { ProjectFigure } from "@/components/project/ProjectFigure";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProjectSectionsProps = {
  project: Project;
  untilSectionId?: string;
  fromSectionId?: string;
};

function filterSections(
  sections: ProjectSection[],
  untilSectionId?: string,
  fromSectionId?: string,
) {
  if (untilSectionId) {
    const index = sections.findIndex((section) => section.id === untilSectionId);
    return index >= 0 ? sections.slice(0, index) : sections;
  }

  if (fromSectionId) {
    const index = sections.findIndex((section) => section.id === fromSectionId);
    return index >= 0 ? sections.slice(index) : [];
  }

  return sections;
}

export function ProjectSections({
  project,
  untilSectionId,
  fromSectionId,
}: ProjectSectionsProps) {
  const allSections =
    project.sections?.filter((section) => section.layout !== "hero") ?? [];
  const sections = filterSections(allSections, untilSectionId, fromSectionId);

  if (!sections.length && !fromSectionId) return null;
  if (!sections.length) return null;

  const isDark = isProjectDarkTheme(project.theme);
  const isPlainZone = Boolean(fromSectionId);

  return (
    <div
      className={cn(
        "border-t border-border",
        isPlainZone && "bg-background",
      )}
    >
      {sections.map((section, index) => {
        if (section.layout === "strategy-narrative") {
          return (
            <StrategyNarrativeSection key={section.id} />
          );
        }

        return (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-6 py-16 sm:py-24"
          aria-labelledby={`${section.id}-title`}
        >
          <Container>
            <SectionRenderer
              section={section}
              project={project}
              index={index}
            />
          </Container>
        </section>
        );
      })}

      {project.nextProject && !untilSectionId && (
        <section className="border-t border-border py-16 sm:py-20">
          <Container>
            <Link
              href={`/projects/${project.nextProject.slug}`}
              className={cn(
                "group flex items-center justify-between gap-6 rounded-3xl border border-border bg-surface p-8 transition-all hover:shadow-lg sm:p-10",
                isDark
                  ? "hover:border-white/20"
                  : "hover:border-black/10 dark:hover:border-white/15",
              )}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Next project
                </p>
                <p className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
                  {project.nextProject.title}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </Link>
          </Container>
        </section>
      )}
    </div>
  );
}

type SectionRendererProps = {
  section: ProjectSection;
  project: Project;
  index: number;
};

function SectionRenderer({ section, project, index }: SectionRendererProps) {
  switch (section.layout) {
    case "full":
      return <FullLayout section={section} />;
    case "split":
    case "story":
      return <SplitLayout section={section} index={index} />;
    case "stack":
      return <StackLayout section={section} />;
    case "gallery":
    case "grid":
      return <GalleryLayout section={section} />;
    case "mixed":
      return <MixedLayout section={section} />;
    case "cards":
      return <CardsLayout section={section} />;
    case "strategy-narrative":
      return <StrategyNarrativeSection />;
    case "metrics":
      return <MetricsLayout section={section} project={project} />;
    case "text":
      return <TextLayout section={section} />;
    default:
      return <FullLayout section={section} />;
  }
}

function SectionHeader({
  section,
  className,
}: {
  section: ProjectSection;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <h2
        id={`${section.id}-title`}
        className="font-serif text-3xl tracking-tight text-balance sm:text-4xl"
      >
        {section.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        {section.description}
      </p>
    </header>
  );
}

function FullLayout({ section }: { section: ProjectSection }) {
  const hasCards = (section.items?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SectionHeader section={section} className="mx-auto text-center" />
      {section.image && (
        <ProjectFigure
          src={section.image}
          alt={section.title}
          imageAspect={section.imageAspect}
          className="mx-auto"
        />
      )}
      {hasCards && <SectionCardsGrid items={section.items!} />}
    </div>
  );
}

function SplitLayout({
  section,
  index,
}: {
  section: ProjectSection;
  index: number;
}) {
  const imageOnLeft =
    section.imagePosition === "left" ||
    (section.imagePosition !== "right" && index % 2 === 1);

  return (
    <div
      className={cn(
        "mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16",
        imageOnLeft && "lg:[&>figure]:order-first lg:[&>header]:order-last",
      )}
    >
      <SectionHeader section={section} />
      {section.image && (
        <ProjectFigure
          src={section.image}
          alt={section.title}
          imageAspect={section.imageAspect}
          imageFit={section.imageFit}
          sizes="(max-width: 1024px) 50vw, 480px"
        />
      )}
    </div>
  );
}

function StackLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <SectionHeader section={section} className="mx-auto text-center" />
      {section.items && section.items.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface"
            >
              {item.image && (
                <ProjectFigure
                  src={item.image}
                  alt={item.title}
                  imageAspect={item.imageAspect}
                  className="rounded-none border-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-serif text-xl tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </article>
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
    <div className="mx-auto max-w-5xl space-y-12">
      <SectionHeader section={section} className="mx-auto text-center" />
      {section.image && (
        <ProjectFigure
          src={section.image}
          alt={section.title}
          imageAspect={section.imageAspect}
          className="mx-auto"
        />
      )}
      {metrics.length > 0 && (
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {metrics.map((metric) => (
            <div
              key={`${metric.label}-${metric.value}`}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
            >
              {metric.label ? (
                <>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
                    {metric.value}
                  </dd>
                </>
              ) : (
                <dd className="text-sm leading-relaxed text-foreground sm:text-base">
                  {metric.value}
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function GalleryLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SectionHeader section={section} className="mx-auto text-center" />
      {section.image && (
        <ProjectFigure
          src={section.image}
          alt={section.title}
          imageAspect={section.imageAspect}
          className="mx-auto"
        />
      )}
    </div>
  );
}

function MixedLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-5xl space-y-16">
      <SectionHeader section={section} className="mx-auto text-center" />
      {section.items?.map((item) => {
        const itemTitleClass =
          "font-serif text-xl tracking-tight sm:text-2xl";
        const itemBodyClass =
          "mt-3 text-base leading-relaxed text-muted sm:text-lg";

        if (item.layout === "full-image" && item.image) {
          return (
            <article key={item.title} className="space-y-6">
              <div className="mx-auto max-w-3xl">
                <h3 className={itemTitleClass}>{item.title}</h3>
                <p className={itemBodyClass}>{item.description}</p>
              </div>
              <ProjectFigure
                src={item.image}
                alt={item.title}
                imageAspect={item.imageAspect}
                imageFit={item.imageFit ?? section.imageFit ?? "contain"}
              />
            </article>
          );
        }

        return (
          <article
            key={item.title}
            className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <div>
              <h3 className={itemTitleClass}>{item.title}</h3>
              <p className={itemBodyClass}>{item.description}</p>
            </div>
            {item.image && (
              <ProjectFigure
                src={item.image}
                alt={item.title}
                imageAspect={item.imageAspect}
                imageFit={item.imageFit ?? section.imageFit ?? "contain"}
              />
            )}
          </article>
        );
      })}
    </div>
  );
}

function TextLayout({ section }: { section: ProjectSection }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionHeader section={section} className="mx-auto" />
    </div>
  );
}

function SectionCardsGrid({ items }: { items: ProjectSectionItem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map((item, index) => {
        const lines =
          item.lines ??
          (item.description
            ? ([item.description, ""] as [string, string])
            : (["", ""] as [string, string]));

        return (
          <li
            key={item.title}
            className="flex flex-col rounded-[2rem] border border-border bg-surface p-6 sm:p-8"
          >
            <span className="text-sm font-medium text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-10 font-serif text-xl tracking-tight text-balance sm:mt-12 sm:text-2xl">
              {item.title}
            </h3>
            <div className="mt-3 space-y-1 text-sm leading-relaxed text-muted sm:text-base">
              {lines[0] ? <p>{lines[0]}</p> : null}
              {lines[1] ? <p>{lines[1]}</p> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CardsLayout({ section }: { section: ProjectSection }) {
  const items = section.items ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SectionHeader section={section} className="mx-auto text-center" />
      {items.length > 0 && <SectionCardsGrid items={items} />}
    </div>
  );
}
