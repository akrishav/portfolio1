"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowLeft, Users, UserCheck } from "lucide-react";

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState<"referred_me" | "i_referred">("referred_me");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/onboarding" className="p-2 hover:bg-[#F8F9FA] rounded-md transition-colors text-[#4C4C4C]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] text-white font-bold flex items-center justify-center text-sm">
              H
            </div>
            <span className="text-lg font-bold text-[#1A73E8]">Hummingbird Referrals</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#DFB400] text-white font-bold text-xs flex items-center justify-center">
            SG
          </div>
          <span className="text-xs font-medium text-[#1F1F1F]">Shreya Gupta</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Referrals Banner */}
        <div className="bg-[#DFB400] text-white p-6 rounded-xl shadow-xs">
          <h2 className="text-2xl font-medium tracking-tight">Referrals</h2>
          <p className="text-xs text-amber-50 mt-1">Manage and track your referral activity.</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-6">
          {/* Segmented Control Tabs */}
          <div className="flex items-center gap-2 border-b border-[#DFEAF2] pb-4">
            <button
              onClick={() => setActiveTab("referred_me")}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === "referred_me"
                  ? "bg-[#F9F0CC] text-[#DFB400] border border-[#DFB400]"
                  : "bg-white text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Who has referred me
            </button>
            <button
              onClick={() => setActiveTab("i_referred")}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === "i_referred"
                  ? "bg-[#F9F0CC] text-[#DFB400] border border-[#DFB400]"
                  : "bg-white text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Who I have referred
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#797979] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name..."
                className="w-full h-10 pl-9 pr-4 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] placeholder-[#A5A5A5] focus:outline-none focus:border-[#1A73E8]"
              />
            </div>

            <button className="h-10 px-4 bg-white border border-[#DFEAF2] hover:bg-[#F8F9FA] text-xs font-semibold text-[#4C4C4C] rounded-md transition-colors flex items-center gap-2 cursor-pointer">
              <Filter className="w-4 h-4 text-[#DFB400]" />
              <span>Filters</span>
            </button>
          </div>

          {/* Empty State Card matching image */}
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-48 h-32 bg-[#E8F4FF] rounded-2xl flex items-center justify-center border border-[#DFEAF2] shadow-inner relative overflow-hidden">
              <div className="w-16 h-16 bg-[#1A73E8] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
                <UserCheck className="w-8 h-8" />
              </div>
            </div>

            <div className="max-w-md space-y-1">
              <h4 className="text-sm font-semibold text-[#1F1F1F]">No Referrals Found</h4>
              <p className="text-xs text-[#797979] leading-relaxed">
                You haven't been referred to any jobs yet. When someone refers you, you'll see them here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
