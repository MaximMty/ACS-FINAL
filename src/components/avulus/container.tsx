import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
};

export function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  const classes = cn(
    "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]",
    className,
  );

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
