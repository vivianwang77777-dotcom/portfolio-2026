import type { LucideIcon } from "lucide-react";
import {
  Bath,
  BookOpen,
  Footprints,
  Music,
  PenLine,
  Sparkles,
  Sun,
  Wind,
} from "lucide-react";

export type EmotionStateId = "sad" | "normal" | "happy";

export type EmotionState = {
  id: EmotionStateId;
  label: string;
  energy: number;
  image: string;
  imageAlt: string;
  ambient: {
    base: string;
    glowA: string;
    glowB: string;
    particle: string;
  };
  rail: {
    track: string;
    fill: string;
    glow: string;
  };
};

export type RecoveryActivity = {
  id: string;
  name: string;
  energy: number;
  icon: LucideIcon;
  position: { top: string; left: string };
  delay: number;
  bubble: string;
};

export const EMOTION_STATES: EmotionState[] = [
  {
    id: "sad",
    label: "不开心",
    energy: 15,
    image: "/images/lumi-sad.png",
    imageAlt: "低能量 Lumi，缩成一团",
    ambient: {
      base: "#e8eef4",
      glowA: "rgba(148, 163, 184, 0.22)",
      glowB: "rgba(186, 198, 214, 0.18)",
      particle: "rgba(148, 163, 184, 0.35)",
    },
    rail: {
      track: "rgba(148, 163, 184, 0.25)",
      fill: "linear-gradient(90deg, #94a3b8 0%, #b8c5d6 55%, #cbd5e1 100%)",
      glow: "rgba(148, 163, 184, 0.35)",
    },
  },
  {
    id: "normal",
    label: "状态不错",
    energy: 77,
    image: "/images/lumi-normal.png",
    imageAlt: "平静 Lumi，温和陪伴",
    ambient: {
      base: "#e8f3fc",
      glowA: "rgba(186, 220, 255, 0.45)",
      glowB: "rgba(220, 235, 255, 0.55)",
      particle: "rgba(125, 180, 230, 0.4)",
    },
    rail: {
      track: "rgba(186, 220, 255, 0.35)",
      fill: "linear-gradient(90deg, #7dd3fc 0%, #93c5fd 45%, #a5b4fc 100%)",
      glow: "rgba(125, 180, 255, 0.45)",
    },
  },
  {
    id: "happy",
    label: "活力满满",
    energy: 96,
    image: "/images/lumi-happy.png",
    imageAlt: "开心 Lumi，活力跳跃",
    ambient: {
      base: "#faf4ff",
      glowA: "rgba(234, 220, 251, 0.55)",
      glowB: "rgba(255, 220, 240, 0.5)",
      particle: "rgba(196, 181, 253, 0.45)",
    },
    rail: {
      track: "rgba(234, 220, 251, 0.4)",
      fill: "linear-gradient(90deg, #c4b5fd 0%, #f0abfc 42%, #fda4af 100%)",
      glow: "rgba(196, 181, 253, 0.5)",
    },
  },
];

export const RECOVERY_ACTIVITIES: RecoveryActivity[] = [
  {
    id: "walk",
    name: "散步",
    energy: 15,
    icon: Footprints,
    position: { top: "8%", left: "6%" },
    delay: 0,
    bubble: "from-sky-100/90 via-blue-50/80 to-indigo-50/50",
  },
  {
    id: "read",
    name: "阅读",
    energy: 10,
    icon: BookOpen,
    position: { top: "18%", left: "78%" },
    delay: 0.8,
    bubble: "from-violet-100/85 via-purple-50/75 to-fuchsia-50/45",
  },
  {
    id: "soak",
    name: "泡脚",
    energy: 12,
    icon: Bath,
    position: { top: "62%", left: "4%" },
    delay: 1.4,
    bubble: "from-amber-100/85 via-yellow-50/70 to-orange-50/45",
  },
  {
    id: "sun",
    name: "晒太阳",
    energy: 14,
    icon: Sun,
    position: { top: "72%", left: "82%" },
    delay: 2,
    bubble: "from-rose-100/80 via-pink-50/70 to-orange-50/40",
  },
  {
    id: "breathe",
    name: "深呼吸",
    energy: 8,
    icon: Wind,
    position: { top: "42%", left: "2%" },
    delay: 2.6,
    bubble: "from-emerald-100/85 via-teal-50/70 to-cyan-50/45",
  },
  {
    id: "meditate",
    name: "冥想",
    energy: 11,
    icon: Sparkles,
    position: { top: "38%", left: "86%" },
    delay: 3.2,
    bubble: "from-slate-100/90 via-blue-50/65 to-violet-50/45",
  },
  {
    id: "music",
    name: "听音乐",
    energy: 9,
    icon: Music,
    position: { top: "52%", left: "88%" },
    delay: 1.8,
    bubble: "from-fuchsia-100/80 via-pink-50/65 to-rose-50/40",
  },
  {
    id: "journal",
    name: "写日记",
    energy: 10,
    icon: PenLine,
    position: { top: "78%", left: "38%" },
    delay: 3.8,
    bubble: "from-blue-100/85 via-sky-50/70 to-indigo-50/45",
  },
];

export function emotionFromEnergy(energy: number): EmotionStateId {
  if (energy < 45) return "sad";
  if (energy < 88) return "normal";
  return "happy";
}

export function getEmotionState(id: EmotionStateId) {
  return EMOTION_STATES.find((s) => s.id === id)!;
}
