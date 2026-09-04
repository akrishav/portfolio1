'use client';

import React, { useState } from 'react';
import { Ticket } from '../data/mockTickets';
import { 
  Search, 
  Clock, 
  Crown, 
  AlertCircle, 
  Radio, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface TicketQueueProps {
  tickets: Ticket[];
  selectedTicketId: string;
  onSelectTicket: (id: string) => void;
}

export const TicketQueue: React.FC<TicketQueueProps> = ({
  tickets,
  selectedTicketId,
  onSelectTicket,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'ALL' | 'OUTAGE' | 'VIP' | 'CRITICAL'>('ALL');

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.rawComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'OUTAGE') return t.copilot.outageDetected;
    if (filterTab === 'VIP') return t.customerTier === 'VIP Platinum' || t.customerTier === 'Enterprise Gold';
    if (filterTab === 'CRITICAL') return t.copilot.slaRiskLevel === 'CRITICAL' || t.slaTimeRemainingMin < 30;

    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900/80 border-r border-slate-800 text-white">
      {/* Search and Filters Header */}
      <div className="p-4 border-b border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
            <span>Incoming Ticket Stream</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-cyan-400 font-mono">
              {filteredTickets.length}
            </span>
          </h2>
          <span className="text-[11px] text-slate-400">Live Auto-Sorted</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets, names, locations..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-1">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              filterTab === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => setFilterTab('OUTAGE')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              filterTab === 'OUTAGE'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="h-3 w-3 text-rose-400 animate-pulse" /> Outage ({tickets.filter(t => t.copilot.outageDetected).length})
          </button>
          <button
            onClick={() => setFilterTab('VIP')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              filterTab === 'VIP'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="h-3 w-3 text-amber-400" /> VIP
          </button>
          <button
            onClick={() => setFilterTab('CRITICAL')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
              filterTab === 'CRITICAL'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="h-3 w-3 text-purple-400" /> SLA Risk
          </button>
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {filteredTickets.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No matching tickets found
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isSelected = ticket.id === selectedTicketId;
            const isCriticalSLA = ticket.slaTimeRemainingMin < 25;

            return (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                className={`p-3.5 transition-all cursor-pointer relative group border-l-2 ${
                  isSelected
                    ? 'bg-slate-800/90 border-l-cyan-400 shadow-md shadow-cyan-900/10'
                    : 'bg-transparent border-l-transparent hover:bg-slate-800/40'
                }`}
              >
                {/* Top info line */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-semibold text-cyan-400">
                      {ticket.id}
                    </span>

                    {/* Customer Tier Tag */}
                    {ticket.customerTier === 'VIP Platinum' && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium flex items-center gap-0.5">
                        <Crown className="h-2.5 w-2.5 text-amber-400" /> VIP
                      </span>
                    )}
                    {ticket.customerTier === 'Enterprise Gold' && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/30 font-medium">
                        Gold
                      </span>
                    )}

                    {/* Outage detected badge */}
                    {ticket.copilot.outageDetected && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold flex items-center gap-0.5">
                        <Zap className="h-2.5 w-2.5 text-rose-400 fill-rose-400" /> Outage ({ticket.copilot.outageClusterCount})
                      </span>
                    )}
                  </div>

                  {/* Urgency Score */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Urgency</span>
                    <span className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                      ticket.copilot.urgencyScore >= 85
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : ticket.copilot.urgencyScore >= 60
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {ticket.copilot.urgencyScore}
                    </span>
                  </div>
                </div>

                {/* Customer Name & Location */}
                <div className="font-medium text-xs text-slate-100 truncate mb-1">
                  {ticket.customerName}
                </div>
                <div className="text-[11px] text-slate-400 truncate mb-2">
                  📍 {ticket.location}
                </div>

                {/* Raw complaint snippet */}
                <p className="text-[11px] text-slate-300 line-clamp-2 bg-slate-950/40 p-1.5 rounded border border-slate-800/80 italic font-mono mb-2">
                  "{ticket.rawComplaint}"
                </p>

                {/* Bottom line: SLA Timer & Status */}
                <div className="flex items-center justify-between text-[10px]">
                  <div className={`flex items-center gap-1 font-mono font-medium ${
                    isCriticalSLA ? 'text-rose-400 animate-pulse' : 'text-slate-400'
                  }`}>
                    <Clock className="h-3 w-3" />
                    <span>SLA: {ticket.slaTimeRemainingMin} min remaining</span>
                  </div>

                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    ticket.status === 'Linked to Outage'
                      ? 'bg-rose-900/40 text-rose-300 border border-rose-700/50'
                      : ticket.status === 'Resolved'
                      ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
