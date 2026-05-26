"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUMI_CHARACTER_VIEWS } from "@/lib/balance-pal-lumi-data";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.9, ease },
};

const personality = ["温柔", "治愈", "陪伴感", "童趣", "低压力", "轻行动"] as const;

type ColorToken = {
  name: string;
  hex: string;
};

const colorGroups: { id: string; label: string; tokens: ColorToken[] }[] = [
  {
    id: "primary",
    label: "primary",
    tokens: [
      { name: "purple", hex: "#8B5CF6" },
      { name: "purple-light", hex: "#C4B5FD" },
    ],
  },
  {
    id: "text",
    label: "text",
    tokens: [
      { name: "primary", hex: "#1F2937" },
      { name: "secondary", hex: "#475569" },
      { name: "tertiary", hex: "#64748B" },
      { name: "muted", hex: "#94A3B8" },
    ],
  },
  {
    id: "background",
    label: "background",
    tokens: [
      { name: "white", hex: "#FFFFFF" },
      { name: "gray", hex: "#F5F5F5" },
    ],
  },
  {
    id: "cards",
    label: "cards",
    tokens: [
      { name: "pink", hex: "#FCE7F3" },
      { name: "green", hex: "#D1FAE5" },
      { name: "blue", hex: "#DBEAFE" },
      { name: "yellow", hex: "#FEF9C3" },
    ],
  },
];

const typeScale = [
  {
    label: "H1",
    meta: "30px · Bold · Comic Sans MS (EN)",
    sample: "BalancePal",
    className: "ds-h1-en text-[30px] font-bold leading-tight text-slate-700",
  },
  {
    label: "H2",
    meta: "24px · ExtraBold",
    sample: "今日能量 65%",
    className: "text-2xl font-extrabold leading-tight text-slate-700",
  },
  {
    label: "H3",
    meta: "18px · Bold",
    sample: "一起做点有趣的事",
    className: "text-lg font-bold leading-snug text-slate-700",
  },
  {
    label: "Body",
    meta: "16px · Regular",
    sample: "我们一起做点有趣的事吧～",
    className: "text-base font-normal leading-7 text-slate-600",
  },
  {
    label: "Small",
    meta: "14px · Regular",
    sample: "滋养时间推荐",
    className: "text-sm font-normal leading-6 text-slate-600",
  },
  {
    label: "Caption",
    meta: "12px · Regular",
    sample: "欢迎回来 · 15 分钟",
    className: "text-xs font-normal leading-5 text-slate-500",
  },
] as const;

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...reveal}
      className={`rounded-[2rem] border border-white/85 bg-white/[0.72] p-5 shadow-[0_18px_52px_rgba(31,41,55,0.045)] backdrop-blur-[22px] sm:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BlockLabel({ index, title }: { index: string; title: string }) {
  return (
    <motion.div {...reveal} className="mb-3 flex items-baseline gap-3 sm:mb-4">
      <span className="text-xs font-semibold tracking-[0.22em] text-slate-400">{index}</span>
      <h3 className="text-lg font-semibold tracking-tight text-slate-700 sm:text-xl">{title}</h3>
    </motion.div>
  );
}

const tokenTileClass =
  "overflow-hidden rounded-[1.15rem] border border-white/80 shadow-[0_8px_22px_rgba(31,41,55,0.03)]";

const colorSwatchTileClass =
  "flex min-h-[3.25rem] items-center gap-2.5 overflow-hidden rounded-lg border border-white/80 bg-white/50 px-2 py-1.5 shadow-[0_8px_22px_rgba(31,41,55,0.03)] sm:min-h-[3.5rem] sm:gap-3 sm:px-2.5 sm:py-2";

function ColorSwatchTile({ token, index }: { token: ColorToken; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease, delay: index * 0.025 }}
      className={colorSwatchTileClass}
    >
      <div
        className="h-9 w-9 shrink-0 rounded-md sm:h-10 sm:w-10"
        style={{ backgroundColor: token.hex }}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col items-end justify-center text-right">
        <p className="text-[9px] font-medium capitalize leading-none text-slate-500">
          {token.name}
        </p>
        <p className="mt-0.5 font-mono text-[11px] font-bold leading-tight tracking-tight text-slate-700">
          {token.hex}
        </p>
      </div>
    </motion.div>
  );
}

function ColorPalettePanel() {
  let tileIndex = 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-2.5 shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Color
      </p>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {colorGroups.map((group) => (
          <div key={group.id}>
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {group.tokens.map((token) => (
                <ColorSwatchTile
                  key={`${group.id}-${token.name}`}
                  token={token}
                  index={tileIndex++}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <p className="mb-2.5 shrink-0 text-xs font-normal uppercase tracking-[0.18em] text-slate-400">
        Typography
      </p>
      <div className="min-h-0 flex-1 space-y-2">
        {typeScale.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: index * 0.04 }}
            className="rounded-xl border border-white/70 bg-[#fbf8f4]/80 px-3 py-2"
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs font-normal uppercase tracking-[0.14em] text-slate-400">
                {item.label}
              </span>
              <span className="text-xs font-normal text-slate-400">{item.meta}</span>
            </div>
            <p className={`font-sans ${item.className}`}>{item.sample}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ColorTypographyPanel() {
  return (
    <SectionCard>
      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <ColorPalettePanel />
        <TypographyPanel />
      </div>
    </SectionCard>
  );
}

function LumiCharacterPanel({ lumiViewSrcs }: { lumiViewSrcs: string[] }) {
  const views = LUMI_CHARACTER_VIEWS.map((view, index) => ({
    ...view,
    src: lumiViewSrcs[index] ?? `/images/projects/balance-pal/lumi/${view.file}`,
  }));

  return (
    <SectionCard>
      <p className="mb-4 w-full text-sm leading-relaxed text-slate-600">
        Lumi 是 BalancePal 的情绪陪伴角色——圆润、温柔、带一点童趣。以下为多场景形象探索，用于产品叙事与界面情感表达。
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {views.map((view, index) => (
          <motion.figure
            key={view.file}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease, delay: index * 0.03 }}
            className={`relative aspect-square w-full ${tokenTileClass}`}
          >
            <Image
              src={view.src}
              alt={view.alt}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-2 pb-2 pt-6 text-center text-[11px] font-semibold text-slate-600">
              {view.label}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionCard>
  );
}

export function DesignSystemSection({
  lumiViewSrcs,
}: {
  lumiViewSrcs: string[];
}) {
  return (
    <section className="relative z-10 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            Design System
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-700 sm:text-4xl lg:text-[2.75rem]">
            温柔、可触摸的视觉语言
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:leading-8">
            BalancePal 不是效率工具，而是一位会呼吸的陪伴者。视觉语言始终围绕「被理解、被温柔提醒、被鼓励回到生活」展开。
          </p>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
            className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2.5"
          >
            {personality.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: index * 0.03 }}
                className="rounded-full border border-white/80 bg-gradient-to-br from-white/90 to-violet-50/60 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-[0_6px_18px_rgba(31,41,55,0.04)]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 }}
          className="mt-10 space-y-8 lg:space-y-9"
        >
          <div>
            <BlockLabel index="01" title="Color · Typography" />
            <ColorTypographyPanel />
          </div>

          <div>
            <BlockLabel index="02" title="Lumi 形象" />
            <LumiCharacterPanel lumiViewSrcs={lumiViewSrcs} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
