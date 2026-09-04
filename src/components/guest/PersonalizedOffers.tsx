'use client';

import React from 'react';
import { LoyaltyPerk, PersonalizedOffer } from '../../types/hotel';
import { LOYALTY_PERKS, PERSONALIZED_OFFERS } from '../../data/mockHotelData';
import { Gift, ShieldCheck, Check, Sparkles, Coffee, Clock, Car, ArrowUpCircle, Tag, CheckCircle2 } from 'lucide-react';

interface PersonalizedOffersProps {
  selectedPerkIds: string[];
  onTogglePerk: (perkId: string) => void;
  appliedOfferCode: string | null;
  onApplyOffer: (offerCode: string) => void;
}

export const PersonalizedOffers: React.FC<PersonalizedOffersProps> = ({
  selectedPerkIds,
  onTogglePerk,
  appliedOfferCode,
  onApplyOffer
}) => {
  
  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'Car': return <Car className="w-5 h-5 text-amber-400" />;
      case 'ArrowUpCircle': return <ArrowUpCircle className="w-5 h-5 text-amber-400" />;
      default: return <Gift className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="personalized-offers" className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Gift className="w-3.5 h-3.5" />
              <span>DIRECT MEMBER LOYALTY PERKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Personalized Perks & Direct Offers
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select your complimentary perks ($0 added cost when booking direct).
            </p>
          </div>

          {/* Guest VIP Tier Badge */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/40 px-4 py-2.5 rounded-xl shadow-lg">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-extrabold text-xs">
              GOLD
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <span>Gold VIP Direct Guest Status</span>
              </div>
              <p className="text-[11px] text-slate-400">Unlocked 5 Free Complimentary Extras</p>
            </div>
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {LOYALTY_PERKS.map((perk) => {
            const isSelected = selectedPerkIds.includes(perk.id);
            return (
              <div
                key={perk.id}
                onClick={() => onTogglePerk(perk.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500 rounded-bl-2xl flex items-center justify-center text-slate-950 font-bold">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {getPerkIcon(perk.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white pr-8">{perk.title}</h4>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        ${perk.value} Value • FREE Direct Perk
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {perk.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Tier: {perk.tierRequired} VIP</span>
                  <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                    {isSelected ? '✓ Perk Added' : '+ Add Perk'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Exclusive Promotional Packages / Offers */}
        <div className="mt-8 bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <span>Curated Promotional Packages</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PERSONALIZED_OFFERS.map((offer) => {
              const isApplied = appliedOfferCode === offer.code;
              return (
                <div
                  key={offer.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between ${
                    isApplied
                      ? 'bg-emerald-950/40 border-emerald-500'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                      {offer.badge}
                    </div>
                    <h4 className="text-base font-bold text-white">{offer.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 mb-3">{offer.description}</p>
                    
                    <div className="space-y-1 text-xs text-emerald-400 font-semibold mb-4">
                      {offer.bonusPerks.map((bp, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">{offer.code}</span>
                    <button
                      onClick={() => onApplyOffer(offer.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isApplied
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200'
                      }`}
                    >
                      {isApplied ? 'Applied ✓' : 'Apply Package'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
