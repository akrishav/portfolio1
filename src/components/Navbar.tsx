'use client';

import React from 'react';
import { Sparkles, ShieldCheck, BarChart3, Bot, Gift, ShoppingBag, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: 'guest' | 'admin';
  setActiveTab: (tab: 'guest' | 'admin') => void;
  onOpenCheckout: () => void;
  selectedRoomName?: string;
  selectedPerksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCheckout,
  selectedRoomName,
  selectedPerksCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Property */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-serif">LUMIÈRE</span>
                <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                  AI DIRECT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Grand Horizon Luxury Resort & Spa</p>
            </div>
          </div>
        </div>

        {/* Center Toggle: Guest AI Experience vs Hotel Admin Dashboard */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('guest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'guest'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Concierge & Booking</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Hotel Analytics Dashboard</span>
          </button>
        </div>

        {/* Right CTA / Loyalty Badge */}
        <div className="flex items-center gap-3">
          {activeTab === 'guest' ? (
            <>
              <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Best Rate Guaranteed (-18% OTA Fee)</span>
              </div>

              <button
                onClick={onOpenCheckout}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Book Direct</span>
                {selectedPerksCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-xs flex items-center justify-center font-bold">
                    {selectedPerksCount}
                  </span>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Live Admin Feed Connected
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
