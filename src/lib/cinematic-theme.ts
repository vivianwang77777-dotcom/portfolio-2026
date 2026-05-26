import type { ProjectTheme } from "@/lib/content";

/** Arounda 色板 */
export const CINEMATIC_PALETTE = {
  pink: "#ff6cd2",
  purple: "#5641ff",
  blue: "#acd0ff",
  surface: "#292929",
  white: "#ffffff",
} as const;

export const CINEMATIC_THEME = {
  background: "#000000",
  foreground: "rgba(255, 255, 255, 0.88)",
  muted: "rgba(255, 255, 255, 0.45)",
  secondary: "rgba(255, 255, 255, 0.72)",
  border: "rgba(255, 255, 255, 0.1)",
  surface: "rgba(41, 41, 41, 0.35)",
  accent: CINEMATIC_PALETTE.pink,
  glowPink: CINEMATIC_PALETTE.pink,
  glowPurple: CINEMATIC_PALETTE.purple,
  glowBlue: CINEMATIC_PALETTE.blue,
  gradientStart: CINEMATIC_PALETTE.blue,
  gradientMid: CINEMATIC_PALETTE.purple,
  gradientEnd: CINEMATIC_PALETTE.pink,
} as const;

export function isProjectCinematic(theme?: ProjectTheme): boolean {
  return theme?.presentation === "cinematic";
}

export function getCinematicThemeStyle(
  theme?: ProjectTheme,
): Record<string, string> {
  const t = { ...CINEMATIC_THEME, ...theme };
  return {
    "--background": t.background ?? CINEMATIC_THEME.background,
    "--foreground": t.foreground ?? CINEMATIC_THEME.foreground,
    "--muted": t.muted ?? CINEMATIC_THEME.muted,
    "--border": t.border ?? CINEMATIC_THEME.border,
    "--surface": t.surface ?? CINEMATIC_THEME.surface,
    "--accent": t.accent ?? CINEMATIC_THEME.accent,
    "--gradient-start": t.gradientStart ?? CINEMATIC_THEME.gradientStart,
    "--gradient-mid": t.gradientMid ?? CINEMATIC_THEME.gradientMid,
    "--gradient-end": t.gradientEnd ?? CINEMATIC_THEME.gradientEnd,
    "--cinematic-secondary": CINEMATIC_THEME.secondary,
    "--cinematic-glow-pink": CINEMATIC_PALETTE.pink,
    "--cinematic-glow-purple": CINEMATIC_PALETTE.purple,
    "--cinematic-glow-blue": CINEMATIC_PALETTE.blue,
  };
}
