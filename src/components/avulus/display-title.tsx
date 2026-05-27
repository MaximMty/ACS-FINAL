import { cn } from "@/lib/utils";

type DisplayTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "p";
};

export function DisplayTitle({
  children,
  className,
  as: Tag = "h2",
}: DisplayTitleProps) {
  return (
    <Tag
      className={cn(
        "font-display text-[40px] leading-[1.146] font-black tracking-tight uppercase sm:text-[53.46px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
