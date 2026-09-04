'use client';

import React, { useState } from 'react';
import { ANALYTICS_DATA, RECENT_BOOKINGS } from '../../data/mockHotelData';
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Users,
  Bot,
  PieChart,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const summary = ANALYTICS_DATA;

  const filteredBookings = filterStatus === 'All'
    ? RECENT_BOOKINGS
    : RECENT_BOOKINGS.filter(b => b.status === filterStatus);

  return (
    <div className="py-10 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Title & Quick Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>LUMIÈRE HOTEL MANAGEMENT ENGINE</span>
            </div>
            <h1 className="text-3xl font-bold text-white font-serif">
              Direct Booking & OTA Savings Analytics
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time insights on direct revenue capture, OTA commission avoidance, and AI guest chat performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>This Month (August 2026)</span>
            </div>
          </div>
        </div>

        {/* 1. KEY KPI METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Direct Revenue */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-slate-400">Total Direct Revenue</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              ${summary.totalDirectRevenue.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{summary.directRevenueGrowth}% vs last month</span>
            </div>
          </div>

          {/* OTA Commission Saved */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-emerald-300">OTA Commission Saved</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              ${summary.otaCommissionsSaved.toLocaleString()}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Saved from ~20% OTA commission fees
            </p>
          </div>

          {/* AI Conversion Rate */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-cyan-300">Direct AI Conversion Rate</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">
              {summary.directConversionRate}%
            </div>
            <div className="mt-2 text-[11px] text-slate-300 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">7.9x Higher</span>
              <span>than industry avg ({summary.industryAvgConversionRate}%)</span>
            </div>
          </div>

          {/* AI CSAT & Engagement */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-purple-300">AI Concierge Satisfaction</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-purple-300 font-mono">
              {summary.aiSatisfactionScore} / 5.0
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              {summary.aiEngagementRate}% of guests interact with AI planner
            </p>
          </div>

        </div>

        {/* 2. CHARTS SECTION: CHANNEL DISTRIBUTION & CONVERSION FUNNEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Channel Share Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-400" />
                  <span>Channel Revenue Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">Direct Booking vs OTA Channels</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  {summary.directBookingShare}% DIRECT SHARE
                </span>
              </div>
            </div>

            {/* Visual Distribution Bars */}
            <div className="space-y-4">
              {/* Lumiere Direct */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    Lumière AI Direct (0% Commission)
                  </span>
                  <span className="text-amber-300 font-mono">${summary.totalDirectRevenue.toLocaleString()} (68.4%)</span>
                </div>
                <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-[68.4%]"></div>
                </div>
              </div>

              {/* Booking.com */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Booking.com (18% Commission)
                  </span>
                  <span className="text-slate-400 font-mono">$48,200 (17.8%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-600 rounded-full w-[17.8%]"></div>
                </div>
              </div>

              {/* Expedia */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    Expedia (20% Commission)
                  </span>
                  <span className="text-slate-400 font-mono">$24,500 (9.1%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-yellow-600 rounded-full w-[9.1%]"></div>
                </div>
              </div>

              {/* Agoda */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    Agoda (15% Commission)
                  </span>
                  <span className="text-slate-400 font-mono font-mono">$12,700 (4.7%)</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-purple-600 rounded-full w-[4.7%]"></div>
                </div>
              </div>
            </div>

            {/* Savings Callout Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
              <span>💡 By maintaining 68.4% direct share, property saved <strong>${summary.otaCommissionsSaved.toLocaleString()}</strong> in OTA fees this month.</span>
            </div>
          </div>

          {/* AI Conversion Funnel (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span>AI Booking Funnel Metrics</span>
              </h3>
              <p className="text-xs text-slate-400">Step-by-step guest conversion pipeline</p>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Funnel Step 1 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white">AI Concierge Started</h4>
                    <p className="text-[10px] text-slate-400">Guest initiates chat prompt</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">1,698 Guests</span>
              </div>

              {/* Funnel Step 2 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Room Match Recommender</h4>
                    <p className="text-[10px] text-slate-400">Customized suite matched</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">1,210 (71.2%)</span>
              </div>

              {/* Funnel Step 3 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white">OTA Price Match Viewed</h4>
                    <p className="text-[10px] text-slate-400">Saw direct savings callout</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">845 (49.7%)</span>
              </div>

              {/* Funnel Step 4 */}
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-emerald-300">Direct Checkout Completed</h4>
                    <p className="text-[10px] text-emerald-400/80">Confirmed direct booking</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-sm">309 (18.2%)</span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. RECENT DIRECT BOOKINGS STREAM TABLE */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Real-Time Direct Bookings Feed</h3>
              <p className="text-xs text-slate-400">Live stream of direct guest reservations and OTA fees avoided</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Filter Status:</span>
              {['All', 'Confirmed', 'Checked-In'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === st
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-mono">
                  <th className="p-3.5 font-semibold">Booking ID</th>
                  <th className="p-3.5 font-semibold">Guest Name & VIP Tier</th>
                  <th className="p-3.5 font-semibold">Suite Booked</th>
                  <th className="p-3.5 font-semibold">Dates</th>
                  <th className="p-3.5 font-semibold">Total Revenue</th>
                  <th className="p-3.5 font-semibold text-emerald-400">OTA Saved</th>
                  <th className="p-3.5 font-semibold">Selected Direct Perks</th>
                  <th className="p-3.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{b.id}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{b.guestName}</div>
                      <span className="text-[10px] text-amber-300 font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {b.tier}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium">{b.roomName}</td>
                    <td className="p-3.5 font-mono text-slate-400">
                      {b.checkIn} to {b.checkOut}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white">${b.totalPaid}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">+${b.otaSaved}</td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {b.perksSelected.map((p, i) => (
                          <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
