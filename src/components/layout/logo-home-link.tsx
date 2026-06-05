"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type LogoHomeLinkProps = {
  className?: string;
  children: React.ReactNode;
};

export function LogoHomeLink({ className, children }: LogoHomeLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="/"
      className={className}
      onClick={handleClick}
      aria-label={isHome ? "AVULUS — наверх" : "AVULUS — на главную"}
    >
      {children}
    </Link>
  );
}
