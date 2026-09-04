"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HummingbirdLogo from "./HummingbirdLogo";
import {
  Home,
  Briefcase,
  UserCheck,
  Users,
  Megaphone,
  Search,
  Calendar,
  Settings,
  BarChart2,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown,
  LogOut
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function HummingbirdSidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  // EXACT 10 SIDEBAR TABS INTACT
  const sidebarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Candidate Hub", href: "/candidate-hub", icon: Sparkles },
    { name: "Candidate Pool", href: "/candidate-pool", icon: Users },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone },
    { name: "Find Candidates", href: "/find-candidates", icon: Search },
    { name: "Interviews", href: "/interviews", icon: Calendar },
    { name: "Configuration Control", href: "/configuration-control", icon: Settings },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Candidate Portal", href: "/candidate-portal", icon: User },
  ];

  return (
    <aside
      className={`bg-white border-r border-[#DFEAF2] text-[#1F1F1F] flex flex-col shrink-0 fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-[264px]"
      }`}
    >
      {/* Top Branding Header with Working Collapse/Expand Toggle Arrow */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#DFEAF2] bg-white">
        <div className="flex items-center gap-2 overflow-hidden">
          {!isCollapsed ? (
            <HummingbirdLogo className="h-7" showText={true} />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] flex items-center justify-center font-bold text-white shadow-xs shrink-0 text-sm">
              H
            </div>
          )}
        </div>

        {/* Working Circular Toggle Arrow < / > */}
        <button
          onClick={onToggleCollapse}
          className="w-8 h-8 rounded-lg border border-[#DFEAF2] bg-[#E8F4FF] hover:bg-[#1A73E8] text-[#1A73E8] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
          title={isCollapsed ? "Expand Sidebar Panel" : "Collapse Sidebar Panel"}
        >
          {isCollapsed ? <ChevronRight className="w-4.5 h-4.5" /> : <ChevronLeft className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* 10 Sidebar Tabs Intact with White QA Design (#E8F4FF Active Highlight) */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto no-scrollbar text-xs font-sans">
        {sidebarItems.map((item) => {
          const IconComp = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-[#E8F4FF] text-[#1A73E8] font-bold border-l-4 border-[#1A73E8]"
                  : "text-[#4C4C4C] hover:bg-[#F8F9FA] hover:text-[#1F1F1F]"
              }`}
            >
              <IconComp
                className={`w-4 h-4 shrink-0 ${
                  isActive ? "text-[#1A73E8]" : "text-[#797979]"
                }`}
              />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Badge at Bottom */}
      <div className="p-3 border-t border-[#DFEAF2] bg-white">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8F9FA] border border-[#DFEAF2] text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-[#00AE52] text-white font-bold flex items-center justify-center text-[11px] shrink-0">
              AD
            </div>
            {!isCollapsed && (
              <div className="leading-tight truncate">
                <p className="font-semibold text-[#1F1F1F] truncate">Aditi Desai</p>
                <p className="text-[10px] text-[#797979] truncate">Program Admin</p>
              </div>
            )}
          </div>
          {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-[#797979] shrink-0" />}
        </div>
      </div>
    </aside>
  );
}
