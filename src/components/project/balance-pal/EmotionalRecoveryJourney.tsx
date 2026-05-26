"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";
import {
  EMOTION_STATES,
  emotionFromEnergy,
  getEmotionState,
  RECOVERY_ACTIVITIES,
  type EmotionStateId,
  type RecoveryActivity,
} from "@/lib/emotional-recovery-data";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring" as const, stiffness: 120, damping: 22 };
const FLY_DURATION = 0.72;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.9, ease },
};

type Point = { x: number; y: number };

type FlyingPayload = {
  activity: RecoveryActivity;
  from: Point;
  to: Point;
};

function EmotionTabs({
  activeId,
  onSelect,
}: {
  activeId: EmotionStateId;
  onSelect: (id: EmotionStateId) => void;
}) {
  return (
    <LayoutGroup id="emotion-tabs">
      <div
        role="tablist"
        aria-label="Lumi 情绪状态"
        className="mx-auto inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/80 bg-white/45 p-1.5 shadow-[0_12px_34px_rgba(31,41,55,0.04)] backdrop-blur-[20px] sm:gap-2.5 sm:p-2"
      >
        {EMOTION_STATES.map((state) => {
          const active = state.id === activeId;
          return (
            <button
              key={state.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(state.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-[15px]",
                active ? "text-slate-700" : "text-slate-500 hover:text-slate-600",
              )}
            >
              {active && (
                <motion.span
                  layoutId="emotion-tab-pill"
                  className="absolute inset-0 rounded-full border border-white/90 bg-white/85 shadow-[0_6px_20px_rgba(31,41,55,0.06)]"
                  transition={spring}
                />
              )}
              <span className="relative z-10">{state.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function EnergyRail({
  energy,
  state,
  railRef,
  absorbing,
}: {
  energy: number;
  state: ReturnType<typeof getEmotionState>;
  railRef: RefObject<HTMLDivElement | null>;
  absorbing: boolean;
}) {
  return (
    <div ref={railRef} className="mx-auto w-full max-w-md px-2 sm:max-w-lg">
      <div className="mb-2 flex items-end justify-between gap-4">
        <span className="text-xs font-medium text-slate-500 sm:text-sm">今日能量</span>
        <motion.span
          key={Math.round(energy)}
          initial={{ opacity: 0, y: 6 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: absorbing ? [1, 1.12, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.5, ease },
            y: { duration: 0.5, ease },
            scale: { duration: 0.45, ease },
          }}
          className="font-mono text-xl font-semibold tracking-tight text-slate-700 sm:text-2xl"
        >
          {Math.round(energy)}%
        </motion.span>
      </div>
      <motion.div
        animate={absorbing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.45, ease }}
        className="relative h-3 overflow-hidden rounded-full sm:h-3.5"
        style={{ backgroundColor: state.rail.track }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: state.rail.fill,
            boxShadow: `0 0 28px ${state.rail.glow}, 0 0 12px ${state.rail.glow}`,
          }}
          initial={false}
          animate={{ width: `${energy}%` }}
          transition={{ duration: 1.1, ease }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-full opacity-70 blur-md"
          style={{ background: state.rail.fill }}
          animate={{
            x: ["-20%", "280%"],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

function ActivityBubbleFace({
  activity,
  compact,
}: {
  activity: RecoveryActivity;
  compact?: boolean;
}) {
  const Icon = activity.icon;

  return (
    <>
      <Icon
        size={compact ? 16 : 18}
        strokeWidth={1.6}
        className="text-slate-600"
        aria-hidden
      />
      <span
        className={cn(
          "font-semibold text-slate-700",
          compact ? "text-[11px]" : "text-xs sm:text-[13px]",
        )}
      >
        {activity.name}
      </span>
      <span
        className={cn(
          "font-medium text-slate-500",
          compact ? "text-[9px]" : "text-[10px] sm:text-xs",
        )}
      >
        +{activity.energy} 能量
      </span>
    </>
  );
}

function ActivityBubble({
  activity,
  hovered,
  hidden,
  onHover,
  onClick,
}: {
  activity: RecoveryActivity;
  hovered: boolean;
  hidden: boolean;
  onHover: (id: string | null) => void;
  onClick: (activity: RecoveryActivity, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`${activity.name}，增加 ${activity.energy} 能量`}
      disabled={hidden}
      className={cn(
        "absolute z-20 flex flex-col items-center gap-1 rounded-[1.35rem] border border-white/75 bg-gradient-to-br px-3 py-2.5 shadow-[0_10px_28px_rgba(31,41,55,0.05)] backdrop-blur-[18px] sm:rounded-[1.5rem] sm:px-3.5 sm:py-3",
        activity.bubble,
        hidden && "pointer-events-none invisible",
      )}
      style={{
        top: activity.position.top,
        left: activity.position.left,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: hidden ? 0 : 1, scale: hidden ? 0.8 : 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: activity.delay * 0.08 }}
      animate={{
        y: hidden ? 0 : [0, -7, 0],
        scale: hidden ? 0.8 : hovered ? 1.06 : 1,
        opacity: hidden ? 0 : 1,
      }}
      whileHover={hidden ? undefined : { scale: 1.07 }}
      whileTap={hidden ? undefined : { scale: 0.98 }}
      onHoverStart={() => !hidden && onHover(activity.id)}
      onHoverEnd={() => onHover(null)}
      onClick={(e) => !hidden && onClick(activity, e)}
    >
      <ActivityBubbleFace activity={activity} />
      {hovered && !hidden && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute -inset-1 rounded-[1.6rem] blur-md"
          style={{ background: "rgba(255,255,255,0.55)" }}
        />
      )}
    </motion.button>
  );
}

function FlyingActivityBubble({
  activity,
  from,
  to,
  onComplete,
}: FlyingPayload & { onComplete: () => void }) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-[1.35rem] border border-white/80 bg-gradient-to-br px-3 py-2 shadow-[0_14px_36px_rgba(31,41,55,0.1)] backdrop-blur-[18px]",
        activity.bubble,
      )}
      style={{ left: 0, top: 0 }}
      initial={{
        x: from.x,
        y: from.y,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: to.x,
        y: to.y,
        scale: 0.35,
        opacity: 0,
      }}
      transition={{ duration: FLY_DURATION, ease }}
      onAnimationComplete={onComplete}
    >
      <ActivityBubbleFace activity={activity} compact />
    </motion.div>
  );
}

function LumiFigure({
  state,
  lumiNudge,
}: {
  state: ReturnType<typeof getEmotionState>;
  lumiNudge: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      <p className="mb-3 text-center text-xs font-medium text-slate-500 sm:mb-4 sm:text-sm">
        点击任务帮 Lumi 积攒能量
      </p>
      <motion.div
        animate={{
          scale: lumiNudge ? [1, 1.04, 1] : [1, 1.02, 1],
          y: [0, -10, 0],
        }}
        transition={{
          scale: { duration: 0.55, ease },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative"
      >
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: state.ambient.glowA }}
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative h-60 w-60 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/55 shadow-[0_12px_36px_rgba(31,41,55,0.06)] sm:h-[264px] sm:w-[264px] sm:rounded-[2rem] lg:h-72 lg:w-72">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.id}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
              transition={{ duration: 0.65, ease }}
              className="absolute inset-0"
            >
              <Image
                src={state.image}
                alt={state.imageAlt}
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 768px) 60vw, 288px"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function EmotionalRecoveryJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const energyRailRef = useRef<HTMLDivElement>(null);

  const [energy, setEnergy] = useState(15);
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const [consumedIds, setConsumedIds] = useState<Set<string>>(() => new Set());
  const [flying, setFlying] = useState<FlyingPayload | null>(null);
  const [lumiNudge, setLumiNudge] = useState(false);
  const [energyAbsorbing, setEnergyAbsorbing] = useState(false);

  const activeStateId = emotionFromEnergy(energy);
  const displayState = getEmotionState(activeStateId);
  const isFlying = flying !== null;

  const handleTabSelect = useCallback((id: EmotionStateId) => {
    setEnergy(getEmotionState(id).energy);
    setConsumedIds(new Set());
    setFlying(null);
    setHoveredActivity(null);
    setEnergyAbsorbing(false);
  }, []);

  const handleActivityClick = useCallback(
    (activity: RecoveryActivity, event: MouseEvent<HTMLButtonElement>) => {
      if (isFlying || consumedIds.has(activity.id)) return;

      const container = journeyRef.current;
      const energyEl = energyRailRef.current;
      const bubbleEl = event.currentTarget;
      if (!container || !energyEl) return;

      const cRect = container.getBoundingClientRect();
      const bRect = bubbleEl.getBoundingClientRect();
      const eRect = energyEl.getBoundingClientRect();

      setConsumedIds((prev) => new Set(prev).add(activity.id));
      setHoveredActivity(null);
      setLumiNudge(true);

      setFlying({
        activity,
        from: {
          x: bRect.left - cRect.left + bRect.width / 2,
          y: bRect.top - cRect.top + bRect.height / 2,
        },
        to: {
          x: eRect.left - cRect.left + eRect.width / 2,
          y: eRect.top - cRect.top + eRect.height / 2,
        },
      });
    },
    [consumedIds, isFlying],
  );

  return (
    <section
      aria-labelledby="emotional-journey-heading"
      className="relative z-10 overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:py-14"
    >
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-sm">
          体验流程
        </p>
        <h2
          id="emotional-journey-heading"
          className="mt-3 text-2xl font-semibold tracking-tight text-slate-700 sm:text-3xl lg:text-4xl lg:leading-tight"
        >
          现实生活里的小行动，
          <br className="hidden sm:block" />
          一点点帮 Lumi 恢复情绪
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          像在照顾一个有情绪反馈的生命体——不是阅读功能列表，而是一次温柔的互动旅程。
        </p>
      </motion.div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mx-auto mt-6 max-w-6xl sm:mt-8"
      >
        <div
          ref={journeyRef}
          className="relative flex flex-col items-center gap-6 px-2 sm:gap-8 sm:px-4"
        >
          <EmotionTabs activeId={activeStateId} onSelect={handleTabSelect} />

          <div className="relative mx-auto h-[min(54vw,360px)] w-full max-w-4xl sm:h-[min(50vw,400px)] lg:h-[420px]">
            {RECOVERY_ACTIVITIES.map((activity) => (
              <ActivityBubble
                key={activity.id}
                activity={activity}
                hovered={hoveredActivity === activity.id}
                hidden={consumedIds.has(activity.id) || flying?.activity.id === activity.id}
                onHover={setHoveredActivity}
                onClick={handleActivityClick}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <LumiFigure state={displayState} lumiNudge={lumiNudge} />
            </div>
          </div>

          <AnimatePresence>
            {flying && (
              <FlyingActivityBubble
                key={flying.activity.id}
                {...flying}
                onComplete={() => {
                  setEnergy((prev) =>
                    Math.min(100, prev + flying.activity.energy),
                  );
                  setEnergyAbsorbing(true);
                  setFlying(null);
                  setTimeout(() => setEnergyAbsorbing(false), 500);
                  setTimeout(() => setLumiNudge(false), 600);
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 w-full max-w-xl">
            <EnergyRail
              energy={energy}
              state={displayState}
              railRef={energyRailRef}
              absorbing={energyAbsorbing}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative z-10 mx-auto max-w-2xl text-center text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7"
          >
            现实生活中的每一个小行动，都会被记录，成为你情绪恢复的能量。
            <span className="mt-1 block text-slate-500">
              Lumi 开心的时候，其实也是你重新回到生活里的时候。
            </span>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
