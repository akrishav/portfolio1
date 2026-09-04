'use client';

import React, { useState } from 'react';
import { Room, LoyaltyPerk, BookingState } from '../../types/hotel';
import { LOYALTY_PERKS, PERSONALIZED_OFFERS } from '../../data/mockHotelData';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  CreditCard,
  Sparkles,
  QrCode,
  ArrowRight,
  Download,
  Gift,
  Check
} from 'lucide-react';

interface DirectCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room;
  selectedPerkIds: string[];
  appliedOfferCode: string | null;
}

export const DirectCheckoutModal: React.FC<DirectCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  selectedPerkIds,
  appliedOfferCode
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Booking state
  const [checkIn, setCheckIn] = useState<string>('2026-08-10');
  const [checkOut, setCheckOut] = useState<string>('2026-08-14');
  const [guests, setGuests] = useState<number>(2);

  const [guestDetails, setGuestDetails] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    specialRequests: 'High floor, anniversary champagne setup in room.'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    id: string;
    date: string;
  } | null>(null);

  if (!isOpen) return null;

  // Calculate pricing breakdown
  const nights = 4; // Mock 4 nights default
  const baseRate = selectedRoom.directPrice * nights;
  const otaHighestRate = selectedRoom.otaPrices.bookingCom * nights;
  const otaSaved = otaHighestRate - baseRate;

  // Check offer discount
  const appliedOffer = PERSONALIZED_OFFERS.find(o => o.code === appliedOfferCode);
  const discountAmount = appliedOffer ? (baseRate * (appliedOffer.discountPercentage / 100)) : 0;
  const finalTotal = baseRate - discountAmount;

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingConfirmation({
        id: `BK-LUM-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Direct Booking Checkout</h3>
              <p className="text-[11px] text-slate-400">Guaranteed Direct Member Savings Applied</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-semibold">
          {[
            { num: 1, label: 'Dates & Suite' },
            { num: 2, label: 'Loyalty Perks' },
            { num: 3, label: 'Guest Info' },
            { num: 4, label: 'Confirmation' }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                step === s.num
                  ? 'text-amber-400'
                  : step > s.num
                  ? 'text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-amber-500 text-slate-950'
                    : step > s.num
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6">
          
          {/* STEP 1: Dates & Suite Selection */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-base font-bold text-white">{selectedRoom.name}</h4>
                  <p className="text-xs text-amber-400">{selectedRoom.tagline}</p>
                  <p className="text-xs font-mono text-emerald-400 mt-1 font-bold">
                    ${selectedRoom.directPrice} / night (Direct Rate)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* OTA Savings Callout */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Direct Guarantee: You save ${otaSaved} total vs Booking.com</span>
                </div>
                <span className="font-mono text-emerald-300 font-bold">${baseRate} Total</span>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Continue to Loyalty Perks</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Selected Perks Review */}
          {step === 2 && (
            <div className="space-y-5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Selected Direct Member Perks ($0 Extra Cost)</span>
              </h4>

              <div className="space-y-2.5">
                {selectedPerkIds.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950 text-slate-400 text-xs text-center border border-slate-800">
                    No perks selected. Default Direct Floating Breakfast & Late Checkout will automatically apply.
                  </div>
                ) : (
                  selectedPerkIds.map((perkId) => {
                    const perk = LOYALTY_PERKS.find(p => p.id === perkId);
                    if (!perk) return null;
                    return (
                      <div key={perk.id} className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{perk.title}</span>
                        </div>
                        <span className="text-emerald-400 font-mono font-bold">$0 (Value ${perk.value})</span>
                      </div>
                    );
                  })
                )}
              </div>

              {appliedOffer && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500 flex items-center justify-between text-xs text-emerald-300">
                  <span>Applied Promo Package: <strong>{appliedOffer.title} ({appliedOffer.code})</strong></span>
                  <span className="font-mono font-bold">-{appliedOffer.discountPercentage}% OFF</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <span>Enter Guest Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Instant Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">First Name</label>
                  <input
                    type="text"
                    value={guestDetails.firstName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={guestDetails.lastName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={guestDetails.email}
                  onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Special AI Requests / Dietary</label>
                <textarea
                  rows={2}
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Room Rate ({nights} Nights):</span>
                  <span>${baseRate}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Direct Promo Discount:</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>OTA Commission Saved:</span>
                  <span>${otaSaved} Saved</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-base text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-amber-400 font-mono">${finalTotal.toFixed(0)} USD</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Confirming Direct Reservation...</span>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Complete Booking (${finalTotal.toFixed(0)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Instant Confirmation & Digital Pass */}
          {step === 4 && bookingConfirmation && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  DIRECT RESERVATION CONFIRMED
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-3">
                  Thank You, {guestDetails.firstName}!
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Your reservation pass and AI trip itinerary have been created.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-500/40 p-5 rounded-2xl text-left space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Confirmation Code</span>
                    <p className="text-lg font-mono font-extrabold text-amber-400">{bookingConfirmation.id}</p>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-slate-950" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px]">Suite</span>
                    <p className="text-white font-bold truncate">{selectedRoom.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Check-In / Out</span>
                    <p className="text-white font-bold">{checkIn} to {checkOut}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-semibold flex items-center justify-between">
                  <span>OTA Savings Locked In:</span>
                  <span className="font-mono text-emerald-300 font-bold">${otaSaved} Saved</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close & Return to Concierge
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
