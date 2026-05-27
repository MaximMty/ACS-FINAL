"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  getPathFromHref,
  getSectionIdFromHref,
  scrollToSection,
  setPendingScrollSection,
} from "@/lib/scroll-to-section";

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
  const pathname = usePathname();
  const router = useRouter();
  const targetPath = getPathFromHref(href);
  const sectionId = getSectionIdFromHref(href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!sectionId) return;

    if (pathname === targetPath) {
      event.preventDefault();
      window.history.pushState(null, "", `${targetPath}#${sectionId}`);
      scrollToSection(sectionId, "smooth");
      return;
    }

    event.preventDefault();
    setPendingScrollSection(sectionId);
    router.push(targetPath);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
