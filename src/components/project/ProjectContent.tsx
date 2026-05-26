import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CinematicSections } from "@/components/project/cinematic/CinematicSections";
import { FadeInWrapper } from "@/components/project/cinematic/FadeInWrapper";
import { ProjectSections } from "@/components/project/ProjectSections";
import {
  hasProjectSections,
  normalizeProjectMetrics,
  type Project,
} from "@/lib/content";
import { isProjectCinematic } from "@/lib/cinematic-theme";

type ProjectContentProps = {
  project: Project;
  untilSectionId?: string;
  fromSectionId?: string;
  showStack?: boolean;
};

export function ProjectContent({
  project,
  untilSectionId,
  fromSectionId,
  showStack = true,
}: ProjectContentProps) {
  if (hasProjectSections(project)) {
    if (isProjectCinematic(project.theme)) {
      return (
        <article className="relative overflow-visible bg-transparent">
          <CinematicSections project={project} />

          <Container className="relative py-20 sm:py-28">
            <FadeInWrapper>
              <CinematicStackSection project={project} />
            </FadeInWrapper>
          </Container>
        </article>
      );
    }

    return (
      <article>
        <ProjectSections
          project={project}
          untilSectionId={untilSectionId}
          fromSectionId={fromSectionId}
        />

        {showStack && (
        <Container className="border-t border-border py-16 sm:py-20">
          <StackSection project={project} />
        </Container>
        )}
      </article>
    );
  }

  return <LegacyProjectContent project={project} />;
}

function CinematicStackSection({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-4xl text-center" aria-labelledby="stack-title">
      <h2
        id="stack-title"
        className="cinematic-text-muted text-[10px] font-medium uppercase tracking-[0.2em]"
      >
        Stack & tools
      </h2>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {project.stack.map((tool) => (
          <li
            key={tool}
            className="glass-card cinematic-text-secondary rounded-full px-4 py-2 text-sm"
          >
            {tool}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StackSection({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-4xl" aria-labelledby="stack-title">
      <h2
        id="stack-title"
        className="text-sm font-medium uppercase tracking-wider text-muted"
      >
        Stack & tools
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tool) => (
          <li
            key={tool}
            className="rounded-full border border-border px-4 py-2 text-sm"
          >
            {tool}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LegacyProjectContent({ project }: { project: Project }) {
  const metrics = normalizeProjectMetrics(project.metrics);

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            {project.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-16">
          <ContentBlock title="Challenge" body={project.challenge} />
          <ContentBlock title="Approach" body={project.approach} />
          <ContentBlock title="Outcome" body={project.outcome} />
        </div>

        {metrics.length > 0 && (
          <section
            className="mx-auto mt-20 max-w-4xl"
            aria-labelledby="metrics-title"
          >
            <h2
              id="metrics-title"
              className="font-serif text-2xl tracking-tight sm:text-3xl"
            >
              Results
            </h2>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="rounded-2xl border border-border p-5"
                >
                  {metric.label ? (
                    <>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {metric.label}
                      </dt>
                      <dd className="mt-2 font-serif text-2xl tracking-tight">
                        {metric.value}
                      </dd>
                    </>
                  ) : (
                    <dd className="text-sm leading-relaxed">{metric.value}</dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
        )}

        <section
          className="mx-auto mt-20 max-w-4xl"
          aria-labelledby="highlights-title"
        >
          <h2
            id="highlights-title"
            className="font-serif text-2xl tracking-tight sm:text-3xl"
          >
            Highlights
          </h2>
          <ul className="mt-8 space-y-4">
            {project.highlights.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 border-b border-border pb-4 text-muted last:border-0"
              >
                <span className="font-mono text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed sm:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto mt-20 max-w-4xl">
          <StackSection project={project} />
        </div>

        {project.link && (
          <div className="mx-auto mt-16 max-w-4xl">
            <Button href={project.link} size="lg">
              View project
            </Button>
          </div>
        )}
      </Container>
    </article>
  );
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        {body}
      </p>
    </section>
  );
}
