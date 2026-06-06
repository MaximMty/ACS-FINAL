let lockCount = 0;
let savedScrollY = 0;
let bodySnapshot: BodyStyleSnapshot | null = null;
let htmlSnapshot: HtmlStyleSnapshot | null = null;

type BodyStyleSnapshot = {
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  touchAction: string;
};

type HtmlStyleSnapshot = {
  overflow: string;
};

function snapshotBodyStyles(body: HTMLElement): BodyStyleSnapshot {
  return {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    touchAction: body.style.touchAction,
  };
}

function restoreBodyStyles(body: HTMLElement, snapshot: BodyStyleSnapshot) {
  body.style.overflow = snapshot.overflow;
  body.style.position = snapshot.position;
  body.style.top = snapshot.top;
  body.style.left = snapshot.left;
  body.style.right = snapshot.right;
  body.style.width = snapshot.width;
  body.style.touchAction = snapshot.touchAction;
}

export function lockBodyScroll(): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const { body, documentElement } = document;

  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    bodySnapshot = snapshotBodyStyles(body);
    htmlSnapshot = { overflow: documentElement.style.overflow };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    documentElement.style.overflow = "hidden";
  }

  lockCount += 1;

  return () => {
    lockCount = Math.max(0, lockCount - 1);

    if (lockCount > 0 || !bodySnapshot || !htmlSnapshot) {
      return;
    }

    restoreBodyStyles(body, bodySnapshot);
    documentElement.style.overflow = htmlSnapshot.overflow;
    bodySnapshot = null;
    htmlSnapshot = null;

    const scrollY = savedScrollY;
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    });
  };
}
