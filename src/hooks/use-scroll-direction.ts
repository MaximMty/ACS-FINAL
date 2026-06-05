"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

type UseScrollDirectionOptions = {
  threshold?: number;
  minScrollY?: number;
};

export function useScrollDirection({
  threshold = 12,
  minScrollY = 80,
}: UseScrollDirectionOptions = {}) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsPastThreshold(window.scrollY > minScrollY);

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setIsPastThreshold(currentScrollY > minScrollY);

      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, minScrollY]);

  const isVisible = direction === "up" || !isPastThreshold;

  return { direction, isPastThreshold, isVisible };
}
