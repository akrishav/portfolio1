"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  LogOut,
  Bell,
  Grid,
  Filter,
  SlidersHorizontal,
  Mail,
  Phone,
  Eye,
  Plus,
  ArrowLeft,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  MoreVertical,
  Check
} from "lucide-react";

export default function CandidatePoolPage() {
  const [activeTab, setActiveTab] = useState<"all" | "hotlist">("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const candidatePoolList = [
    {
      id: "CAND-001",
      name: "Wade Warner",
      role: "Registered Nurse",
      avatar: "WW",
      experience: "2 Years",
      availability: "Jan 20, 2026",
      email: "wadewarner@gmail.com",
      phone: "248-756-9447",
      skills: ["Clinical examination and diagnosis", "Emergency medical procedures", "Team collaboration"],
      moreSkillsCount: 2,
      location: "Tracy, CA, US",
      lastNoteDate: "Jan 12, 2026",
      lastSubmission: "Jan 15, 2026",
      status: "Accepted",
      matchingScore: "85%",
    },
    {
      id: "CAND-002",
      name: "Nadia Delgado",
      role: "Sr. Java Engineer",
      avatar: "ND",
      experience: "6 Years",
      availability: "Available immediately",
      email: "nadiadelgado@gmail.com",
      phone: "121-711-900",
      skills: ["Java", "JavaScript", "Angular.js", "HTML", "CSS", "SQL", "Eclipse", "Gradle"],
      moreSkillsCount: 5,
      location: "Herndon, Virginia, US",
      lastNoteDate: "Feb 01, 2026",
      lastSubmission: "Feb 05, 2026",
      status: "Shortlisted",
      matchingScore: "92%",
    },
    {
      id: "CAND-003",
      name: "Pranav Tej",
      role: "Lead Full Stack Engineer",
      avatar: "PT",
      experience: "8 Years",
      availability: "Feb 28, 2026",
      email: "pranav.t@lancesoft.com",
      phone: "987-654-3210",
      skills: ["Spring Boot", "React.js", "Docker", "AWS"],
      moreSkillsCount: 4,
      location: "Pune, MH, India",
      lastNoteDate: "Jan 28, 2026",
      lastSubmission: "Feb 02, 2026",
      status: "Pending",
      matchingScore: "78%",
    },
    {
      id: "CAND-004",
      name: "Marcus Lee",
      role: "Staff UX Designer",
      avatar: "ML",
      experience: "5 Years",
      availability: "Mar 15, 2026",
      email: "marcus.lee@designhub.com",
      phone: "415-890-1234",
      skills: ["Figma", "Design Systems", "User Research", "Wireframing"],
      moreSkillsCount: 3,
      location: "San Francisco, CA, US",
      lastNoteDate: "Feb 10, 2026",
      lastSubmission: "Feb 12, 2026",
      status: "Onboarded",
      matchingScore: "95%",
    },
  ];

  const handleOpenCandidateDrawer = (cand: any) => {
    setSelectedCandidate(cand);
    setIsSideDrawerOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans">
      {/* 1. Left Nav Shell (64px Rail + 224px Sidebar = 288px) */}
      <aside className="w-[288px] bg-[#0F172A] text-white flex flex-col shrink-0 fixed inset-y-0 left-0 z-30">
        <div className="h-16 flex items-center px-5 gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-[#1A73E8] flex items-center justify-center font-bold text-white shadow-sm">
            H
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-tight">Hummingbird</h1>
            <p className="text-[10px] text-slate-400 font-medium">RECRUITER ENTERPRISE</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar text-xs">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Home className="w-4 h-4 text-slate-400" />
            <span>Home</span>
          </Link>

          <Link href="/recruiter" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Jobs</span>
          </Link>

          <Link href="/onboarding" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Candidate Hub</span>
          </Link>

          <Link href="/recruiter" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1A73E8] text-white font-semibold transition-colors shadow-sm">
            <Users className="w-4 h-4" />
            <span>Candidate Pool</span>
          </Link>

          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Megaphone className="w-4 h-4 text-slate-400" />
            <span>Campaigns</span>
          </Link>

          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Find Candidates</span>
          </Link>

          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Interviews</span>
          </Link>

          <Link href="/recruiter" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configuration Control</span>
          </Link>

          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span>Analytics</span>
          </Link>

          <Link href="/onboarding" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors font-medium">
            <User className="w-4 h-4 text-slate-400" />
            <span>Candidate Portal</span>
          </Link>
        </nav>

        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1A73E8] text-white font-bold flex items-center justify-center text-[11px]">
                RH
              </div>
              <div className="leading-tight">
                <p className="font-medium text-slate-200">R Harshith+3</p>
                <p className="text-[10px] text-slate-400">Recruiter Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="pl-[288px] flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#DFEAF2] px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#797979] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates by profile title or skills"
                className="w-full h-10 pl-9 pr-28 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F] placeholder-[#A5A5A5] focus:outline-none focus:border-[#1A73E8]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-white border border-[#DFEAF2] rounded text-[11px] font-medium text-[#1A73E8] hover:bg-[#E8F4FF] cursor-pointer">
                Advanced Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md transition-colors cursor-pointer relative">
              <Bell className="w-5 h-5 text-[#797979]" />
              <span className="absolute -top-1 -right-1 bg-[#1A73E8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                48
              </span>
            </button>

            <button className="p-2 text-[#4C4C4C] hover:bg-[#F8F9FA] rounded-md transition-colors cursor-pointer">
              <Grid className="w-5 h-5 text-[#797979]" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#DFEAF2]">
              <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white font-bold text-xs flex items-center justify-center">
                RH
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Candidate Pool Main Enterprise Table Container */}
          <div className="bg-white border border-[#DFEAF2] rounded-xl shadow-[0_4px_4px_-2px_rgba(24,39,75,.08)] overflow-hidden space-y-4 p-6">
            {/* Horizontal Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-[#DFEAF2] pb-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === "all" ? "bg-[#E8F4FF] text-[#1A73E8]" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
                }`}
              >
                All Candidates <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-white text-[#1A73E8] border border-[#DFEAF2]">1504</span>
              </button>
              <button
                onClick={() => setActiveTab("hotlist")}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === "hotlist" ? "bg-[#E8F4FF] text-[#1A73E8]" : "text-[#4C4C4C] hover:bg-[#F8F9FA]"
                }`}
              >
                Hotlist <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#F8F9FA] text-[#797979] border border-[#DFEAF2]">12</span>
              </button>
            </div>

            {/* Candidate Hub Toolbar Card */}
            <div className="bg-[#F8F9FA] border border-[#DFEAF2] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2 bg-white border border-[#DFEAF2] rounded-md text-[#797979] hover:text-[#1F1F1F] cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1A73E8]" />
                  <span className="text-sm font-semibold text-[#1F1F1F]">Candidate(s)</span>
                  <span className="text-xs text-[#797979]">1504 found</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="h-10 px-4 bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add Candidate</span>
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="h-10 px-4 bg-white border border-[#DFEAF2] hover:bg-[#F8F9FA] text-xs font-semibold text-[#4C4C4C] rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#1A73E8]" />
                  <span>Filters</span>
                </button>
                <button className="h-10 px-4 bg-white border border-[#DFEAF2] hover:bg-[#F8F9FA] text-xs font-medium text-[#4C4C4C] rounded-md transition-colors cursor-pointer">
                  Saved Searches
                </button>
                <button className="h-10 px-4 bg-white border border-[#DFEAF2] text-xs font-medium text-[#A5A5A5] rounded-md flex items-center gap-2 cursor-not-allowed">
                  <Mail className="w-4 h-4 text-[#A5A5A5]" />
                  <span>Send Mail</span>
                  <span className="bg-[#EDEDEF] text-[#797979] px-1.5 py-0.5 rounded-full text-[10px] font-bold">0</span>
                </button>
              </div>
            </div>

            {/* Candidate High-Density Enterprise Table */}
            <div className="overflow-x-auto border border-[#DFEAF2] rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1A73E8] text-white font-medium">
                  <tr>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Availability Date</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Skills</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Last Note</th>
                    <th className="py-3 px-4">Last Submission</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFEAF2]">
                  {candidatePoolList.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={() => handleOpenCandidateDrawer(cand)}
                      className="hover:bg-[#E8F4FF]/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E8F4FF] text-[#1A73E8] font-bold text-xs flex items-center justify-center border border-[#DFEAF2]">
                            {cand.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1F1F1F]">{cand.name}</p>
                            <p className="text-[11px] text-[#797979]">{cand.role}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[#4C4C4C] font-medium">{cand.experience}</td>
                      <td className="py-3.5 px-4 text-[#4C4C4C]">{cand.availability}</td>

                      <td className="py-3.5 px-4 text-[#4C4C4C] space-y-0.5">
                        <p className="flex items-center gap-1.5 text-[11px] text-[#1A73E8]">
                          <Mail className="w-3 h-3" />
                          {cand.email}
                        </p>
                        <p className="flex items-center gap-1.5 text-[11px] text-[#797979]">
                          <Phone className="w-3 h-3" />
                          {cand.phone}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {cand.skills.map((skill: string, sIdx: number) => (
                            <span key={sIdx} className="px-2 py-0.5 bg-[#E8F4FF] text-[#1A73E8] text-[10px] font-medium rounded border border-[#DFEAF2]">
                              {skill}
                            </span>
                          ))}
                          {cand.moreSkillsCount > 0 && (
                            <span className="px-1.5 py-0.5 bg-[#F8F9FA] text-[#797979] text-[10px] font-semibold rounded border border-[#DFEAF2]">
                              +{cand.moreSkillsCount} More
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[#4C4C4C]">{cand.location}</td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-[#4C4C4C]">
                          <span>{cand.lastNoteDate}</span>
                          <Eye className="w-3.5 h-3.5 text-[#1A73E8] hover:text-[#488FED] cursor-pointer" />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-[#4C4C4C]">{cand.lastSubmission}</td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCandidateDrawer(cand);
                          }}
                          className="h-8 px-3 rounded border border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F4FF] text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          View Record
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Candidate Detail Drawer (Signature Record Pattern) */}
      {isSideDrawerOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1F1F1F]/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-[520px] bg-white h-full shadow-[0_10px_32px_-4px_rgba(24,39,75,.10)] border-l border-[#DFEAF2] flex flex-col overflow-hidden animate-slideInRight">
            <div className="px-6 py-5 border-b border-[#DFEAF2] bg-[#F8F9FA] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider">Candidate Profile Drawer</span>
                <h3 className="text-lg font-semibold text-[#1F1F1F] mt-0.5">{selectedCandidate.name}</h3>
                <p className="text-xs text-[#797979]">{selectedCandidate.role} · {selectedCandidate.location}</p>
              </div>
              <button
                onClick={() => setIsSideDrawerOpen(false)}
                className="p-1.5 text-[#797979] hover:bg-white rounded-md border border-transparent hover:border-[#DFEAF2] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-[#1F1F1F]">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#E8F4FF] border border-[#DFEAF2] rounded-xl">
                <div>
                  <span className="text-[11px] text-[#797979]">Total Experience</span>
                  <p className="font-semibold text-[#1F1F1F]">{selectedCandidate.experience}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#797979]">Matching Score</span>
                  <p className="font-semibold text-[#00AE52]">{selectedCandidate.matchingScore}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wider">Contact Details</h4>
                <p>Email: <strong className="text-[#1A73E8]">{selectedCandidate.email}</strong></p>
                <p>Phone: <strong>{selectedCandidate.phone}</strong></p>
                <p>Availability: <strong>{selectedCandidate.availability}</strong></p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wider">Verified Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skills.map((s: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#E8F4FF] text-[#1A73E8] text-xs font-medium rounded-md border border-[#DFEAF2]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#DFEAF2] bg-[#F8F9FA] flex items-center justify-between">
              <button
                onClick={() => setIsSideDrawerOpen(false)}
                className="h-10 px-4 rounded-md border border-[#DFEAF2] text-[#4C4C4C] hover:bg-white text-xs font-medium cursor-pointer"
              >
                Close Profile
              </button>
              <button className="h-10 px-5 rounded-md bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold shadow-xs cursor-pointer">
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1F1F1F]/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-[420px] bg-white h-full shadow-[0_10px_32px_-4px_rgba(24,39,75,.10)] border-l border-[#DFEAF2] flex flex-col overflow-hidden animate-slideInRight">
            <div className="px-6 py-5 border-b border-[#DFEAF2] bg-[#F8F9FA] flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1F1F1F]">Filter Candidates</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 text-[#797979] hover:text-[#1F1F1F] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-[#4C4C4C]">Location</label>
                <input type="text" placeholder="Enter location..." className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F]" />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#4C4C4C]">Profession</label>
                <select className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#DFEAF2] rounded-md text-xs text-[#1F1F1F]">
                  <option>Select profession</option>
                  <option>Registered Nurse</option>
                  <option>Software Engineer</option>
                  <option>Product Designer</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-[#4C4C4C]">Years of Experience (0 - 50 years)</label>
                <input type="range" min="0" max="50" className="w-full accent-[#1A73E8]" />
              </div>
            </div>

            <div className="p-4 border-t border-[#DFEAF2] bg-[#F8F9FA] flex items-center justify-between">
              <button onClick={() => setIsFilterDrawerOpen(false)} className="h-10 px-4 rounded-md border border-[#DFEAF2] text-[#4C4C4C] hover:bg-white text-xs font-medium cursor-pointer">
                Reset Filters
              </button>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="h-10 px-5 rounded-md bg-[#1A73E8] hover:bg-[#488FED] text-white text-xs font-semibold shadow-xs cursor-pointer">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
