"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  consumePendingScrollSection,
  scrollToSectionWithRetry,
} from "@/lib/scroll-to-section";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const pendingSectionId = consumePendingScrollSection();
    const hashSectionId = window.location.hash
      ? decodeURIComponent(window.location.hash.slice(1))
      : null;
    const sectionId = pendingSectionId ?? hashSectionId;

    if (!sectionId) return;

    const cancel = scrollToSectionWithRetry(sectionId);

    if (pendingSectionId) {
      window.history.replaceState(null, "", `${pathname}#${sectionId}`);
    }

    return cancel;
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const sectionId = window.location.hash
        ? decodeURIComponent(window.location.hash.slice(1))
        : null;

      if (!sectionId) return;
      scrollToSectionWithRetry(sectionId);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
