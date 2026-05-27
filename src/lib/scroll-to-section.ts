const PENDING_SCROLL_KEY = "avulus-scroll-section";

export function getPathFromHref(href: string): string {
  const hashIndex = href.indexOf("#");
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  return path || "/";
}

export function getSectionIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const sectionId = href.slice(hashIndex + 1);
  return sectionId ? decodeURIComponent(sectionId) : null;
}

export function setPendingScrollSection(sectionId: string) {
  sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId);
}

export function consumePendingScrollSection(): string | null {
  const sectionId = sessionStorage.getItem(PENDING_SCROLL_KEY);
  if (sectionId) {
    sessionStorage.removeItem(PENDING_SCROLL_KEY);
  }
  return sectionId;
}

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function scrollToSectionWithRetry(
  sectionId: string,
  options?: {
    maxAttempts?: number;
    intervalMs?: number;
    behavior?: ScrollBehavior;
  },
) {
  const maxAttempts = options?.maxAttempts ?? 24;
  const intervalMs = options?.intervalMs ?? 50;
  const behavior = options?.behavior ?? "smooth";
  let attempts = 0;
  let cancelled = false;
  let timeoutId: number | undefined;

  const tryScroll = () => {
    if (cancelled) return;

    if (scrollToSection(sectionId, behavior)) return;

    attempts += 1;
    if (attempts < maxAttempts) {
      timeoutId = window.setTimeout(tryScroll, intervalMs);
    }
  };

  tryScroll();

  return () => {
    cancelled = true;
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }
  };
}
