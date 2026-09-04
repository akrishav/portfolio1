"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  BrainCircuit, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Bot, 
  Menu, 
  X,
  GraduationCap,
  Award,
  Mail
} from "lucide-react";
import { RESUME_DATA } from "@/data/resumeData";

export default function HeaderNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
            <div className="h-full w-full bg-slate-950 rounded-[10.5px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 to-indigo-300 text-sm">
                AR
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-sm tracking-tight group-hover:text-sky-400 transition-colors">
              {RESUME_DATA.personalInfo.name}
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Product Manager & AI Founder
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              pathname === "/"
                ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border border-sky-500/30"
                : "text-slate-350 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            Portfolio
          </Link>
          <a
            href="/#experience"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-350 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            Experience
          </a>
          <a
            href="/#patent"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-350 hover:text-white hover:bg-slate-800/50 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Patent
          </a>
          <a
            href="/#skills"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-350 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            Skills
          </a>
          <Link
            href="/interview-prep"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              pathname === "/interview-prep"
                ? "bg-gradient-to-r from-purple-500/20 to-sky-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                : "text-purple-300 hover:text-white hover:bg-purple-950/40"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            Interview Coach & Copilot
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`mailto:${RESUME_DATA.personalInfo.email}`}
            className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            Email Me
          </a>

          <Link
            href="/interview-prep"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            PM Interview Q&A
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200 hover:text-sky-400"
          >
            Portfolio
          </Link>
          <a
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200 hover:text-sky-400"
          >
            Experience
          </a>
          <a
            href="/#patent"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200 hover:text-sky-400"
          >
            Patent (IN202631054993)
          </a>
          <a
            href="/#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-200 hover:text-sky-400"
          >
            Skills & Competencies
          </a>
          <Link
            href="/interview-prep"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-bold text-purple-300 hover:text-purple-200"
          >
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            Interview Coach & Copilot Demo
          </Link>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`mailto:${RESUME_DATA.personalInfo.email}`}
              className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-center text-xs font-bold text-slate-200"
            >
              Contact: {RESUME_DATA.personalInfo.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
