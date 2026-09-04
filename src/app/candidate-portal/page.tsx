"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Briefcase,
  UserCheck,
  Bell,
  User,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  Share2,
  Bookmark,
  ChevronRight,
  Upload,
  Calendar,
  Clock,
  Filter,
  Users,
  Award,
  FileText,
  FileCheck,
  SlidersHorizontal,
  DollarSign,
  MapPin,
  Building,
  Check,
  MessageSquare,
  ChevronDown
} from "lucide-react";

export default function CandidatePortalPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "applications">("dashboard");

  const candidateStatCards = [
    { label: "Saved jobs", count: "2", icon: Bookmark, bg: "bg-[#CCEFDC]", color: "text-[#00AE52]" },
    { label: "Applied jobs", count: "12", icon: Briefcase, bg: "bg-[#E8F4FF]", color: "text-[#1A73E8]" },
    { label: "Screenings jobs", count: "2", icon: Users, bg: "bg-[#F7CFD3]", color: "text-[#D90F21]" },
    { label: "Interviews jobs", count: "0", icon: Calendar, bg: "bg-[#F9F0CC]", color: "text-[#DFB400]" },
    { label: "Offers jobs", count: "1", icon: Award, bg: "bg-[#E8F4FF]", color: "text-[#1A73E8]" },
    { label: "Onboardings jobs", count: "0", icon: CheckCircle2, bg: "bg-[#CCEFDC]", color: "text-[#00AE52]" },
    { label: "Offboardings jobs", count: "0", icon: FileText, bg: "bg-[#F9F0CC]", color: "text-[#DFB400]" },
    { label: "Hidden Jobs", count: "0", icon: X, bg: "bg-[#F7CFD3]", color: "text-[#D90F21]" },
  ];

  const jobsList = [
    {
      id: "JOB-101",
      title: "Registered Nurse-Review Analys",
      tags: ["HPR", "Full Time", "1 Year Exp"],
      location: "Detroit, MI, US",
      posted: "Posted almost 2 years ago",
      pay: "USD 30 - USD 35 / Hour",
      ref: "BCR0002899",
      openings: 1,
      startDate: "Oct 28, 2024",
      description: "Perform prospective, concurrent and retrospective review of inpatient services to ensure medical necessity and quality standards across client hospital networks.",
    },
    {
      id: "JOB-102",
      title: "Registered Nurse-Review Analys",
      tags: ["HPR", "Full Time", "1 Year Exp"],
      location: "Remote, MI, US",
      posted: "Posted over 2 years ago",
      pay: "USD 30 - USD 35 / Hour",
      ref: "BCR0002900",
      openings: 1,
      startDate: "Nov 15, 2024",
      description: "Perform prospective review of inpatient services and clinical documentation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans flex flex-col selection:bg-[#1A73E8] selection:text-white">
      {/* Candidate Portal Header matching Product Reference Screenshot */}
      <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] text-white font-bold flex items-center justify-center text-sm">
              H
            </div>
            <span className="text-xl font-bold text-[#1A73E8]">Hummingbird</span>
          </div>

          <nav className="flex items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "dashboard" ? "text-[#1A73E8] font-bold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "search" ? "text-[#1A73E8] font-bold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Search Jobs
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "applications" ? "text-[#1A73E8] font-bold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              My Jobs
            </button>
            <button className="px-3 py-2 text-[#4C4C4C] hover:bg-[#F8F9FA] flex items-center gap-1 cursor-pointer">
              <span>Assessments</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#797979]" />
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md transition-colors cursor-pointer">
            <MessageSquare className="w-4.5 h-4.5 text-[#797979]" />
          </button>

          <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md transition-colors cursor-pointer relative">
            <Bell className="w-4.5 h-4.5 text-[#797979]" />
            <span className="absolute -top-1 -right-1 bg-[#1A73E8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              1
            </span>
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-[#DFEAF2]">
            <div className="w-8 h-8 rounded-full bg-[#DFB400] text-white font-bold text-xs flex items-center justify-center">
              SG
            </div>
            <div className="text-xs leading-tight">
              <p className="font-semibold text-[#1F1F1F]">Shreya Gupta</p>
              <p className="text-[10px] text-[#797979]">sadiya.banu@lancesoft.com</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#797979]" />
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Candidate Waving-Hand Banner matching Product Reference Screenshot */}
        <div className="bg-[#DFB400] text-white p-6 rounded-xl shadow-[0_8px_16px_-6px_rgba(24,39,75,.12)] relative overflow-hidden flex items-center justify-between border border-amber-300">
          <div className="space-y-1 z-10">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Good Morning, Shreya Gupta 🖐
            </h2>
            <p className="text-xs text-amber-50">
              Discover new opportunities and take the next step in your career
            </p>
          </div>
        </div>

        {/* 8 Stat Cards in 4 columns matching Screenshot */}
        <div className="grid grid-cols-4 gap-4">
          {candidateStatCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className={`bg-white border border-[#DFEAF2] rounded-xl p-4 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] flex items-center justify-between ${card.bg}/30`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-[#1F1F1F] tracking-tight mr-1.5">{card.count}</span>
                    <span className="text-xs text-[#4C4C4C] font-medium">{card.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Layout: Left Profile & Pending Actions Card + Right Job Cards List */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column (4 cols) */}
          <div className="col-span-4 space-y-6">
            {/* Profile Ring & Completion Card */}
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4 text-center flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#EDEDEF" strokeWidth="6" fill="transparent" />
                  <circle cx="40" cy="40" r="34" stroke="#DFB400" strokeWidth="6" strokeDasharray="213" strokeDashoffset="32" fill="transparent" />
                </svg>
                <div className="absolute w-14 h-14 rounded-full bg-[#DFB400] text-white font-bold flex items-center justify-center text-base">
                  SG
                </div>
                <span className="absolute bottom-0 right-0 bg-[#DFB400] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                  85%
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-[#1F1F1F]">Shreya Gupta</h3>
                <p className="text-xs text-[#DFB400] font-medium">Registered Nurse-Review Analys</p>
                <p className="text-[11px] text-[#797979]">Profile completion: <strong className="text-[#1F1F1F]">85%</strong></p>
                <p className="text-[11px] text-[#797979]">Available From: <strong className="text-[#1F1F1F]">June 05, 2025</strong></p>
              </div>

              <button className="w-full h-10 bg-[#DFB400] hover:bg-[#E5C333] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer">
                Complete profile
              </button>
            </div>

            {/* Scheduled Interviews Card */}
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-2">
              <h4 className="text-xs font-semibold text-[#1F1F1F] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#797979]" />
                <span>Interviews</span>
              </h4>
              <p className="text-xs text-[#797979]">You have no interviews scheduled yet.</p>
            </div>

            {/* Pending Actions Card */}
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-[#D90F21] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#D90F21]" />
                  <span>Pending Actions</span>
                </h4>
                <span className="w-5 h-5 rounded-full bg-[#F7CFD3] text-[#D90F21] font-bold text-[10px] flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-[#F8F9FA] rounded-md border border-[#DFEAF2]">
                  <span className="text-[#4C4C4C] font-medium">• Work history is incomplete</span>
                  <button className="text-[#1A73E8] font-semibold text-[11px] hover:underline cursor-pointer">View</button>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-[#F8F9FA] rounded-md border border-[#DFEAF2]">
                  <span className="text-[#4C4C4C] font-medium">• Professional information is incomplete</span>
                  <button className="text-[#1A73E8] font-semibold text-[11px] hover:underline cursor-pointer">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Search Jobs & Listings (8 cols) */}
          <div className="col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1F1F1F]">372 job(s) found</h3>
              <select className="h-9 px-3 bg-white border border-[#DFEAF2] rounded-md text-xs text-[#4C4C4C] font-medium focus:outline-none cursor-pointer">
                <option>Sort by: Relevance</option>
                <option>Sort by: Date Posted</option>
                <option>Sort by: Pay Rate</option>
              </select>
            </div>

            {jobsList.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-[#DFEAF2] rounded-xl p-6 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4 hover:shadow-[0_8px_8px_-4px_rgba(24,39,75,.08)] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F9FA] border border-[#DFEAF2] flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-[#797979]" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-[#1F1F1F]">{job.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {job.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 bg-[#F8F9FA] text-[#4C4C4C] text-[11px] font-semibold rounded border border-[#DFEAF2]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#797979] flex items-center justify-end gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <p className="text-[11px] text-[#A5A5A5] mt-0.5">{job.posted} · <span className="text-[#00AE52] font-semibold">Viewed</span></p>
                  </div>
                </div>

                <p className="text-xs text-[#4C4C4C] leading-relaxed">{job.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-[#DFEAF2] text-xs">
                  <div className="flex items-center gap-4 text-[#797979]">
                    <span>Openings: <strong className="text-[#1F1F1F]">{job.openings}</strong></span>
                    <span>Start Date: <strong className="text-[#1F1F1F]">{job.startDate}</strong></span>
                    <span>Job Ref: <strong className="text-[#1F1F1F]">{job.ref}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#1F1F1F]">{job.pay}</span>
                    <button className="p-2 border border-[#DFEAF2] rounded-md text-[#797979] hover:text-[#1A73E8] hover:bg-[#E8F4FF] cursor-pointer">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-[#DFEAF2] rounded-md text-[#797979] hover:text-[#1A73E8] hover:bg-[#E8F4FF] cursor-pointer">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="h-10 px-6 bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
