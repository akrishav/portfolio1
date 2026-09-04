"use client";

import React from "react";

export default function HummingbirdLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-8 h-8 grid grid-cols-2 gap-0.5 animate-spin">
        <div className="bg-[#1A73E8] rounded-xs opacity-100"></div>
        <div className="bg-[#488FED] rounded-xs opacity-75"></div>
        <div className="bg-[#76ABF1] rounded-xs opacity-50"></div>
        <div className="bg-[#A3C7F6] rounded-xs opacity-90"></div>
      </div>
      <p className="text-xs text-[#797979] font-medium">Loading Hummingbird Enterprise...</p>
    </div>
  );
}
