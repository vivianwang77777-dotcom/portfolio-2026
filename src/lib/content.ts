import aiExploreData from "@/content/ai-explore.json";
import aboutData from "@/content/about.json";
import aiWorkflowLab from "@/content/projects/ai-workflow-lab.json";
import balancePal from "@/content/projects/balance-pal.json";
import gaodeContent from "@/content/projects/gaode-content.json";
import gaodePoi from "@/content/projects/gaode-poi.json";
import siteData from "@/content/site.json";
import workData from "@/content/work.json";

export type ProjectMetricItem = {
  label: string;
  value: string;
};

export type ProjectMetric = string | ProjectMetricItem;

export type ProjectSectionItemLayout = "full-image" | "split";

export type ProjectSectionImage = {
  image: string;
  imageAspect?: string;
  imageFit?: "cover" | "contain";
  alt?: string;
};

export type ProjectSectionItem = {
  title: string;
  description: string;
  /** cards 布局：两行说明文案 */
  lines?: [string, string];
  image?: string;
  /** 图片原始宽高比，如 "954/383" */
  imageAspect?: string;
  /** 示意图建议 contain，避免 object-cover 裁切 */
  imageFit?: "cover" | "contain";
  layout?: ProjectSectionItemLayout;
};

export type ProjectSectionLayout =
  | "full"
  | "split"
  | "stack"
  | "metrics"
  | "text"
  | "hero"
  | "story"
  | "gallery"
  | "grid"
  | "mixed"
  | "cards"
  | "strategy-narrative";

export type ProjectSection = {
  id: string;
  title: string;
  description: string;
  image?: string;
  /** 多图上下排列（优先于单张 image） */
  images?: ProjectSectionImage[];
  /** 图片原始宽高比，如 "954/383" */
  imageAspect?: string;
  /** split 布局：图片在左或右，默认随区块序号交替 */
  imagePosition?: "left" | "right";
  /** 图片铺满方式，示意图建议 contain 避免裁切 */
  imageFit?: "cover" | "contain";
  layout: ProjectSectionLayout;
  items?: ProjectSectionItem[];
};

export type ProjectNext = {
  title: string;
  slug: string;
};

export type ProjectTheme = {
  scheme?: "light" | "dark";
  presentation?: "default" | "cinematic";
  background?: string;
  foreground?: string;
  muted?: string;
  border?: string;
  surface?: string;
  accent?: string;
  gradientStart?: string;
  gradientMid?: string;
  gradientEnd?: string;
  mesh?: "default" | "soft-sky" | "dark" | "cinematic";
  /** 渐变背景截止的 section id（不含该 section） */
  meshUntilSection?: string;
};

export function isProjectDarkTheme(theme?: ProjectTheme): boolean {
  return theme?.scheme === "dark" || theme?.presentation === "cinematic";
}

export function getProjectMeshClass(
  theme?: ProjectTheme,
  scope: "hero" | "page" = "hero",
): string | null {
  if (!theme?.mesh || theme.mesh === "cinematic") return null;

  switch (theme.mesh) {
    case "soft-sky":
      return scope === "page"
        ? "gradient-mesh-page-soft-sky"
        : "gradient-mesh-soft-sky";
    case "dark":
      return "gradient-mesh-dark";
    default:
      return "gradient-mesh";
  }
}

export function hasProjectPageMeshBackground(theme?: ProjectTheme): boolean {
  return getProjectMeshClass(theme) !== null;
}

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  excerpt: string;
  year: string;
  category: string;
  tags: string[];
  image: string;
  /** 封面图宽高比，如 "2400/1792" */
  imageAspect?: string;
  imageAlt: string;
  featured: boolean;
  role?: string;
  timeline?: string;
  challenge: string;
  approach: string;
  outcome: string;
  highlights: string[];
  stack: string[];
  team?: string[];
  metrics?: ProjectMetric[];
  sections?: ProjectSection[];
  nextProject?: ProjectNext;
  theme?: ProjectTheme;
  link?: string;
};

export function projectThemeStyle(
  theme?: ProjectTheme,
): Record<string, string> | undefined {
  if (!theme) return undefined;

  const style: Record<string, string> = {};
  if (theme.background) style["--background"] = theme.background;
  if (theme.foreground) style["--foreground"] = theme.foreground;
  if (theme.muted) style["--muted"] = theme.muted;
  if (theme.border) style["--border"] = theme.border;
  if (theme.surface) style["--surface"] = theme.surface;
  if (theme.accent) style["--accent"] = theme.accent;
  if (theme.gradientStart) style["--gradient-start"] = theme.gradientStart;
  if (theme.gradientMid) style["--gradient-mid"] = theme.gradientMid;
  if (theme.gradientEnd) style["--gradient-end"] = theme.gradientEnd;

  return Object.keys(style).length > 0 ? style : undefined;
}

export function hasProjectSections(
  project: Project,
): project is Project & { sections: ProjectSection[] } {
  return Array.isArray(project.sections) && project.sections.length > 0;
}

export function normalizeProjectMetrics(
  metrics?: ProjectMetric[],
): ProjectMetricItem[] {
  if (!metrics) return [];

  return metrics.map((metric) =>
    typeof metric === "string" ? { label: "", value: metric } : metric,
  );
}

export type ExplorePrompt = {
  id: string;
  label: string;
  prompt: string;
};

export type ExploreCapability = {
  title: string;
  description: string;
  icon: "sparkles" | "brain" | "layers" | "zap";
};

export const siteConfig = {
  ...siteData,
  year: new Date().getFullYear(),
};

export const aboutContent = aboutData;

export const workContent = workData;

export const projects = [gaodePoi, gaodeContent, balancePal, aiWorkflowLab] as Project[];

export const aiExploreContent = aiExploreData;

export const explorePrompts = aiExploreData.prompts as ExplorePrompt[];

export const exploreCapabilities =
  aiExploreData.capabilities as ExploreCapability[];

export function fillContentTemplate(
  text: string,
  vars: Record<string, string>,
): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

export type AboutWorkEntry = {
  period: string;
  organization: string;
  role: string;
  focus: string;
  description: string;
};

export type AboutEducationEntry = {
  period: string;
  degree: string;
  school: string;
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  work: {
    title: string;
    entries: AboutWorkEntry[];
  };
  education: {
    title: string;
    entries: AboutEducationEntry[];
  };
};
