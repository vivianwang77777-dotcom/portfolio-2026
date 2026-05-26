"use client";

/** Arounda 色板：右上 #5641FF · 左下 rgb(255, 173, 231) */
export function CinematicBackground() {
  return (
    <div
      aria-hidden="true"
      className="cinematic-background pointer-events-none fixed inset-0 z-0"
    >
      {/* 略大于视口的画布，减轻四角硬裁切 */}
      <div className="absolute -inset-[20%]">
        <div className="cinematic-ambient-bg absolute inset-0" />
        <div className="cinematic-glow-orbs absolute inset-0" aria-hidden="true" />
      </div>

      <div className="cinematic-noise absolute inset-0 opacity-[0.1]" />
      <div className="cinematic-vignette-soft absolute inset-0" />
    </div>
  );
}
