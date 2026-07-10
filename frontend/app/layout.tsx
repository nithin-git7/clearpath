import type { Metadata } from "next";
import type { ReactNode } from "react";

import Header from "@/components/Header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "ClearPath Germany | Your Germany application roadmap",
  description:
    "Build a structured Germany study and career roadmap, understand confusing documents, and see what to do next.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        {children}
      </body>
    </html>
  );
}

