"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, BarChart2, Plus, Star, Grid, Bell } from "lucide-react";

export default function AnalyticsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { name: "All", count: 36 },
    { name: "Executive Dashboard", count: 6 },
    { name: "Jobs & Hiring", count: 10 },
    { name: "Candidates & Talent", count: 7 },
    { name: "Recruitment Process", count: 10 },
    { name: "Administration & Workforce", count: 3 },
  ];

  const executiveCharts = [
    { title: "Applicant Metrics", desc: "Key metrics tracking applicant volume, progress, and outcomes across job postings." },
    { title: "Recruitment Activity Dashboard", desc: "Stage-wise overview of recruitment pipeline activity." },
    { title: "Pipeline Stage Dashboard", desc: "End-to-end recruitment pipeline visibility." },
    { title: "Enterprise Funnel", desc: "End-to-end view of candidate movement across hiring stages." },
    { title: "Hiring Velocity", desc: "Speed at which candidates move through the hiring pipeline." },
    { title: "Hiring Season", desc: "Hiring trends and volume across time periods or seasons." },
  ];

  const jobsCharts = [
    { title: "Job Status Distribution", desc: "Breakdown of jobs by current status." },
    { title: "Open Job Aging", desc: "Duration jobs remain open before being filled or closed." },
    { title: "Vacancy Duration", desc: "Number of days a position remained unfilled between candidate offboarding." },
    { title: "Filled Job Turnaround Time", desc: "Time taken to close jobs at target." },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[288px]"}`}>
        <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-lg font-medium text-[#1F1F1F]">Analytics</h1>
            <p className="text-xs text-[#797979]">Charts and dashboards across the hiring lifecycle</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-medium text-[#1F1F1F]">Analytics</h2>
              <p className="text-xs text-[#797979] mt-1">Charts and dashboards across the hiring lifecycle.</p>
            </div>

            <button className="h-10 px-5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold rounded-md flex items-center gap-2 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Create chart</span>
            </button>
          </div>

          {/* Category Badges matching trial prototype Screenshot 9 */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 border ${
                  activeCategory === cat.name
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white text-[#4C4C4C] border-[#DFEAF2] hover:bg-[#F8F9FA]"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeCategory === cat.name ? "bg-slate-800 text-white" : "bg-[#F8F9FA] text-[#797979]"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search charts */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#797979] absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search charts by name or description..." className="w-full h-10 pl-9 pr-4 bg-white border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F]" />
          </div>

          {/* Executive Dashboard Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#1F1F1F]">Executive Dashboard <span className="text-xs font-normal text-[#797979]">6 charts</span></h3>
            <div className="grid grid-cols-4 gap-4">
              {executiveCharts.map((chart, idx) => (
                <div key={idx} className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#CCEFDC] text-[#00AE52] flex items-center justify-center">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold text-[#1F1F1F]">{chart.title}</h4>
                    <p className="text-[11px] text-[#797979] leading-relaxed">{chart.desc}</p>
                  </div>
                  <button className="text-[11px] font-semibold text-[#1A73E8] flex items-center gap-1 hover:underline cursor-pointer">
                    <Star className="w-3 h-3 text-[#1A73E8]" />
                    <span>Show AI insight</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs & Hiring Section */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-semibold text-[#1F1F1F]">Jobs & Hiring <span className="text-xs font-normal text-[#797979]">10 charts</span></h3>
            <div className="grid grid-cols-4 gap-4">
              {jobsCharts.map((chart, idx) => (
                <div key={idx} className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#F7CFD3] text-[#D90F21] flex items-center justify-center">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold text-[#1F1F1F]">{chart.title}</h4>
                    <p className="text-[11px] text-[#797979] leading-relaxed">{chart.desc}</p>
                  </div>
                  <button className="text-[11px] font-semibold text-[#1A73E8] flex items-center gap-1 hover:underline cursor-pointer">
                    <Star className="w-3 h-3 text-[#1A73E8]" />
                    <span>Show AI insight</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
