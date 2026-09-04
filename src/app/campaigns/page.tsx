"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, Megaphone, Grid, Bell } from "lucide-react";

export default function CampaignsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[288px]"}`}>
        <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-lg font-medium text-[#1F1F1F]">Campaigns</h1>
            <p className="text-xs text-[#797979]">Outreach sequences and sourcing campaigns</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#797979] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search candidates, jobs, reports..." className="h-10 pl-9 pr-4 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] w-72" />
            </div>
            <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md"><Grid className="w-5 h-5 text-[#797979]" /></button>
            <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md"><Bell className="w-5 h-5 text-[#797979]" /></button>
          </div>
        </header>

        <main className="p-8 space-y-6 max-w-7xl">
          <div>
            <h2 className="text-2xl font-medium text-[#1F1F1F]">Campaigns</h2>
            <p className="text-xs text-[#797979] mt-1">Outreach sequences to engage passive and sourced candidates.</p>
          </div>

          {/* Empty Selection Box matching trial prototype Screenshot 5 */}
          <div className="bg-white border border-dashed border-[#DFEAF2] rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)]">
            <div className="w-16 h-16 rounded-full bg-[#CCEFDC] text-[#00AE52] flex items-center justify-center">
              <Megaphone className="w-8 h-8 text-[#00AE52]" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-base font-semibold text-[#1F1F1F]">No campaigns yet</h3>
              <p className="text-xs text-[#797979] leading-relaxed">
                Start a sourcing or nurture campaign to reach candidates in your talent pool at scale.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
