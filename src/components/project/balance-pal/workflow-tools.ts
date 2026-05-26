export type WorkflowTool = {
  id: string;
  name: string;
  /** Logo 路径：/public/logos/*.png */
  logoSrc: string;
  tooltipTitle: string;
  tooltipBody: string;
};

export type StageToolConfig = {
  tool: WorkflowTool;
  floatDelay: number;
  /** 阶段专属说明，覆盖 tool.tooltipBody */
  tooltipBody?: string;
};

export const WORKFLOW_TOOLS = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    logoSrc: "/logos/chatgpt.png",
    tooltipTitle: "ChatGPT",
    tooltipBody: "用于产品概念发散与 prompt 共创",
  },
  notebooklm: {
    id: "notebooklm",
    name: "NotebookLM",
    logoSrc: "/logos/notebookLM.png",
    tooltipTitle: "NotebookLM",
    tooltipBody: "用于研究屏幕疲劳、数字健康、情绪陪伴等概念",
  },
  figmaMake: {
    id: "figma-make",
    name: "Figma Make",
    logoSrc: "/logos/figma.png",
    tooltipTitle: "Figma Make",
    tooltipBody: "用于视觉风格探索与界面方向发散",
  },
  jimeng: {
    id: "jimeng",
    name: "即梦",
    logoSrc: "/logos/jimeng.png",
    tooltipTitle: "即梦",
    tooltipBody: "用于角色插图生成",
  },
  cursor: {
    id: "cursor",
    name: "Cursor",
    logoSrc: "/logos/cursor.png",
    tooltipTitle: "Cursor",
    tooltipBody: "用于 Prompt → Component 的代码生成",
  },
  claude: {
    id: "claude",
    name: "Claude Code",
    logoSrc: "/logos/claude.png",
    tooltipTitle: "Claude Code",
    tooltipBody: "用于组件生成与代码迭代",
  },
  xcode: {
    id: "xcode",
    name: "Xcode",
    logoSrc: "/logos/xcode.png",
    tooltipTitle: "Xcode",
    tooltipBody: "用于页面搭建、状态逻辑与快速验证",
  },
  codex: {
    id: "codex",
    name: "Codex",
    logoSrc: "/logos/codex.png",
    tooltipTitle: "Codex",
    tooltipBody: "用于动效、微交互与情绪化视觉细节",
  },
} as const satisfies Record<string, WorkflowTool>;

export const STAGE_TOOLS: StageToolConfig[][] = [
  [
    {
      tool: WORKFLOW_TOOLS.chatgpt,
      floatDelay: 0,
      tooltipBody: "用于研究屏幕疲劳、数字健康、情绪陪伴等概念",
    },
    {
      tool: WORKFLOW_TOOLS.notebooklm,
      floatDelay: 0.8,
      tooltipBody: "用于 Web Research 与资料归纳",
    },
  ],
  [
    {
      tool: WORKFLOW_TOOLS.chatgpt,
      floatDelay: 0.3,
      tooltipBody: "用于产品定位、情绪模型、用户场景与功能优先级梳理",
    },
  ],
  [
    {
      tool: WORKFLOW_TOOLS.figmaMake,
      floatDelay: 0,
      tooltipBody: "用于视觉风格探索与界面方向",
    },
    {
      tool: WORKFLOW_TOOLS.jimeng,
      floatDelay: 0.6,
      tooltipBody: "用于角色插图生成",
    },
  ],
  [
    {
      tool: WORKFLOW_TOOLS.codex,
      floatDelay: 0.2,
      tooltipBody: "用于 Prompt → UI、Prompt → Component",
    },
    {
      tool: WORKFLOW_TOOLS.claude,
      floatDelay: 0.9,
      tooltipBody: "用于组件生成与代码迭代",
    },
  ],
  [
    {
      tool: WORKFLOW_TOOLS.codex,
      floatDelay: 0.4,
      tooltipBody: "用于页面搭建与状态逻辑",
    },
    {
      tool: WORKFLOW_TOOLS.xcode,
      floatDelay: 1,
      tooltipBody: "用于数据结构、部署与快速验证",
    },
  ],
  [
    {
      tool: WORKFLOW_TOOLS.chatgpt,
      floatDelay: 0.5,
      tooltipBody: "用于动效与微交互构思",
    },
    {
      tool: WORKFLOW_TOOLS.codex,
      floatDelay: 1.2,
      tooltipBody: "用于情绪化视觉细节打磨",
    },
  ],
];
