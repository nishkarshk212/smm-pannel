"use client";

import { SessionProvider } from "next-auth/react";
import { CurrencyProvider } from "@/components/CurrencyProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </SessionProvider>
  );
}
