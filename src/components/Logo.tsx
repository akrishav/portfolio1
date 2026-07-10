"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg viewBox="0 0 100 100" className="w-11 h-11 shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Mask to create clean transparent gaps instead of hacky white overlays */}
          <mask id="logo-mask">
            {/* Everything white is kept */}
            <rect x="0" y="0" width="100" height="100" fill="white" />
            {/* Everything black is cut out */}
            {/* Cutout around the head to create the collar gap */}
            <circle cx="34" cy="45" r="14" fill="black" />
            {/* Cutout between the diamonds to create the arm/body gap */}
            <path d="M 28 55 L 72 55" stroke="black" strokeWidth="6" strokeLinecap="round" />
          </mask>
        </defs>

        <g mask="url(#logo-mask)">
          {/* Left Teal Diamond */}
          <g transform="translate(32, 62)">
            <polygon points="-20,0 0,-20 20,0 0,20" fill="#159FB6" />
          </g>
          {/* Right Dark Blue Diamond */}
          <g transform="translate(68, 62)">
            <polygon points="-24,0 0,-24 24,0 0,24" fill="#19315A" />
          </g>
          {/* Top Teal Circle (Head) */}
          <circle cx="34" cy="26" r="15" fill="#159FB6" />
        </g>
      </svg>
      <span className="font-sans font-[600] text-[24px] text-[#19315A] tracking-[-0.02em] leading-none">
        Staff HC
      </span>
    </div>
  );
}
