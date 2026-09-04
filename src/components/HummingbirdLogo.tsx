"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function HummingbirdLogo({ className = "h-8", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Official crisp Hummingbird Logo from uploaded asset */}
      <img
        src="/hummingbird-logo.png"
        alt="Hummingbird Logo"
        className="h-8 w-auto object-contain shrink-0"
      />
    </div>
  );
}
