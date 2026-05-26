import { cn } from "@/lib/utils";

type SectionTitleProps = {
  id?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  id,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        id={id}
        className="cinematic-title-gradient font-serif text-3xl tracking-tight text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="section-description mt-5 text-base font-normal leading-relaxed text-pretty sm:text-lg lg:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
