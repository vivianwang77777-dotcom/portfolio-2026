import { Footer } from "@/components/layout/Footer";
import { BalancePalCaseStudy } from "@/components/project/BalancePalCaseStudy";
import { CinematicBackground } from "@/components/project/cinematic/CinematicBackground";
import { ProjectBackNav } from "@/components/project/ProjectBackNav";
import { ProjectContent } from "@/components/project/ProjectContent";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectPageBackground } from "@/components/project/ProjectPageBackground";
import {
  getCinematicThemeStyle,
  isProjectCinematic,
} from "@/lib/cinematic-theme";
import { hasProjectPageMeshBackground, isProjectDarkTheme, projectThemeStyle } from "@/lib/content";
import {
  getCoverImageSrc,
  getHomeScreenImageSrcs,
  getLumiViewImageSrcs,
  getTaskScreenImageSrcs,
  getWhyBuiltSceneImageSrc,
} from "@/lib/balance-pal-assets";
import { withGaodePoiHeroCover } from "@/lib/gaode-poi-assets";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const rawProject = getProjectBySlug(slug);

  if (!rawProject) {
    notFound();
  }

  const project = withGaodePoiHeroCover(rawProject, slug);

  if (slug === "ai-workflow-lab") {
    return (
      <iframe
        src="/ux-workflow-matrix.html"
        title="AI Workflow Lab"
        className="fixed inset-0 h-screen w-screen border-0 bg-[#05070a]"
      />
    );
  }

  if (slug === "balance-pal") {
    return (
      <BalancePalCaseStudy
        coverSrc={getCoverImageSrc()}
        whyBuiltSceneSrc={getWhyBuiltSceneImageSrc()}
        homeScreenSrcs={getHomeScreenImageSrcs()}
        taskScreenSrcs={getTaskScreenImageSrcs()}
        lumiViewSrcs={getLumiViewImageSrcs()}
      />
    );
  }

  const cinematic = isProjectCinematic(project.theme);
  const pageMeshBackground = hasProjectPageMeshBackground(project.theme);
  const meshUntilSection = project.theme?.meshUntilSection;
  const splitMeshBackground =
    pageMeshBackground && Boolean(meshUntilSection);

  return (
    <>
      <ProjectBackNav
        tone={isProjectDarkTheme(project.theme) ? "dark" : "light"}
      />
      <main
        className={cn(
          "project-detail-page relative text-[var(--foreground)]",
          `project-slug-${slug}`,
          cinematic ? "min-h-screen bg-transparent" : "isolate min-h-screen bg-background",
          cinematic && "project-cinematic",
          isProjectDarkTheme(project.theme) && !cinematic && "project-page--dark",
        )}
        style={
          cinematic
            ? getCinematicThemeStyle(project.theme)
            : projectThemeStyle(project.theme)
        }
      >
        {cinematic && <CinematicBackground />}
        <div className="relative z-10 overflow-visible">
          {splitMeshBackground ? (
            <>
              <div className="relative bg-background">
                <ProjectPageBackground theme={project.theme} />
                <div className="relative z-10">
                  <ProjectHero project={project} pageMeshBackground />
                  <ProjectContent
                    project={project}
                    untilSectionId={meshUntilSection}
                    showStack={false}
                  />
                </div>
              </div>
              <ProjectContent
                project={project}
                fromSectionId={meshUntilSection}
              />
            </>
          ) : (
            <>
              {pageMeshBackground && (
                <ProjectPageBackground theme={project.theme} />
              )}
              <ProjectHero
                project={project}
                pageMeshBackground={pageMeshBackground}
              />
              <ProjectContent project={project} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
