"use client";

import React, { useState } from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";
import Logo from "@/components/Logo";
import { 
  Search, SlidersHorizontal, ChevronDown, ListFilter, Map,
  MessageSquare, X, Send, ArrowLeft, Briefcase, MapPin, 
  DollarSign, Clock, CheckCircle2, User, Building, AlertCircle, Calendar
} from "lucide-react";

export default function JobBoard() {
  const [profession, setProfession] = useState("Technical");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("");
  const [compactStates, setCompactStates] = useState(false);
  const [jobType, setJobType] = useState("4 items selected");
  const [startDate, setStartDate] = useState("");
  const [hotJobs, setHotJobs] = useState(false);
  const [featuredJobs, setFeaturedJobs] = useState(false);
  const [openJobs, setOpenJobs] = useState(false);
  const [duration, setDuration] = useState("9-16 Weeks");
  const [weeklyPay, setWeeklyPay] = useState(2500);

  // Selected job for side panel drawer
  const [selectedJob, setSelectedJob] = useState<null | {
    title: string;
    weeks: string;
    pay: string;
    profession: string;
    specialty: string;
    location: string;
    shift: string;
    facility: string;
    start: string;
    description: string;
  }>(null);

  // Chat popover states
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "Hi there, can I get you signed up for alerts on high-paying positions? May I know your license/specialty?",
      time: "Start Date"
    },
    {
      id: 2,
      sender: "michelle",
      text: "Seems like you're busy. Have you registered on our portal yet? If not, please take a moment to register by clicking here and complete your application. Once registered one of our recruiters will reach out to send you pay packages for matching jobs as well as discuss with you your options.",
      time: "Michelle"
    }
  ]);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        sender: "user",
        text: replyText,
        time: "You"
      }
    ]);
    setReplyText("");
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#1E293B] flex flex-col font-sans antialiased">
      {/* Floating Developer Prototyping Switcher */}
      <DemoNavbar />

      {/* Top Header - Hummingbird Logo & Portal Name */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back to home */}
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500" title="Back to Home Page">
              <ArrowLeft className="h-4.5 w-4.5" />
            </Link>

            {/* Hummingbird Logo & Job Board Title beside it */}
            <div className="flex items-center gap-3">
              {/* Hummingbird Logo Image */}
              <img
                src="/hummingbird-logo.png"
                alt="Hummingbird Logo"
                className="h-6.5 object-contain select-none pointer-events-none"
              />
              {/* Vertical separator & Title beside it */}
              <span className="text-slate-350 font-normal text-lg">|</span>
              <span className="text-xs font-bold text-[#007A5E] uppercase tracking-wider">Job Board</span>
            </div>
          </div>

          {/* Central Active State Banner (Minimal Blue Accent) */}
          <div className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="px-3.5 py-1 bg-[#EBF3FC] text-[#0052CC] border border-[#DEE7F3] rounded-full">
              Current Offering: Health IT
            </span>
          </div>

          {/* Right Header Applied count pill (styled in green-done #007A5E) */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-bold rounded-lg shadow-sm transition-all uppercase tracking-wider">
              (0) Applied
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="h-8 w-8 rounded-full bg-[#007A5E] text-white font-extrabold flex items-center justify-center text-xs shadow-sm uppercase">
                M
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-700">Mani</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="max-w-[1600px] w-full mx-auto px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Filters - Styled exactly like the Cynet Health search filters sidebar */}
        <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-5 h-fit text-left">
          
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <ListFilter className="h-4.5 w-4.5 text-[#007A5E]" />
            <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Quick Filter</span>
          </div>

          {/* Quick Filter dropdown */}
          <div className="space-y-1.5">
            <div className="relative">
              <select 
                value={profession} 
                onChange={(e) => setProfession(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-10 text-xs font-semibold focus:outline-none focus:border-[#007A5E] appearance-none"
              >
                <option value="Technical">Technical</option>
                <option value="Clinical">Clinical</option>
                <option value="Nursing">Nursing</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Specialty */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-550 block">Specialty</label>
            <div className="relative">
              <select 
                value={specialty} 
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-10 text-xs font-semibold focus:outline-none focus:border-[#007A5E] appearance-none"
              >
                <option value="">Select Specialty</option>
                <option value="Business/Systems Analyst">Business/Systems Analyst</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-550 block">Country</label>
            <div className="relative">
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-10 text-xs font-semibold focus:outline-none focus:border-[#007A5E] appearance-none"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="International">International</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* State with right checkbox */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-extrabold text-slate-550 block">State</label>
              <label className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold cursor-pointer">
                <span>Select All Compact States</span>
                <input 
                  type="checkbox" 
                  checked={compactStates} 
                  onChange={(e) => setCompactStates(e.target.checked)}
                  className="rounded border-slate-300 text-[#007A5E] focus:ring-0 h-3 w-3"
                />
              </label>
            </div>
            <div className="relative">
              <select 
                value={state} 
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-10 text-xs font-semibold focus:outline-none focus:border-[#007A5E] appearance-none"
              >
                <option value="">Select State</option>
                <option value="CA">California (CA)</option>
                <option value="NY">New York (NY)</option>
                <option value="TX">Texas (TX)</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-550 block">Job Type</label>
            <div className="relative">
              <select 
                value={jobType} 
                onChange={(e) => setJobType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-10 text-xs font-semibold focus:outline-none focus:border-[#007A5E] appearance-none"
              >
                <option value="4 items selected">4 items selected</option>
                <option value="Full Time">Full Time</option>
                <option value="Contract">Contract</option>
                <option value="PRN">PRN</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-3.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-555 block">Start Date</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="grow px-3 py-1.5 text-xs font-semibold focus:outline-none text-slate-700 bg-white"
                placeholder="mm/dd/yyyy"
              />
              <div className="p-2.5 bg-[#0052CC] text-white flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-2.5">
            <span className="text-[10.5px] font-extrabold text-slate-655 block">Advanced Filters</span>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer font-bold select-none">
                <input 
                  type="checkbox" 
                  checked={hotJobs}
                  onChange={(e) => setHotJobs(e.target.checked)}
                  className="rounded-full border-slate-350 text-[#007A5E] focus:ring-0 h-4.5 w-4.5"
                />
                <span className="flex items-center gap-1">Filter By Hot Jobs <span className="text-sm">🔥</span></span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer font-bold select-none">
                <input 
                  type="checkbox" 
                  checked={featuredJobs}
                  onChange={(e) => setFeaturedJobs(e.target.checked)}
                  className="rounded-full border-slate-350 text-[#007A5E] focus:ring-0 h-4.5 w-4.5"
                />
                <span className="flex items-center gap-1">Filter By Featured Jobs <span className="text-[#0052CC] text-sm">⭐</span></span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer font-bold select-none">
                <input 
                  type="checkbox" 
                  checked={openJobs}
                  onChange={(e) => setOpenJobs(e.target.checked)}
                  className="rounded-full border-slate-350 text-[#007A5E] focus:ring-0 h-4.5 w-4.5"
                />
                <span className="flex items-center gap-1">Filter By Open Jobs <span className="text-emerald-555 text-sm">🚩</span></span>
              </label>
            </div>
          </div>

          {/* Assignment Duration */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-extrabold text-slate-655 block">Assignment Duration</span>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {["4-8 Weeks", "9-16 Weeks", "17 Weeks+"].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDuration(dur)}
                  className={`py-1.5 px-1 rounded-lg text-[9.5px] font-extrabold border transition-all ${
                    duration === dur 
                      ? "bg-[#EBF3FC] border-[#0052CC] text-[#0052CC] shadow-3xs" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Est. Weekly Pay Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10.5px] font-extrabold text-slate-655 block">Est. Weekly Pay</span>
              <span className="text-[10px] font-extrabold text-[#007A5E] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">${weeklyPay}/wk</span>
            </div>
            <input 
              type="range"
              min="1000"
              max="5000"
              step="100"
              value={weeklyPay}
              onChange={(e) => setWeeklyPay(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#007A5E]"
            />
          </div>

          {/* Sidebar Footer Buttons */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <button 
              onClick={() => {
                setProfession("Technical");
                setSpecialty("");
                setCountry("United States");
                setState("");
                setCompactStates(false);
                setJobType("4 items selected");
                setStartDate("");
                setHotJobs(false);
                setFeaturedJobs(false);
                setOpenJobs(false);
                setDuration("9-16 Weeks");
                setWeeklyPay(2500);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
            >
              Clear All
            </button>
            <button className="px-5 py-2 bg-[#007A5E] hover:bg-[#005E48] text-white rounded-lg text-xs font-bold shadow-xs uppercase tracking-wider transition-colors">
              Apply
            </button>
          </div>

        </aside>

        {/* Right main panel - Styled like the Hummingbird ERP table (with Green-Done #007A5E header and blue accents) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Active Job count card header (styled in green-done #007A5E) */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-left">
            <div className="px-6 py-4.5 bg-[#007A5E] text-white flex items-center justify-between border-b border-[#005E48]">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm tracking-tight">Active Opportunities</span>
                <span className="px-2.5 py-0.5 bg-white/20 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  2 open positions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded text-white" title="Toggle Map">
                  <Map className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Main Job Listing Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left">
                    <th className="px-6 py-3.5">Job Details</th>
                    <th className="px-6 py-3.5">Compensation</th>
                    <th className="px-6 py-3.5">Profession</th>
                    <th className="px-6 py-3.5">Specialty</th>
                    <th className="px-6 py-3.5">Location</th>
                    <th className="px-6 py-3.5">Shift</th>
                    <th className="px-6 py-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  
                  {/* Job Row 1 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-left">
                      <div className="flex flex-col gap-0.5">
                        {/* Minimal Blue accent for primary title */}
                        <span className="text-[#0052CC] font-bold text-sm">Travel Job</span>
                        <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">62 Week(s)</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-800 font-bold text-left">
                      $2,134 - $2,246 <span className="text-[10px] text-slate-400">/wk</span>
                    </td>
                    <td className="px-6 py-5 text-left">Technical</td>
                    <td className="px-6 py-5 text-left">Business/Systems Analyst</td>
                    <td className="px-6 py-5 text-left">
                      <div className="flex items-center gap-1 text-slate-650">
                        <MapPin className="h-3.5 w-3.5 text-slate-450" />
                        <span>Sacramento, CA</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-left">
                      <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                        ☀️ Day - 8x5 - 09AM
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col gap-1.5 max-w-[110px] mx-auto">
                        {/* Apply Now button styled in green-done */}
                        <button className="w-full py-1.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-[10px] font-bold rounded-lg shadow-xs uppercase transition-colors">
                          Apply Now
                        </button>
                        {/* Details button styled in minimal blue outline */}
                        <button 
                          onClick={() => setSelectedJob({
                            title: "Travel IT Analyst Job",
                            weeks: "62 Week(s)",
                            pay: "$2,134 - $2,246 /wk",
                            profession: "Technical",
                            specialty: "Business/Systems Analyst",
                            location: "Sacramento, CA",
                            shift: "☀️ Day - 8x5 - 09AM",
                            facility: "Sutter Medical Group",
                            start: "Immediate",
                            description: "Responsibilities include supporting hospital ERP systems, analyzing payroll data feeds, checking HL7 messaging queues, and maintaining clinical vendor databases. Position requires a minimum of 2 years experience in Health IT."
                          })}
                          className="w-full py-1.5 bg-white border border-[#0052CC] hover:bg-slate-50 text-[#0052CC] text-[10px] font-bold rounded-lg shadow-xs uppercase transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Job Row 2 */}
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-left">
                      <div className="flex flex-col gap-0.5">
                        {/* Minimal Blue accent for primary title */}
                        <span className="text-[#0052CC] font-bold text-sm">Travel Job</span>
                        <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">7 Week(s)</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-800 font-bold text-left">
                      $2,795 - $2,942 <span className="text-[10px] text-slate-400">/wk</span>
                    </td>
                    <td className="px-6 py-5 text-left">Technical</td>
                    <td className="px-6 py-5 text-left">Other</td>
                    <td className="px-6 py-5 text-left">
                      <div className="flex items-center gap-1 text-slate-650">
                        <MapPin className="h-3.5 w-3.5 text-slate-450" />
                        <span>New York City, NY</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-left">
                      <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                        ☀️ Day - 7x5 - 09AM
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col gap-1.5 max-w-[110px] mx-auto">
                        {/* Apply Now button styled in green-done */}
                        <button className="w-full py-1.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-[10px] font-bold rounded-lg shadow-xs uppercase transition-colors">
                          Apply Now
                        </button>
                        {/* Details button styled in minimal blue outline */}
                        <button 
                          onClick={() => setSelectedJob({
                            title: "Systems Administrator",
                            weeks: "7 Week(s)",
                            pay: "$2,795 - $2,942 /wk",
                            profession: "Technical",
                            specialty: "Other",
                            location: "New York City, NY",
                            shift: "☀️ Day - 7x5 - 09AM",
                            facility: "Mount Sinai Hospital",
                            start: "Jul 22, 2026",
                            description: "Supports clinical systems administration, server monitoring, user access management, active directory maintenance, and database query optimizations. Position is a 7-week short contract extension."
                          })}
                          className="w-full py-1.5 bg-white border border-[#0052CC] hover:bg-slate-50 text-[#0052CC] text-[10px] font-bold rounded-lg shadow-xs uppercase transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

          {/* Table Bottom Navigation Footer elements */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
            {/* Pagination */}
            <div className="flex items-center gap-3">
              <span>Showing</span>
              <div className="relative">
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none appearance-none pr-8 cursor-pointer">
                  <option value="1-2">1-2</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
              <span>of 2</span>
            </div>

            {/* Total counts */}
            <div className="flex items-center gap-4 text-slate-705 font-extrabold">
              <span>Total Jobs: 2</span>
              <span>Total Openings: 2</span>
            </div>
          </div>
        </section>

      </div>

      {/* Chat Popover Overlay (Bottom-Left - Styled in Green-Done with minimal blue bubble reply) */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3">
        {/* Chat window bubble */}
        {isChatOpen && (
          <div className="w-[330px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col animate-fade-in mb-1">
            {/* Chat header (Green-Done #007A5E) */}
            <div className="bg-[#007A5E] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#005E48]">
              <div className="flex items-center gap-2">
                <div className="h-6.5 w-6.5 rounded-full bg-white/20 flex items-center justify-center text-[10.5px] font-extrabold uppercase">
                  M
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block leading-none">Michelle</span>
                  <span className="text-[9px] text-teal-200 block mt-0.5 leading-none">Onboarding Agent</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message ledger */}
            <div className="p-4 space-y-4 max-h-[280px] overflow-y-auto bg-slate-50/50 flex-1">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  {/* User messages in Blue (#0052CC) accent, system in White/Gray */}
                  <div 
                    className={`p-3 rounded-2xl text-[11px] leading-relaxed font-semibold ${
                      msg.sender === "user" 
                        ? "bg-[#0052CC] text-white rounded-br-none" 
                        : "bg-white border border-slate-200 text-slate-705 rounded-bl-none shadow-2xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider pl-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Compose reply message input form */}
            <form onSubmit={handleSendReply} className="border-t border-slate-100 p-2 bg-white flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Compose your reply..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-[11px] font-semibold focus:outline-none focus:border-[#007A5E]"
              />
              <button 
                type="submit" 
                className="p-2 bg-[#007A5E] hover:bg-[#005E48] text-white rounded-lg transition-colors"
                title="Send Message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Chat Icon (Click to toggle - Green-Done base, blue notification count) */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative h-12 w-12 bg-[#007A5E] hover:bg-[#005E48] text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
        >
          <MessageSquare className="h-5.5 w-5.5" />
          <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-[#0052CC] text-white text-[9.5px] font-extrabold flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>
      </div>

      {/* Job Details Side Panel Drawer */}
      {selectedJob && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col text-left border-l border-slate-205 animate-slide-in">
          
          {/* Header */}
          <div className="p-6 bg-[#007A5E] text-white flex justify-between items-center relative">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-200 tracking-wider block">{selectedJob.weeks} Contract</span>
              <h3 className="font-extrabold text-base tracking-tight mt-1">{selectedJob.title}</h3>
            </div>
            <button 
              onClick={() => setSelectedJob(null)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar text-xs">
            
            {/* Pay rate banner */}
            <div className="bg-[#EBF3FC] border border-[#DEE7F3] p-4 rounded-xl flex items-center justify-between text-slate-800">
              <div>
                <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Estimated Weekly Pay</span>
                <span className="text-lg font-black text-[#0052CC] block mt-0.5">{selectedJob.pay}</span>
              </div>
              <DollarSign className="h-8 w-8 text-[#0052CC]/25 pointer-events-none" />
            </div>

            {/* Job Details Grid */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[10.5px] border-b border-slate-100 pb-2">Opportunity Overview</h4>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Facility / Client</span>
                  <span className="font-bold text-slate-700 block">{selectedJob.facility}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Location</span>
                  <span className="font-bold text-slate-700 block">{selectedJob.location}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Profession</span>
                  <span className="font-bold text-slate-700 block">{selectedJob.profession}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Specialty</span>
                  <span className="font-bold text-slate-700 block">{selectedJob.specialty}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Shift / Schedule</span>
                  <span className="font-bold text-amber-600 block">{selectedJob.shift}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block tracking-wider">Start Date</span>
                  <span className="font-bold text-slate-700 block">{selectedJob.start}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[10.5px] border-b border-slate-105 pb-2">Job Description & Requirements</h4>
              <p className="text-slate-600 leading-relaxed font-semibold">{selectedJob.description}</p>
            </div>

          </div>

          {/* Footer with CTA */}
          <div className="p-6 border-t border-slate-100 flex gap-3">
            <button 
              onClick={() => setSelectedJob(null)}
              className="grow py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                alert("Simulating application... Redirecting to credentials onboarding setup.");
                window.location.href = "/onboarding";
              }}
              className="grow py-2.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-bold rounded-lg shadow-sm uppercase tracking-wider transition-colors text-center"
            >
              Apply Now
            </button>
          </div>

        </div>
      )}

      {/* Solid green Hummingbird Footer bar */}
      <footer className="bg-[#007A5E] text-white/95 py-3.5 text-center text-[10px] font-bold border-t border-[#005E48] mt-auto">
        © Copyright 2026 Hummingbird Solutions INC. All Rights Reserved.
      </footer>
    </main>
  );
}
