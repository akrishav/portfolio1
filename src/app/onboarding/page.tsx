"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";
import Logo from "@/components/Logo";
import { useOnboarding } from "@/components/OnboardingState";
import { 
  Lock, Mail, KeyRound, CheckCircle2, AlertTriangle, Send, 
  UploadCloud, FileText, Check, ArrowRight, User, Clock, 
  Bell, File, CheckCircle, ShieldAlert, AlertCircle, Layout, 
  Settings, HelpCircle, LogOut, ChevronRight, MessageSquare, Inbox, DollarSign
} from "lucide-react";

export default function OnboardingPage() {
  const { 
    candidates, 
    messages, 
    notifications, 
    loggedInUser, 
    login, 
    logout, 
    sendCandidateMessage, 
    uploadDocument 
  } = useOnboarding();

  // Login Form States
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Menu active state: overview | documents | messages | emails | costs | settings | help
  const [activeMenu, setActiveMenu] = useState<"overview" | "documents" | "messages" | "emails" | "costs" | "settings" | "help">("overview");

  // Mobile / Tablet Tab switching state (Active panel when not on full 3-column desktop)
  const [mobileActiveTab, setMobileActiveTab] = useState<"overview" | "documents" | "chat">("overview");

  // Dashboard UI States
  const [chatMessage, setChatMessage] = useState("");
  
  // Document uploading modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTargetStep, setUploadTargetStep] = useState<number>(3);
  const [uploadFileName, setUploadFileName] = useState("Nursing_License_Marcus.pdf");
  const [uploading, setUploading] = useState(false);

  const candidate = candidates.find(
    (c) => c.email.toLowerCase() === loggedInUser?.email?.toLowerCase()
  ) || candidates[0];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setOtpSent(true);
    setLoginError("");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    const emailToUse = email ? email : "candidate@healthcare.com";
    const success = login(emailToUse, "candidate");
    if (success) {
      setLoginError("");
      setOtpSent(false);
      setOtpCode("");
    } else {
      setLoginError("Invalid verification code.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !candidate) return;
    sendCandidateMessage(candidate.id, chatMessage.trim(), "candidate");
    setChatMessage("");
  };

  const triggerUploadFile = (stepNumber: number, defaultName: string) => {
    setUploadTargetStep(stepNumber);
    setUploadFileName(defaultName);
    setShowUploadModal(true);
  };

  const handleUploadSubmit = () => {
    if (!candidate) return;
    setUploading(true);
    setTimeout(() => {
      uploadDocument(candidate.id, uploadTargetStep, uploadFileName, "1.6 MB");
      setUploading(false);
      setShowUploadModal(false);
    }, 1000);
  };

  // Messages for this candidate
  const candidateMessages = messages.filter((m) => m.candidateId === candidate?.id);

  // Filter emails for candidate
  const candidateEmails = notifications.filter(
    (n) => n.candidateId === candidate?.id && n.channel === "email"
  );

  // If not logged in, render Image 2 OTP Login
  if (!loggedInUser || loggedInUser.role !== "candidate" || !candidate) {
    return (
      <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
        <DemoNavbar />

        {/* Header matching Image 2 */}
        <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Logo />

            <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
              <Link href="/" className="hover:text-[#0052CC]">Find Jobs</Link>
              <a href="#" className="text-[#0052CC]">Dashboard</a>
              <a href="#" className="hover:text-[#0052CC]">Support</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => {
                  setEmail("candidate@healthcare.com");
                  setOtpSent(true);
                }}
                className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-md transition-all shadow-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>

        {/* OTP Card matching Image 2 */}
        <div className="grow flex items-center justify-center px-4 py-16 relative z-10">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-10 shadow-lg text-center">
            
            {/* Header Image/Icon representing Shield check document */}
            <div className="flex justify-center mb-6">
              <div className="h-20 w-24 bg-[#EBF3FC] border border-[#DEEAF7] rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#0052CC]/10 rounded-full"></div>
                <div className="h-10 w-8 bg-[#0052CC]/15 border border-[#0052CC]/30 rounded flex flex-col justify-center items-center">
                  <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                  <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                  <Check className="h-3 w-3 text-[#0052CC] font-bold mt-1" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Track Your Journey</h2>
            <p className="text-xs text-slate-500 mt-3 max-w-xs mx-auto leading-relaxed font-medium">
              Enter your email to access your personalized candidate dashboard and track your onboarding progress.
            </p>

            {loginError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-650 rounded-lg text-xs text-left">
                {loginError}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="mt-8 text-left space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Enter Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., candidate@healthcare.com"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors text-sm pl-11"
                    />
                    <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2 font-medium">
                    We'll send a 6-digit security code to this address.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  Send OTP
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-8 text-left space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Enter Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs font-bold text-[#0052CC] hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors text-sm pl-11 text-center tracking-widest font-mono font-bold"
                    />
                    <KeyRound className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-2 text-center font-medium">
                    Enter <strong className="text-slate-700">123456</strong> (or any code) to sign in.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Verify & Log In
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Evaluation & testing presets</span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/recruiter?role=recruiter"
                  className="py-2.5 px-3 bg-[#EBF3FC] hover:bg-[#DEEAF7] text-[#0052CC] text-[10.5px] font-bold rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1 border border-[#DEE7F3]"
                >
                  💼 Recruiter View
                </Link>
                <Link
                  href="/recruiter?role=onboarder"
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#007A5E] text-[10.5px] font-bold rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1 border border-emerald-100"
                >
                  🛡️ On-boarder View
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs font-bold text-[#0052CC] hover:underline">
                Go back to Search Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* HIPAA Compliant footer */}
        <div className="bg-transparent py-8 text-center text-[10px] text-slate-400 font-medium z-10">
          <div className="flex justify-center items-center gap-6 mb-3">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle className="h-3.5 w-3.5 text-slate-400" />
              Secure Portal
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 font-semibold">
              <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
              HIPAA Compliant
            </span>
          </div>
          <div>
            © 2024 StaffHC Healthcare Staffing. All rights reserved.
          </div>
        </div>
      </main>
    );
  }

  if (!candidate) {
    return (
      <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
        <DemoNavbar />
        <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
              <Link href="/jobs" className="hover:text-[#0052CC]">Find Jobs</Link>
              <a href="#" className="hover:text-[#0052CC]">Dashboard</a>
              <a href="#" className="text-[#0052CC]">Onboard</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="grow flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 p-10 rounded-2xl shadow-sm text-center max-w-lg w-full">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">You haven't applied to any jobs yet</h2>
            <p className="text-slate-500 text-sm mb-8">Discover verified nursing opportunities and start your compliance journey.</p>
            <Link 
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0052CC] hover:bg-[#0042A3] text-white font-bold rounded-xl shadow-sm transition-all text-sm"
            >
              Find Jobs
            </Link>
          </div>
        </div>

        <div className="bg-transparent py-8 text-center text-[10px] text-slate-400 font-medium z-10">
          © 2026 StaffHC Inc. All rights reserved.
        </div>
      </main>
    );
  }

  // Candidate Dashboard Layout from Image 3
  return (
    <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
      {/* Demo navigation helper */}
      <DemoNavbar />

      {/* Corporate Dashboard Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
            <a href="#" className="hover:text-[#0052CC] transition-colors">Find Jobs</a>
            <a href="#" className="text-[#0052CC] transition-colors border-b-2 border-[#0052CC] pb-5 mt-5">Dashboard</a>
            <a href="#" className="hover:text-[#0052CC] transition-colors">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-4.5 w-4.5" />
            </button>
            {/* User Avatar Circle */}
            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet tab switcher for responsive visibility */}
      <div className="lg:hidden bg-white border-b border-slate-200 flex justify-around py-3 text-xs font-bold text-slate-500">
        <button 
          onClick={() => { setActiveMenu("overview"); setMobileActiveTab("overview"); }}
          className={`pb-1 px-3 ${activeMenu === "overview" ? "text-[#0052CC] border-b-2 border-[#0052CC]" : ""}`}
        >
          Overview
        </button>
        <button 
          onClick={() => { setActiveMenu("documents"); setMobileActiveTab("documents"); }}
          className={`pb-1 px-3 ${activeMenu === "documents" ? "text-[#0052CC] border-b-2 border-[#0052CC]" : ""}`}
        >
          Documents
        </button>
        <button 
          onClick={() => { setActiveMenu("emails"); }}
          className={`pb-1 px-3 ${activeMenu === "emails" ? "text-[#0052CC] border-b-2 border-[#0052CC]" : ""}`}
        >
          Emails ({candidateEmails.length})
        </button>
        <button 
          onClick={() => { setActiveMenu("costs"); }}
          className={`pb-1 px-3 ${activeMenu === "costs" ? "text-[#0052CC] border-b-2 border-[#0052CC]" : ""}`}
        >
          Costs
        </button>
        <button 
          onClick={() => { setActiveMenu("messages"); setMobileActiveTab("chat"); }}
          className={`pb-1 px-3 ${activeMenu === "messages" ? "text-[#0052CC] border-b-2 border-[#0052CC]" : ""}`}
        >
          Recruiter Chat
        </button>
      </div>

      {/* Main dashboard content area split into sidebar, middle, and right columns */}
      <div className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* COLUMN 1: LEFT SIDEBAR (Always visible on large screens) */}
        <aside className="w-full lg:w-60 bg-white border border-slate-200 rounded-2xl p-6 lg:flex flex-col h-[560px] shadow-sm justify-between shrink-0 hidden">
          <div className="space-y-6">
            <div className="px-3">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                StaffHC
              </span>
              <span className="text-xs font-semibold text-slate-550 block -mt-0.5">
                Candidate Portal
              </span>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveMenu("overview")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "overview"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <Layout className="h-4.5 w-4.5" />
                Overview
              </button>
              <button
                onClick={() => setActiveMenu("documents")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "documents"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <FileText className="h-4.5 w-4.5" />
                Documents
              </button>
              <button
                onClick={() => setActiveMenu("emails")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "emails"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <Inbox className="h-4.5 w-4.5" />
                <span>Emails</span>
                {candidateEmails.length > 0 && (
                  <span className="ml-auto bg-[#0052CC] text-white font-bold rounded-full text-[9px] w-4.5 h-4.5 flex items-center justify-center">
                    {candidateEmails.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveMenu("costs")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "costs"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <DollarSign className="h-4.5 w-4.5" />
                <span>Costs</span>
              </button>
              <button
                onClick={() => setActiveMenu("messages")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "messages"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <Send className="h-4.5 w-4.5" />
                Recruiter Chat
              </button>
              <button
                onClick={() => setActiveMenu("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "settings"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <Settings className="h-4.5 w-4.5" />
                Settings
              </button>
              <button
                onClick={() => setActiveMenu("help")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeMenu === "help"
                    ? "bg-[#EBF3FC] text-[#0052CC]"
                    : "text-slate-500 hover:bg-slate-55 hover:text-slate-800"
                }`}
              >
                <HelpCircle className="h-4.5 w-4.5" />
                Help
              </button>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <button 
              onClick={() => alert("Simulating viewing profile details...")}
              className="w-full py-2.5 bg-[#002677] hover:bg-[#001D5B] text-white text-xs font-bold rounded-lg transition-all"
            >
              View Profile
            </button>
            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* COLUMN 2: MIDDLE CONTENT OR OTHER ACTIVE MENUS */}
        <section className="flex-1 space-y-6 w-full text-left">
          
          {/* Menu Panel 1: OVERVIEW (Standard candidate dashboard, Image 3) */}
          {activeMenu === "overview" && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  Welcome back, {candidate.name}
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Track your onboarding and complete missing tasks to get placed faster.
                </p>
              </div>

              {/* ONBOARDING STATUS TIMELINE CARD */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Onboarding Status</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-1">
                      You are currently at <span className="text-[#0052CC]">Step {candidate.currentStep}: {candidate.onboardingSteps[candidate.currentStep - 1].name}</span>.
                    </p>
                  </div>

                  {/* Pink action required banner inside Card header */}
                  {candidate.stepStatus === "stuck" && (
                    <div className="bg-[#FFF0F0] border border-[#FFD5D5] px-3 py-1 rounded text-[10.5px] text-[#C53030] flex items-center gap-1.5 font-bold">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      Action required: Upload Nursing License
                    </div>
                  )}
                </div>

                {/* Horizontal Timeline */}
                <div className="relative pt-6 pb-2">
                  {/* Connected background bar line (Horizontal center of circles) */}
                  <div className="absolute top-[32px] left-[6%] right-[6%] h-[3px] bg-slate-100 -z-0"></div>
                  {/* Connected blue progress bar line */}
                  <div 
                    className="absolute top-[32px] left-[6%] h-[3px] bg-[#0052CC] -z-0 transition-all duration-300"
                    style={{
                      width: `${((candidate.onboardingSteps.filter(s => s.status === "completed").length - 0.5) / 6) * 88}%`
                    }}
                  ></div>

                  <div className="flex justify-between items-start relative z-10">
                    {candidate.onboardingSteps.map((step) => {
                      const isDone = step.status === "completed";
                      const isActive = step.number === candidate.currentStep;

                      return (
                        <div key={step.number} className="flex flex-col items-center text-center w-[12%]">
                          {/* Circle Node */}
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                            isDone 
                              ? "bg-[#0052CC] border-[#0052CC] text-white shadow shadow-indigo-500/10" 
                              : isActive
                              ? "bg-white border-2 border-[#0052CC] text-[#0052CC] ring-4 ring-[#0052CC]/15"
                              : "bg-slate-100 border-slate-200 text-slate-400"
                          }`}>
                            {isDone ? (
                              <Check className="h-4 w-4 stroke-[3px]" />
                            ) : step.number === 7 ? (
                              <span className="text-[10px]">🏁</span>
                            ) : (
                              step.number
                            )}
                          </div>
                          
                          {/* Step Name */}
                          <span className={`text-[10.5px] mt-2.5 font-bold block truncate max-w-full ${
                            isActive ? "text-[#0052CC] font-extrabold" : "text-slate-450"
                          }`}>
                            {step.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* REQUIRED DOCUMENTS LIST CARD */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 text-sm">Required Documents</h3>
                  <span className="bg-[#EBF3FC] text-[#0052CC] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                    {candidate.onboardingSteps.filter(s => s.status !== "completed" && s.number <= 3).length} Pending
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {/* Row 1 */}
                  <div className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0 border border-red-100">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Professional Nursing License</h4>
                        <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium">Missing or expired license file.</p>
                      </div>
                    </div>
                    <div>
                      {candidate.onboardingSteps[2].status === "completed" ? (
                        <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : candidate.onboardingSteps[2].status === "in_progress" ? (
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded">Awaiting Review</span>
                      ) : (
                        <button 
                          onClick={() => triggerUploadFile(3, "Nursing_License_Marcus.pdf")}
                          className="px-4 py-1.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-[#EBF3FC] text-[#0052CC] rounded-lg flex items-center justify-center shrink-0 border border-[#DEEAF7]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Immunization Records</h4>
                        <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium">Update required for Hep B series.</p>
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={() => triggerUploadFile(3, "Immunization_Records_Marcus.pdf")}
                        className="px-4 py-1.5 bg-[#EBF3FC] hover:bg-[#DEEAF7] text-[#0052CC] text-xs font-bold rounded-lg transition-all"
                      >
                        Review
                      </button>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-50 text-slate-455 rounded-lg flex items-center justify-center shrink-0 border border-slate-100">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-850">Background Check Consent</h4>
                        <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium">Completed on Oct 24, 2023</p>
                      </div>
                    </div>
                    <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PROFILE COMPLETION CTA CARD */}
              <div className="bg-[#0052CC] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-5"></div>

                <div className="max-w-md relative z-10 space-y-2">
                  <h4 className="text-sm font-extrabold">Your Candidate Profile is 75% complete.</h4>
                  <p className="text-[11px] text-slate-100 leading-relaxed font-semibold">
                    Adding your specialty preferences helps us match you with the right high-paying assignments in your area.
                  </p>
                  <button 
                    onClick={() => alert("Simulating finishing profile...")}
                    className="mt-3 px-4 py-2 bg-white text-[#0052CC] hover:bg-slate-50 text-xs font-bold rounded-lg transition-all"
                  >
                    Finish Profile
                  </button>
                </div>
                
                <div className="aspect-[4/3] w-36 rounded-xl overflow-hidden shadow-inner border border-white/20 shrink-0 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&auto=format&fit=crop" 
                    alt="Workspace laptop" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Menu Panel 2: DOCUMENTS */}
          {activeMenu === "documents" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Required Onboarding Credentials</h3>
              <p className="text-xs text-slate-400 font-medium">Below is a checklist of all regulatory compliance documents required for your placement.</p>
              
              <div className="divide-y divide-slate-150 text-xs font-medium space-y-3">
                {candidate.onboardingSteps.map((step) => (
                  <div key={step.number} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold block text-slate-800">Step {step.number}: {step.name}</span>
                      <span className="text-[10px] text-slate-400">{step.description}</span>
                    </div>
                    <div>
                      {step.status === "completed" ? (
                        <span className="text-emerald-500 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Completed</span>
                      ) : (
                        <button 
                          onClick={() => triggerUploadFile(step.number, `${step.name.replace(/\s+/g, "_")}_doc.pdf`)}
                          className="px-3 py-1 bg-[#0052CC] text-white rounded font-bold"
                        >
                          Upload File
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Panel 3: EMAIL COMMUNICATIONS (NEW TAB FOR COMMUNICATION RECORDS) */}
          {activeMenu === "emails" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="font-bold text-[#162f55] text-sm flex items-center gap-2">
                  <Inbox className="h-4.5 w-4.5 text-[#0052CC]" />
                  Email Communications Ledger
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">
                  A history of all automated system messages, credential updates, and recruiter notifications sent to <strong className="text-slate-600">{candidate.email}</strong>.
                </p>
              </div>

              {candidateEmails.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  <Inbox className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-xs text-slate-550 font-bold">No email communications logged yet.</p>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                    Reminders sent by the recruiter or compliance triggers will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidateEmails.map((email) => (
                    <div 
                      key={email.id} 
                      className="border border-slate-200/80 rounded-xl overflow-hidden hover:border-[#0052CC]/35 transition-all bg-slate-50/20"
                    >
                      <div className="bg-slate-50 border-b border-slate-100 p-3 flex justify-between items-center text-[10.5px] font-bold">
                        <div className="space-y-0.5">
                          <span className="text-slate-700 block">Subject: {email.subject}</span>
                          <span className="text-[9.5px] text-slate-400 block font-semibold">From: StaffHC Credentials Team &lt;credentials@staffhc.com&gt;</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold">{email.timestamp}</span>
                      </div>
                      <div className="p-3.5 text-xs text-slate-600 bg-white font-mono leading-relaxed whitespace-pre-wrap">
                        {email.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Menu Panel 4: MESSAGES (Chat box responsive fallback) */}
          {activeMenu === "messages" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col h-[480px] justify-between">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-655">
                  M
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Mani</h4>
                  <span className="text-[10px] text-slate-400 font-bold block">Online • Your Recruiter</span>
                </div>
              </div>

              <div className="grow overflow-y-auto py-3 space-y-3 no-scrollbar text-xs flex flex-col">
                {candidateMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "recruiter" ? "self-start" : "self-end items-end"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl leading-relaxed text-left ${
                      msg.sender === "recruiter"
                        ? "bg-[#F0F4FA] text-slate-850 rounded-tl-none border border-[#E1EAF5]"
                        : "bg-[#0052CC] text-white rounded-tr-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-slate-450 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-3 flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0052CC]"
                />
                <button type="submit" className="p-2 bg-[#0052CC] text-white rounded-lg"><Send className="h-3.5 w-3.5" /></button>
              </form>
            </div>
          )}

          {/* Menu Panel 5: COST TRANSPARENCY */}
          {activeMenu === "costs" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-left">
              <div>
                <h3 className="font-bold text-[#162f55] text-sm flex items-center gap-2">
                  <DollarSign className="h-4.5 w-4.5 text-[#0052CC]" />
                  Onboarding Transaction Costs Ledger
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">
                  A transparent breakdown of all verification, screening, and diagnostic costs incurred during your compliance onboarding.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs bg-white">
                <div className="p-4 flex justify-between font-semibold">
                  <span className="text-slate-500">Aya Background Screening Fee</span>
                  <span className="text-slate-800 font-bold">$45.00</span>
                </div>
                <div className="p-4 flex justify-between font-semibold">
                  <span className="text-slate-550">10-Panel Drug Screen Diagnostic Voucher</span>
                  <span className="text-slate-800 font-bold">$35.00</span>
                </div>
                <div className="p-4 flex justify-between font-semibold">
                  <span className="text-slate-555">E-Verify Processing Surcharge</span>
                  <span className="text-slate-800 font-bold">$10.00</span>
                </div>
                <div className="p-4 flex justify-between font-semibold">
                  <span className="text-slate-555">Credential Verification & Certifications checks</span>
                  <span className="text-slate-800 font-bold">$25.00</span>
                </div>
                <div className="p-4 bg-slate-50 flex justify-between font-extrabold text-sm border-t border-slate-250">
                  <span className="text-slate-800">Total Onboarding Placement Cost</span>
                  <span className="text-[#007A5E] font-black">$115.00</span>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                <div className="h-9 w-9 bg-emerald-50 text-[#007A5E] border border-emerald-100 rounded-full flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-semibold text-slate-650">
                  <span className="font-bold text-slate-700 block">Fully Covered by CDK Global</span>
                  All screening expenses are paid directly by the employer placement partner. No candidate payment is required.
                </div>
              </div>
            </div>
          )}

          {/* Menu Panel 6: SETTINGS & HELP */}
          {(activeMenu === "settings" || activeMenu === "help") && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center py-16">
              <Settings className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-xs text-slate-500 font-bold">Menu item simulated.</p>
              <p className="text-[10px] text-slate-400 mt-1">This section is not required in the active ERP onboarding prototype scope.</p>
            </div>
          )}

        </section>

        {/* COLUMN 3: RIGHT SIDEBAR (Chat and updates - Hidden if looking at messages/emails tab on mobile) */}
        <aside className="w-full lg:w-80 space-y-6 shrink-0 hidden xl:block">
          
          {/* Recruiter Chat box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col h-[360px] justify-between">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                    alt="Mani" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-800">Mani</h4>
                <span className="text-[10px] text-slate-400 font-bold block">Online • Your Recruiter</span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="grow overflow-y-auto py-3 space-y-3 no-scrollbar text-xs flex flex-col">
              {candidateMessages.map((msg) => {
                const isRecruiter = msg.sender === "recruiter";
                const isSystem = msg.sender === "system";

                if (isSystem) {
                  return (
                    <div key={msg.id} className="text-center py-0.5">
                      <span className="inline-block px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] text-slate-400 font-mono">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      isRecruiter ? "self-start" : "self-end items-end"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl leading-relaxed text-left ${
                      isRecruiter
                        ? "bg-[#F0F4FA] text-slate-855 rounded-tl-none border border-[#E1EAF5]"
                        : "bg-[#0052CC] text-white rounded-tr-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-slate-450 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Input box */}
            <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-3 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0052CC]"
              />
              <button
                type="submit"
                className="p-2 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg transition-all shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Recent Updates Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-455 text-left">
              Recent Updates
            </h4>

            <div className="space-y-4 text-left">
              {/* Update 1 */}
              <div className="relative pl-4 border-l border-indigo-200">
                <span className="absolute left-[-4.5px] top-[4px] h-2 w-2 rounded-full bg-[#0052CC]"></span>
                <h5 className="text-[11.5px] font-bold text-slate-800">Screening Step Completed</h5>
                <p className="text-[10.5px] text-slate-455 mt-0.5 leading-relaxed font-semibold">
                  Your initial screening was approved by clinical staff.
                </p>
                <span className="text-[9px] text-slate-450 block mt-1">2 hours ago</span>
              </div>

              {/* Update 2 */}
              <div className="relative pl-4 border-l border-indigo-200">
                <span className="absolute left-[-4.5px] top-[4px] h-2 w-2 rounded-full bg-[#0052CC]"></span>
                <h5 className="text-[11.5px] font-bold text-slate-800">New Travel Job Match</h5>
                <p className="text-[10.5px] text-slate-455 mt-0.5 leading-relaxed font-semibold">
                  ICU Nurse needed in Austin, TX. $4,200/wk.
                </p>
                <span className="text-[9px] text-slate-455 block mt-1">Yesterday</span>
              </div>

              {/* Update 3 */}
              <div className="relative pl-4 border-l border-indigo-200">
                <span className="absolute left-[-4.5px] top-[4px] h-2 w-2 rounded-full bg-slate-300"></span>
                <h5 className="text-[11.5px] font-bold text-slate-800">System Maintenance</h5>
                <p className="text-[10.5px] text-slate-455 mt-0.5 leading-relaxed font-semibold">
                  The portal will be down for 1 hour on Sunday.
                </p>
                <span className="text-[9px] text-slate-455 block mt-1">Oct 28</span>
              </div>
            </div>

            <div className="pt-2">
              <a href="#" className="text-xs font-bold text-[#0052CC] hover:underline block text-center">
                View All Notifications
              </a>
            </div>
          </div>

        </aside>
      </div>

      {/* Simulated Upload modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Simulate Document Upload</h3>
              <p className="text-xs text-slate-400 mt-1">Select a mock document for credential approval.</p>
            </div>
            
            <div className="space-y-3 text-xs text-left">
              <label className="block font-bold text-slate-700">File Name</label>
              <input
                type="text"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-205 rounded-lg text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <div className="flex gap-3 justify-end text-xs">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={uploading}
                className="px-4 py-2 bg-[#0052CC] hover:bg-[#0042A3] disabled:bg-slate-400 text-white rounded-lg font-bold transition-all"
              >
                {uploading ? "Uploading..." : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-55 border-t border-slate-200 shrink-0 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-455 font-medium">
          <div>
            © 2024 StaffHC Healthcare Staffing. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Contact Us</a>
            <a href="#" className="hover:text-slate-600">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
