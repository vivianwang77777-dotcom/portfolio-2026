"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  showcasePhoneFrameBaseClass,
  showcaseRadiusPx,
  type ShowcaseFrameShadow,
} from "@/components/project/balance-pal/showcase-layout";

type ShowcasePhoneFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  aspectRatio: string;
  width?: number;
  shadow?: ShowcaseFrameShadow;
  className?: string;
};

export function ShowcasePhoneFrame({
  src,
  alt,
  sizes,
  aspectRatio,
  width: fixedWidth,
  shadow = "home",
  className = "",
}: ShowcasePhoneFrameProps) {
  const radius = showcaseRadiusPx(shadow);

  return (
    <div
      className={cn(
        showcasePhoneFrameBaseClass,
        "relative",
        fixedWidth == null && "w-full",
        shadow === "home" &&
          "shadow-[0_18px_52px_rgba(31,41,55,0.045)]",
        shadow === "task-select" &&
          "shadow-[0_18px_52px_rgba(31,41,55,0.045)]",
        shadow === "task-progress" &&
          "shadow-[0_14px_38px_rgba(31,41,55,0.042)]",
        className,
      )}
      style={{
        aspectRatio,
        borderRadius: radius,
        ...(fixedWidth != null
          ? { width: fixedWidth, maxWidth: fixedWidth }
          : {}),
      }}
    >
      <Image
        src={src}
        alt={alt}
        unoptimized
        fill
        className="object-cover object-top"
        sizes={sizes}
      />
    </div>
  );
}
