"use client";

import React, { useState } from "react";
import Link from "next/link";
import DemoNavbar from "@/components/DemoNavbar";
import Logo from "@/components/Logo";
import { 
  Search, User, Lightbulb, TrendingUp, Rocket, Check, 
  HelpCircle, ChevronRight, CheckCircle2, ShieldCheck, 
  MapPin, Briefcase, Info, ArrowRight, Building, CheckCircle,
  Facebook, Instagram, Twitter
} from "lucide-react";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching jobs for: "${searchVal || "All Jobs"}"`);
  };

  return (
    <main className="min-h-screen bg-white text-[#1E293B] flex flex-col font-sans antialiased">
      {/* Floating Developer Prototyping Switcher */}
      <DemoNavbar />

      {/* Main Landing Header (Image 5 Alignment) */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />

          {/* Links matching Image 5 */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-500">
            <a href="#how-it-works" className="hover:text-[#0052CC] transition-colors">Get Started</a>
            <a href="#about-us" className="hover:text-[#0052CC] transition-colors">About Us</a>
            <Link href="/hiring-managers" className="hover:text-[#0052CC] transition-colors">For Hiring Managers</Link>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/onboarding?login=true"
              className="px-5 py-2.5 bg-white border border-[#0052CC] hover:bg-[#EBF3FC] text-[#0052CC] text-xs font-bold rounded transition-all shadow-sm"
            >
              Login
            </Link>
            <Link
              href="/onboarding?login=true"
              className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0042A3] text-white text-xs font-bold rounded shadow-sm transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Light Baby Blue background matching nurse.png gradient exactly) */}
      <section className="relative bg-gradient-to-b from-[#DDEDF8] to-[#BFDBF3] py-20 lg:py-28 overflow-hidden text-left border-b border-slate-100">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0052CC_1.5px,transparent_1.5px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Connecting <span className="text-[#0052CC]">Skilled Nurses</span> with Trusted Healthcare Institutions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold max-w-xl">
              Discover verified nursing opportunities at leading hospitals, clinics, and care centers. Built to support your professional journey in healthcare.
            </p>

            {/* Symmetrical Identical CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
              {/* Search Jobs Link - Styled identically to Candidate button */}
              <Link
                href="/jobs"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EBF3FC] hover:bg-[#DEE7FF] text-[#0052CC] font-bold rounded-xl transition-all text-xs uppercase tracking-wider border border-[#B8D3F5]/60 shadow-md shrink-0 h-[48px]"
              >
                <Search className="h-4.5 w-4.5 text-[#0052CC]" />
                Search Jobs
              </Link>

              {/* Candidate Portal Button sitting aside symmetrically */}
              <Link
                href="/onboarding?login=true"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EBF3FC] hover:bg-[#DEE7FF] text-[#0052CC] font-bold rounded-xl transition-all text-xs uppercase tracking-wider border border-[#B8D3F5]/60 shadow-md shrink-0 h-[48px]"
              >
                <User className="h-4.5 w-4.5 text-[#0052CC]" />
                Candidate Portal
              </Link>
            </div>

            <span className="text-[11px] text-slate-400 font-bold block pt-2">
              → Trusted by 500+ hospitals & clinics internationally
            </span>
          </div>

          {/* Hero Right Image Panel (using transparent nurse-transparent.png) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end h-[400px] sm:h-[520px] items-end">
            {/* The transparent Nurse Portrait Image */}
            <img
              src="/nurse-transparent.png"
              alt="Professional clinical nurse in scrubs"
              className="relative z-10 w-[270px] sm:w-[350px] h-[390px] sm:h-[510px] object-contain object-bottom select-none pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* Section 2: Who We Are (Image 4 Layout) */}
      <section id="about-us" className="py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-left space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Who we are Left */}
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block px-3.5 py-1.5 rounded bg-[#0052CC] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              More About Us
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Who we are.</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-semibold">
              StaffHC's mission is to establish global cross-culture human connections that further the careers of our employees and strengthen the businesses of our clients. We are driven to use the power of our global network to connect businesses with the right people, and people with the right businesses without bias. We provide Global Workforce Solutions with a human touch.
            </p>

            {/* Sub stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="border border-slate-100 bg-[#F8FAFC] p-4 rounded-xl shadow-sm text-center">
                <span className="text-2xl font-extrabold text-[#0052CC] block">10,000+</span>
                <span className="text-[9px] font-bold text-slate-450 uppercase mt-1 block">Nurses Placed</span>
              </div>
              <div className="border border-slate-100 bg-[#F8FAFC] p-4 rounded-xl shadow-sm text-center">
                <span className="text-2xl font-extrabold text-[#0052CC] block">500+</span>
                <span className="text-[9px] font-bold text-slate-455 uppercase mt-1 block">Partner Hospitals</span>
              </div>
              <div className="border border-slate-100 bg-[#F8FAFC] p-4 rounded-xl shadow-sm text-center">
                <span className="text-2xl font-extrabold text-[#0052CC] block">25+</span>
                <span className="text-[9px] font-bold text-slate-455 uppercase mt-1 block">Int. Coverage</span>
              </div>
            </div>
          </div>

          {/* Who we are Right */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-slate-100 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="Healthcare administrative team meeting collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200/80 p-4 rounded-xl shadow-lg flex items-center gap-3 max-w-[310px]">
              <div className="h-9 w-9 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 className="h-5.5 w-5.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-extrabold text-[#0052CC] uppercase tracking-wider block">23 Years of Excellence</span>
                <span className="text-[10.5px] font-semibold text-slate-500 block leading-tight">We have been serving the community with excellence and compassion for 23 years.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: How it Works (Image 1 Layout with fully aligned 3-step timeline) */}
      <section id="how-it-works" className="py-24 bg-white border-y border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight animate-fade-in">How it Works</h2>
            <p className="text-slate-400 text-xs font-semibold max-w-xl mx-auto">
              From Signing Up to Securing Your Next Nursing Role Here's Exactly How It Works
            </p>
          </div>

          {/* Dotted connected layout */}
          <div className="relative max-w-4xl mx-auto space-y-16 pt-8 pb-4">
            
            {/* Connected SVG Green Dotted Line */}
            <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
              <svg className="w-full h-full" viewBox="0 0 800 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 220 120 L 220 200 L 580 200 L 580 280 M 580 350 L 580 420 L 220 420 L 220 480" 
                  stroke="#00828A" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 6" 
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Step 1: Create Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left relative z-10">
              <div className="flex justify-center md:justify-end">
                <div className="relative bg-white border border-slate-200/80 shadow-lg p-6 rounded-2xl w-full max-w-[280px]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-50 rounded-full -z-10"></div>
                  <h4 className="text-xs font-bold text-slate-800 mb-4">Create Account</h4>
                  <div className="space-y-2.5">
                    <div className="h-2 w-28 bg-slate-100 rounded"></div>
                    <div className="h-2 w-20 bg-slate-100 rounded"></div>
                    <div className="h-2 w-24 bg-slate-100 rounded"></div>
                  </div>
                  <button type="button" className="w-full mt-5 py-2 bg-slate-205 text-slate-450 rounded text-[10.5px] font-bold">
                    Sign up
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-w-md md:pl-6">
                <h3 className="text-sm font-extrabold text-slate-850">Step 1: Create Account</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Set up your free account by entering your basic details, experience, and nursing credentials in{" "}
                  <Link href="/onboarding?login=true" className="text-[#0052CC] font-bold hover:underline">
                    candidate.staffhc.com
                  </Link>
                </p>
              </div>
            </div>

            {/* Step 2: Explore openings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left relative z-10">
              <div className="space-y-2 max-w-md md:text-right md:pr-6 md:order-1">
                <h3 className="text-sm font-extrabold text-slate-850">Step 2: Explore Verified Job Openings</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Browse through a wide range of nursing roles across top hospitals, clinics, and care centers.
                </p>
              </div>
              <div className="flex justify-center md:justify-start md:order-2">
                <div className="relative bg-white border border-slate-200/80 shadow-lg p-6 rounded-2xl w-full max-w-[280px]">
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal-50 rounded-full -z-10"></div>
                  <span className="text-[9px] text-slate-405 font-bold block mb-2">Search</span>
                  <div className="flex border border-slate-205 rounded p-1 items-center justify-between">
                    <span className="text-[10.5px] text-slate-400 font-semibold pl-2">Search Jobs</span>
                    <button type="button" className="p-1 bg-slate-50 border border-slate-250 rounded text-slate-400">
                      <Search className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Apply & Get Matched */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left relative z-10">
              <div className="flex justify-center md:justify-end">
                <div className="relative bg-white border border-slate-200/80 shadow-lg p-6 rounded-2xl w-full max-w-[280px]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-50 rounded-full -z-10"></div>
                  <h4 className="text-xs font-bold text-slate-800 mb-4">Apply Jobs</h4>
                  <div className="space-y-2.5">
                    <div className="h-2 w-28 bg-slate-100 rounded"></div>
                    <div className="h-2 w-20 bg-slate-100 rounded"></div>
                    <div className="h-2 w-24 bg-slate-100 rounded"></div>
                  </div>
                  <button type="button" className="w-full mt-5 py-2 bg-slate-205 text-slate-450 rounded text-[10.5px] font-bold">
                    Apply
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-w-md md:pl-6">
                <h3 className="text-sm font-extrabold text-slate-850">Step 3: Apply & Get Matched</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Apply to jobs directly or let us recommend openings tailored to your skills and preferences.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Our Purpose and Values (Image 2 Layout) */}
      <section className="py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-left space-y-12">
        <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Our Purpose and Values</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel image */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
              alt="Healthcare worker desk" 
              className="w-full h-full object-cover"
            />
            {/* Dark overlay with text */}
            <div className="absolute bottom-0 inset-x-0 bg-black/60 p-5 text-white text-[11px] font-semibold leading-relaxed">
              At StaffHC, we believe in creating meaningful opportunities while upholding values that empower both nurses and care institutions.
            </div>
          </div>

          {/* Right panel values 2x2 grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Value 1: Our Vision */}
            <div className="border border-slate-200 p-5 rounded-xl space-y-3 bg-white shadow-sm flex flex-col justify-center min-h-[120px]">
              <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm shrink-0">
                <CheckCircle className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-xs text-slate-805 uppercase tracking-wider">Our Vision & Commitment</h3>
            </div>

            {/* Value 2: Our Aspiration (Light blue bg) */}
            <div className="bg-[#EBF3FC] border border-[#DEE7F3] p-5 rounded-xl space-y-3 flex flex-col justify-center min-h-[120px]">
              <div className="h-8 w-8 bg-white text-[#0052CC] rounded-lg flex items-center justify-center shadow-sm border border-[#DEE7F3] shrink-0">
                <Lightbulb className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Our Aspiration</h3>
              <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                We aim to challenge current practices and design tailored solutions for our clients, communities, and companies we serve.
              </p>
            </div>

            {/* Value 3: Culture of Growth (Light blue bg) */}
            <div className="bg-[#EBF3FC] border border-[#DEE7F3] p-5 rounded-xl space-y-3 flex flex-col justify-center min-h-[120px]">
              <div className="h-8 w-8 bg-white text-[#0052CC] rounded-lg flex items-center justify-center shadow-sm border border-[#DEE7F3] shrink-0">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Culture of Growth</h3>
              <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                StaffHC is committed to a learning workspace where each day contributes to growth, alignment, and living our values.
              </p>
            </div>

            {/* Value 4: Social Impact */}
            <div className="border border-slate-200 p-5 rounded-xl space-y-3 bg-white shadow-sm flex flex-col justify-center min-h-[120px]">
              <div className="h-8 w-8 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                <Rocket className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-bold text-xs text-slate-850 uppercase tracking-wider">Social Impact through UpTech</h3>
              <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                We launched UpTech, an initiative that equips individuals from underrepresented communities with essential industry skills.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 5: Benefits and Perks (Image 3 Layout with working images) */}
      <section id="benefits" className="py-24 bg-[#F8FAFD] border-y border-slate-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Benefits and Perks</h2>

          {/* 3x2 Grid block layouts matching Image 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200/80 rounded-2xl overflow-hidden shadow-md bg-white">
            
            {/* Block 1 (Top Left): Female doctor outdoors (Unsplash portrait check) */}
            <div className="aspect-[4/3] w-full border-b md:border-b-0 md:border-r border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format&fit=crop" 
                alt="Female clinical doctor outdoors" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Block 2 (Top Middle): Blue Card Trusted partners */}
            <div className="bg-[#0052CC] text-white p-8 flex flex-col justify-center space-y-3 border-b md:border-b-0 md:border-r border-slate-200/10">
              <Building className="h-6 w-6 text-white" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Trusted Healthcare Partners</h3>
              <p className="text-[11px] text-slate-100 leading-relaxed font-semibold">
                We partner only with accredited institutions to ensure your safety, stability, and career growth.
              </p>
            </div>

            {/* Block 3 (Top Right): Clinical nurse portrait (working source image!) */}
            <div className="aspect-[4/3] w-full border-b md:border-b-0 border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=500&auto=format&fit=crop" 
                alt="Clinical nurse with tablet clipboard in ward" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Block 4 (Bottom Left): Blue Card Flexible opportunities */}
            <div className="bg-[#0052CC] text-white p-8 flex flex-col justify-center space-y-3 border-r border-slate-200/10">
              <CheckCircle className="h-6 w-6 text-white" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Flexible Job Opportunities</h3>
              <p className="text-[11px] text-slate-100 leading-relaxed font-semibold">
                Find full-time, part-time, and travel nursing roles that suit your lifestyle and career goals.
              </p>
            </div>

            {/* Block 5 (Bottom Middle): Hospital building exterior */}
            <div className="aspect-[4/3] w-full border-r border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=500&auto=format&fit=crop" 
                alt="Clinical hospital building exterior layout" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Block 6 (Bottom Right): Blue Card Quick easy placement */}
            <div className="bg-[#0052CC] text-white p-8 flex flex-col justify-center space-y-3">
              <Rocket className="h-6 w-6 text-white" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Quick & Easy Placement</h3>
              <p className="text-[11px] text-slate-100 leading-relaxed font-semibold">
                Our streamlined onboarding and smart matching get you working faster with less paperwork.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 6: Working with the Best in Healthcare (Logo Grid & Testimonials - New!) */}
      <section className="py-24 bg-white border-b border-slate-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Partners Header & Logos */}
          <div className="space-y-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-850">
              Working with the <span className="text-[#0052CC]">Best in Healthcare</span>
            </h2>
            
            {/* Logos flex row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto pt-4">
              {/* Aya Healthcare */}
              <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">A</span>
                <span className="font-sans font-bold text-xs text-slate-700">Aya Healthcare</span>
              </div>
              {/* Cleveland Clinic */}
              <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-6 border-2 border-emerald-500 flex flex-wrap p-0.5">
                  <div className="h-1.5 w-1.5 bg-emerald-500 m-0.5"></div>
                  <div className="h-1.5 w-1.5 bg-emerald-500 m-0.5"></div>
                </div>
                <span className="font-sans font-black text-xs text-slate-800 tracking-tighter">Cleveland Clinic</span>
              </div>
              {/* Kaiser Permanente */}
              <div className="flex items-center gap-1.5 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-6 rounded bg-sky-600 flex items-center justify-center text-white text-[9px] font-bold">KP</div>
                <span className="font-sans font-bold text-xs text-slate-850 tracking-tight">Kaiser Permanente</span>
              </div>
              {/* Medical Solutions */}
              <div className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all">
                <span className="font-mono font-black text-xs text-slate-800 tracking-tight uppercase border-b-2 border-indigo-500">Medical Solutions</span>
              </div>
            </div>
          </div>

          {/* Testimonials horizontal split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Testimonials left info */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                True stories from nurses who&apos;ve found success through our platform.
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Discover how we've helped nurses build rewarding careers across top healthcare institutions.
              </p>
              
              {/* Arrow controls */}
              <div className="flex items-center gap-2 pt-2">
                <button type="button" className="h-8 w-8 rounded-full border border-slate-205 flex items-center justify-center hover:bg-slate-50 text-slate-500">&larr;</button>
                <button type="button" className="h-8 w-8 rounded-full border border-slate-205 flex items-center justify-center hover:bg-slate-50 text-slate-500">&rarr;</button>
              </div>
            </div>

            {/* Testimonials right quote card */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#0052CC] to-[#00828A] p-8 rounded-3xl shadow-xl text-white space-y-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-[120px] font-serif text-white/10 select-none leading-none translate-x-4 -translate-y-4">“</div>
              
              {/* Quote 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 rounded-2xl space-y-3">
                <p className="text-xs italic leading-relaxed text-slate-100 font-medium">
                  "Clear, timely communication and strong attention to detail made every assignment smooth and stress-free."
                </p>
                <span className="text-[10px] font-bold tracking-wider block text-white/80">— Arriana Terrian, Travel RN</span>
              </div>

              {/* Quote 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 rounded-2xl space-y-3">
                <p className="text-xs italic leading-relaxed text-slate-100 font-medium">
                  "The team was proactive and responsive, offering multiple healthcare contract options that matched my preferences with competitive pay."
                </p>
                <span className="text-[10px] font-bold tracking-wider block text-white/80">— Marcia Quincy, ICU Speciality Nurse</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Solid Blue Footer (Mockup Alignment) */}
      <footer className="bg-[#002677] text-white py-12 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          
          {/* Centered Links */}
          <div className="flex justify-center gap-8 text-xs font-bold text-slate-200">
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          {/* Social Icons (White outline circles) */}
          <div className="flex justify-center gap-4">
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/55 transition-all text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/55 transition-all text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/55 transition-all text-white">
              <Twitter className="h-4 w-4" />
            </a>
          </div>

          {/* App Store Download Badges (Image Alignment) */}
          <div className="flex justify-center gap-3.5">
            {/* Google Play */}
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-1.5 bg-black hover:bg-neutral-900 border border-[#A1A1A1] rounded-lg text-left text-white transition-colors shrink-0 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M3 20.35V3.65C3 3.1 3.4 2.8 3.9 3.1L12.5 12L3.9 20.9C3.4 21.2 3 20.9 3 20.35Z" fill="#EA4335" />
                <path d="M12.5 12L16.2 15.7L3.9 20.9L12.5 12Z" fill="#FBBC05" />
                <path d="M12.5 12L3.9 3.1L16.2 8.3L12.5 12Z" fill="#34A853" />
                <path d="M16.2 8.3L19.5 10.15C20.1 10.5 20.1 11.5 19.5 11.85L16.2 15.7L12.5 12L16.2 8.3Z" fill="#4285F4" />
              </svg>
              <div className="leading-none">
                <span className="text-[7.5px] uppercase font-bold text-white block">GET IT ON</span>
                <span className="text-[11.5px] font-bold block mt-0.5 text-white">Google Play</span>
              </div>
            </a>

            {/* App Store */}
            <a href="#" className="flex items-center gap-2.5 px-3.5 py-1.5 bg-black hover:bg-neutral-900 border border-[#A1A1A1] rounded-lg text-left text-white transition-colors shrink-0 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.05-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.01 2.98 1.12.09 2.27-.61 2.96-1.44Z" />
              </svg>
              <div className="leading-none">
                <span className="text-[7.5px] uppercase font-bold text-white block">Download on the</span>
                <span className="text-[11.5px] font-bold block mt-0.5 text-white font-sans">App Store</span>
              </div>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 text-[10px] text-slate-400 font-medium w-full text-center">
            © 2026 Staff HC INC. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
