"use client";

/** Hero 区域光晕：与全页背景呼应，并向下方 section 过渡 */
export function HeroAmbientLights() {
  return (
    <div
      aria-hidden="true"
      className="hero-ambient-lights pointer-events-none absolute -inset-x-[12%] -top-[18%] -bottom-32 overflow-visible sm:-bottom-40"
    >
      <div className="cinematic-hero-mesh absolute inset-0" />
      <div className="cinematic-hero-bottom-fade absolute inset-0" />
    </div>
  );
}
