'use client';

import React, { useState } from 'react';
import { Ticket } from '../data/mockTickets';
import { X, Sparkles, Send, Bot, Zap, Crown, User, MapPin } from 'lucide-react';

interface CustomTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTicket: (newTicket: Ticket) => void;
}

export const CustomTicketModal: React.FC<CustomTicketModalProps> = ({
  isOpen,
  onClose,
  onAddTicket
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerTier, setCustomerTier] = useState<Ticket['customerTier']>('VIP Platinum');
  const [location, setLocation] = useState('Bangalore East');
  const [rawComplaint, setRawComplaint] = useState('');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: 'PROMPT_DEMO' | 'SIM_5G' | 'FIBER_CUT' | 'BILLING') => {
    if (preset === 'PROMPT_DEMO') {
      setCustomerName('Aarav Sharma (Corporate Account)');
      setCustomerTier('VIP Platinum');
      setLocation('Indiranagar, Bangalore East');
      setRawComplaint('Internet not working since morning. We have an executive board meeting online right now and none of our fiber routers are connecting! Need urgent fix or SLA penalty will apply.');
    } else if (preset === 'SIM_5G') {
      setCustomerName('Rohan Verma');
      setCustomerTier('Enterprise Gold');
      setLocation('Koramangala, Bangalore South');
      setRawComplaint('My 5G SIM card lost network coverage after updating my plan to Unlimited Enterprise. Phone shows No Service repeatedly.');
    } else if (preset === 'FIBER_CUT') {
      setCustomerName('Siddharth Malhotra');
      setCustomerTier('VIP Platinum');
      setLocation('Whitefield, Bangalore East');
      setRawComplaint('Broadband red light blinking since 9 AM. Fiber line disconnected completely.');
    } else if (preset === 'BILLING') {
      setCustomerName('Ananya Deshmukh');
      setCustomerTier('Standard Pro');
      setLocation('Mumbai Central');
      setRawComplaint('Charged extra ₹450 on my monthly bill for international roaming packs that I never subscribed to.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawComplaint.trim()) return;

    const isBangaloreEastOutage = location.toLowerCase().includes('bangalore east') || rawComplaint.toLowerCase().includes('internet not working');
    const isVIP = customerTier === 'VIP Platinum' || customerTier === 'Enterprise Gold';

    const newTicketId = `TC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: Ticket = {
      id: newTicketId,
      customerName: customerName || 'Custom Telecom Customer',
      customerTier: customerTier,
      accountNo: `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      phone: '+91 98765 00000',
      location: location || 'Bangalore East',
      areaRegion: location.includes('Bangalore East') ? 'Bangalore East' : 'Metro Region',
      rawComplaint: rawComplaint,
      timestamp: 'Just now',
      status: 'Open',
      slaTimeRemainingMin: isVIP ? 20 : 60,
      initialPriority: isVIP ? 'Urgent' : 'High',
      telemetry: {
        serviceType: rawComplaint.toLowerCase().includes('sim') || rawComplaint.toLowerCase().includes('5g') ? '5G Mobile Network' : 'Fiber Broadband',
        routerModel: 'Cisco Enterprise Gateway X9',
        modemStatus: isBangaloreEastOutage ? 'OFFLINE' : 'DEGRADED',
        nodeId: isBangaloreEastOutage ? 'BLR-EAST-NODE-409' : 'GENERIC-NODE-101',
        lastPing: isBangaloreEastOutage ? 'Dropped at 08:14 AM' : 'Active 5m ago'
      },
      history: {
        totalTickets30Days: 1,
        lastResolution: 'Account updated',
        avgSatisfaction: 4.8,
        monthlySpend: isVIP ? '₹12,000/mo' : '₹1,499/mo'
      },
      copilot: {
        summary: `Loss of connectivity / complaint reported by ${customerTier} subscriber in ${location}. Copilot engine evaluated SLA impact and network logs.`,
        issueType: isBangaloreEastOutage ? 'Regional Broadband Outage' : 'Service Disruption Inquiry',
        keyFacts: [
          `Customer Tier: ${customerTier}`,
          `Location: ${location}`,
          `Target SLA: ${isVIP ? '20 min' : '60 min'}`
        ],
        sentiment: rawComplaint.toLowerCase().includes('urgent') || rawComplaint.toLowerCase().includes('meeting') ? 'Angry' : 'Frustrated',
        urgencyScore: isBangaloreEastOutage ? 96 : isVIP ? 82 : 65,
        urgencyReasoning: isBangaloreEastOutage 
          ? 'VIP Tier (+30), Active regional node outage in Bangalore East (+35), Critical SLA remaining (+25)' 
          : 'Custom customer query processed via AI urgency matrix.',
        slaRiskLevel: isBangaloreEastOutage ? 'CRITICAL' : isVIP ? 'HIGH' : 'MEDIUM',
        outageDetected: isBangaloreEastOutage,
        outageIncidentId: isBangaloreEastOutage ? 'INC-BLR-4092' : undefined,
        outageClusterCount: isBangaloreEastOutage ? 27 : 0,
        outageLocation: isBangaloreEastOutage ? 'Bangalore East Substation 4' : undefined,
        probableCause: isBangaloreEastOutage 
          ? 'Local Substation Fiber Cut during metro excavation in Bangalore East.' 
          : 'Network provisioning sync required.',
        nextBestActions: [
          {
            id: `nba-custom-1`,
            title: isBangaloreEastOutage ? 'Link to Incident #INC-BLR-4092' : 'Trigger Remote Modem Diagnostics',
            description: isBangaloreEastOutage ? 'Links ticket to Bangalore East cluster & sends ETR notification.' : 'Pings gateway and attempts automated profile refresh.',
            type: isBangaloreEastOutage ? 'OUTAGE_LINK' : 'REMOTE_RESET',
            recommended: true
          },
          {
            id: `nba-custom-2`,
            title: 'Send Automated ETR & Reassurance SMS',
            description: 'Dispatches instant update to customer mobile.',
            type: 'SEND_ETA',
            recommended: true
          }
        ],
        draftResponse: `Dear ${customerName.split(' ')[0] || 'Valued Customer'},\n\nWe have received your ticket regarding: "${rawComplaint.slice(0, 60)}...".\n\n${
          isBangaloreEastOutage 
            ? 'Our automated system identified an active fiber outage in Bangalore East (Incident #INC-BLR-4092). Our repair crews are already on site working to restore service by 01:15 PM.'
            : 'Our technical team is reviewing your connection diagnostics to resolve this immediately.'
        }\n\nWe apologize for any inconvenience caused and will update you directly.\n\nWarm regards,\nTelecom Support Operations`
      }
    };

    onAddTicket(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl text-white overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Simulate Customer Complaint & Test AI Copilot
              </h3>
              <p className="text-xs text-slate-400">
                Input custom complaint or choose sample prompt scenarios
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Quick Preset Scenarios
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleApplyPreset('PROMPT_DEMO')}
                className="p-2 text-left bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg text-cyan-300 transition-all font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-yellow-400 fill-current" />
                Prompt Demo (Bangalore East)
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('SIM_5G')}
                className="p-2 text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                📱 5G SIM Coverage Loss
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('FIBER_CUT')}
                className="p-2 text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                🔴 Modem Red Light (Fiber Cut)
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('BILLING')}
                className="p-2 text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                💳 Roaming Charge Dispute
              </button>
            </div>
          </div>

          {/* Customer Name & Tier */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Customer Tier</label>
              <select
                value={customerTier}
                onChange={(e) => setCustomerTier(e.target.value as any)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="VIP Platinum">VIP Platinum</option>
                <option value="Enterprise Gold">Enterprise Gold</option>
                <option value="Standard Pro">Standard Pro</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
          </div>

          {/* Location / Region */}
          <div className="text-xs">
            <label className="block text-slate-400 mb-1">Area / Location Region</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Indiranagar, Bangalore East"
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Raw Complaint Input */}
          <div className="text-xs">
            <label className="block text-slate-400 mb-1">Raw Customer Complaint Message</label>
            <textarea
              value={rawComplaint}
              onChange={(e) => setRawComplaint(e.target.value)}
              placeholder="Enter exact customer query text (e.g. Internet not working since morning...)"
              rows={4}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 focus:outline-none font-mono"
              required
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" /> Run AI Copilot Analysis
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
