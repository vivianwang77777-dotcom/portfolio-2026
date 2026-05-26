"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ShowcasePhoneFrame } from "@/components/project/balance-pal/ShowcasePhoneFrame";
import {
  showcaseContentClass,
  showcaseContentStyle,
  SHOWCASE_SELECT_WIDTH_LG,
} from "@/components/project/balance-pal/showcase-layout";
import {
  TASK_IN_PROGRESS_SCREENS,
  TASK_SCREEN_FRAME,
  TASK_SELECT_SCREEN,
} from "@/lib/balance-pal-task-data";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-18%" },
  transition: { duration: 0.8, ease },
};

const TASK_ASPECT = `${TASK_SCREEN_FRAME.width} / ${TASK_SCREEN_FRAME.height}`;
const PROGRESS_SCALE = 0.6;

type TaskScreensSectionProps = {
  imageSrcs: string[];
};

export function TaskScreensSection({ imageSrcs }: TaskScreensSectionProps) {
  const selectFrameRef = useRef<HTMLDivElement>(null);
  const [selectWidth, setSelectWidth] = useState(0);

  useEffect(() => {
    const el = selectFrameRef.current;
    if (!el) return;

    const update = () => setSelectWidth(el.offsetWidth);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const progressWidth =
    selectWidth > 0 ? Math.round(selectWidth * PROGRESS_SCALE) : undefined;

  const selectSrc =
    imageSrcs[0] ??
    `/images/projects/balance-pal/tasks/${TASK_SELECT_SCREEN.file}`;

  return (
    <section
      aria-labelledby="task-screens-heading"
      className="relative z-10 px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
            任务页
          </p>
          <h2
            id="task-screens-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-slate-700 sm:text-4xl lg:text-5xl"
          >
            离开手机，把滋养时间带进生活。
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:leading-8">
            从活动选择到进行中状态——每一张界面都是一次温柔的「回到现实」邀请。
          </p>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 }}
          className={cn("mt-14", showcaseContentClass)}
          style={showcaseContentStyle}
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
            <article
              className="mx-auto flex w-full max-w-[300px] shrink-0 flex-col gap-5 sm:max-w-[320px] lg:mx-0 lg:w-[var(--bp-select-w)] lg:max-w-[var(--bp-select-w)]"
              style={
                { "--bp-select-w": `${SHOWCASE_SELECT_WIDTH_LG}px` } as CSSProperties
              }
            >
              <div ref={selectFrameRef} className="w-full">
                <ShowcasePhoneFrame
                  src={selectSrc}
                  alt={TASK_SELECT_SCREEN.imageAlt}
                  sizes="(max-width: 1024px) 90vw, 268px"
                  aspectRatio={TASK_ASPECT}
                  shadow="task-select"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-700 sm:text-2xl">
                  {TASK_SELECT_SCREEN.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {TASK_SELECT_SCREEN.text}
                </p>
              </div>
            </article>

            <div className="min-w-0 flex-1">
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 lg:sr-only">
                进行中
              </p>
              <div className="grid grid-cols-3 justify-items-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6">
                {TASK_IN_PROGRESS_SCREENS.map((screen, index) => {
                  const src =
                    imageSrcs[index + 1] ??
                    `/images/projects/balance-pal/tasks/${screen.file}`;

                  return (
                    <motion.figure
                      key={screen.file}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, ease, delay: index * 0.04 }}
                      className="flex flex-col items-center gap-2 sm:gap-2.5"
                      style={
                        progressWidth != null
                          ? { width: progressWidth }
                          : undefined
                      }
                    >
                      <ShowcasePhoneFrame
                        src={src}
                        alt={screen.imageAlt}
                        sizes={
                          progressWidth != null
                            ? `${progressWidth}px`
                            : "(max-width: 768px) 28vw, 160px"
                        }
                        aspectRatio={TASK_ASPECT}
                        width={progressWidth}
                        shadow="task-progress"
                      />
                      <figcaption className="w-full text-center text-[11px] font-medium text-slate-500 sm:text-xs">
                        {screen.title}
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
