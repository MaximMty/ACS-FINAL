import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "AVULUS CYBER HOTEL",
  description:
    "AVULUS CYBER HOTEL — играй, стримь, оставайся. Бронирование комнат, ресторан и бар 24/7.",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        style={
          {
            "--feature-height": "clamp(72px, 6.74vw, 97px)",
          } as React.CSSProperties
        }
      >
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
