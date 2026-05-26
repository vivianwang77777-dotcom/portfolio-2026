import {
  getProjectMeshClass,
  type ProjectTheme,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type ProjectPageBackgroundProps = {
  theme?: ProjectTheme;
};

export function ProjectPageBackground({ theme }: ProjectPageBackgroundProps) {
  const meshClass = getProjectMeshClass(theme, "hero");

  if (!meshClass) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 min-h-full",
        meshClass,
        "opacity-60",
      )}
    />
  );
}
