import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  label?: string;
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  label,
  title,
  description,
  eyebrow,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn("py-12 sm:py-16 lg:py-24", className)}
    >
      <Container className={containerClassName}>
        {(eyebrow || label || title || description) && (
          <header className="mb-8 sm:mb-10 lg:mb-14">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {eyebrow}
              </p>
            )}
            {label && (
              <p className="mb-2 text-sm font-medium text-accent">{label}</p>
            )}
            {title && (
              <h2
                id={`${id}-title`}
                className="font-serif text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
