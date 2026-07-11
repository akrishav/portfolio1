"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";
import Logo from "@/components/Logo";
import { useOnboarding, Candidate, ERPDocument } from "@/components/OnboardingState";
import { 
  Users, AlertCircle, CheckCircle2, ShieldAlert, Send, FileText, 
  Smartphone, Mail, Check, RefreshCw, MessageSquare, ArrowRight, 
  Settings, Clock, Bell, Filter, Award, ChevronRight, Search, 
  Plus, Edit2, Download, Eye, ArrowLeft, Calendar, LayoutGrid, 
  Building2, ShieldCheck, DollarSign, HelpCircle, HardDrive, ListCollapse, X, ChevronDown
} from "lucide-react";

export default function RecruiterDashboard() {
  const { 
    candidates, 
    messages, 
    notifications, 
    loggedInUser, 
    selectedCandidateId, 
    login, 
    logout, 
    setSelectedCandidateId, 
    sendCandidateMessage, 
    resolveERPDocument, 
    resolveERPPlacement, 
    triggerReminder 
  } = useOnboarding();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role");
      if (roleParam === "onboarder") {
        setCurrentRole("onboarder");
        logout(); // Force login screen
      } else if (roleParam === "recruiter") {
        setCurrentRole("recruiter");
        logout(); // Force login screen
      }
    }
  }, []);

  // Login form state
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Role perspective switcher: recruiter | onboarder
  const [currentRole, setCurrentRole] = useState<"recruiter" | "onboarder">("recruiter");

  // Left sidebar navigation view state
  const [currentView, setCurrentView] = useState<"dashboard" | "candidates" | "matrix" | "agencies">("candidates");

  // Inspector Panel Navigation: dashboard | summary | documents | chat | emails | costs
  const [inspectorTab, setInspectorTab] = useState<"dashboard" | "summary" | "documents" | "chat" | "emails" | "costs">("dashboard");

  // Chat message state
  const [replyMessage, setReplyMessage] = useState("");
  
  // Notification Drawer
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [selectedEmailLog, setSelectedEmailLog] = useState<any>(null);

  // Agency search query
  const [agencySearch, setAgencySearch] = useState("");
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Allow recruiter login
    const success = login(email, "recruiter");
    if (success) {
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Enter 'recruiter@staffhc.com' or 'admin'.");
    }
  };

  const handleSendReply = (e: React.FormEvent, candidateId: string) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    sendCandidateMessage(candidateId, replyMessage.trim(), "recruiter");
    setReplyMessage("");
  };

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter((cand) =>
    cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cand.candidateNo.toString().includes(searchQuery) ||
    cand.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Verification Agencies database (Slide 1)
  const [agencies] = useState([
    { name: "Labcorp", type: "EC, BG, CC", website: "www.labcorp.com", state: "Massachusetts", modifiedBy: "Mani", modifiedOn: "Apr 17, 2026" },
    { name: "KPPS", type: "BG", website: "—", state: "Daman & Diu", modifiedBy: "Matthew Moore", modifiedOn: "Apr 17, 2026" },
    { name: "Gemini", type: "EC, BG", website: "https://acme.example.com", state: "Jervis Bay Territory", modifiedBy: "Matthew Moore", modifiedOn: "Apr 17, 2026" },
    { name: "Acme Verification 1", type: "DC, BG", website: "https://acme.example.com", state: "Utah", modifiedBy: "Matthew Moore", modifiedOn: "Apr 17, 2026" },
    { name: "TransXPert", type: "EC, BG, CC", website: "https://transxpert.example.com", state: "Punjab", modifiedBy: "Manjeet Kumar", modifiedOn: "Apr 17, 2026" },
    { name: "Test Agency", type: "BG, CC", website: "www.test.com", state: "Florida", modifiedBy: "Matthew Moore", modifiedOn: "Apr 10, 2026" },
    { name: "Rupa Labs", type: "CC", website: "rupa@gmail.com", state: "Idaho", modifiedBy: "Jacob Callahan", modifiedOn: "Apr 9, 2026" },
    { name: "Ruthuraj Health", type: "EC, BG, CC", website: "ruthu@gmail.com", state: "Arunachal Pradesh", modifiedBy: "Jacob Callahan", modifiedOn: "Apr 9, 2026" },
    { name: "RV Agency LLC", type: "BG, CC", website: "www.testing.com", state: "California", modifiedBy: "Manjeet Kumar", modifiedOn: "Apr 9, 2026" }
  ]);

  const filteredAgencies = agencies.filter(a =>
    a.name.toLowerCase().includes(agencySearch.toLowerCase()) ||
    a.state.toLowerCase().includes(agencySearch.toLowerCase())
  );

  const mockEmailLogs = [
    { 
      id: 1, 
      step: "Step 1: Account setup", 
      subject: "Welcome to StaffHC Portal - Action Required", 
      date: "Jul 05, 2026", 
      status: "Delivered", 
      details: "Candidate verified email login successfully",
      body: `From: credentials@staffhc.com\nTo: mani@staffhc.com\n\nHi Mani,\n\nWelcome to StaffHC! Your candidate onboarding profile is ready. Please click the link below to verify your account and initialize your compliance check list.\n\nVerification Link: https://classy-malasada-57bdc6.netlify.app/onboarding\n\nThanks,\nStaffHC Credentials Team`
    },
    { 
      id: 2, 
      step: "Step 2: E-Verify", 
      subject: "E-Verification document confirmation", 
      date: "Jul 06, 2026", 
      status: "Delivered", 
      details: "Document accepted by E-Verify system",
      body: `From: credentials@staffhc.com\nTo: mani@staffhc.com\n\nDear Mani,\n\nYour Form I-9 and supporting documents have been successfully processed through the federal E-Verify system. The system returned status: AUTHORIZED.\n\nNo further E-Verify action is required at this stage.\n\nBest,\nStaffHC E-Verify Coordinator`
    },
    { 
      id: 3, 
      step: "Step 3: Purchase Order", 
      subject: "Review placement purchase order contract", 
      date: "Jul 07, 2026", 
      status: "Opened", 
      details: "Opened 3 times by candidate Mani",
      body: `From: contracts@staffhc.com\nTo: mani@staffhc.com\n\nHi Mani,\n\nWe have dispatched your placement Purchase Order contract for CDK Global placement starting Jul 09, 2026.\n\nPlease review and execute the signature block in your dashboard tab.\n\nThank you,\nStaffHC Operations`
    },
    { 
      id: 4, 
      step: "Step 5: Drug Check", 
      subject: "URGENT: Drug testing center voucher registration", 
      date: "Jul 08, 2026", 
      status: "Bounced", 
      stopReason: "Invalid mailbox size / inactive mailbox", 
      details: "Warning: Email stopped. Retrying via SMS alerts.",
      body: `From: testing-services@staffhc.com\nTo: mani@staffhc.com\n\nURGENT NOTICE:\n\nYour drug check screening voucher is ready for download. Please register with your nearest lab within 48 hours to complete the test.\n\n[DELIVERY WARNING: Mailbox quota exceeded. Message bounced. Retrying contact dispatch via SMS alerts]`
    },
    { 
      id: 5, 
      step: "Step 3: Credentialing", 
      subject: "RE: Professional Nursing License submission question", 
      date: "Jul 09, 2026", 
      status: "Synced from Outlook", 
      details: "Incoming email reply sent from Mani's personal Outlook: 'I am having trouble uploading the state registration PDF, is a scanned copy fine?' [Auto-captured & Synced]",
      body: `From: mani@staffhc.com (via Outlook Sync)\nTo: alex@staffhc.com\n\nAlex,\n\nI am having trouble uploading the state registration PDF for the Nursing License check. Is a scanned copy from my phone camera fine, or does it have to be an official digital PDF from the state board registry?\n\nLet me know,\nMani`
    },
    { 
      id: 6, 
      step: "Step 1: Onboarding", 
      subject: "RE: Welcome to StaffHC Portal - Action Required", 
      date: "Jul 06, 2026", 
      status: "Synced from Gmail", 
      details: "Incoming email reply sent from Mani's personal Gmail (mani@staffhc.com): 'Confirming my profile account setup is complete. Thanks!' [Auto-captured & Synced]",
      body: `From: mani@staffhc.com (via Gmail Sync)\nTo: alex@staffhc.com\n\nHi Alex,\n\nConfirming my profile account setup is complete and I've verified the OTP code. Everything looks great so far!\n\nThanks,\nMani`
    }
  ];

  useEffect(() => {
    if (inspectorTab === "emails" && mockEmailLogs.length > 0) {
      setSelectedEmailLog(mockEmailLogs[0]);
    }
  }, [inspectorTab, selectedCandidateId]);

  // If not logged in, show clean corporate recruiter login form
  if (!loggedInUser || loggedInUser.role !== "recruiter") {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center font-sans antialiased p-6">
        <DemoNavbar />

        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-10 shadow-lg relative text-center space-y-6">

          {/* Header Image/Icon representing Shield check document */}
          <div className="flex justify-center mb-4">
            <div className="h-20 w-24 bg-[#EBF3FC] border border-[#DEEAF7] rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#0052CC]/10 rounded-full"></div>
              <div className="h-10 w-8 bg-[#0052CC]/15 border border-[#0052CC]/30 rounded flex flex-col justify-center items-center">
                <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                <div className="w-4 h-0.5 bg-[#0052CC]/45 my-0.5 rounded"></div>
                <Check className="h-3 w-3 text-[#0052CC] font-bold mt-1" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">StaffHC Onboarding</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-medium">
              Enter your coordinator credentials to access compliance dashboards.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recruiter@staffhc.com or admin"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors text-sm pl-11"
                />
                <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
              <span className="text-[10px] text-slate-400 block mt-2 font-medium">
                Enter <strong className="text-slate-700">recruiter@staffhc.com</strong> or <strong className="text-slate-700">admin</strong> to sign in.
              </span>
            </div>

            {loginError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-650 rounded-lg text-xs text-left">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs font-bold text-[#0052CC] hover:underline">
              &larr; Back to Public Landing Page
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Active candidate object helper
  const activeCandidate = candidates.find((c) => c.id === selectedCandidateId);

  return (
    <main className="min-h-screen bg-[#F4F6FC] text-[#1E293B] flex flex-col font-sans antialiased">
      <DemoNavbar />

      {/* Corporate Dashboard Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shrink-0 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand header logo */}
          <div className="flex items-center gap-3">
            <img
              src="/hummingbird-logo.png"
              alt="Hummingbird Logo"
              className="h-6.5 object-contain select-none pointer-events-none"
            />
            <span className="text-slate-350 font-normal text-lg">|</span>
            <span className="text-[#007A5E] font-bold text-sm tracking-wide">Onboarding</span>
          </div>

          {/* Right Profile settings */}
          <div className="flex items-center gap-3">
            
            {/* Notification system routing logs trigger - moved to side near profile */}
            <button 
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors relative"
              title="View Alert Log Routing"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                4
              </span>
            </button>

            {/* Grid menu icon */}
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>

            {/* User profile dropdown matching screen */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pl-2 pr-3.5 py-1 shadow-3xs cursor-pointer group hover:bg-slate-50 transition-colors">
              <div className="h-7 w-7 rounded-full bg-[#007A5E] text-white font-extrabold flex items-center justify-center text-xs">
                A
              </div>
              <span className="text-xs font-bold text-slate-750 group-hover:text-slate-900 transition-colors flex items-center gap-1.5">
                Alex
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>

            <button
              onClick={logout}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex py-6 px-6 gap-6 min-h-[calc(100vh-4rem)]">
        
        {/* Left Vertical Menu bar (Slide 1/2 style sidebar menu) */}
        <aside className="w-16 bg-white border border-slate-200 rounded-2xl flex flex-col items-center py-6 gap-6 shadow-sm shrink-0">
          <button 
            onClick={() => { setSelectedCandidateId(null); setCurrentView("dashboard"); }}
            className={`p-2.5 rounded-xl transition-all ${
              currentView === "dashboard" && !selectedCandidateId
                ? "bg-emerald-50 text-[#007A5E] border border-emerald-100" 
                : "text-slate-400 hover:text-[#007A5E]"
            }`}
            title="Dashboard Overview"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          
          <button 
            onClick={() => { setSelectedCandidateId(null); setCurrentView("candidates"); }}
            className={`p-2.5 rounded-xl transition-all ${
              currentView === "candidates" && !selectedCandidateId
                ? "bg-emerald-50 text-[#007A5E] border border-emerald-100" 
                : "text-slate-400 hover:text-[#007A5E]"
            }`}
            title="Candidates Listing"
          >
            <Users className="h-5 w-5" />
          </button>

          <button 
            onClick={() => { setSelectedCandidateId(null); setCurrentView("matrix"); }}
            className={`p-2.5 rounded-xl transition-all ${
              currentView === "matrix" && !selectedCandidateId
                ? "bg-emerald-50 text-[#007A5E] border border-emerald-100" 
                : "text-slate-400 hover:text-[#007A5E]"
            }`}
            title="Onboarding Date Matrix"
          >
            <ListCollapse className="h-5 w-5" />
          </button>

          <button 
            onClick={() => { setSelectedCandidateId(null); setCurrentView("agencies"); }}
            className={`p-2.5 rounded-xl transition-all ${
              currentView === "agencies" && !selectedCandidateId
                ? "bg-emerald-50 text-[#007A5E] border border-emerald-100" 
                : "text-slate-400 hover:text-[#007A5E]"
            }`}
            title="Verification Agencies"
          >
            <ShieldCheck className="h-5 w-5" />
          </button>

          <div className="mt-auto border-t border-slate-105 pt-4 w-full flex justify-center">
            <button className="p-2.5 text-slate-400 hover:text-slate-650" title="System Settings">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </aside>

        {/* Center Workspace Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Active Candidate Inspector Overlay */}
          {activeCandidate ? (
            /* ========================================================================= */
            /* VIEW: DETAILED CANDIDATE INSPECTOR ("Review Onboarding Info")             */
            /* ========================================================================= */
            <div className="space-y-6 text-left">
              
              {/* Green Header Banner */}
              <div className="bg-[#007A5E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-200">
                    <button 
                      onClick={() => setSelectedCandidateId(null)}
                      className="hover:underline hover:text-white flex items-center gap-1"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Candidates
                    </button>
                    <span>&gt;</span>
                    <span className="text-white font-bold">{activeCandidate.name}</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Review Onboarding Info</h2>
                  <p className="text-xs text-emerald-100">Verify information and supporting documents for a compliant onboarding.</p>
                </div>
              </div>

              {/* Candidate Info Grid Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative space-y-6">
                
                {/* Header row with avatar and tags */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 bg-emerald-50 text-[#007A5E] border border-emerald-100 rounded-full flex items-center justify-center font-extrabold text-lg shadow-2xs">
                      {activeCandidate.name.substring(0,2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-extrabold text-slate-800">{activeCandidate.name}</span>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-[#007A5E] border border-emerald-100 rounded-full text-[9.5px] font-bold uppercase tracking-wider">
                          Active Onboarding
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                        Candidate #: {activeCandidate.candidateNo} • {activeCandidate.jobTitle}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => triggerReminder(activeCandidate.id, activeCandidate.currentStep, "candidate", "email")}
                      className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                    >
                      Trigger Reminder
                    </button>
                  </div>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actual Start Date</span>
                    <span className="font-bold text-slate-700 block">Jul 09, 2026</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scheduled Start Date</span>
                    <span className="font-bold text-slate-700 block">Jul 09, 2026</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scheduled End Date</span>
                    <span className="font-bold text-slate-700 block">Nov 27, 2026</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Onboarding Owner</span>
                    <span className="font-bold text-[#0052CC] block">Arun Chikkaveerappa</span>
                  </div>
                </div>
              </div>

              {/* Tabbed Nav (Dashboard, Summary, All Documents, Email Tracking, Costs) */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex gap-4 overflow-x-auto no-scrollbar">
                  <button 
                    onClick={() => setInspectorTab("dashboard")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "dashboard" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => setInspectorTab("summary")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "summary" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Summary
                  </button>
                  <button 
                    onClick={() => setInspectorTab("documents")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "documents" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    All Documents
                  </button>
                  <button 
                    onClick={() => setInspectorTab("chat")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "chat" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Recruiter Chat
                  </button>
                  <button 
                    onClick={() => setInspectorTab("emails")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "emails" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Email Tracking (Outlook)
                  </button>
                  <button 
                    onClick={() => setInspectorTab("costs")}
                    className={`pb-1 text-xs font-bold uppercase transition-all ${
                      inspectorTab === "costs" ? "text-[#007A5E] border-b-2 border-[#007A5E] font-black" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Cost Transparency
                  </button>
                </div>

                <div className="p-6">
                  {/* Tab 1: Dashboard Details */}
                  {inspectorTab === "dashboard" && (
                    <div className="space-y-6">
                      
                      {/* Anomaly Alert Banner */}
                      {activeCandidate?.anomalyAlert && (
                        <div className="bg-[#FFF0F0] border border-[#FFD5D5] p-4 rounded-xl flex items-start gap-3 text-left">
                          <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-black text-rose-800 uppercase tracking-wide">Anomaly Alert Detected</h4>
                            <p className="text-xs text-rose-750 leading-relaxed font-semibold">
                              {activeCandidate.anomalyAlert}
                            </p>
                            <div className="flex gap-3 pt-1">
                              <button 
                                onClick={() => alert(`Reaching out to ${activeCandidate.name}...`)}
                                className="px-3 py-1.5 bg-[#0052CC] hover:bg-[#0042A3] text-white rounded text-[10.5px] font-bold transition-all shadow"
                              >
                                Reach Out to Candidate
                              </button>
                              <button 
                                onClick={() => alert("Marking alert as reviewed...")}
                                className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-650 rounded text-[10.5px] font-bold transition-all"
                              >
                                Dismiss Alert
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Placement Information Card List */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Placement Information</h3>
                          <span className="text-[10px] text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">SLA Active</span>
                        </div>
                        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs font-semibold text-slate-655">
                          
                          <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <span>Purchase Order</span>
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-500 border border-amber-100 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
                              <span className="text-[10.5px] text-slate-400">SLA: 24h Remaining</span>
                            </div>
                          </div>

                          <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <span>E-Verification</span>
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-505 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Check className="h-3 w-3" /> Approved
                              </span>
                              <span className="text-[10.5px] text-[#007A5E] font-bold">SLA Maintained</span>
                            </div>
                          </div>

                          <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <span>Orientation</span>
                            <div className="flex items-center gap-3">
                              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-500 border border-amber-100 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span>
                              <span className="text-[10.5px] text-slate-400">SLA: 48h Remaining</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Screen 1 detailed checks */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Background Check Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-slate-105">
                            <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Background Check</span>
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 rounded text-[9px] font-bold uppercase tracking-wider">
                              Escalated to VP
                            </span>
                          </div>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status</span>
                              <span className="font-bold text-rose-500 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" /> SLA Breached (Overdue by 3 days)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Verification Agency</span>
                              <span className="font-bold text-slate-707">Labcorp Diagnostics</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Escalation Recipient</span>
                              <span className="font-bold text-slate-707">VP of Compliance (Markus)</span>
                            </div>
                          </div>
                        </div>

                        {/* Drug Check Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-slate-105">
                            <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Drug Check</span>
                            <span className="px-2 py-0.5 bg-emerald-50 text-[#007A5E] border border-emerald-100 rounded text-[9px] font-bold uppercase tracking-wider">
                              Approved
                            </span>
                          </div>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status</span>
                              <span className="font-bold text-emerald-555 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> Completed
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Scheduled Date</span>
                              <span className="font-bold text-slate-700">Jul 08, 2026</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Results Received</span>
                              <span className="font-bold text-slate-700">Jul 09, 2026</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Tab 2: Summary Panel */}
                  {inspectorTab === "summary" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                        <span className="font-bold text-slate-700 block">Recruiter Evaluation Notes</span>
                        <p className="text-slate-600 leading-relaxed font-semibold">
                          Debra Bailey is onboarding as Senior Staff Accountant for CDK Global. Background check has encountered delays at Daman & Diu validation nodes. Follow-up is escalated.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Documents Checklist (Screenshot 2) with Anomaly Checks */}
                  {inspectorTab === "documents" && (
                    <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="p-4">Document Name</th>
                            <th className="p-4">Uploaded File</th>
                            <th className="p-4">Submission Status</th>
                            <th className="p-4">OB Approval Status</th>
                            <th className="p-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                          
                          {/* Doc Row 1 (With Anomaly Check warning) */}
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-bold text-slate-800">401K Benefit Option Form</td>
                            <td className="p-4 text-[#0052CC] font-bold">401K_Benefit.pdf</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold">Completed</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-[#EBF3FC] text-[#0052CC] border border-[#DEEAF7] rounded-full text-[10px] font-bold">Submitted</span>
                            </td>
                            <td className="p-4 text-center">
                              <button className="px-3 py-1 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded text-[10px] font-bold transition-colors">
                                View File
                              </button>
                            </td>
                          </tr>

                          {/* Doc Row 2 (With active Anomaly Alert warning!) */}
                          <tr className="hover:bg-slate-50/50 bg-rose-50/10 transition-colors">
                            <td className="p-4 font-bold text-slate-800">
                              <span>W-4 Form Tax Declaration</span>
                              <span className="mt-1 block text-[10px] text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded w-fit font-bold uppercase tracking-wider">
                                ⚠️ Anomaly Flagged
                              </span>
                            </td>
                            <td className="p-4 text-[#0052CC] font-bold">W4_Mani_MN.pdf</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-105 rounded-full text-[10px] font-bold">Verification Warning</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[10px] font-bold">Waiting Re-upload</span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded text-[10px] font-bold transition-colors">
                                  Request Fix
                                </button>
                                <span className="text-[10px] text-slate-400 font-semibold" title="Signature Name Mismatch detected by OCR system">
                                  Name Mismatch Signature
                                </span>
                              </div>
                            </td>
                          </tr>

                          {/* Doc Row 3 */}
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-bold text-slate-800">Background Verification Consent</td>
                            <td className="p-4 text-slate-400">—</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[10px] font-bold">Pending</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-slate-50 text-slate-400 border border-slate-200 rounded-full text-[10px] font-bold">Waiting</span>
                            </td>
                            <td className="p-4 text-center">
                              <button className="px-3 py-1 bg-[#007A5E] hover:bg-[#005E48] text-white rounded text-[10px] font-bold transition-colors">
                                Send Alert
                              </button>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tab 4: Chat Log */}
                  {inspectorTab === "chat" && (
                    <div className="space-y-4">
                      <div className="h-64 border border-slate-200 rounded-xl bg-slate-50 p-4 overflow-y-auto space-y-4">
                        {messages
                          .filter((m) => m.candidateId === activeCandidate.id)
                          .map((msg) => (
                            <div 
                              key={msg.id} 
                              className={`flex flex-col gap-1 max-w-[80%] ${
                                msg.sender === "recruiter" ? "ml-auto items-end" : "mr-auto items-start"
                              }`}
                            >
                              <div 
                                className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                                  msg.sender === "recruiter" 
                                    ? "bg-[#007A5E] text-white rounded-br-none" 
                                    : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                                }`}
                              >
                                {msg.text}
                              </div>
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                {msg.sender === "recruiter" ? "Alex" : activeCandidate.name}
                              </span>
                            </div>
                          ))}
                      </div>

                      <form onSubmit={(e) => handleSendReply(e, activeCandidate.id)} className="flex gap-2">
                        <input
                          type="text"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type reply message to candidate..."
                          className="flex-1 bg-white border border-slate-255 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#007A5E] text-slate-800 font-semibold"
                        />
                        <button type="submit" className="p-3 bg-[#007A5E] hover:bg-[#005E48] text-white rounded-xl transition-all shadow-sm">
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Tab 5: Automated Email Tracking System (Outlook Sync) */}
                  {inspectorTab === "emails" && (
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Outlook Automated Email Audit</h4>
                        <span className="px-2 py-0.5 bg-[#EBF3FC] text-[#0052CC] border border-[#DEEAF7] rounded text-[9.5px] font-bold">Outlook Synced</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[480px]">
                        {/* Left column: List of emails (5 cols) */}
                        <div className="lg:col-span-5 border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white max-h-[520px] overflow-y-auto no-scrollbar">
                          {mockEmailLogs.map((log) => {
                            const isSelected = selectedEmailLog?.id === log.id;
                            return (
                              <div 
                                key={log.id} 
                                onClick={() => setSelectedEmailLog(log)}
                                className={`p-4 transition-colors flex flex-col gap-2 cursor-pointer border-l-4 ${
                                  isSelected 
                                    ? "bg-[#F0F5FA] border-[#0052CC] text-[#0052CC]" 
                                    : "border-transparent hover:bg-slate-50 text-slate-655"
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{log.step}</span>
                                  <span className="text-[9.5px] text-slate-400 font-semibold">{log.date}</span>
                                </div>
                                <span className={`font-bold block text-xs ${isSelected ? "text-slate-900" : "text-slate-800"}`}>{log.subject}</span>
                                <p className="text-[10px] text-slate-450 font-medium truncate">{log.details}</p>
                                <div className="flex items-center justify-between pt-1">
                                  <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase ${
                                    log.status === "Bounced" ? "bg-rose-50 text-rose-550 border border-rose-100" : 
                                    log.status === "Opened" ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                                    log.status.includes("Synced") ? "bg-blue-50 text-[#0052CC] border border-blue-100" :
                                    "bg-emerald-50 text-emerald-650 border border-emerald-100"
                                  }`}>
                                    {log.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Right column: Selected email content detail view (7 cols) */}
                        <div className="lg:col-span-7 border border-slate-200 rounded-2xl bg-white flex flex-col overflow-hidden max-h-[520px]">
                          {selectedEmailLog ? (
                            <div className="flex flex-col h-full grow">
                              {/* Header */}
                              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-8 w-8 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center">
                                    <Mail className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Email Dispatch Audit Overview</h4>
                                    <p className="text-[10px] text-slate-400 font-extrabold">{selectedEmailLog.step}</p>
                                  </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                  selectedEmailLog.status === "Bounced" ? "bg-rose-50 text-rose-550 border border-rose-100" : 
                                  selectedEmailLog.status === "Opened" ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                                  selectedEmailLog.status.includes("Synced") ? "bg-blue-50 text-[#0052CC] border border-blue-100" :
                                  "bg-emerald-50 text-emerald-650 border border-emerald-100"
                                }`}>
                                  {selectedEmailLog.status}
                                </span>
                              </div>

                              {/* Body */}
                              <div className="p-5 overflow-y-auto space-y-4 grow no-scrollbar text-xs font-semibold text-slate-655 leading-relaxed flex flex-col justify-between">
                                <div className="space-y-4 text-left">
                                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Subject:</span>
                                      <span className="text-slate-800 font-extrabold text-right">{selectedEmailLog.subject}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Audit Date:</span>
                                      <span className="text-slate-600">{selectedEmailLog.date}</span>
                                    </div>
                                    {selectedEmailLog.stopReason && (
                                      <div className="flex justify-between">
                                        <span className="text-rose-500">MTA Bounce Reason:</span>
                                        <span className="text-rose-600 font-bold">{selectedEmailLog.stopReason}</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-1.5 text-[11px] font-normal">
                                    <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider block">Raw Synced Payload Body</span>
                                    <div className="border border-slate-150 rounded-xl p-4 bg-slate-50/20 font-mono text-slate-700 whitespace-pre-wrap leading-relaxed shadow-3xs text-[11px]">
                                      {selectedEmailLog.body || `From: credentials@staffhc.com\nTo: ${activeCandidate?.email || "mani@staffhc.com"}\n\nHi ${activeCandidate?.name || "Mani"},\n\nThis is a system audit record for step: "${selectedEmailLog.step}".\n\nLog Details:\n${selectedEmailLog.details}`}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center grow p-10 text-slate-400 text-center">
                              <Mail className="h-10 w-10 text-slate-200 mb-3" />
                              <p className="text-xs font-bold">Select an email log from the list to view its audit payload details.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 6: Cost Transparency */}
                  {inspectorTab === "costs" && (
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Onboarding Transaction ledger</h4>
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#007A5E] border border-emerald-100 rounded text-[9.5px] font-bold">Fully Transparent</span>
                      </div>
                      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs bg-white">
                        
                        <div className="p-4 flex justify-between font-semibold">
                          <span className="text-slate-505">Aya Background Screening Fee</span>
                          <span className="text-slate-800 font-bold">$45.00</span>
                        </div>

                        <div className="p-4 flex justify-between font-semibold">
                          <span className="text-slate-550">10-Panel Drug Screen Diagnostic Voucher</span>
                          <span className="text-slate-800 font-bold">$35.00</span>
                        </div>

                        <div className="p-4 flex justify-between font-semibold">
                          <span className="text-slate-550">E-Verify Processing Surcharge</span>
                          <span className="text-slate-800 font-bold">$10.00</span>
                        </div>

                        <div className="p-4 flex justify-between font-semibold">
                          <span className="text-slate-550">Credential Verification & Credentialing checks</span>
                          <span className="text-slate-800 font-bold">$25.00</span>
                        </div>

                        <div className="p-4 bg-slate-50 flex justify-between font-extrabold text-sm border-t border-slate-250">
                          <span className="text-slate-800">Total Onboarding Placement Cost</span>
                          <span className="text-[#007A5E]">$115.00</span>
                        </div>

                      </div>
                      <p className="text-[10px] text-slate-450 italic">Note: All onboarding costs are automatically billed to corporate client account (CDK Global Corp) upon successful validation.</p>
                    </div>
                  )}

                </div>
              </div>

            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW 1: STATS DASHBOARD (Slide 4)                                         */
            /* ========================================================================= */
            currentView === "dashboard" ? (
              <div className="space-y-6">
                
                {/* Welcome green banner */}
                <div className="bg-[#007A5E] text-white p-6 rounded-2xl shadow-sm text-left relative overflow-hidden">
                  <div className="relative z-10 space-y-1">
                    <h1 className="text-xl font-bold tracking-tight">Good Afternoon, Alex! 👋</h1>
                    <p className="text-xs text-emerald-100 font-semibold">Welcome back to your Onboarding compliance panel.</p>
                    <div className="flex gap-4 pt-3 text-[10px] font-bold text-teal-150">
                      <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                        <Calendar className="h-3 w-3" /> Friday, July 10, 2026
                      </span>
                      <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                        <Clock className="h-3 w-3" /> 01:55 PM
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  
                  {/* Candidates */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2 relative overflow-hidden">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Candidates</span>
                    <span className="text-2xl font-black text-slate-800 block">42,369</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[9.5px] font-bold inline-block">
                      ↗ High Activity
                    </span>
                    <Users className="absolute right-4 bottom-4 h-8 w-8 text-slate-200 pointer-events-none" />
                  </div>

                  {/* Avg Time */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2 relative overflow-hidden">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Average Time to Onboard</span>
                    <span className="text-2xl font-black text-slate-800 block">-10 days</span>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 rounded text-[9.5px] font-bold inline-block">
                      ↘ Low Delay
                    </span>
                    <Clock className="absolute right-4 bottom-4 h-8 w-8 text-slate-200 pointer-events-none" />
                  </div>

                  {/* Overdue */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2 relative overflow-hidden">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Overdue Onboardings</span>
                    <span className="text-2xl font-black text-rose-600 block">6</span>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-500 border border-rose-100 rounded text-[9.5px] font-bold inline-block">
                      ⚠️ Action Required
                    </span>
                    <AlertCircle className="absolute right-4 bottom-4 h-8 w-8 text-rose-100 pointer-events-none" />
                  </div>

                  {/* Employees */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2 relative overflow-hidden">
                    <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Employees</span>
                    <span className="text-2xl font-black text-slate-800 block">263</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[9.5px] font-bold inline-block">
                      ↗ SLA Maintained
                    </span>
                    <CheckCircle2 className="absolute right-4 bottom-4 h-8 w-8 text-slate-200 pointer-events-none" />
                  </div>

                </div>

                {/* Onboarding count by status CSS chart card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-4">
                  <span className="font-extrabold text-sm text-slate-700 uppercase tracking-wider block">Onboarding Count by Status</span>
                  
                  {/* Chart rendering */}
                  <div className="h-64 flex items-end gap-6 justify-between border-b border-slate-200 pb-2 pt-6 px-4">
                    
                    {/* Bar 1 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[85%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Account</span>
                    </div>

                    {/* Bar 2 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[55%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">E-Verify</span>
                    </div>

                    {/* Bar 3 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[40%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">PO Form</span>
                    </div>

                    {/* Bar 4 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[15%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Drug test</span>
                    </div>

                    {/* Bar 5 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[70%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Background</span>
                    </div>

                    {/* Bar 6 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[65%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Orientation</span>
                    </div>

                    {/* Bar 7 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-12 bg-slate-105 rounded-t-lg h-56 flex items-end overflow-hidden">
                        <div className="w-full bg-[#0052CC] h-[88%] rounded-t-lg transition-all group-hover:bg-[#0042A3]"></div>
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Final OB</span>
                    </div>

                  </div>
                </div>

              </div>
            ) : 

            /* ========================================================================= */
            /* VIEW 2: ONBOARDING CANDIDATES LISTING ("Onboarding (586)")                 */
            /* ========================================================================= */
            currentView === "candidates" ? (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 text-left">
                <div className="p-6 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      {currentRole === "onboarder" ? "Onboarding Compliance Queue" : "Active Onboarding Placements"} ({filteredCandidates.length})
                    </h1>
                    <p className="text-xs text-slate-450 font-semibold mt-0.5">
                      {currentRole === "onboarder" 
                        ? "Verify checklists, validate document anomalies, and maintain onboarding SLA standards."
                        : "Manage nursing staff placements, coordinate candidate notifications, and view communications."
                      }
                    </p>
                  </div>

                  {/* Search & Filter tools */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search candidate by name or # ..."
                        className="pl-9 pr-4 py-2 bg-white border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#007A5E] w-64 text-slate-800 font-semibold"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                    <button className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-200 transition-colors">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                  </div>
                </div>

                {/* Listing candidates table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[10.5px] font-bold text-slate-505 uppercase tracking-wider">
                        <th className="p-4 pl-6">Candidate Details</th>
                        <th className="p-4">Onboarding Status</th>
                        <th className="p-4">JC Status</th>
                        <th className="p-4">Client</th>
                        <th className="p-4">MSP</th>
                        <th className="p-4">State</th>
                        <th className="p-4">Start Date</th>
                        <th className="p-4">SLA Status</th>
                        <th className="p-4 text-right pr-6">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-655">
                      {filteredCandidates.map((cand) => {
                        const isBreached = cand.slaStatus === "breached";
                        const hasAnomaly = !!cand.anomalyAlert;
                        
                        return (
                          <React.Fragment key={cand.id}>
                            <tr 
                              className={`transition-colors cursor-pointer ${isBreached ? "bg-rose-50/20 hover:bg-rose-50/40" : "hover:bg-slate-50/50"}`}
                              onClick={() => {
                                setSelectedCandidateId(cand.id);
                                setInspectorTab("dashboard");
                              }}
                            >
                              <td className="p-4 pl-6">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 bg-[#EBF3FC] text-[#0052CC] rounded-full flex items-center justify-center font-bold font-sans uppercase">
                                    {cand.name.substring(0, 2)}
                                  </div>
                                  <div>
                                    <span className="font-extrabold text-slate-800 block hover:text-[#007A5E]">{cand.name}</span>
                                    <span className="text-[10px] text-slate-450 block">Candidate #: {cand.candidateNo} • {cand.jobTitle}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase ${
                                  cand.stepStatus === "completed" 
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                    : cand.stepStatus === "stuck"
                                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                                    : cand.stepStatus === "terminated"
                                    ? "bg-rose-100 text-rose-700 border border-rose-205"
                                    : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}>
                                  {cand.stepStatus === "completed" 
                                    ? "Employee Created" 
                                    : cand.stepStatus === "stuck"
                                    ? "Stuck Onboarding"
                                    : cand.stepStatus === "terminated"
                                    ? "OB Terminated"
                                    : "Active Onboarding"
                                  }
                                </span>
                              </td>
                              <td className="p-4">
                                {cand.id === "candidate-debra" ? (
                                  <span className="px-2 py-0.5 bg-[#EBF3FC] text-[#0052CC] border border-[#DEE7F3] rounded text-[9.5px] font-bold">
                                    P (0) | A (21) | R (0) | N (0)
                                  </span>
                                ) : cand.id === "candidate-marcus" ? (
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded text-[9.5px] font-bold">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="text-slate-400 font-normal">—</span>
                                )}
                              </td>
                              <td className="p-4 text-slate-800">{cand.clientName}</td>
                              <td className="p-4 text-slate-400">{cand.mspName}</td>
                              <td className="p-4">{cand.stateCode}</td>
                              <td className="p-4 text-slate-805">{cand.startDate}</td>
                              <td className="p-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedCandidateId(expandedCandidateId === cand.id ? null : cand.id);
                                  }}
                                  className={`px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wide flex items-center gap-1 transition-all ${
                                    isBreached 
                                      ? "bg-rose-100 hover:bg-rose-200 text-rose-600 border border-rose-200 animate-pulse" 
                                      : "bg-emerald-50 hover:bg-emerald-100 text-[#007A5E] border border-emerald-100"
                                  }`}
                                >
                                  {isBreached ? "⚠️ SLA Breached" : "SLA Active"}
                                  <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${expandedCandidateId === cand.id ? "rotate-180" : ""}`} />
                                </button>
                              </td>
                              <td className="p-4 text-right pr-6">
                                <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-400">
                                  <Eye className="h-4.5 w-4.5" />
                                </button>
                              </td>
                            </tr>
                            {expandedCandidateId === cand.id && (
                              <tr className="bg-rose-50/20 text-xs">
                                <td colSpan={9} className="p-4 pl-12 border-t border-rose-100/30 text-rose-700">
                                  <div className="space-y-2 text-left">
                                    <div className="flex items-center gap-2 font-bold text-rose-650">
                                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                                      <span>SLA Status Warning: {cand.slaBreachDetails || "General compliance delay detected."}</span>
                                    </div>
                                    {cand.onboardingSteps && cand.onboardingSteps.length > 0 && (
                                      <div className="flex flex-wrap gap-2.5 font-bold text-slate-500 mt-1 pl-6">
                                        <span>Missing compliance checks:</span>
                                        {cand.onboardingSteps.filter(s => s.status !== "completed").map(s => (
                                          <span key={s.number} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
                                            {s.name} ({s.status === "stuck" ? "Stuck" : "Pending"})
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) :

            /* ========================================================================= */
            /* VIEW 3: ONBOARDING DATE MATRIX GRID (Slide 2 & 3)                         */
            /* ========================================================================= */
            currentView === "matrix" ? (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 text-left">
                
                {/* Header title & controls */}
                <div className="p-6 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      Onboarding Dashboard
                    </h1>
                    <p className="text-xs text-slate-450 font-semibold mt-0.5">Tracking daily placement workflows and overdue non-progress items.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 hover:bg-slate-200 transition-colors">
                      <Filter className="h-3.5 w-3.5" />
                      Filter (0)
                    </button>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-350 text-[#007A5E] focus:ring-0" />
                      Show Overdue Only
                    </label>
                    <button className="p-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors" title="Refresh">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                    <button className="px-3.5 py-1.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Matrix Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-200 text-center text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-505 uppercase tracking-wider">
                        <th className="p-3 border-r border-slate-200 bg-[#007A5E] text-white text-left font-black">TEAM / OB OWNER</th>
                        <th className="p-3 border-r border-slate-200 text-[#0052CC] font-bold">ACTIVE OBS</th>
                        <th className="p-3 border-r border-slate-200">JUL 15</th>
                        <th className="p-3 border-r border-slate-200">JUL 22</th>
                        <th className="p-3 border-r border-slate-200">JUL 23</th>
                        <th className="p-3 border-r border-slate-200">JUL 25</th>
                        <th className="p-3 border-r border-slate-200">JUL 29</th>
                        <th className="p-3 border-r border-slate-200">JUL 30</th>
                        <th className="p-3 border-r border-slate-200">AUG 08</th>
                        <th className="p-3 border-r border-slate-200">AUG 12</th>
                        <th className="p-3 border-r border-slate-200">AUG 27</th>
                        <th className="p-3 border-r border-slate-200">SEP 02</th>
                        <th className="p-3 border-r border-slate-200">SEP 03</th>
                        <th className="p-3 border-r border-slate-200">SEP 04</th>
                        <th className="p-3 border-r border-slate-200">SEP 05</th>
                        <th className="p-3 border-r border-slate-200">SEP 06</th>
                        <th className="p-3 border-r border-slate-200">SEP 12</th>
                        <th className="p-3 border-r border-slate-200">SEP 18</th>
                        <th className="p-3 border-r border-slate-200">SEP 20</th>
                        <th className="p-3 border-r border-slate-200">SEP 23</th>
                        <th className="p-3">SEP 24</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-bold text-slate-700">
                      
                      {/* Unassigned row */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Unassigned</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">36</td>
                        {[...Array(19)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* CPX Admin */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">CPX Admin</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">6</td>
                        {[...Array(19)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* shivangj */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">40390_shivangj</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">2</td>
                        <td className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        <td className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        {/* JUL 23 SLA Breach */}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        {[...Array(16)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Lavanya Manne */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Lavanya Manne</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">2</td>
                        {[...Array(19)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Prarthana Pratap */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Prarthana Pratap</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">1</td>
                        {[...Array(19)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Paige Cunningham */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Paige Cunningham</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">2</td>
                        {/* JUL 15 Overdue */}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        {[...Array(18)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Abhiram Balusu */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Abhiram Balusu</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">1</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        {/* JUL 23 Overdue */}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        {[...Array(16)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Adam Smith */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Adam Smith</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">4</td>
                        {[...Array(6)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                        {/* AUG 08 Overdue */}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        {[...Array(12)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                      </tr>

                      {/* Ganesan K */}
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 border-r border-slate-200 text-left text-slate-800 font-extrabold bg-slate-50/30">Ganesan K</td>
                        <td className="p-3 border-r border-slate-200 text-[#0052CC] font-black">8</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        {/* Overdue dates */}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        {[...Array(9)].map((_, i) => (
                          <td key={i} className="p-3 border-r border-slate-200 text-slate-300 font-normal">0</td>
                        ))}
                        <td className="p-3 border-r border-slate-200 bg-rose-500 text-white font-extrabold">1</td>
                        <td className="p-3 border-r border-slate-200 text-slate-305 font-normal">0</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>
            ) :

            /* ========================================================================= */
            /* VIEW 4: VERIFICATION AGENCY LISTING (Slide 1)                             */
            /* ========================================================================= */
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 text-left">
              
              {/* Table search & action bar */}
              <div className="p-6 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    Verification Agency ({filteredAgencies.length})
                  </h1>
                  <p className="text-xs text-slate-450 font-semibold mt-0.5">Manage external background screening and compliance check providers.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input 
                      type="text"
                      value={agencySearch}
                      onChange={(e) => setAgencySearch(e.target.value)}
                      placeholder="Search by agency name..."
                      className="pl-9 pr-4 py-2 bg-white border border-slate-250 rounded-lg text-xs focus:outline-none focus:border-[#007A5E] w-64 text-slate-800 font-semibold"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                  <button className="px-4 py-2 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    New Agency
                  </button>
                </div>
              </div>

              {/* Agency table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 pl-6">Agency Name</th>
                      <th className="p-4">Agency Type</th>
                      <th className="p-4">Website</th>
                      <th className="p-4">State</th>
                      <th className="p-4">Modify By</th>
                      <th className="p-4">Modify On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-semibold text-slate-650">
                    {filteredAgencies.map((agency, index) => (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 pl-6 text-[#007A5E] font-bold hover:underline cursor-pointer">{agency.name}</td>
                        <td className="p-4">{agency.type}</td>
                        <td className="p-4">
                          {agency.website !== "—" ? (
                            <a href="#" className="text-[#0052CC] hover:underline">{agency.website}</a>
                          ) : (
                            <span className="text-slate-400 font-normal">—</span>
                          )}
                        </td>
                        <td className="p-4">{agency.state}</td>
                        <td className="p-4 text-slate-700">{agency.modifiedBy}</td>
                        <td className="p-4 text-slate-400">{agency.modifiedOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Floating Alert / Notification Log drawer */}
      {showNotificationDrawer && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col text-left animate-slide-in">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">Alert Routing Logs</h3>
            </div>
            <button 
              onClick={() => setShowNotificationDrawer(false)}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pt-4 space-y-4 no-scrollbar">
            
            {/* Notifications */}
            <div className="space-y-2">
              <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">Notifications</span>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 text-[11px] font-semibold text-slate-655">
                <div className="flex justify-between">
                  <span className="text-slate-800 font-bold">W-4 Signature Anomaly Detected</span>
                  <span className="text-slate-400 font-normal">10:30 AM</span>
                </div>
                <p className="text-rose-500 text-[10px]">⚠️ System flagged W-4 signature name mismatch for Mani. Alert routed to candidate for correction.</p>
              </div>
            </div>

            {/* Recruiter / Onboarder Alerts */}
            <div className="space-y-2">
              <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">Compliance Coordinator Notifications</span>
              <div className="bg-amber-50 border border-amber-250 rounded-xl p-3 space-y-1.5 text-[11px] font-semibold text-slate-655">
                <div className="flex justify-between text-amber-700">
                  <span className="font-bold">SLA Escalation Alert</span>
                  <span className="text-slate-400 font-normal">11:00 AM</span>
                </div>
                <p className="text-amber-800 text-[10px]">⚠️ Background Check overdue by 3 days for Debra Bailey. Automatically escalated to VP compliance.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5 text-[11px] font-semibold text-slate-655">
                <div className="flex justify-between">
                  <span className="text-slate-800 font-bold">Outlook Synced Email Tracked</span>
                  <span className="text-slate-400 font-normal">Yesterday</span>
                </div>
                <p className="text-slate-500 text-[10px]">Outlook integration successfully recorded incoming mail from candidate Mani under Step 2.</p>
              </div>
            </div>

            {/* Hierarchy Escalations */}
            <div className="space-y-2">
              <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block">Hierarchical Escalation Status</span>
              <div className="bg-rose-50 border border-rose-250 rounded-xl p-3 space-y-1.5 text-[11px] font-semibold text-slate-655">
                <div className="flex justify-between text-rose-700">
                  <span className="font-bold">Hierarchy Alert Active</span>
                  <span className="text-slate-400 font-normal">Active</span>
                </div>
                <p className="text-rose-800 text-[10px]">High Priority ticket issued to Director of Operations for Ganesan K's delayed Drug Screening.</p>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-405 italic">
            Automated alerts are dispatched via AWS Pinpoint & Outlook Web API.
          </div>
        </div>
      )}

      {/* Solid green Hummingbird Footer bar */}
      <footer className="bg-[#007A5E] text-white/95 py-3.5 text-center text-[10px] font-bold border-t border-[#005E48] mt-auto shrink-0">
        © Copyright 2026 Hummingbird Healthcare Staffing. All Rights Reserved.
      </footer>
    </main>
  );
}
