import Link from "next/link";

type NavSectionLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function NavSectionLink({
  href,
  className,
  children,
}: NavSectionLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
