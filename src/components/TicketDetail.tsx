'use client';

import React from 'react';
import { Ticket } from '../data/mockTickets';
import { 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  Wifi, 
  Radio, 
  Activity, 
  Clock, 
  Crown, 
  AlertTriangle, 
  ShieldAlert, 
  History,
  HardDrive
} from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950/60 text-slate-100 overflow-y-auto p-4 space-y-4">
      {/* Header Customer Summary Bar */}
      <div className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-cyan-400 text-sm">{ticket.id}</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-400">{ticket.timestamp}</span>
            
            {ticket.customerTier === 'VIP Platinum' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-400" /> VIP Platinum Account
              </span>
            )}
            {ticket.customerTier === 'Enterprise Gold' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Enterprise Gold
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="h-4 w-4 text-cyan-400" />
            {ticket.customerName}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5 text-slate-500" /> Acc: {ticket.accountNo}</span>
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-slate-500" /> {ticket.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-500" /> {ticket.location}</span>
          </div>
        </div>

        {/* SLA Status Pill */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-3 self-start md:self-auto">
          <Clock className={`h-6 w-6 ${ticket.slaTimeRemainingMin < 25 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">SLA Target</div>
            <div className={`font-mono font-bold text-sm ${ticket.slaTimeRemainingMin < 25 ? 'text-rose-400' : 'text-slate-200'}`}>
              {ticket.slaTimeRemainingMin} min left
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Network Telemetry & Account History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* System & Hardware Telemetry Widget */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span>Live System Telemetry</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">
              Auto-Diagnostic Feed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Service Line</div>
              <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-indigo-400" />
                {ticket.telemetry.serviceType}
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Modem / Gateway Status</div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${
                  ticket.telemetry.modemStatus === 'OFFLINE' 
                    ? 'bg-rose-500 animate-ping' 
                    : ticket.telemetry.modemStatus === 'DEGRADED' 
                    ? 'bg-amber-500' 
                    : 'bg-emerald-400'
                }`} />
                <span className={`font-bold font-mono text-xs ${
                  ticket.telemetry.modemStatus === 'OFFLINE' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {ticket.telemetry.modemStatus}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Assigned Node ID</div>
              <div className="font-mono font-medium text-slate-200 mt-0.5">
                {ticket.telemetry.nodeId}
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Last Telemetry Ping</div>
              <div className="text-slate-300 font-mono text-[11px] mt-0.5 truncate">
                {ticket.telemetry.lastPing}
              </div>
            </div>
          </div>

          {ticket.telemetry.routerModel && (
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80 flex items-center gap-2">
              <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
              <span>Router Model: <strong className="text-slate-200">{ticket.telemetry.routerModel}</strong></span>
            </div>
          )}
        </div>

        {/* Customer Account & Loyalty History */}
        <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
              <History className="h-4 w-4 text-purple-400" />
              <span>Customer History & Tier</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Spend: {ticket.history.monthlySpend}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">Tickets (Last 30 Days)</div>
              <div className="font-bold text-slate-200 mt-0.5">
                {ticket.history.totalTickets30Days} ticket(s)
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400">CSAT Score</div>
              <div className="font-bold text-amber-400 mt-0.5">
                ⭐ {ticket.history.avgSatisfaction} / 5.0
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
            <div className="text-[10px] text-slate-400 mb-0.5">Prior Support Interaction</div>
            <p className="text-slate-300 italic text-[11px]">
              "{ticket.history.lastResolution}"
            </p>
          </div>
        </div>

      </div>

      {/* Raw Customer Complaint Box */}
      <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            Raw Customer Voice / Transcript
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Unstructured Text Input</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed relative">
          "{ticket.rawComplaint}"
        </div>
      </div>
    </div>
  );
};
