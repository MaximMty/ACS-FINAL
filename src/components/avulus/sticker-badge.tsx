import { cn } from "@/lib/utils";

type StickerBadgeProps = {
  children: React.ReactNode;
  variant?: "gray" | "light";
  rotation?: "left" | "right";
  className?: string;
};

export function StickerBadge({
  children,
  variant = "gray",
  rotation = "left",
  className,
}: StickerBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-4 py-2 text-[25px] leading-normal sm:text-[27.52px]",
        variant === "gray" && "bg-[#8c8c8c] text-white",
        variant === "light" && "bg-[#d9d9d9] text-black",
        rotation === "left" && "-rotate-[8.44deg]",
        rotation === "right" && "rotate-[10.94deg]",
        className,
      )}
    >
      {children}
    </span>
  );
}
