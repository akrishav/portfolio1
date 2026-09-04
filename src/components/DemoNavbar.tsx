"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOnboarding } from "@/components/OnboardingState";
import { Bell, RefreshCw, Smartphone, Mail, ShieldAlert, Laptop, Eye, HelpCircle, Activity, Settings, X, Globe, User } from "lucide-react";

export default function DemoNavbar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname?.startsWith("/case-studies") || pathname?.startsWith("/work")) {
    return null;
  }
  const { notifications, resetDemoState } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);

  // Group notifications by timestamp (newest first)
  const sortedNotifs = [...notifications].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 bg-white/90 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg flex items-center justify-center border border-slate-200/80 shadow-xs transition-all relative cursor-pointer"
        title="Prototype Controls"
      >
        {isOpen ? (
          <X className="h-4.5 w-4.5" />
        ) : (
          <Settings className="h-4.5 w-4.5" />
        )}
        {sortedNotifs.length > 0 && !isOpen && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white animate-bounce">
            {sortedNotifs.length}
          </span>
        )}
      </button>

      {/* Floating Popover Controls Panel */}
      {isOpen && (
        <div className="absolute bottom-10 right-0 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-4 text-xs z-50">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-slate-200">Prototype Controls</span>
            </div>
            <button
              onClick={resetDemoState}
              className="flex items-center gap-1 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 text-slate-350 px-2 py-0.5 rounded border border-slate-750"
            >
              <RefreshCw className="h-3 w-3" />
              Reset Data
            </button>
          </div>

          {/* Quick Perspectice Switcher */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Switch Perspective</span>
            <div className="grid grid-cols-1 gap-1.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-left font-bold transition-all ${
                  pathname === "/"
                    ? "bg-[#EBF3FC]/10 border-[#0052CC] text-white"
                    : "bg-slate-950 border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Globe className="h-4 w-4 text-[#13a2ba]" />
                🏠 Home (Public Landing)
              </Link>
              
              <Link
                href="/onboarding?login=true"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-left font-bold transition-all ${
                  pathname === "/onboarding"
                    ? "bg-[#EBF3FC]/10 border-[#0052CC] text-white"
                    : "bg-slate-950 border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <User className="h-4 w-4 text-[#13a2ba]" />
                👤 Candidate Onboarding Hub
              </Link>

              <Link
                href="/recruiter?role=recruiter"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-left font-bold transition-all ${
                  pathname === "/recruiter"
                    ? "bg-[#EBF3FC]/10 border-[#0052CC] text-white"
                    : "bg-slate-955 border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Laptop className="h-4 w-4 text-[#13a2ba]" />
                💼 Recruiter View (ERP)
              </Link>

              <Link
                href="/recruiter?role=onboarder"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-left font-bold transition-all ${
                  pathname === "/recruiter"
                    ? "bg-[#EBF3FC]/10 border-[#007A5E] text-white"
                    : "bg-slate-955 border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Laptop className="h-4 w-4 text-[#007A5E]" />
                🛡️ On-boarder View (Compliance)
              </Link>
            </div>
          </div>

          {/* Simulated Logs Button */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowNotifDrawer(!showNotifDrawer)}
              className="w-full flex items-center justify-between p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded-lg text-slate-300 font-bold transition-all"
            >
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-400" />
                Notification logs
              </span>
              <span className="bg-[#0052CC] text-white font-bold rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center">
                {sortedNotifs.length}
              </span>
            </button>

            {/* Notification logs overlay inside popover */}
            {showNotifDrawer && (
              <div className="mt-2 max-h-56 overflow-y-auto no-scrollbar space-y-2 pt-2 border-t border-slate-850">
                {sortedNotifs.length === 0 ? (
                  <p className="text-[10px] text-slate-550 text-center py-4">No email/SMS logs dispatched yet.</p>
                ) : (
                  sortedNotifs.map((log) => (
                    <div key={log.id} className="bg-slate-950 border border-slate-850 p-2 rounded text-[10px] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-300 truncate max-w-[120px]">To: {log.recipientName}</span>
                        <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400">{log.channel}</span>
                      </div>
                      <p className="text-slate-400 font-mono text-[9px] bg-slate-900/50 p-1 rounded border border-slate-850 truncate">{log.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
