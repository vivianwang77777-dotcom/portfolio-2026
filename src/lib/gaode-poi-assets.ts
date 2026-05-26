import { statSync } from "fs";
import { join } from "path";
import type { Project } from "@/lib/content";

const HERO_COVER_PATH = join(
  process.cwd(),
  "public/images/projects/gaode-poi/hero/cover.jpg",
);

/** 首屏封面：随 public 文件更新自动刷新缓存 */
export function getGaodePoiHeroCoverSrc() {
  const { mtimeMs } = statSync(HERO_COVER_PATH);
  return `/images/projects/gaode-poi/hero/cover.jpg?v=${mtimeMs}`;
}

export function withGaodePoiHeroCover(project: Project, slug: string): Project {
  if (slug !== "gaode-poi-detail") return project;

  const cover = getGaodePoiHeroCoverSrc();
  return {
    ...project,
    image: cover,
    sections: project.sections?.map((section) =>
      section.id === "hero" ? { ...section, image: cover } : section,
    ),
  };
}
