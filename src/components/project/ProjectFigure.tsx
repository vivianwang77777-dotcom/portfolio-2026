import { imageAspectStyle } from "@/lib/project-image";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProjectFigureProps = {
  src: string;
  alt: string;
  imageAspect?: string;
  imageFit?: "cover" | "contain";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ProjectFigure({
  src,
  alt,
  imageAspect,
  imageFit = "cover",
  className,
  sizes = "(max-width: 1024px) 100vw, 1024px",
  priority = false,
}: ProjectFigureProps) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-border",
        !imageAspect && "aspect-[4/3]",
        className,
      )}
      style={imageAspectStyle(imageAspect)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-center",
          imageFit === "contain" ? "object-contain" : "object-cover",
        )}
      />
    </figure>
  );
}
