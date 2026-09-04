'use client';

import React from 'react';
import { OUTAGE_CLUSTERS } from '../data/mockTickets';
import { X, Radio, AlertTriangle, CheckCircle, MapPin, Clock, Wrench } from 'lucide-react';

interface OutageMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutageMapModal: React.FC<OutageMapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Regional Telecom Outage Map & Incident Clusters
              </h3>
              <p className="text-xs text-slate-400">
                Live monitoring of physical fiber, 5G towers & substation hardware
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Simulated Geographic Grid Map */}
          <div className="relative h-48 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">REGIONAL TELEMETRY MAP • SOUTH ASIA ZONE 4</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Live Node Feed
              </span>
            </div>

            {/* Outage Location Markers */}
            <div className="relative z-10 grid grid-cols-2 gap-4 my-auto">
              
              {/* Marker 1: Bangalore East */}
              <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl flex items-center gap-3 shadow-lg shadow-rose-950/50">
                <div className="p-2 bg-rose-600 rounded-lg text-white font-mono font-bold text-xs animate-bounce">
                  27
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-400" /> Bangalore East
                  </div>
                  <div className="text-[10px] text-rose-300 font-mono">Node: BLR-EAST-NODE-409</div>
                  <div className="text-[10px] text-slate-400">Metro Cable Severance</div>
                </div>
              </div>

              {/* Marker 2: Mumbai South */}
              <div className="p-3 bg-amber-950/80 border border-amber-500/60 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-950/50">
                <div className="p-2 bg-amber-600 rounded-lg text-white font-mono font-bold text-xs">
                  14
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" /> Mumbai South
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono">Node: BOM-CENTRAL-NODE-102</div>
                  <div className="text-[10px] text-slate-400">Substation Voltage Dip</div>
                </div>
              </div>

            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Automatic Outage Correlation Engine Active</span>
              <span>Duplicate Ticket Suppression: ON</span>
            </div>
          </div>

          {/* List of Active Incident Clusters */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Active Regional Incidents ({OUTAGE_CLUSTERS.length})
            </h4>

            {OUTAGE_CLUSTERS.map((incident) => (
              <div
                key={incident.incidentId}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-cyan-400">
                      {incident.incidentId}
                    </span>
                    <h5 className="font-bold text-sm text-slate-100">
                      {incident.name}
                    </h5>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 font-mono">
                    {incident.activeTicketCount} Active Tickets
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Affected Region</span>
                    <strong>{incident.affectedArea}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Node ID</span>
                    <strong className="font-mono text-cyan-300">{incident.nodeId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Estimated ETR</span>
                    <strong className="text-amber-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {incident.estimatedRestoration}
                    </strong>
                  </div>
                </div>

                <div className="p-2 bg-slate-900 rounded text-xs text-slate-300 border border-slate-800 flex items-start gap-2">
                  <Wrench className="h-3.5 w-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-200">Root Cause: </strong>
                    {incident.rootCause}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
          >
            Close Outage View
          </button>
        </div>

      </div>
    </div>
  );
};
