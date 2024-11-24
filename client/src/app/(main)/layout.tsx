import {Header} from "@/components/Header";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <nav className="mx-auto w-full max-w-7xl h-fit">
        <Header />
      </nav>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}
