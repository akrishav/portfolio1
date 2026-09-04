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
  Check
} from "lucide-react";

export default function CandidatePortalPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "applications" | "refer">("dashboard");
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [referForm, setReferForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    experience: "",
    availableInDays: "",
    portfolioUrl: "",
    message: "",
  });

  const [toasts, setToasts] = useState<Array<{ id: string; type: string; message: string }>>([]);

  const addToast = (type: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev.slice(-2), { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleReferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReferModalOpen(false);
    addToast("success", `Referral for ${referForm.fullName || "Candidate"} submitted successfully!`);
    setReferForm({
      fullName: "",
      email: "",
      mobile: "",
      experience: "",
      availableInDays: "",
      portfolioUrl: "",
      message: "",
    });
  };

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
      title: "Registered Nurse - Review Analys",
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
      title: "Registered Nurse - Electrophysiology",
      tags: ["Travel", "Full Time"],
      location: "Syracuse, NY, US",
      posted: "Posted 1 year ago",
      pay: "USD 25 - USD 30 / Hour",
      ref: "BCR0001097",
      openings: 1,
      startDate: "Nov 15, 2024",
      description: "RN Order Details: Submission Process Virtual Interview, Auto Offer Shift 10D 0700-1730 EOW. Length of assignment: 13 weeks. Requires EP exp and vent exp.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans flex flex-col">
      {/* Candidate Portal Header */}
      <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A73E8] text-white font-bold flex items-center justify-center text-sm">
              H
            </div>
            <span className="text-lg font-bold text-[#1A73E8]">Hummingbird</span>
          </div>

          <nav className="flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "dashboard" ? "bg-[#E8F4FF] text-[#1A73E8] font-semibold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "search" ? "bg-[#E8F4FF] text-[#1A73E8] font-semibold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              Search Jobs
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeTab === "applications" ? "bg-[#E8F4FF] text-[#1A73E8] font-semibold" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setIsReferModalOpen(true)}
              className="px-3 py-2 rounded-md text-[#1A73E8] hover:bg-[#E8F4FF] font-semibold transition-colors cursor-pointer border border-[#DFEAF2]"
            >
              + Refer a Friend
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md transition-colors cursor-pointer relative">
            <Bell className="w-5 h-5 text-[#797979]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D90F21] rounded-full"></span>
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-[#DFEAF2]">
            <div className="w-8 h-8 rounded-full bg-[#DFB400] text-white font-bold text-xs flex items-center justify-center">
              SG
            </div>
            <div className="text-xs leading-tight">
              <p className="font-medium text-[#1F1F1F]">Shreya Gupta</p>
              <p className="text-[10px] text-[#797979]">sadiya.banu@lancesoft.com</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Candidate Waving-Hand Banner */}
        <div className="bg-gradient-to-r from-[#DFB400] via-[#E5C333] to-[#1A73E8] text-white p-6 rounded-xl shadow-[0_8px_16px_-6px_rgba(24,39,75,.12)] relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1 z-10">
            <h2 className="text-2xl font-medium tracking-tight flex items-center gap-2">
              Good Morning, Shreya Gupta! 👋
            </h2>
            <p className="text-xs text-amber-50">
              Discover new opportunities and take the next step in your career
            </p>
          </div>
        </div>

        {/* 8 Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {candidateStatCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#DFEAF2] rounded-xl p-4 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08),0_2px_4px_-2px_rgba(24,39,75,.12)] flex items-center justify-between"
              >
                <div>
                  <p className="text-xl font-semibold text-[#1F1F1F] tracking-tight">{card.count}</p>
                  <p className="text-xs text-[#797979] font-medium mt-0.5">{card.label}</p>
                </div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                  <IconComp className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Left Profile Card & Right Job Cards */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column (4 cols) */}
          <div className="col-span-4 space-y-6">
            {/* Profile Completion Card */}
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#DFB400] text-white font-bold flex items-center justify-center text-sm border-2 border-amber-300">
                  SG
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#1F1F1F]">Shreya Gupta</h3>
                  <p className="text-xs text-[#797979]">Registered Nurse-Review Analys</p>
                  <p className="text-[11px] text-[#00AE52] font-medium mt-0.5">Profile completion: 85%</p>
                </div>
              </div>

              <div className="w-full bg-[#EDEDEF] h-2 rounded-full overflow-hidden">
                <div className="bg-[#00AE52] h-full w-[85%]"></div>
              </div>

              <button className="w-full h-10 bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer">
                Complete Profile
              </button>
            </div>

            {/* Pending Actions Card */}
            <div className="bg-white border border-[#DFEAF2] rounded-xl p-5 shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-[#D90F21] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Pending Actions (2)</span>
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-[#F8F9FA] rounded border border-[#DFEAF2]">
                  <span className="text-[#4C4C4C]">Work history is incomplete</span>
                  <button className="text-[#1A73E8] font-semibold text-[11px] hover:underline cursor-pointer">View</button>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F8F9FA] rounded border border-[#DFEAF2]">
                  <span className="text-[#4C4C4C]">Professional information incomplete</span>
                  <button className="text-[#1A73E8] font-semibold text-[11px] hover:underline cursor-pointer">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Search Jobs & Listings (8 cols) */}
          <div className="col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1F1F1F]">372 job(s) found</h3>
              <select className="h-9 px-3 bg-white border border-[#DFEAF2] rounded-md text-xs text-[#4C4C4C] font-medium focus:outline-none">
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
                  <div>
                    <h4 className="text-base font-semibold text-[#1F1F1F]">{job.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {job.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-[#E8F4FF] text-[#1A73E8] text-[11px] font-semibold rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#797979] flex items-center justify-end gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <p className="text-[11px] text-[#A5A5A5] mt-0.5">{job.posted}</p>
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
                    <button
                      onClick={() => addToast("info", `Saved ${job.title} to your bookmarked jobs.`)}
                      className="p-2 border border-[#DFEAF2] rounded-md text-[#797979] hover:text-[#1A73E8] hover:bg-[#E8F4FF] transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToast("success", `Application submitted for ${job.title}!`)}
                      className="h-10 px-5 bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Refer a Friend Modal */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1F1F]/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-[0_12px_42px_-4px_rgba(24,39,75,.12)] border border-[#DFEAF2] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DFEAF2] flex items-center justify-between bg-[#F8F9FA]">
              <h3 className="text-base font-semibold text-[#1F1F1F]">Refer a Friend</h3>
              <button
                onClick={() => setIsReferModalOpen(false)}
                className="p-1 text-[#797979] hover:text-[#1F1F1F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReferSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={referForm.fullName}
                    onChange={(e) => setReferForm({ ...referForm, fullName: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={referForm.email}
                    onChange={(e) => setReferForm({ ...referForm, email: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={referForm.mobile}
                    onChange={(e) => setReferForm({ ...referForm, mobile: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-[#4C4C4C]">Overall Experience</label>
                  <input
                    type="text"
                    placeholder="Enter overall years of experience"
                    value={referForm.experience}
                    onChange={(e) => setReferForm({ ...referForm, experience: e.target.value })}
                    className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] focus:outline-none focus:border-[#1A73E8]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#4C4C4C]">Upload Resume</label>
                <div className="w-full h-12 border border-dashed border-[#DFEAF2] bg-[#F8F9FA] rounded-md flex items-center justify-center gap-2 text-xs text-[#797979] cursor-pointer hover:bg-[#E8F4FF]/50 transition-colors">
                  <Upload className="w-4 h-4 text-[#1A73E8]" />
                  <span>Select resume file (PDF, DOC, JPG up to 10MB)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#DFEAF2]">
                <button
                  type="button"
                  onClick={() => setIsReferModalOpen(false)}
                  className="h-10 px-4 rounded-md border border-[#DFEAF2] text-[#4C4C4C] hover:bg-[#F8F9FA] font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-md bg-[#1A73E8] hover:bg-[#488FED] text-white font-semibold shadow-xs cursor-pointer"
                >
                  Submit Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Alerts Container */}
      <div className="fixed top-20 right-8 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="p-3 rounded-lg border shadow-lg flex items-center justify-between gap-3 text-xs font-medium pointer-events-auto bg-[#CCEFDC] border-[#00AE52] text-[#00AE52] animate-fadeIn"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t.message}</span>
            </div>
            <button onClick={() => removeToast(t.id)} className="shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
