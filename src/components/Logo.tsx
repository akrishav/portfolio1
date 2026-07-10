"use client";

import React from "react";
import { HeartPulse } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0052CC] to-[#0042A3] flex items-center justify-center shadow-sm border border-[#00388A]">
        <HeartPulse className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="font-sans font-black text-xl text-slate-800 tracking-tight">
          Staff<span className="text-[#0052CC]">HC</span>
        </span>
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest pl-0.5">Healthcare Staffing</span>
      </div>
    </div>
  );
}
