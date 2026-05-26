"use client";

import { imageAspectStyle } from "@/lib/project-image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ImageBlockProps = {
  src: string;
  alt: string;
  aspect?: "photo" | "cinema" | "portrait";
  imageAspect?: string;
  imageFit?: "cover" | "contain";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ImageBlock({
  src,
  alt,
  aspect = "photo",
  imageAspect,
  imageFit = "cover",
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1024px",
}: ImageBlockProps) {
  const reducedMotion = useReducedMotion();
  const useContain = imageFit === "contain";

  return (
    <motion.figure
      className={cn(
        "group cinematic-image-frame relative w-full overflow-hidden",
        useContain && "bg-black/30",
        !imageAspect &&
          (aspect === "cinema"
            ? "aspect-[21/9]"
            : aspect === "portrait"
              ? "aspect-[4/5]"
              : "aspect-[4/3]"),
        className,
      )}
      style={imageAspectStyle(imageAspect)}
      whileHover={reducedMotion ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-center transition-transform duration-700",
          useContain
            ? "object-contain"
            : "object-cover group-hover:scale-[1.03]",
        )}
      />
      {!useContain && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
        />
      )}
    </motion.figure>
  );
}
