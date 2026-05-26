import { statSync } from "fs";
import { join } from "path";
import type { Project, ProjectSection, ProjectSectionItem } from "@/lib/content";

const HERO_COVER_PATH = join(
  process.cwd(),
  "public/images/projects/gaode-poi/hero/cover.jpg",
);

/** public 路径随文件 mtime 追加 ?v=，避免替换同名图片后浏览器/Next 仍用旧缓存 */
export function getPublicImageSrcWithCacheBust(src: string) {
  const base = src.split("?")[0];
  try {
    const full = join(process.cwd(), "public", base.replace(/^\//, ""));
    const { mtimeMs } = statSync(full);
    return `${base}?v=${mtimeMs}`;
  } catch {
    return base;
  }
}

/** 首屏封面：随 public 文件更新自动刷新缓存 */
export function getGaodePoiHeroCoverSrc() {
  return getPublicImageSrcWithCacheBust("/images/projects/gaode-poi/hero/cover.jpg");
}

function mapSectionItemImages(
  items: ProjectSectionItem[] | undefined,
): ProjectSectionItem[] | undefined {
  if (!items) return items;

  return items.map((item) =>
    item.image
      ? { ...item, image: getPublicImageSrcWithCacheBust(item.image) }
      : item,
  );
}

function mapSectionImages(section: ProjectSection): ProjectSection {
  return {
    ...section,
    image: section.image
      ? getPublicImageSrcWithCacheBust(section.image)
      : section.image,
    items: mapSectionItemImages(section.items),
  };
}

export function withGaodePoiHeroCover(project: Project, slug: string): Project {
  if (slug !== "gaode-poi-detail") return project;

  const cover = getGaodePoiHeroCoverSrc();
  return {
    ...project,
    image: cover,
    sections: project.sections?.map((section) => {
      const withCache = mapSectionImages(section);
      return section.id === "hero" ? { ...withCache, image: cover } : withCache;
    }),
  };
}
