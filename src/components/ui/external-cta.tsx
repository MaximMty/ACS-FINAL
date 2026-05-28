import { externalLinkProps } from "@/lib/ctas";
import { cn } from "@/lib/utils";

type ExternalCtaProps = React.ComponentProps<"a">;

export function ExternalCta({ className, children, ...props }: ExternalCtaProps) {
  return (
    <a className={cn(className)} {...externalLinkProps()} {...props}>
      {children}
    </a>
  );
}
