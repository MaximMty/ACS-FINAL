import Link from "next/link";

import { linkInteractive } from "@/lib/cta-styles";
import { cn } from "@/lib/utils";

type NavSectionLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NavSectionLink({
  href,
  className,
  children,
  onClick,
}: NavSectionLinkProps) {
  return (
    <Link href={href} className={cn(linkInteractive, className)} onClick={onClick}>
      {children}
    </Link>
  );
}
