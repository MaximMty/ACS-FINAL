"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DigitalMenuContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const DigitalMenuContext = createContext<DigitalMenuContextValue | null>(null);

export function DigitalMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const value = useMemo(() => ({ isOpen, setOpen }), [isOpen, setOpen]);

  return (
    <DigitalMenuContext.Provider value={value}>
      {children}
    </DigitalMenuContext.Provider>
  );
}

export function useDigitalMenuOpen() {
  const context = useContext(DigitalMenuContext);
  if (!context) {
    throw new Error("useDigitalMenuOpen must be used within DigitalMenuProvider");
  }
  return context;
}
