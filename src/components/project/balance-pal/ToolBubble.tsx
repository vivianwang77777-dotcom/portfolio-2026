"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { StageToolConfig } from "./workflow-tools";

type ToolBubbleProps = StageToolConfig & {
  stageGlow: string;
  onHoverChange: (active: boolean) => void;
};

function resolveTooltipBody(config: StageToolConfig) {
  return config.tooltipBody ?? config.tool.tooltipBody;
}

function PlaceholderGlyph({ toolId }: { toolId: string }) {
  const common = "h-7 w-7 text-slate-500/80";
  switch (toolId) {
    case "chatgpt":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M10 4a3 3 0 00-2.8 2 3.5 3.5 0 00-2.2 3.2 3.5 3.5 0 003.5 3.5 3 3 0 005.5-2"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
          />
        </svg>
      );
    case "cursor":
      return (
        <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <rect x="4" y="4" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="11" y="4" width="5" height="5" rx="1" fill="currentColor" opacity="0.35" />
          <rect x="4" y="11" width="5" height="5" rx="1" fill="currentColor" opacity="0.35" />
          <rect x="11" y="11" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "claude":
      return (
        <span className="text-lg font-semibold text-[#d97757]/80" aria-hidden>
          C
        </span>
      );
    case "figma-make":
      return (
        <svg className={common} viewBox="0 0 20 20" aria-hidden>
          <circle cx="7" cy="7" r="2.5" fill="#f24e1e" opacity="0.65" />
          <circle cx="7" cy="13" r="2.5" fill="#a259ff" opacity="0.6" />
          <circle cx="13" cy="10" r="2.5" fill="#1abcfe" opacity="0.65" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        </svg>
      );
  }
}

export function ToolBubble({ stageGlow, onHoverChange, ...config }: ToolBubbleProps) {
  const { tool, floatDelay } = config;
  const tooltipBody = resolveTooltipBody(config);
  const [logoFailed, setLogoFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleHover = (active: boolean) => {
    setHovered(active);
    onHoverChange(active);
  };

  return (
    <motion.div
      className={`relative flex shrink-0 flex-col items-center ${hovered ? "z-50" : "z-10"}`}
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 5.5 + floatDelay * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
    >
      <motion.button
        type="button"
        aria-label={`${tool.name}：${tooltipBody}`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group/bubble relative flex flex-col items-center outline-none"
      >
        <motion.div
          animate={{ opacity: hovered ? [0.55, 0.85, 0.55] : [0.35, 0.55, 0.35] }}
          transition={{
            duration: hovered ? 2.2 : 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -inset-3 rounded-full blur-md"
          style={{ background: stageGlow }}
        />

        <motion.div
          animate={{ scale: hovered ? [1, 1.02, 1] : [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: floatDelay * 0.2 }}
          className="relative flex h-15 w-15 items-center justify-center rounded-full border border-white/80 bg-white/55 shadow-[0_8px_24px_rgba(31,41,55,0.08),0_0_18px_rgba(255,255,255,0.5)] backdrop-blur-[14px]"
        >
          <div className="h-[2.625rem] w-[2.625rem] shrink-0 overflow-hidden rounded-full bg-white/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
            {!logoFailed ? (
              <Image
                src={tool.logoSrc}
                alt=""
                width={42}
                height={42}
                className="block size-full object-cover"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <PlaceholderGlyph toolId={tool.id} />
              </div>
            )}
          </div>
        </motion.div>

        <span className="mt-1 max-w-[4.125rem] truncate text-center text-[10px] font-medium tracking-wide text-slate-500/90">
          {tool.name}
        </span>
      </motion.button>

      <motion.div
        role="tooltip"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : -4,
          pointerEvents: hovered ? "auto" : "none",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[calc(100%+0.35rem)] left-1/2 z-[60] w-[10.5rem] -translate-x-1/2 rounded-xl border border-white/80 bg-white/90 px-3 py-2.5 text-left shadow-[0_12px_32px_rgba(31,41,55,0.1)] backdrop-blur-md"
      >
        <p className="text-[11px] font-semibold text-slate-700">{tool.tooltipTitle}</p>
        <p className="mt-0.5 text-[10px] leading-relaxed text-slate-600/90">{tooltipBody}</p>
      </motion.div>
    </motion.div>
  );
}
