import { existsSync, statSync } from "fs";
import { join } from "path";
import { LUMI_CHARACTER_VIEWS } from "@/lib/balance-pal-lumi-data";
import { TASK_SCREEN_FILES } from "@/lib/balance-pal-task-data";

export { LUMI_CHARACTER_VIEWS } from "@/lib/balance-pal-lumi-data";

const WHY_BUILT_SCENE_PATH = join(
  process.cwd(),
  "public/images/projects/balance-pal/why-built-scene.jpg",
);

const COVER_PATH = join(
  process.cwd(),
  "public/images/projects/balance-pal/cover.png",
);

const HOME_SCREEN_FILES = [
  "home-sad.png",
  "home-good.png",
  "home-happy.png",
] as const;

function versionedPublicSrc(publicPath: string) {
  const filePath = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const { mtimeMs } = statSync(filePath);
  return `${publicPath}?v=${mtimeMs}`;
}

/** 首屏封面图 */
export function getCoverImageSrc() {
  const { mtimeMs } = statSync(COVER_PATH);
  return `/images/projects/balance-pal/cover.png?v=${mtimeMs}`;
}

/** 随 public 文件更新自动刷新缓存（?v=mtime） */
export function getWhyBuiltSceneImageSrc() {
  const { mtimeMs } = statSync(WHY_BUILT_SCENE_PATH);
  return `/images/projects/balance-pal/why-built-scene.jpg?v=${mtimeMs}`;
}

/** 三张首页截图，顺序：sad → good → happy */
export function getHomeScreenImageSrcs() {
  return HOME_SCREEN_FILES.map((file) =>
    versionedPublicSrc(`/images/projects/${file}`),
  );
}

/** 七张任务页截图，顺序与 balance-pal-task-data 一致 */
export function getTaskScreenImageSrcs() {
  return TASK_SCREEN_FILES.map((file) => {
    const publicPath = `/images/projects/balance-pal/tasks/${file}`;
    const filePath = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      return publicPath;
    }
    return versionedPublicSrc(publicPath);
  });
}

/** Lumi 形象库（12 张） */
export function getLumiViewImageSrcs() {
  return LUMI_CHARACTER_VIEWS.map((view) =>
    versionedPublicSrc(`/images/projects/balance-pal/lumi/${view.file}`),
  );
}
