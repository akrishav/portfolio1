"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
        <g transform="translate(50, 50)">
          {/* Left Teal Diamond */}
          <g transform="translate(-18, 12)">
            <polygon points="-22,0 0,-22 22,0 0,22" fill="#159FB6" />
          </g>
          {/* Right Dark Blue Diamond */}
          <g transform="translate(18, 12)">
            <polygon points="-26,0 0,-26 26,0 0,26" fill="#19315A" />
          </g>
          {/* Top Teal Circle */}
          <circle cx="-16" cy="-24" r="16" fill="#159FB6" />
          
          {/* White cutout to create the person's 'arms' and 'neck' space */}
          <g transform="translate(-16, -5)">
            <circle cx="0" cy="0" r="10" fill="white" />
            <polygon points="-12,-12 -12,12 12,12 12,-12" fill="none" stroke="white" strokeWidth="6" />
          </g>
        </g>
      </svg>
      <span className="font-sans font-[600] text-[28px] text-[#19315A] tracking-[-0.02em]">
        Staff HC
      </span>
    </div>
  );
}
