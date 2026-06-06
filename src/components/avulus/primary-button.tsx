import { Button } from "@/components/ui/button";
import {
  avulusButtonShadow,
  btnFilledDarkInteractive,
  btnOpacityInteractive,
  figmaCtaCorners,
  tapInteractive,
} from "@/lib/cta-styles";
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
        avulusButtonShadow,
        "h-[67px] px-6 text-[21px] font-normal",
        fullWidth && "w-full",
        appearance === "filled" && cn(btnFilledDarkInteractive, "bg-black text-white"),
        appearance === "outline" &&
          cn(tapInteractive, "border border-black bg-transparent text-black active:bg-black/10"),
        appearance === "inverted" && cn(btnOpacityInteractive, "bg-white text-black"),
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
