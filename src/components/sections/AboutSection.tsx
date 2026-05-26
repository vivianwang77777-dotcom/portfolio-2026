import { Section } from "@/components/layout/Section";
import { aboutContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const entryGridClass =
  "grid grid-cols-[minmax(6.5rem,8.5rem)_minmax(0,1fr)] gap-x-6 sm:grid-cols-[minmax(7.5rem,9.5rem)_minmax(0,1fr)] sm:gap-x-10";

function ExperienceBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-[17px]">
        {title}
      </h3>
      <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">{children}</div>
    </div>
  );
}

export function AboutSection() {
  const { work, education } = aboutContent;

  return (
    <Section
      id="about"
      eyebrow={aboutContent.eyebrow}
      title={aboutContent.title}
      className="text-sm"
    >
      <div className="max-w-3xl space-y-14 sm:space-y-16">
        <ExperienceBlock title={work.title}>
          {work.entries.map((entry) => (
            <article key={entry.period} className={entryGridClass}>
              <div className="space-y-2">
                <p className="text-xs leading-snug text-muted">{entry.period}</p>
                <p className="text-sm font-semibold leading-snug text-foreground/80">
                  {entry.organization}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-snug text-foreground">
                  {entry.role}
                </h3>
                <p className="mt-1 text-xs leading-snug text-muted">{entry.focus}</p>
                <p className="mt-3 text-xs leading-relaxed text-pretty text-muted">
                  {entry.description}
                </p>
              </div>
            </article>
          ))}
        </ExperienceBlock>

        <ExperienceBlock title={education.title}>
          {education.entries.map((entry) => (
            <article key={entry.period} className={entryGridClass}>
              <p className="text-xs leading-snug text-muted">{entry.period}</p>
              <div>
                <h3 className="text-sm font-semibold leading-snug text-foreground">
                  {entry.degree}
                </h3>
                <p className="mt-1 text-xs leading-snug text-muted">{entry.school}</p>
              </div>
            </article>
          ))}
        </ExperienceBlock>
      </div>
    </Section>
  );
}
