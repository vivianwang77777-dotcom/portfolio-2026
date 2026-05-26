"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_PROJECT_ID = "Qmhwa6RyMGKH1WpFvyvK";
const SCENE_SIZE = 1080;

type UnicornStudioHeroProps = {
  projectId?: string;
  className?: string;
};

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init: () => void | Promise<unknown>;
    };
  }
}

function initUnicornStudio() {
  const studio = window.UnicornStudio;
  if (!studio?.init) return;
  studio.init();
}

export function UnicornStudioHero({
  projectId = DEFAULT_PROJECT_ID,
  className,
}: UnicornStudioHeroProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [displayScale, setDisplayScale] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const tryInit = useCallback(() => {
    const host = hostRef.current;
    if (!host) return;
    const { width, height } = host.getBoundingClientRect();
    const size = Math.min(width, height);
    if (size > 0) {
      setDisplayScale(size / SCENE_SIZE);
    }
    initUnicornStudio();
  }, []);

  useEffect(() => {
    if (window.UnicornStudio?.init) {
      tryInit();
      return;
    }

    const poll = window.setInterval(() => {
      if (window.UnicornStudio?.init) {
        window.clearInterval(poll);
        tryInit();
      }
    }, 16);

    return () => window.clearInterval(poll);
  }, [tryInit]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      const size = Math.min(width, height);
      if (size > 0) {
        setDisplayScale(size / SCENE_SIZE);
      }
    });

    resizeObserver.observe(host);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (host.querySelector("canvas")) {
      setIsReady(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (host.querySelector("canvas")) {
        setIsReady(true);
        observer.disconnect();
      }
    });

    observer.observe(host, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
        ref={hostRef}
        className={cn("relative", className)}
        aria-label="Hero animation"
        role="img"
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#dcecff]/50 via-[#eadcff]/35 to-[#fff0d8]/45 transition-opacity duration-500",
            isReady ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        />
        <div
          data-us-project={projectId}
          data-us-production="true"
          data-us-lazyload="false"
          data-us-scale="0.5"
          data-us-dpi="1"
          data-us-fps="30"
          className={cn(
            "absolute left-1/2 top-1/2 transition-opacity duration-500",
            isReady ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: SCENE_SIZE,
            height: SCENE_SIZE,
            transform: `translate(-50%, -50%) scale(${displayScale})`,
            transformOrigin: "center",
          }}
        />
    </div>
  );
}
