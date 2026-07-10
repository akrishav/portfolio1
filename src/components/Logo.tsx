"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0">
        <g transform="translate(50, 50)">
          {/* Left Teal Diamond */}
          <g transform="translate(-24, 0)">
            <polygon points="-22,0 0,-22 22,0 0,22" fill="#159FB6" />
          </g>
          {/* Bottom Dark Blue Diamond */}
          <g transform="translate(0, 24)">
            <polygon points="-22,0 0,-22 22,0 0,22" fill="#132B48" />
          </g>
          {/* Top Teal Circle */}
          <circle cx="0" cy="-24" r="15.5" fill="#159FB6" />
        </g>
      </svg>
      <span className="font-sans font-[500] text-[22px] text-[#132B48] tracking-tight">
        Staff HC
      </span>
    </div>
  );
}
