"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Sparkles,
  Waves,
} from "lucide-react";
import { imageAspectStyle } from "@/lib/project-image";
import { AIWorkflowJourney } from "@/components/project/balance-pal/AIWorkflowJourney";
import { EmotionalRecoveryJourney } from "@/components/project/balance-pal/EmotionalRecoveryJourney";
import { DesignSystemSection } from "@/components/project/balance-pal/DesignSystemSection";
import { ShowcasePhoneFrame } from "@/components/project/balance-pal/ShowcasePhoneFrame";
import {
  showcaseContentClass,
  showcaseContentStyle,
} from "@/components/project/balance-pal/showcase-layout";
import { TaskScreensSection } from "@/components/project/balance-pal/TaskScreensSection";
import { WhyBuiltSection } from "@/components/project/balance-pal/WhyBuiltSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-18%" },
  transition: { duration: 0.8, ease },
};

const tags = ["AI 原生", "情绪产品", "氛围编程", "体验设计 + AI"];

/** 图标容器纯色 — 对应 AI Workflow 卡片光晕色系 */
const visionCards = [
  {
    icon: Heart,
    title: "情绪镜像",
    text: "Lumi 会随着屏幕时间、运动状态和生活行为变化，成为用户情绪状态的温柔镜像。",
    image: "/images/projects/balance-pal/emotion-states.jpg",
    imageAlt: "Lumi 情绪状态与今日能量展示",
    imageWidth: 1362,
    imageHeight: 751,
    iconBg: "#EADCFB",
    iconColor: "#7C3AED",
  },
  {
    icon: Waves,
    title: "滋养时间",
    text: "不是粗暴减少屏幕，而是识别真正让人恢复能量的现实生活时间。",
    image: "/images/projects/balance-pal/nourishing-activities.jpg",
    imageAlt: "散步、泡脚、阅读等滋养时间推荐",
    imageWidth: 1400,
    imageHeight: 772,
    iconBg: "#E8F7E9",
    iconColor: "#059669",
  },
  {
    icon: MessageCircle,
    title: "声音陪伴",
    text: "当焦虑和信息疲劳出现时，用户可以用声音和 Lumi 对话，而不是独自对抗。",
    image: "/images/projects/balance-pal/chat-with-lumi.jpg",
    imageAlt: "Lumi 正在倾听用户心声",
    imageWidth: 1401,
    imageHeight: 772,
    iconBg: "#DCEBFF",
    iconColor: "#2563EB",
  },
] as const;

/** 三张首页截图统一画框（786–787 × 1706） */
const HOME_SCREEN_FRAME = { width: 787, height: 1706 } as const;

const homeScreens = [
  {
    title: "首页 · 情绪低落",
    text: "屏幕时间过长时，Lumi 会难过、流泪，今日能量随之下降。",
    image: "/images/projects/home-sad.png",
    imageAlt: "BalancePal 首页，Lumi 难过蜷坐，今日能量 15%",
  },
  {
    title: "首页 · 平稳陪伴",
    text: "用户第一眼看到的是 Lumi 的状态与一句温柔邀请，而不是一串令人焦虑的数据。",
    image: "/images/projects/home-good.png",
    imageAlt: "BalancePal 首页，Lumi 挥手邀请，今日能量 65%",
  },
  {
    title: "首页 · 状态充盈",
    text: "完成滋养时间后，Lumi 恢复活力，能量条接近满格，彩虹光晕回应真实生活。",
    image: "/images/projects/home-happy.png",
    imageAlt: "BalancePal 首页，Lumi 欢快起舞，今日能量 90%",
  },
] as const;

const COVER_ASPECT = "1024/768";
const COVER_ALT =
  "BalancePal 项目封面：首页、活动选择与逛公园任务界面";

type BalancePalCaseStudyProps = {
  coverSrc: string;
  whyBuiltSceneSrc: string;
  homeScreenSrcs: string[];
  taskScreenSrcs: string[];
  lumiViewSrcs: string[];
};

export function BalancePalCaseStudy({
  coverSrc,
  whyBuiltSceneSrc,
  homeScreenSrcs,
  taskScreenSrcs,
  lumiViewSrcs,
}: BalancePalCaseStudyProps) {
  return (
    <main className="balance-pal-case min-h-screen overflow-hidden bg-[#fbf8f4] text-[#1f2937]">
      <AmbientBackground />
      <BackNav />
      <Hero coverSrc={coverSrc} />
      <WhyBuiltSection sceneSrc={whyBuiltSceneSrc} />
      <ProductVision />
      <KeyScreens imageSrcs={homeScreenSrcs} />
      <TaskScreensSection imageSrcs={taskScreenSrcs} />
      <EmotionalRecoveryJourney />
      <AIWorkflowJourney />
      <DesignSystemSection lumiViewSrcs={lumiViewSrcs} />
      <Reflection />
    </main>
  );
}

function BackNav() {
  return (
    <div className="fixed left-5 top-5 z-50">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.44] shadow-[0_12px_34px_rgba(31,41,55,0.035)] backdrop-blur-[18px] px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white"
      >
        <ArrowLeft size={16} />
        返回作品
      </Link>
    </div>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-96 w-96 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-[#dcecff]/40 blur-3xl" />
      <div className="absolute right-[-8rem] top-[24rem] h-[34rem] w-[34rem] animate-[pulse_9s_ease-in-out_infinite] rounded-full bg-[#eadcff]/35 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-[#fff0d8]/40 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.11] [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
    </div>
  );
}

function Hero({ coverSrc }: { coverSrc: string }) {
  return (
    <section className="relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <motion.div {...reveal}>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/[0.44] shadow-[0_12px_34px_rgba(31,41,55,0.035)] backdrop-blur-[18px] px-4 py-2 text-sm font-medium text-slate-600">
            <LumiMark size="sm" />
            BalancePal
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-700 sm:text-5xl lg:text-6xl">
            一个温柔陪伴你数字生活的朋友。
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
            一个用 AI 原生工作流和氛围编程完成的情绪健康产品。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/80 bg-white/[0.44] shadow-[0_12px_34px_rgba(31,41,55,0.035)] backdrop-blur-[18px] px-4 py-2 text-sm text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="w-full min-w-0 lg:justify-self-end"
        >
          <HeroCover src={coverSrc} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroCover({ src }: { src: string }) {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/85 bg-white/[0.58] shadow-[0_18px_52px_rgba(31,41,55,0.045)] backdrop-blur-[22px] sm:rounded-[3rem]"
      style={imageAspectStyle(COVER_ASPECT)}
    >
      <Image
        src={src}
        alt={COVER_ALT}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </figure>
  );
}

function ProductVision() {
  return (
    <Section>
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <Eyebrow>产品愿景</Eyebrow>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-700 sm:text-4xl lg:text-5xl">
          从屏幕控制，走向情绪连接。
        </h2>
      </motion.div>
      <div className="mt-14 grid gap-6 sm:gap-8 lg:grid-cols-3">
        {visionCards.map((card, index) => (
          <motion.article
            key={card.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="flex flex-col overflow-hidden rounded-[2.25rem] border border-white/85 bg-white/[0.58] shadow-[0_18px_52px_rgba(31,41,55,0.045)] backdrop-blur-[22px]"
          >
            <div className="p-7 pb-0 sm:p-8 sm:pb-0">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/80 shadow-[0_12px_34px_rgba(31,41,55,0.035)] backdrop-blur-[18px]"
                style={{
                  backgroundColor: card.iconBg,
                  color: card.iconColor,
                }}
              >
                <card.icon size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-700 sm:text-[1.75rem]">
                {card.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{card.text}</p>
            </div>
            <div className="relative mt-4 w-full shrink-0 sm:mt-5">
              <Image
                src={card.image}
                alt={card.imageAlt}
                width={card.imageWidth}
                height={card.imageHeight}
                className="block h-auto w-full object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={index === 0}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function KeyScreens({ imageSrcs }: { imageSrcs: string[] }) {
  return (
    <Section>
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <Eyebrow>关键界面</Eyebrow>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-700 sm:text-4xl lg:text-5xl">
          不是展示截图，而是展示一个个使用时刻。
        </h2>
      </motion.div>

      <div
        className={cn("mt-14", showcaseContentClass)}
        style={showcaseContentStyle}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {homeScreens.map((screen, index) => (
            <motion.article
              key={screen.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.08 }}
              className="flex flex-col gap-5"
            >
              <ShowcasePhoneFrame
                src={imageSrcs[index] ?? screen.image}
                alt={screen.imageAlt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                aspectRatio={`${HOME_SCREEN_FRAME.width} / ${HOME_SCREEN_FRAME.height}`}
                shadow="home"
              />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-slate-700 sm:text-2xl">
                  {screen.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {screen.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Reflection() {
  return (
    <section className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
      <motion.div {...reveal} className="mx-auto max-w-5xl text-center">
        <Eyebrow>项目复盘</Eyebrow>
        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-slate-700 sm:text-4xl lg:text-5xl">
          AI 正在缩短想法 → 设计 → 原型 → 产品的距离。
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600">
          设计师正在从“界面设计者”，变成能够用 AI 组织想法、生成系统、构建产品的 AI 原生产品创造者。
        </p>
        <p className="mt-16 text-2xl font-medium text-slate-700">
          “BalancePal 是我从设计师走向创造者的第一步。”
        </p>
      </motion.div>
    </section>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`relative z-10 px-5 py-24 sm:px-8 lg:py-32 ${className}`}><div className="mx-auto max-w-7xl">{children}</div></section>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">{children}</p>;
}

function LumiMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-20 w-20" : "h-12 w-12";
  return <span className={`inline-flex ${box} items-center justify-center rounded-full border border-white/80 bg-white/[0.44] shadow-[0_12px_34px_rgba(31,41,55,0.035)] backdrop-blur-[18px] text-slate-700`}><Sparkles size={size === "sm" ? 15 : size === "lg" ? 30 : 20} /></span>;
}

