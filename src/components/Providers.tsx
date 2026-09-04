'use client';

import React from "react";
import { OnboardingProvider } from "@/components/OnboardingState";
import DemoNavbar from "@/components/DemoNavbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      {children}
      <DemoNavbar />
    </OnboardingProvider>
  );
}
