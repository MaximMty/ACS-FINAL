"use client";

import { DigitalMenuProvider } from "@/contexts/digital-menu-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <DigitalMenuProvider>{children}</DigitalMenuProvider>;
}
