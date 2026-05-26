"use client";

import { Container } from "@/components/layout/Container";
import { ProjectFigure } from "@/components/project/ProjectFigure";
import { motion } from "framer-motion";
import {
  GitCompare,
  Layers3,
  Route,
  type LucideIcon,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 0.85, ease },
};

const FRAMEWORK_IMAGE =
  "/images/projects/gaode-poi/strategy-narrative/design-strategy.png";

const challengeCards = [
  {
    icon: Layers3,
    title: "行业繁杂，难以统一",
    description:
      "360+ 行业场景，如何建立统一内容框架，同时满足不同消费需求？",
  },
  {
    icon: GitCompare,
    title: "信息过载，感知困难",
    description:
      "用户如何快速找到真正重要的内容，而不是被海量信息淹没？",
  },
  {
    icon: Route,
    title: "缺乏沉浸，转化断层",
    description:
      "工具化展示难以建立消费信任，用户无法形成真正的到店决策。",
  },
] as const;

const sectionTitleClass =
  "font-serif text-3xl tracking-tight text-balance sm:text-4xl";
const subsectionTitleClass = "font-serif text-xl tracking-tight sm:text-2xl";
const sectionDescriptionClass =
  "text-base leading-relaxed text-muted sm:text-lg";
const subsectionDescriptionClass =
  "mt-3 text-base leading-relaxed text-muted sm:text-lg";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
      {children}
    </p>
  );
}

function SplitSectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  titleClassName = sectionTitleClass,
}: {
  eyebrow: string;
  title: string;
  description: string;
  titleId?: string;
  titleClassName?: string;
}) {
  return (
    <motion.header
      {...reveal}
      className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10 xl:gap-14"
    >
      <motion.div>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 id={titleId} className={titleClassName}>
          {title}
        </h2>
      </motion.div>
      <p
        className={`${sectionDescriptionClass} lg:pt-7`}
      >
        {description}
      </p>
    </motion.header>
  );
}

function ChallengeCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={{ ...reveal.transition, delay }}
      className="min-w-0 rounded-2xl border border-border bg-surface p-6 sm:p-7"
    >
      <Icon
        className="h-5 w-5 text-foreground"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-[17px]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-7">
        {description}
      </p>
    </motion.article>
  );
}

function StrategicBackgroundBlock() {
  return (
    <SplitSectionHeader
      eyebrow="Strategic Background"
      titleId="strategy-narrative-title"
      title="地图正在从工具走向内容消费"
      description="伴随高德从「导航工具」到「生活服务平台」的战略跃迁，POI 详情页从导航终点的信息补给站，演变为连接线上内容与线下体验的核心枢纽，需承载兴趣激发 → 信任建立 → 行动转化的全链路。"
    />
  );
}

function ChallengesBlock() {
  return (
    <motion.div
      {...reveal}
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6"
    >
      {challengeCards.map((card, index) => (
        <ChallengeCard
          key={card.title}
          icon={card.icon}
          title={card.title}
          description={card.description}
          delay={0.06 + index * 0.05}
        />
      ))}
    </motion.div>
  );
}

function DecisionFrameworkBlock() {
  return (
    <motion.div
      {...reveal}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12 xl:gap-16"
    >
      <div className="min-w-0">
        <SectionEyebrow>Decision Framework</SectionEyebrow>
        <h3 className={subsectionTitleClass}>重新定义地点消费决策路径</h3>
        <p className={subsectionDescriptionClass}>
          围绕用户真实线下消费行为，构建「感知 → 信任 → 行动」的内容消费路径，以此重构
          POI 页面的内容消费逻辑。
        </p>
      </div>

      <motion.div
        initial={reveal.initial}
        whileInView={reveal.whileInView}
        viewport={reveal.viewport}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="w-full min-w-0"
      >
        <ProjectFigure
          src={FRAMEWORK_IMAGE}
          alt="POI 内容消费决策框架：感知、信任、行动与相等·相似·相关"
          imageAspect="1448/1086"
          imageFit="contain"
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="bg-surface/80"
        />
      </motion.div>
    </motion.div>
  );
}

export function StrategyNarrativeSection() {
  return (
    <section
      id="strategy-narrative"
      aria-labelledby="strategy-narrative-title"
      className="scroll-mt-6 py-10 sm:py-14 lg:py-16"
    >
      <Container className="max-w-6xl">
        <motion.div className="space-y-12 sm:space-y-14 lg:space-y-16">
          <StrategicBackgroundBlock />
          <ChallengesBlock />
          <DecisionFrameworkBlock />
        </motion.div>
      </Container>
    </section>
  );
}
