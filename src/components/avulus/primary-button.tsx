import { Button } from "@/components/ui/button";
import { figmaCtaCorners } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  appearance?: "filled" | "outline" | "inverted";
  fullWidth?: boolean;
} & Omit<React.ComponentProps<typeof Button>, "variant">;

export function PrimaryButton({
  children,
  className,
  appearance = "filled",
  fullWidth,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        figmaCtaCorners,
        "h-[67px] px-6 text-[21px] font-normal",
        fullWidth && "w-full",
        appearance === "filled" && "bg-black text-white hover:bg-black/90",
        appearance === "outline" &&
          "border border-black bg-transparent text-black hover:bg-black/5",
        appearance === "inverted" && "bg-white text-black hover:bg-white/90",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
