import Link from "next/link";

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
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
