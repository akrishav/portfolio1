'use client';

import React, { useState, useEffect } from 'react';
import { Ticket } from '../data/mockTickets';
import { 
  Sparkles, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Copy, 
  ListChecks, 
  Flame, 
  MessageSquare, 
  Radio, 
  RefreshCw,
  ExternalLink,
  Edit3,
  Bot,
  Sliders,
  Check
} from 'lucide-react';

interface CopilotPanelProps {
  ticket: Ticket;
  onUpdateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  onOpenOutageMap: () => void;
}

export const CopilotPanel: React.FC<CopilotPanelProps> = ({
  ticket,
  onUpdateTicketStatus,
  onOpenOutageMap
}) => {
  const [draftText, setDraftText] = useState(ticket.copilot.draftResponse);
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [executedActionIds, setExecutedActionIds] = useState<string[]>([]);
  const [activeTone, setActiveTone] = useState<'Empathetic' | 'Technical' | 'Concise'>('Empathetic');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync draft when ticket changes
  useEffect(() => {
    setDraftText(ticket.copilot.draftResponse);
    setIsEditingDraft(false);
  }, [ticket]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tone Switcher simulation
  const handleToneChange = (tone: 'Empathetic' | 'Technical' | 'Concise') => {
    setActiveTone(tone);
    if (tone === 'Concise') {
      setDraftText(`Dear ${ticket.customerName.split(' ')[0]},\n\nWe are aware of the network disruption in ${ticket.location}. Incident #${ticket.copilot.outageIncidentId || 'INC-889'} is being handled by field engineers. Estimated restoration: 45 min. Auto-credit has been applied.\n\n- Telecom Customer Team`);
    } else if (tone === 'Technical') {
      setDraftText(`REGARDING INCIDENT #${ticket.copilot.outageIncidentId || 'INC-889'}:\nDiagnostic: Fiber Loss of Signal at node ${ticket.telemetry.nodeId}.\nCause: Trunk line severed.\nAction: Field splicing in progress.\nETR: T+45min. Subscriber profile updated.\n- Network Operations Center`);
    } else {
      setDraftText(ticket.copilot.draftResponse);
    }
    showNotification(`Adjusted draft tone to ${tone}`);
  };

  // Execute Next Best Action
  const handleExecuteAction = (actionId: string, type: string, title: string) => {
    if (executedActionIds.includes(actionId)) return;

    setExecutedActionIds([...executedActionIds, actionId]);

    if (type === 'OUTAGE_LINK') {
      onUpdateTicketStatus(ticket.id, 'Linked to Outage');
      showNotification(`Linked ${ticket.id} to Outage Cluster #${ticket.copilot.outageIncidentId || 'INC-BLR-4092'}`);
    } else if (type === 'REMOTE_RESET') {
      showNotification(`Sent remote reset command to Gateway/SIM (${ticket.telemetry.nodeId})`);
    } else if (type === 'SEND_ETA') {
      showNotification(`Dispatched Automated SMS with ETR to ${ticket.phone}`);
    } else if (type === 'WAIVE_FEE') {
      showNotification(`Applied billing adjustment credit to Account ${ticket.accountNo}`);
    } else {
      showNotification(`Executed Action: ${title}`);
    }
  };

  const handleSendDraft = () => {
    onUpdateTicketStatus(ticket.id, 'Resolved');
    showNotification(`Response dispatched to ${ticket.customerName}! Ticket status marked RESOLVED.`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-l border-slate-800 text-white overflow-y-auto relative">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="absolute top-3 left-3 right-3 z-50 bg-cyan-600 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce border border-cyan-400">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              AI Copilot Intelligence
              <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                v2.4 Live
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">Real-time diagnosis, priority & draft response</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        
        {/* FEATURE 5: Outage / Duplicate Detection Alert Banner */}
        {ticket.copilot.outageDetected && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border border-rose-500/50 shadow-lg shadow-rose-950/50 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <Radio className="h-4 w-4 animate-pulse text-rose-500" />
                <span>FEATURE 5: Regional Outage Cluster Detected!</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {ticket.copilot.outageClusterCount} Correlated Complaints
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-normal">
              Copilot identified <strong className="text-rose-300">{ticket.copilot.outageClusterCount} active complaints</strong> originating from <strong className="text-white">{ticket.copilot.outageLocation || ticket.areaRegion}</strong> within the last 30 minutes.
            </p>

            <div className="p-2 bg-slate-950/80 rounded border border-rose-900/60 text-[11px] text-slate-300">
              <strong className="text-amber-400">Probable Cause:</strong> {ticket.copilot.probableCause}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleExecuteAction('auto-outage-link', 'OUTAGE_LINK', 'Link to Outage')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/30 border border-rose-400/40"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                Link to Incident #{ticket.copilot.outageIncidentId || 'INC-BLR-4092'}
              </button>
              
              <button
                onClick={onOpenOutageMap}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1 border border-slate-700 cursor-pointer"
              >
                <ExternalLink className="h-3 w-3" /> Map View
              </button>
            </div>
          </div>
        )}

        {/* FEATURE 1: Ticket Summarization */}
        <div className="glass-panel rounded-xl p-3.5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>FEATURE 1: Ticket Summarization</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Auto-Parsed</span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            {ticket.copilot.summary}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-slate-950/40 p-2 rounded border border-slate-800/60">
              <span className="text-slate-400 block text-[10px]">Issue Classification</span>
              <strong className="text-cyan-300">{ticket.copilot.issueType}</strong>
            </div>
            <div className="bg-slate-950/40 p-2 rounded border border-slate-800/60">
              <span className="text-slate-400 block text-[10px]">Customer Sentiment</span>
              <strong className={`font-semibold ${
                ticket.copilot.sentiment === 'Angry' ? 'text-rose-400' : 'text-amber-400'
              }`}>{ticket.copilot.sentiment}</strong>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Key Context Extracted:</span>
            <ul className="text-xs space-y-1">
              {ticket.copilot.keyFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                  <span className="text-cyan-400 text-sm">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FEATURE 2: Priority Recommendation */}
        <div className="glass-panel rounded-xl p-3.5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Flame className="h-4 w-4" />
              <span>FEATURE 2: Priority Recommendation</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              ticket.copilot.slaRiskLevel === 'CRITICAL'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              SLA RISK: {ticket.copilot.slaRiskLevel}
            </span>
          </div>

          {/* Urgency Meter Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Recommended Urgency Score</span>
              <span className="font-mono font-extrabold text-sm text-cyan-400">
                {ticket.copilot.urgencyScore} / 100
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  ticket.copilot.urgencyScore >= 85
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 glow-rose'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-500 glow-cyan'
                }`} 
                style={{ width: `${ticket.copilot.urgencyScore}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
            <span className="text-slate-400 block text-[10px] font-semibold">Score Factor Reasoning:</span>
            {ticket.copilot.urgencyReasoning}
          </div>
        </div>

        {/* FEATURE 3: Next Best Action (NBA) */}
        <div className="glass-panel rounded-xl p-3.5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ListChecks className="h-4 w-4" />
              <span>FEATURE 3: Next Best Action (NBA)</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">1-Click Execution</span>
          </div>

          <div className="space-y-2">
            {ticket.copilot.nextBestActions.map((nba) => {
              const isExecuted = executedActionIds.includes(nba.id);

              return (
                <div
                  key={nba.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isExecuted
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : nba.recommended
                      ? 'bg-slate-950/80 border-cyan-500/40 hover:border-cyan-400'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-100">
                          {nba.title}
                        </h4>
                        {nba.recommended && !isExecuted && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            ★ RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {nba.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExecuteAction(nba.id, nba.type, nba.title)}
                      disabled={isExecuted}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                        isExecuted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <Check className="h-3 w-3" /> Executed
                        </>
                      ) : (
                        'Execute'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FEATURE 4: Response Draft */}
        <div className="glass-panel rounded-xl p-3.5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <MessageSquare className="h-4 w-4" />
              <span>FEATURE 4: AI Customer Response Draft</span>
            </div>

            {/* Tone Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {(['Empathetic', 'Technical', 'Concise'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleToneChange(t)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer ${
                    activeTone === t
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Draft Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Edit3 className="h-3 w-3 text-cyan-400" />
                Customer-Ready Response Preview
              </span>
              <button
                onClick={() => setIsEditingDraft(!isEditingDraft)}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                {isEditingDraft ? 'Done Editing' : 'Edit Text'}
              </button>
            </div>

            {isEditingDraft ? (
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                rows={8}
                className="w-full p-3 bg-slate-950 border border-cyan-500/50 rounded-lg text-xs text-slate-100 font-sans focus:outline-none leading-relaxed"
              />
            ) : (
              <div className="p-3 bg-slate-950/90 rounded-lg border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                {draftText}
              </div>
            )}
          </div>

          {/* Action Buttons: Approve & Send */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                navigator.clipboard.writeText(draftText);
                showNotification('Copied response draft to clipboard!');
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5" /> Copy Draft
            </button>

            <button
              onClick={handleSendDraft}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 border border-emerald-400/30 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" /> Approve & Send to Customer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
