"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, Users, BarChart2, Award, Grid, Bell } from "lucide-react";

export default function CandidatePoolPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const poolStatCards = [
    { label: "Total candidates", count: "8,942", badge: "▲ +312 this month", bg: "bg-[#F3E9FC]", color: "text-[#8B28E2]" },
    { label: "New this week", count: "214", badge: "▲ +18% vs last week", bg: "bg-[#CCEFDC]", color: "text-[#00AE52]" },
    { label: "Silver medalists", count: "486", badge: "Strong past candidates", bg: "bg-[#F3E9FC]", color: "text-[#8B28E2]" },
    { label: "Talent pool health", count: "82%", badge: "Ready to engage", bg: "bg-[#F3E9FC]", color: "text-[#8B28E2]" },
  ];

  const recentCandidates = [
    { name: "Rhea Kapoor", appliedFor: "Senior Backend Engineer", source: "Referral", stage: "Screening", stageColor: "bg-[#CCEFDC] text-[#00AE52]" },
    { name: "Marcus Lee", appliedFor: "Product Designer", source: "LinkedIn", stage: "Interview", stageColor: "bg-[#F9F0CC] text-[#DFB400]" },
    { name: "Ananya Bose", appliedFor: "Data Analyst", source: "Career site", stage: "Applied", stageColor: "bg-[#CCEFDC] text-[#00AE52]" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[288px]"}`}>
        <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-lg font-medium text-[#1F1F1F]">Candidate Pool</h1>
            <p className="text-xs text-[#797979]">Your organisation's sourced and applied talent</p>
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
            <h2 className="text-2xl font-medium text-[#1F1F1F]">Candidate Pool</h2>
            <p className="text-xs text-[#797979] mt-1">Every candidate who has applied or been sourced into your organisation.</p>
          </div>

          {/* 4 Stat Cards matching trial prototype Screenshot 3 */}
          <div className="grid grid-cols-4 gap-4">
            {poolStatCards.map((card, idx) => (
              <div key={idx} className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#797979]">{card.label}</p>
                  <p className="text-2xl font-semibold text-[#1F1F1F] mt-2">{card.count}</p>
                  <span className="text-[11px] font-medium text-[#00AE52] mt-1 block">{card.badge}</span>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                  <Users className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-[#DFEAF2] rounded-xl shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] overflow-hidden p-6 space-y-4">
            <h3 className="text-base font-semibold text-[#1F1F1F]">Recent additions</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] border-b border-[#DFEAF2] text-[#4C4C4C]">
                <tr>
                  <th className="py-3 px-4">CANDIDATE</th>
                  <th className="py-3 px-4">APPLIED FOR</th>
                  <th className="py-3 px-4">SOURCE</th>
                  <th className="py-3 px-4">STAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DFEAF2]">
                {recentCandidates.map((cand, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA]">
                    <td className="py-3.5 px-4 font-semibold text-[#1F1F1F]">{cand.name}</td>
                    <td className="py-3.5 px-4 text-[#4C4C4C]">{cand.appliedFor}</td>
                    <td className="py-3.5 px-4 text-[#4C4C4C]">{cand.source}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${cand.stageColor}`}>
                        ● {cand.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
