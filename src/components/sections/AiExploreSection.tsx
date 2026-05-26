"use client";

import { Section } from "@/components/layout/Section";
import {
  aiExploreContent,
  exploreCapabilities,
  explorePrompts,
  type ExplorePrompt,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { Brain, Layers, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

const iconMap = {
  sparkles: Sparkles,
  brain: Brain,
  layers: Layers,
  zap: Zap,
} as const;

export function AiExploreSection() {
  const [activePrompt, setActivePrompt] = useState(explorePrompts[0]);
  const [response, setResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleExplore = (prompt: ExplorePrompt) => {
    setActivePrompt(prompt);
    setIsThinking(true);
    setResponse(null);

    window.setTimeout(() => {
      setResponse(getSimulatedResponse(prompt.id));
      setIsThinking(false);
    }, 900);
  };

  return (
    <Section
      id="explore"
      eyebrow={aiExploreContent.eyebrow}
      title={aiExploreContent.title}
      description={aiExploreContent.description}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-50" aria-hidden="true" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch">
        <div
          className="flex min-h-[360px] flex-col rounded-3xl border border-border bg-surface p-6 sm:min-h-[400px] sm:p-8 lg:min-h-0 lg:h-full"
          role="region"
          aria-label={aiExploreContent.ui.explorePanelAria}
          aria-live="polite"
        >
          <p className="text-sm font-medium text-muted">
            {aiExploreContent.ui.tryAsking}
          </p>
          <ul className="mt-4 flex gap-2">
            {explorePrompts.map((item) => (
              <li key={item.id} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => handleExplore(item)}
                  className={cn(
                    "w-full rounded-2xl border px-3 py-2.5 text-center text-sm transition-all",
                    activePrompt.id === item.id
                      ? "border-accent/30 bg-accent/5 text-foreground"
                      : "border-transparent hover:border-border hover:bg-background",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-1 flex-col border-t border-border pt-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {aiExploreContent.ui.response}
            </p>

            <blockquote className="mt-4 flex-1 font-serif text-xl leading-relaxed tracking-tight sm:text-2xl">
              {isThinking ? (
                <span className="text-muted">{aiExploreContent.ui.thinking}</span>
              ) : response ? (
                response
              ) : (
                <span className="text-muted">
                  {aiExploreContent.ui.emptyState}
                </span>
              )}
            </blockquote>
          </div>
        </div>

        <ul className="flex flex-col gap-4 lg:h-full">
          {exploreCapabilities.map((cap) => {
            const Icon = iconMap[cap.icon];
            return (
              <li
                key={cap.title}
                className="flex flex-1 flex-col rounded-2xl border border-border bg-surface/80 p-5"
              >
                <Icon
                  className="mb-3 h-5 w-5 text-accent"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">{cap.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

function getSimulatedResponse(id: string): string {
  const { responses } = aiExploreContent;
  return responses[id as keyof typeof responses] ?? responses.default;
}
