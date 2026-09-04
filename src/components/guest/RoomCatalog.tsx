'use client';

import React, { useState } from 'react';
import { Room } from '../../types/hotel';
import { Star, Users, Maximize2, BedDouble, ShieldCheck, ArrowRight, Check, Sparkles } from 'lucide-react';

interface RoomCatalogProps {
  rooms: Room[];
  selectedRoom: Room;
  onSelectRoom: (room: Room) => void;
  onBookDirect: (room: Room) => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({
  rooms,
  selectedRoom,
  onSelectRoom,
  onBookDirect
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredRooms = filterCategory === 'all'
    ? rooms
    : rooms.filter(r => r.category === filterCategory);

  return (
    <section id="room-catalog" className="py-16 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LUXURY SUITES & PRIVATE VILLAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Our Luxury Accommodation Collection
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Every room booked direct includes complimentary breakfast, resort spa credit, and guaranteed late checkout.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Suites' },
              { id: 'villa', label: 'Overwater Villas' },
              { id: 'penthouse', label: 'Sky Penthouses' },
              { id: 'suite', label: 'Zen Sanctuary Suites' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            const otaDiff = room.otaPrices.bookingCom - room.directPrice;

            return (
              <div
                key={room.id}
                className={`group rounded-3xl bg-slate-950 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500/80 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                    : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
                }`}
              >
                {/* Image Showcase */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {room.featured && (
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
                        POPULAR CHOICE
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider backdrop-blur-md shadow-lg">
                      Save ${otaDiff}/Night Direct
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{room.rating}</span>
                    <span className="text-slate-400 font-normal">({room.reviewsCount})</span>
                  </div>

                  {/* Room Meta Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-xs font-medium text-slate-200">
                    <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                      <BedDouble className="w-3.5 h-3.5 text-amber-400" />
                      <span>{room.bed}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">{room.name}</h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{room.tagline}</p>
                    <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Direct Perks List */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-2">
                        Direct Booking Privileges Included:
                      </span>
                      {room.directPerks.map((perk, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Footer & CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-white font-mono">${room.directPrice}</span>
                        <span className="text-xs text-slate-400">/ night</span>
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ${room.otaPrices.bookingCom}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold block">
                        Best Rate Guaranteed (Direct)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectRoom(room)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Preview Details'}
                      </button>

                      <button
                        onClick={() => {
                          onSelectRoom(room);
                          onBookDirect(room);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                      >
                        <span>Book Direct</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
