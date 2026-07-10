"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/hummingbird-logo.png" 
        alt="Hummingbird Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="font-sans font-bold text-xl text-[#005E48] tracking-tight leading-none">
        Hummingbird
      </span>
    </div>
  );
}
