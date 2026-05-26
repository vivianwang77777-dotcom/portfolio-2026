"use client";

import {
  Brain,
  Code2,
  Layers,
  MessageSquare,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ToolBubble } from "./ToolBubble";
import { STAGE_TOOLS } from "./workflow-tools";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 1, ease },
};

type Stage = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
};

const stages: Stage[] = [
  {
    id: "01",
    title: "用户洞察",
    summary: "研究屏幕疲劳、数字健康、情绪陪伴等概念。",
    icon: Search,
    gradient: "from-sky-100/90 via-blue-50/70 to-indigo-50/50",
    glow: "rgba(220, 235, 255, 0.55)",
  },
  {
    id: "02",
    title: "产品构思",
    summary: "梳理产品定位、情绪模型、用户场景与功能优先级。",
    icon: Brain,
    gradient: "from-violet-100/90 via-purple-50/70 to-fuchsia-50/40",
    glow: "rgba(234, 220, 251, 0.5)",
  },
  {
    id: "03",
    title: "Vibe Design",
    summary: "视觉风格、角色方向与插画探索。",
    icon: MessageSquare,
    gradient: "from-rose-100/80 via-pink-50/65 to-orange-50/45",
    glow: "rgba(245, 223, 232, 0.5)",
  },
  {
    id: "04",
    title: "Vibe Coding",
    summary: "Prompt → UI、Prompt → Component，组件生成与代码迭代。",
    icon: Code2,
    gradient: "from-emerald-100/85 via-teal-50/65 to-cyan-50/45",
    glow: "rgba(232, 247, 233, 0.55)",
  },
  {
    id: "05",
    title: "MVP 搭建",
    summary: "页面搭建、状态逻辑、数据结构、部署与快速验证。",
    icon: Layers,
    gradient: "from-amber-100/85 via-yellow-50/60 to-orange-50/40",
    glow: "rgba(255, 240, 216, 0.55)",
  },
  {
    id: "06",
    title: "作品集构建",
    summary: "动效、微交互与情绪化视觉细节的打磨。",
    icon: Sparkles,
    gradient: "from-slate-100/90 via-blue-50/60 to-violet-50/45",
    glow: "rgba(220, 235, 255, 0.45)",
  },
];

const floatingPrompts = [
  {
    text: "Create a calm emotional companion app…",
    className: "left-[4%] top-3 rotate-[-2deg]",
    delay: 0,
    floatDirection: "up" as const,
  },
  {
    text: "Generate soft rounded onboarding UI…",
    className: "right-[6%] top-5 rotate-[1.5deg]",
    delay: 1.2,
    floatDirection: "up" as const,
  },
  {
    text: "Build floating breathing animation…",
    className: "left-[12%] bottom-3 rotate-[1deg]",
    delay: 0.6,
    floatDirection: "down" as const,
  },
  {
    text: "Prompt → Component",
    className: "right-[10%] bottom-4 rotate-[-1.5deg]",
    delay: 1.8,
    floatDirection: "down" as const,
  },
] as const;

function AmbientBackground() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease }}
    >
      <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/20 blur-[100px]"
      />
    </motion.div>
  );
}

function FloatingPrompt({
  text,
  className,
  delay,
  floatDirection,
}: {
  text: string;
  className: string;
  delay: number;
  floatDirection: "up" | "down";
}) {
  const floatOffset = floatDirection === "up" ? -8 : 8;

  return (
    <motion.div
      animate={{ y: [0, floatOffset, 0] }}
      transition={{
        duration: 5.5 + delay * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`pointer-events-none absolute z-20 hidden max-w-[11rem] rounded-2xl border border-white/75 bg-white/42 px-3.5 py-2.5 text-[11px] leading-relaxed text-slate-500 shadow-[0_10px_28px_rgba(31,41,55,0.04)] backdrop-blur-md lg:block ${className}`}
    >
      <span className="text-slate-400">&ldquo;</span>
      {text}
      <span className="text-slate-400">&rdquo;</span>
    </motion.div>
  );
}

function TimelineNode({
  stage,
  index,
  stageTools,
}: {
  stage: Stage;
  index: number;
  stageTools: (typeof STAGE_TOOLS)[number];
}) {
  const Icon = stage.icon;
  const [toolHoverCount, setToolHoverCount] = useState(0);
  const toolHovered = toolHoverCount > 0;

  const handleToolHover = (active: boolean) => {
    setToolHoverCount((count) => (active ? count + 1 : Math.max(0, count - 1)));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease, delay: index * 0.07 }}
      className={`group relative flex w-full flex-col transition-[z-index] duration-0 ${
        toolHovered ? "z-30" : "z-0"
      }`}
    >
      <div
        className={`absolute -inset-3 rounded-[2.75rem] blur-2xl transition-opacity duration-700 ${
          toolHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ background: stage.glow }}
      />

      <div
        className={`relative flex aspect-[4/3] w-full flex-col overflow-visible rounded-[1.7rem] border bg-gradient-to-br p-4 shadow-[0_12px_32px_rgba(31,41,55,0.04)] backdrop-blur-[20px] transition-[border-color,box-shadow] duration-500 sm:p-[1.125rem] ${stage.gradient} ${
          toolHovered
            ? "border-white/95 shadow-[0_20px_48px_rgba(31,41,55,0.06)]"
            : "border-white/85"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
            {stage.id}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/80 bg-white/50 text-slate-600 shadow-[0_6px_16px_rgba(31,41,55,0.03)] backdrop-blur-sm">
            <Icon size={15} strokeWidth={1.75} />
          </div>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-700 sm:text-xl">
          {stage.title}
        </h3>

        <p className="mt-1.5 text-base leading-relaxed text-slate-500">{stage.summary}</p>

        <div
          className="relative z-10 mt-auto flex flex-1 flex-wrap items-end justify-center gap-x-3 gap-y-2.5 overflow-visible pb-0.5 pt-4"
          aria-label={`${stage.title} 使用的 AI 工具`}
        >
          {stageTools.map((config) => (
            <ToolBubble
              key={`${stage.id}-${config.tool.id}`}
              {...config}
              stageGlow={stage.glow}
              onHoverChange={handleToolHover}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function AIWorkflowJourney() {
  return (
    <section
      aria-labelledby="ai-workflow-heading"
      className="relative z-10 overflow-hidden px-5 py-24 sm:px-8 lg:py-36"
    >
      <AmbientBackground />

      <motion.div {...reveal} className="relative mx-auto max-w-4xl text-center">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            AI Native Workflow
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            Vibe Coding Process
          </p>
        </div>

        <h2
          id="ai-workflow-heading"
          className="mt-8 text-3xl font-semibold leading-[1.12] tracking-tight text-slate-700 sm:mt-10 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]"
        >
          AI赋能产品设计全流程
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.85] text-slate-600 sm:text-lg sm:leading-9">
          从产品概念到可运行 MVP，AI 正在缩短 idea → design → product 的距离。
        </p>
      </motion.div>

      <div className="relative mx-auto mt-16 max-w-7xl pt-14 pb-14 lg:mt-24 lg:pt-16 lg:pb-16">
        {floatingPrompts.map((prompt) => (
          <FloatingPrompt key={prompt.text} {...prompt} />
        ))}

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.12 }}
          className="relative grid grid-cols-1 gap-10 overflow-visible sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-12"
        >
          {stages.map((stage, index) => (
            <TimelineNode
              key={stage.id}
              stage={stage}
              index={index}
              stageTools={STAGE_TOOLS[index] ?? []}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.2 }}
        className="relative mx-auto mt-24 max-w-2xl text-center sm:mt-28 lg:mt-32"
      >
        <p className="text-base leading-[1.9] text-slate-500 sm:text-lg sm:leading-9">
          AI 不只是新的工具，
          <br className="hidden sm:block" />
          它正在改变设计师创造产品的方式。
        </p>
        <p className="mt-6 text-lg font-medium leading-relaxed tracking-tight text-slate-700 sm:text-xl">
          设计师第一次能够真正独立完成：
          <br />
          idea → design → prototype → product。
        </p>
      </motion.div>
    </section>
  );
}
