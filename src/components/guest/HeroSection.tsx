'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Compass, Star, Gift, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onQuickPromptClick: (prompt: string) => void;
  onScrollToPlanner: () => void;
  onScrollToComparison: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickPromptClick,
  onScrollToPlanner,
  onScrollToComparison
}) => {
  const samplePrompts = [
    { label: '🏖️ 4-Day Romantic Sunset Villa', prompt: 'Plan a 4-day romantic getaway in an overwater villa with private pool, fine dining, and spa credits.' },
    { label: '🧘 Spa & Wellness Retreat', prompt: 'I want a luxury zen wellness trip with daily yoga, organic kaiseki dining, and private thermal baths.' },
    { label: '💼 Executive Penthouse Stay', prompt: 'Need a top-floor penthouse suite for 3 days with high-speed internet, late checkout, and heliport access.' }
  ];

  return (
    <div className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Direct Booking Engine</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Save up to $160/Night vs Booking.com & Expedia</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif tracking-tight leading-[1.15]">
            Plan Your Stay & Book Direct with <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">AI Intelligence</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Skip middleman commissions. Speak to our AI Concierge for tailored itineraries, customized room amenities, and instant direct perks worth up to $300.
          </p>
        </div>

        {/* Action Prompt Launcher Bar */}
        <div className="max-w-3xl mx-auto mb-8 p-3 bg-slate-900/90 rounded-2xl border border-slate-700/60 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 w-full sm:w-auto">
              <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
              <span className="text-sm font-medium text-slate-300 whitespace-nowrap">Ask Lumière AI:</span>
            </div>

            <div className="flex-1 w-full flex flex-wrap gap-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onQuickPromptClick(item.prompt);
                    onScrollToPlanner();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-xs font-medium text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onScrollToPlanner}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Start AI Chat</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Pill Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2 text-center">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center">
            <span className="text-amber-400 text-lg font-bold">100% Guaranteed</span>
            <span className="text-xs text-slate-400 mt-0.5">Lowest Direct Rate</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center">
            <span className="text-emerald-400 text-lg font-bold">$100 Credit</span>
            <span className="text-xs text-slate-400 mt-0.5">In-Resort & Spa Dining</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center">
            <span className="text-cyan-400 text-lg font-bold">Free Breakfast</span>
            <span className="text-xs text-slate-400 mt-0.5">Daily Gourmet Buffet</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center">
            <span className="text-purple-400 text-lg font-bold">2:00 PM Checkout</span>
            <span className="text-xs text-slate-400 mt-0.5">Extended VIP Flexibility</span>
          </div>
        </div>

      </div>
    </div>
  );
};
