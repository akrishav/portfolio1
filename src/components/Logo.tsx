"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center select-none">
      <img 
        src="/staffhc-logo.png" 
        alt="Staff HC Logo" 
        className="h-9 w-auto object-contain select-none pointer-events-none" 
      />
    </div>
  );
}
