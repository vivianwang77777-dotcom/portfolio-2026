import type { CSSProperties } from "react";

/** 将 JSON 中的 "宽/高"（如 "954/383"）转为容器 aspect-ratio */
export function imageAspectStyle(aspect?: string): CSSProperties | undefined {
  if (!aspect) return undefined;

  const [width, height] = aspect.split("/").map((part) => Number(part.trim()));
  if (!width || !height) return undefined;

  return { aspectRatio: `${width} / ${height}` };
}
