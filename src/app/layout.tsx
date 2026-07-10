import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { OnboardingProvider } from "@/components/OnboardingState";

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StaffHC Onboarding | Candidate Transparency Portal",
  description: "A one-stop-shop candidate portal for tracking StaffHC 7-step onboarding process with full transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontOutfit.variable} antialiased bg-white text-slate-900 font-sans`}
      >
        <OnboardingProvider>
          {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
