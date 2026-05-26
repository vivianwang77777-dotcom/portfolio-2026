/** 任务页截图元数据；图片放在 public/images/projects/balance-pal/tasks/ */
export const TASK_SELECT_FILE = "task-select.png" as const;

export const TASK_IN_PROGRESS_FILES = [
  "task-walk.png",
  "task-foot-soak.png",
  "task-painting.png",
  "task-reading.png",
  "task-board-game.png",
  "task-family-video.png",
] as const;

export const TASK_SCREEN_FILES = [
  TASK_SELECT_FILE,
  ...TASK_IN_PROGRESS_FILES,
] as const;

export const TASK_SELECT_SCREEN = {
  title: "任务 · 活动选择",
  text: "「做点什么呢？」——六张滋养卡片，邀请用户离开手机、回到生活。",
  file: TASK_SELECT_FILE,
  imageAlt: "BalancePal 任务页，活动选择网格",
} as const;

export const TASK_IN_PROGRESS_SCREENS = [
  {
    title: "公园散步",
    file: TASK_IN_PROGRESS_FILES[0],
    imageAlt: "BalancePal 任务页，公园散步进行中",
  },
  {
    title: "泡脚",
    file: TASK_IN_PROGRESS_FILES[1],
    imageAlt: "BalancePal 任务页，泡脚进行中",
  },
  {
    title: "画画",
    file: TASK_IN_PROGRESS_FILES[2],
    imageAlt: "BalancePal 任务页，画画进行中",
  },
  {
    title: "读书",
    file: TASK_IN_PROGRESS_FILES[3],
    imageAlt: "BalancePal 任务页，读书进行中",
  },
  {
    title: "玩桌游",
    file: TASK_IN_PROGRESS_FILES[4],
    imageAlt: "BalancePal 任务页，玩桌游进行中",
  },
  {
    title: "家人视频",
    file: TASK_IN_PROGRESS_FILES[5],
    imageAlt: "BalancePal 任务页，和家人视频进行中",
  },
] as const;

/** 任务页截图实际比例（471×1024） */
export const TASK_SCREEN_FRAME = { width: 471, height: 1024 } as const;
