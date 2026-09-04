import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akrishav.com"),
  title: "Ashish Rishav | Product Manager",
  description: "Product Manager | Data-driven | 0→1 & Scale",
  openGraph: {
    title: "Ashish Rishav | Product Manager",
    description: "Product Manager | Data-driven | 0→1 & Scale",
    url: "https://akrishav.com",
    siteName: "Ashish Rishav Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeToggle />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
