"use client";

import React from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";

export default function HiringManagersPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* Demo navigation helper */}
      <DemoNavbar />

      {/* Header matching Candidate Portal / Job Board */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/hummingbird-logo.png"
              alt="Hummingbird Logo"
              className="h-6.5 object-contain select-none pointer-events-none"
            />
            <span className="text-slate-350 font-normal text-lg">|</span>
            <span className="text-xs font-bold text-[#007A5E] uppercase tracking-wider">Hiring Managers</span>
          </div>

          <Link 
            href="/" 
            className="text-xs font-bold text-[#0052CC] hover:underline"
          >
            Go back to Candidate Portal
          </Link>
        </div>
      </header>

      {/* For Hiring Managers Main Cards Section */}
      <div className="grow flex flex-col justify-center items-center py-16 px-4">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">For Hiring Managers</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
              Access the recruiter and onboarding compliance systems. Select your portal to log in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Recruiter Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-xl bg-[#EBF3FC] flex items-center justify-center text-[#0052CC]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-bold text-slate-900">Recruiter Portal</h3>
                <p className="text-xs text-slate-400">Manage candidates, compliance checklists, and job matching.</p>
              </div>
              <Link 
                href="/recruiter?role=recruiter"
                className="w-full py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded-lg transition-all text-center"
              >
                Access Recruiter Portal
              </Link>
            </div>

            {/* Onboarder Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#007A5E]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-sm font-bold text-slate-900">On-boarder Portal</h3>
                <p className="text-xs text-slate-400">Review credential compliance, SLA monitoring, and background checks.</p>
              </div>
              <Link 
                href="/recruiter?role=onboarder"
                className="w-full py-2.5 bg-[#007A5E] hover:bg-[#005E48] text-white text-xs font-bold rounded-lg transition-all text-center"
              >
                Access On-boarder Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solid Blue Footer (Matching Homepage layout) */}
      <footer className="bg-[#002677] text-white py-12 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          {/* Centered Links */}
          <div className="flex justify-center gap-8 text-xs font-bold text-slate-200">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          {/* Social Icons (White outline circles) */}
          <div className="flex justify-center gap-4">
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white/5 transition-all">
              <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white/5 transition-all">
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:bg-white/5 transition-all">
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>

          {/* App download badges */}
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-90 transition-opacity">
              <img src="/google-play.png" alt="Get it on Google Play" className="h-10 w-auto" />
            </a>
            <a href="#" className="hover:opacity-90 transition-opacity">
              <img src="/app-store.png" alt="Download on the App Store" className="h-10 w-auto" />
            </a>
          </div>

          <div className="text-[10px] text-slate-450 font-bold block opacity-60">
            © 2026 Hummingbird INC. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
