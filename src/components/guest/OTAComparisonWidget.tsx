'use client';

import React, { useState } from 'react';
import { Room } from '../../types/hotel';
import { ShieldCheck, CheckCircle2, XCircle, TrendingDown, Sparkles, ArrowRight, DollarSign } from 'lucide-react';

interface OTAComparisonWidgetProps {
  rooms: Room[];
  selectedRoom: Room;
  onSelectRoom: (room: Room) => void;
  onBookDirect: (room: Room) => void;
}

export const OTAComparisonWidget: React.FC<OTAComparisonWidgetProps> = ({
  rooms,
  selectedRoom,
  onSelectRoom,
  onBookDirect
}) => {
  const [nights, setNights] = useState<number>(3);

  // Prices calculation
  const directTotal = selectedRoom.directPrice * nights;
  const bookingComTotal = selectedRoom.otaPrices.bookingCom * nights;
  const expediaTotal = selectedRoom.otaPrices.expedia * nights;
  const agodaTotal = selectedRoom.otaPrices.agoda * nights;

  // Maximum OTA total to compare savings against
  const highestOTATotal = Math.max(bookingComTotal, expediaTotal, agodaTotal);
  const totalSaved = highestOTATotal - directTotal;
  const perNightSaved = selectedRoom.otaPrices.bookingCom - selectedRoom.directPrice;

  return (
    <section id="ota-comparison" className="py-12 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>LIVE OTA PRICE MATCH & COMPARISON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">
              Why Book Direct with Lumière AI?
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Online Travel Agencies charge hotels 15% to 22% commissions. We pass those savings directly back to you.
            </p>
          </div>

          {/* Room Selector Dropdown / Tabs */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">Select Suite:</span>
            <select
              value={selectedRoom.id}
              onChange={(e) => {
                const found = rooms.find(r => r.id === e.target.value);
                if (found) onSelectRoom(found);
              }}
              className="bg-slate-900 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-amber-500 cursor-pointer"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (${r.directPrice}/night)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive Stay Length Slider & Live Savings Callout */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-6 rounded-2xl border border-amber-500/30 mb-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Slider */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <span>Stay Duration:</span>
                  <span className="text-amber-400 font-bold text-base px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </label>
                <span className="text-xs text-slate-400">Drag to see total stay savings</span>
              </div>
              
              <input
                type="range"
                min="1"
                max="7"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-xs text-slate-400 px-1 font-mono">
                <span>1 Night</span>
                <span>3 Nights</span>
                <span>5 Nights</span>
                <span>7 Nights</span>
              </div>
            </div>

            {/* Savings Callout Box */}
            <div className="lg:col-span-5 bg-emerald-950/50 border border-emerald-500/40 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold block">
                  Total Direct Savings ({nights} Nights)
                </span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  ${totalSaved} USD
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Saved vs Booking.com + includes $100 Resort Credit
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>

          </div>
        </div>

        {/* Live Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl bg-slate-950/90">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider bg-slate-900/90 text-slate-400">
                <th className="p-4 sm:p-5 font-semibold text-slate-300">Channel / Booking Source</th>
                <th className="p-4 sm:p-5 font-semibold">Nightly Rate</th>
                <th className="p-4 sm:p-5 font-semibold text-amber-300">Total ({nights} Nights)</th>
                <th className="p-4 sm:p-5 font-semibold">Free Breakfast</th>
                <th className="p-4 sm:p-5 font-semibold">$100 Spa Credit</th>
                <th className="p-4 sm:p-5 font-semibold">Late Checkout</th>
                <th className="p-4 sm:p-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              
              {/* DIRECT BOOKING (HIGHLIGHTED ROW) */}
              <tr className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-900 border-l-4 border-l-amber-500">
                <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/30">
                    AI
                  </div>
                  <div>
                    <span className="text-base text-amber-300">Lumière Direct Booking</span>
                    <span className="block text-xs font-normal text-amber-400/90">Best Rate Guarantee + Perks</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 font-bold text-emerald-400 text-lg font-mono">
                  ${selectedRoom.directPrice}
                </td>
                <td className="p-4 sm:p-5 font-extrabold text-amber-300 text-xl font-mono">
                  ${directTotal}
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Included Free ($80/d)</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>$100 Voucher</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Guaranteed 2:00 PM</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-right">
                  <button
                    onClick={() => onBookDirect(selectedRoom)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/25 flex items-center gap-1.5 ml-auto"
                  >
                    <span>Reserve Direct</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>

              {/* BOOKING.COM ROW */}
              <tr className="hover:bg-slate-900/40 text-slate-300">
                <td className="p-4 sm:p-5 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Booking.com</span>
                </td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${selectedRoom.otaPrices.bookingCom}</td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${bookingComTotal}</td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>+$40 / day extra</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Not Included</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Standard 11 AM</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-right text-xs text-slate-500 font-medium">
                  +${selectedRoom.otaPrices.bookingCom - selectedRoom.directPrice}/night higher
                </td>
              </tr>

              {/* EXPEDIA ROW */}
              <tr className="hover:bg-slate-900/40 text-slate-300">
                <td className="p-4 sm:p-5 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span>Expedia</span>
                </td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${selectedRoom.otaPrices.expedia}</td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${expediaTotal}</td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>+$40 / day extra</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Not Included</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Subject to Fee</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-right text-xs text-slate-500 font-medium">
                  +${selectedRoom.otaPrices.expedia - selectedRoom.directPrice}/night higher
                </td>
              </tr>

              {/* AGODA ROW */}
              <tr className="hover:bg-slate-900/40 text-slate-300">
                <td className="p-4 sm:p-5 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Agoda</span>
                </td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${selectedRoom.otaPrices.agoda}</td>
                <td className="p-4 sm:p-5 font-mono text-slate-300">${agodaTotal}</td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>+$40 / day extra</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Not Included</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Standard 11 AM</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-right text-xs text-slate-500 font-medium">
                  +${selectedRoom.otaPrices.agoda - selectedRoom.directPrice}/night higher
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
