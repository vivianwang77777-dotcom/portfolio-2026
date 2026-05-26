/** 左侧任务/首页画框基准宽度（lg） */
export const SHOWCASE_SELECT_WIDTH_LG = 268;

/** 任务页行间距 lg / xl（与 Tailwind gap-12 / gap-16 一致） */
export const SHOWCASE_ROW_GAP_LG = 48;
export const SHOWCASE_ROW_GAP_XL = 64;

/** 进行中 3×2 网格间距 lg（与 gap-5 一致） */
export const SHOWCASE_PROGRESS_GRID_GAP_LG = 20;

const PROGRESS_SCALE = 0.6;

/** 与任务页左选 + 右 3×2 总宽一致，供首页关键界面与任务页对齐 */
export function getShowcaseContentMaxWidth(rowGap = SHOWCASE_ROW_GAP_LG) {
  const progressW = SHOWCASE_SELECT_WIDTH_LG * PROGRESS_SCALE;
  return (
    SHOWCASE_SELECT_WIDTH_LG +
    rowGap +
    progressW * 3 +
    SHOWCASE_PROGRESS_GRID_GAP_LG * 2
  );
}

export const SHOWCASE_CONTENT_MAX_W = getShowcaseContentMaxWidth();
export const SHOWCASE_CONTENT_MAX_W_XL = getShowcaseContentMaxWidth(
  SHOWCASE_ROW_GAP_XL,
);

/** 关键界面 / 任务页展示区域共用容器（lg+ 与任务页左+右 3×2 总宽对齐） */
export const showcaseContentClass =
  "mx-auto w-full lg:max-w-[var(--bp-showcase-w)] xl:max-w-[var(--bp-showcase-w-xl)]";

export const showcaseContentStyle: Record<string, string> = {
  "--bp-showcase-w": `${SHOWCASE_CONTENT_MAX_W}px`,
  "--bp-showcase-w-xl": `${SHOWCASE_CONTENT_MAX_W_XL}px`,
};

/** 画框圆角（固定 px） */
export const SHOWCASE_HOME_RADIUS_PX = 32;
export const SHOWCASE_TASK_SELECT_RADIUS_PX = 28;
export const SHOWCASE_TASK_PROGRESS_RADIUS_PX = 20;

export type ShowcaseFrameShadow =
  | "home"
  | "task-select"
  | "task-progress";

export function showcaseRadiusPx(shadow: ShowcaseFrameShadow) {
  switch (shadow) {
    case "home":
      return SHOWCASE_HOME_RADIUS_PX;
    case "task-select":
      return SHOWCASE_TASK_SELECT_RADIUS_PX;
    case "task-progress":
      return SHOWCASE_TASK_PROGRESS_RADIUS_PX;
  }
}

export const showcasePhoneFrameBaseClass =
  "relative overflow-hidden border border-white/85 bg-white/[0.58] backdrop-blur-[22px]";
