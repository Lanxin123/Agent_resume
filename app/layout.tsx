import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oxanium, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const zhSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-zh"
});

const display = Oxanium({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "Resume Visual Site",
  description: "Personal resume website with bilingual experience and media showcase."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${zhSans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
