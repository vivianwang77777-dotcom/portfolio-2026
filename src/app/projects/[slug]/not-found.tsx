import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ProjectBackNav } from "@/components/project/ProjectBackNav";

export default function ProjectNotFound() {
  return (
    <>
      <ProjectBackNav />
      <main className="project-detail-page flex min-h-[80svh] items-center">
        <Container className="project-hero-content">
          <h1 className="font-serif text-4xl tracking-tight">Project not found</h1>
          <p className="mt-4 max-w-md text-muted">
            The project you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="mt-8">
            <Button href="/">Return home</Button>
          </div>
        </Container>
      </main>
    </>
  );
}
