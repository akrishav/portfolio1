"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, Sparkles, Grid, Bell } from "lucide-react";

export default function CandidateHubPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#101828] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[264px]"}`}>
        <header className="h-16 bg-white border-b border-[#EAECF0] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-base font-bold text-[#101828]">Candidate Hub</h1>
            <p className="text-xs text-[#667085]">A single workspace for every candidate record</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates, jobs, reports..."
                className="h-9 pl-9 pr-4 bg-[#F9FAFB] border border-[#D0D5DD] rounded-lg text-xs text-[#101828] placeholder-[#98A2B3] w-72 focus:outline-none focus:border-[#00A896]"
              />
            </div>

            <button className="p-2 border border-[#D0D5DD] hover:bg-[#F9FAFB] rounded-lg cursor-pointer">
              <Grid className="w-4 h-4 text-[#667085]" />
            </button>

            <button className="p-2 border border-[#D0D5DD] hover:bg-[#F9FAFB] rounded-lg cursor-pointer">
              <Bell className="w-4 h-4 text-[#667085]" />
            </button>
          </div>
        </header>

        <main className="p-8 space-y-6 max-w-7xl">
          <div>
            <h2 className="text-2xl font-bold text-[#101828] tracking-tight">Candidate Hub</h2>
            <p className="text-xs text-[#667085] mt-1">A unified record for every candidate — profile, history, notes and documents in one place.</p>
          </div>

          {/* Dashed Selection Card matching Screenshot 3 */}
          <div className="bg-white border-2 border-dashed border-[#EAECF0] rounded-2xl p-20 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_1px_3px_rgba(16,24,40,0.05)]">
            <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#10B981]" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-base font-bold text-[#101828]">Select a candidate to view their hub</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Search by name, job, or stage to open a candidate's full record, including resume, interview notes and communication history.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
