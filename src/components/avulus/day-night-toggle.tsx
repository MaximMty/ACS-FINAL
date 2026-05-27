"use client";

import { cn } from "@/lib/utils";

type DayNightToggleProps = {
  className?: string;
  night?: boolean;
  onToggle?: (night: boolean) => void;
};

export function DayNightToggle({
  className,
  night = false,
  onToggle,
}: DayNightToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle?.(!night)}
      className={cn("flex items-center gap-3", className)}
      aria-label="Переключить день и ночь"
    >
      <span className="text-[15px] leading-normal whitespace-pre text-black">
        День{"              "}Ночь
      </span>
      <span
        className={cn(
          "relative h-[26px] w-[51px] rounded-[70px] bg-[#d9d9d9] opacity-70 transition-colors",
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] size-[19px] rounded-full bg-black transition-transform",
            night ? "left-[29px]" : "left-[5px]",
          )}
        />
      </span>
    </button>
  );
}
