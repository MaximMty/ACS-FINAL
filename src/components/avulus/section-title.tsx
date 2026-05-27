import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
};

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "text-[26px] leading-normal font-normal text-black sm:text-[31px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
