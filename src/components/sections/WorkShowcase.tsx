import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { workContent } from "@/lib/content";
import { getAllProjects } from "@/lib/projects";

export function WorkShowcase() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      eyebrow={workContent.eyebrow}
      title={workContent.title}
      description={workContent.description}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
}
