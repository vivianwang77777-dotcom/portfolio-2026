"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 1, ease },
};

const narrativeBlocks = [
  {
    paragraphs: [
      "无限的信息流，正在吞掉生活的留白。",
      "过去的媒介有终点，今天的屏幕没有。",
    ],
  },
  {
    paragraphs: [
      "我们把最多时间，花在最不快乐的内容上。",
      "即时刺激不断消耗注意力与情绪。",
    ],
  },
  {
    paragraphs: [
      "屏幕让人越来越难真正回到现实世界。",
      "人与人之间，开始隔着一层发光的玻璃。",
    ],
  },
] as const;

/** 与 BalancePalCaseStudy 中 Eyebrow 一致 */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
      {children}
    </p>
  );
}

function SectionHeader() {
  return (
    <motion.div {...reveal} className="text-left">
      <SectionEyebrow>Why I Built This</SectionEyebrow>

      <h2
        id="why-built-heading"
        className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight text-slate-700 sm:mt-8 sm:text-4xl lg:text-5xl lg:leading-[1.1]"
      >
        我们不是在使用屏幕，
        <br />
        而是在被它填满。
      </h2>
    </motion.div>
  );
}

function NarrativeBody() {
  let lineIndex = 0;

  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.08 }}
      className="flex flex-col justify-center text-left"
    >
      <div className="space-y-10 sm:space-y-12">
        {narrativeBlocks.map((block, blockIndex) => (
          <div
            key={blockIndex}
            className="space-y-5 sm:space-y-6"
          >
            {block.paragraphs.map((line) => {
              const index = lineIndex++;
              return (
                <motion.p
                  key={line}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={{
                    ...reveal.transition,
                    delay: 0.06 + index * 0.04,
                  }}
                  className="text-base leading-[1.85] text-slate-600 sm:text-lg sm:leading-9"
                >
                  {line}
                </motion.p>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SceneVisual({ sceneSrc }: { sceneSrc: string }) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.1 }}
      className="w-full"
    >
      <div className="balance-pal-card overflow-hidden rounded-[2.5rem]">
        {/* 原生 img + ?v=mtime，避免 _next/image 与浏览器缓存旧图 */}
        <img
          src={sceneSrc}
          alt="少年在昏暗房间里刷手机，光之门后是阳光、自然与 Lumi 招手的真实世界"
          width={1024}
          height={768}
          className="block h-auto w-full"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </motion.div>
  );
}

function EmotionalResolution() {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay: 0.15 }}
      className="mx-auto mt-24 max-w-2xl text-center sm:mt-28 lg:mt-36"
    >
      <p className="text-base leading-[1.85] text-slate-500 sm:text-lg sm:leading-9">
        于是我开始思考：
      </p>
      <p className="mt-10 text-lg leading-[1.9] text-slate-600 sm:text-xl sm:leading-9">
        也许人们需要的，
        <br />
        并不是另一个限制屏幕时间的工具。
      </p>
      <p className="mt-8 text-lg leading-[1.9] text-slate-600 sm:text-xl sm:leading-9">
        而是一个能温柔提醒我们：
      </p>
      <p className="mt-10 text-xl font-medium leading-relaxed tracking-tight text-slate-700 sm:text-2xl sm:leading-[1.5]">
        「去生活吧。」
        <br />
        的陪伴者。
      </p>
    </motion.div>
  );
}

type WhyBuiltSectionProps = {
  sceneSrc: string;
};

export function WhyBuiltSection({ sceneSrc }: WhyBuiltSectionProps) {
  return (
    <section
      aria-labelledby="why-built-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl space-y-12 sm:space-y-14 lg:space-y-16">
        <SectionHeader />

        <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-20">
          <NarrativeBody />
          <SceneVisual sceneSrc={sceneSrc} />
        </div>

        <EmotionalResolution />
      </div>
    </section>
  );
}
