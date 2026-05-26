import { Badge } from "@/components/ui/Badge";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { Container } from "@/components/layout/Container";
import { CaseStudyHero } from "@/components/project/cinematic/CaseStudyHero";
import {
  getProjectMeshClass,
  hasProjectSections,
  type Project,
} from "@/lib/content";
import { ProjectFigure } from "@/components/project/ProjectFigure";
import { isProjectCinematic } from "@/lib/cinematic-theme";
import { cn } from "@/lib/utils";

type ProjectHeroProps = {
  project: Project;
  pageMeshBackground?: boolean;
};

export function ProjectHero({
  project,
  pageMeshBackground = false,
}: ProjectHeroProps) {
  if (isProjectCinematic(project.theme)) {
    return <CaseStudyHero project={project} />;
  }

  const isSplitHero = hasProjectSections(project);
  const meshClass = getProjectMeshClass(project.theme);
  const showHeroMesh = meshClass && !pageMeshBackground;

  return (
    <header className="relative overflow-hidden">
      {showHeroMesh && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-90",
            meshClass,
          )}
        />
      )}
      {showHeroMesh && project.theme?.mesh !== "soft-sky" && (
        <GradientOrb
          className={cn(
            "right-0 top-20",
            project.theme?.mesh === "dark" ? "opacity-35" : "opacity-50",
          )}
          size="md"
        />
      )}

      <Container className="project-hero-content relative py-12 sm:py-20">
        {isSplitHero ? (
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <ProjectHeroCopy project={project} />
            <ProjectHeroImage
              project={project}
              className="lg:justify-self-end"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <ProjectHeroCopy project={project} />
              <ProjectHeroMeta project={project} />
            </div>
            <ProjectHeroImage
              project={project}
              className="mt-12"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </>
        )}
      </Container>
    </header>
  );
}

function ProjectHeroCopy({ project }: { project: Project }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {project.title}
      </h1>
      <p className="mt-4 text-lg text-muted sm:text-xl">{project.subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}

function ProjectHeroMeta({ project }: { project: Project }) {
  return (
    <dl
      className={cn(
        "grid gap-6 border-t border-border pt-8 lg:border-t-0 lg:pt-0",
        project.team?.length ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2",
      )}
    >
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted">Role</dt>
        <dd className="mt-1 text-sm font-medium">{project.role}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted">Timeline</dt>
        <dd className="mt-1 text-sm font-medium">{project.timeline}</dd>
      </div>
      {project.team && project.team.length > 0 && (
        <div className="col-span-2 sm:col-span-1">
          <dt className="text-xs uppercase tracking-wider text-muted">Team</dt>
          <dd className="mt-1 text-sm font-medium leading-relaxed">
            {project.team.join(" · ")}
          </dd>
        </div>
      )}
    </dl>
  );
}

function ProjectHeroImage({
  project,
  className,
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;
}) {
  return (
    <ProjectFigure
      src={project.image}
      alt={project.imageAlt}
      imageAspect={project.imageAspect}
      priority
      sizes={sizes}
      className={cn("w-full bg-surface", className)}
    />
  );
}
