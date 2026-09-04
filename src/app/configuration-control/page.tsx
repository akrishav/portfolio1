"use client";

import React, { useState } from "react";
import HummingbirdSidebar from "@/components/HummingbirdSidebar";
import { Search, Settings, Shield, Lock, ChevronDown, Grid, Bell } from "lucide-react";

export default function ConfigurationControlPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState("Recruiter");
  const [dataScope, setDataScope] = useState("Private");

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans">
      <HummingbirdSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? "pl-16" : "pl-[288px]"}`}>
        <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div>
            <h1 className="text-lg font-medium text-[#1F1F1F]">Configuration Control</h1>
            <p className="text-xs text-[#797979]">Roles, workflows and system configuration</p>
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
            <h2 className="text-2xl font-medium text-[#1F1F1F]">Configuration Control</h2>
            <p className="text-xs text-[#797979] mt-1">Manage roles, permissions, workflows and system-wide settings.</p>
          </div>

          {/* Analytics Configuration Card matching trial prototype Screenshot 10 */}
          <div className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[#1F1F1F]">Analytics configuration</h3>
              <p className="text-xs text-[#797979]">Enterprise defaults, role permissions, and report access.</p>
            </div>

            <div className="space-y-1 max-w-lg">
              <label className="text-xs font-semibold text-[#4C4C4C]">Default dashboard</label>
              <p className="text-[11px] text-[#797979]">The report all users in this enterprise land on when they first open Analytics, unless they've set a personal default.</p>
              <select className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs font-medium text-[#1F1F1F] focus:outline-none">
                <option>Executive Dashboard</option>
                <option>Jobs & Hiring</option>
                <option>Recruitment Process</option>
              </select>
            </div>
          </div>

          {/* Role Permissions Card */}
          <div className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-6">
            <h3 className="text-sm font-semibold text-[#1F1F1F]">Role permissions</h3>

            {/* Sub-tabs */}
            <div className="flex items-center gap-6 border-b border-[#DFEAF2] pb-3 text-xs font-medium">
              {["Recruiter", "Hiring Manager", "HR Manager", "Finance Controller"].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeRole === role ? "border-b-2 border-[#00AE52] text-[#00AE52] font-semibold" : "text-[#797979] hover:text-[#1F1F1F]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-[#1F1F1F]">Chart creation</h4>
                <p className="text-[#797979]">Enable the ability for {activeRole} to create charts and publish them to the enterprise.</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-medium text-[#1F1F1F]">Can create and publish charts</span>
                  <div className="w-10 h-5 bg-[#00AE52] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#1F1F1F]">Data scope</h4>
                <p className="text-[#797979]">Controls what data {activeRole} can access when viewing or creating charts.</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div
                    onClick={() => setDataScope("Private")}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      dataScope === "Private" ? "bg-[#CCEFDC]/30 border-[#00AE52]" : "bg-[#F8F9FA] border-[#DFEAF2]"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#00AE52]">
                      <Lock className="w-4 h-4" />
                      <span>Private</span>
                    </div>
                    <p className="text-[11px] text-[#797979] mt-1">Data created by or assigned to them — their own candidates, jobs, and activity only.</p>
                  </div>

                  <div
                    onClick={() => setDataScope("Global")}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      dataScope === "Global" ? "bg-[#CCEFDC]/30 border-[#00AE52]" : "bg-[#F8F9FA] border-[#DFEAF2]"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#4C4C4C]">
                      <Shield className="w-4 h-4" />
                      <span>Global</span>
                    </div>
                    <p className="text-[11px] text-[#797979] mt-1">All enterprise-level data across all users, teams, and departments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
