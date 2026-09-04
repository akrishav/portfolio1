"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, ShoppingBag, Laptop, Grid, Bell } from "lucide-react";

export default function JobsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const jobStatCards = [
    { label: "Open", count: "42", badge: "Across 11 teams", positive: true, icon: ShoppingBag },
    { label: "Draft", count: "6", badge: "Awaiting approval", positive: true, icon: ShoppingBag },
    { label: "Filled this month", count: "15", badge: "▲ +4 vs last month", positive: true, icon: ShoppingBag },
    { label: "Avg. applications / job", count: "58", badge: "▲ +9 vs last month", positive: true, icon: Laptop },
  ];

  const jobs = [
    { title: "Senior Backend Engineer", dept: "Engineering", location: "Bengaluru", manager: "A. Rao", status: "Open", pillStyle: "bg-[#D1FADF] text-[#027A48]" },
    { title: "Product Designer", dept: "Design", location: "Remote", manager: "K. Mehta", status: "Aging", pillStyle: "bg-[#FEF0C7] text-[#B54708]" },
    { title: "Finance Controller", dept: "Finance", location: "Mumbai", manager: "S. Iyer", status: "Closed", pillStyle: "bg-[#F2F4F7] text-[#344054]" },
    { title: "Talent Sourcer", dept: "People", location: "Hyderabad", manager: "P. Shah", status: "Open", pillStyle: "bg-[#D1FADF] text-[#027A48]" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#101828] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[264px]"}`}>
        <header className="h-16 bg-white border-b border-[#EAECF0] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs w-full">
          <div>
            <h1 className="text-base font-bold text-[#101828]">Jobs</h1>
            <p className="text-xs text-[#667085]">Manage open, filled and draft requisitions</p>
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

            <button className="p-2 border border-[#D0D5DD] hover:bg-[#F9FAFB] rounded-lg cursor-pointer relative">
              <Bell className="w-4 h-4 text-[#667085]" />
            </button>
          </div>
        </header>

        <main className="p-8 space-y-6 w-full">
          <div>
            <h2 className="text-2xl font-bold text-[#101828] tracking-tight">Jobs</h2>
            <p className="text-xs text-[#667085] mt-1">All requisitions across your organisation, from draft to closed.</p>
          </div>

          <div className="grid grid-cols-4 gap-5 w-full">
            {jobStatCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#EAECF0] border-l-4 border-l-[#10B981] rounded-xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.05)] hover:shadow-[0_4px_8px_rgba(16,24,40,0.08)] transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#667085]">{card.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-3xl font-bold text-[#101828] tracking-tight">{card.count}</p>
                    <p className="text-[11px] font-semibold text-[#10B981] mt-1.5">{card.badge}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-[#EAECF0] rounded-2xl shadow-[0_1px_3px_rgba(16,24,40,0.05)] overflow-hidden p-6 space-y-4 w-full">
            <h3 className="text-sm font-bold text-[#101828]">All requisitions</h3>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#EAECF0] text-[#667085] font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">JOB TITLE</th>
                    <th className="py-3 px-4">DEPARTMENT</th>
                    <th className="py-3 px-4">LOCATION</th>
                    <th className="py-3 px-4">HIRING MANAGER</th>
                    <th className="py-3 px-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAECF0]">
                  {jobs.map((job, idx) => (
                    <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                      <td className="py-4 px-4 font-semibold text-[#101828] text-xs">{job.title}</td>
                      <td className="py-4 px-4 text-[#475467]">{job.dept}</td>
                      <td className="py-4 px-4 text-[#475467]">{job.location}</td>
                      <td className="py-4 px-4 text-[#475467]">{job.manager}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${job.pillStyle}`}>
                          ● {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
