'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Room, ChatMessage, TripItineraryDay } from '../../types/hotel';
import { SAMPLE_ITINERARY_DAY_BY_DAY } from '../../data/mockHotelData';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Gift,
  Compass,
  Star,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';

interface AIChatPlannerProps {
  rooms: Room[];
  selectedRoom: Room;
  onSelectRoom: (room: Room) => void;
  onBookDirect: (room: Room) => void;
  initialPrompt?: string;
}

export const AIChatPlanner: React.FC<AIChatPlannerProps> = ({
  rooms,
  selectedRoom,
  onSelectRoom,
  onBookDirect,
  initialPrompt = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Welcome to Lumière Grand Horizon! I am your AI Direct Booking & Trip Assistant. 🌺\n\nTell me about your ideal getaway (e.g. romantic weekend, wellness spa retreat, family beach holiday, or executive business trip) and I'll generate a personalized itinerary, match you with our finest suites, and unlock direct member perks!`,
      timestamp: 'Just now',
      recommendedRoomIds: ['ocean-villa', 'zen-garden-suite'],
      suggestedActions: [
        'Generate 3-Day Romantic Itinerary',
        'Compare Sunset Villa vs Sky Penthouse',
        'What direct perks do I get?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeItinerary, setActiveItinerary] = useState<TripItineraryDay[] | null>(SAMPLE_ITINERARY_DAY_BY_DAY);
  const [showItinerary, setShowItinerary] = useState<boolean>(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Process initial prompt if passed from hero
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate smart AI response logic
    setTimeout(() => {
      let aiText = '';
      let recommendedIds: string[] = [];
      let newItinerary: TripItineraryDay[] | undefined = undefined;
      let actions: string[] = [];

      const qLower = query.toLowerCase();

      if (qLower.includes('romantic') || qLower.includes('villa') || qLower.includes('couples') || qLower.includes('sunset')) {
        aiText = `For a romantic getaway, I highly recommend our **Overwater Sunset Ocean Villa**! It comes with a private glass floor, ocean infinity pool, and personal butler.\n\n✨ **Exclusive Direct Booking Perks Included:**\n- Complimentary Floating Breakfast daily ($80/day value)\n- $100 Resort & Spa Credit\n- Guaranteed 2:00 PM Late Checkout\n- Save $120/night compared to Booking.com & Expedia!`;
        recommendedIds = ['ocean-villa', 'sky-penthouse'];
        newItinerary = SAMPLE_ITINERARY_DAY_BY_DAY;
        actions = ['Book Overwater Villa Direct', 'View Spa & Dining Options', 'Customize Itinerary'];
      } else if (qLower.includes('spa') || qLower.includes('wellness') || qLower.includes('kyoto') || qLower.includes('zen')) {
        aiText = `For a peaceful mind & body rejuvenation retreat, our **Kyoto Sanctuary Zen Suite** is ideal. Features private natural cedar Onsen bath, organic silk yukatas, and meditative garden views.\n\n🌿 **Direct Guest Privileges:**\n- Free Daily Organic Kaiseki Breakfast\n- $50 Holistic Spa Voucher\n- Free Early Check-in from 11:00 AM`;
        recommendedIds = ['zen-garden-suite', 'ocean-villa'];
        actions = ['Select Zen Suite', 'See Wellness Packages', 'Check Availability'];
      } else if (qLower.includes('executive') || qLower.includes('penthouse') || qLower.includes('business')) {
        aiText = `Our **Lumière Panoramic Sky Penthouse** offers 220 m² of top-floor luxury with high-speed Wi-Fi 6E, executive dining terrace, private heated hydrotherapy jacuzzi, and helipad transfer access.`;
        recommendedIds = ['sky-penthouse', 'executive-grand-suite'];
        actions = ['Reserve Sky Penthouse', 'Add Heli Airport Transfer', 'View Executive Lounge Perks'];
      } else {
        aiText = `I have updated your recommendations based on your preferences! By booking direct with Lumière AI, you save an average of 18% on nightly rates and receive up to $300 in resort dining & spa vouchers.`;
        recommendedIds = ['ocean-villa', 'sky-penthouse', 'zen-garden-suite'];
        actions = ['Compare OTA vs Direct Rates', 'View All Suites', 'Proceed to Direct Checkout'];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedRoomIds: recommendedIds,
        generatedItinerary: newItinerary,
        suggestedActions: actions
      };

      setMessages(prev => [...prev, aiMsg]);
      if (newItinerary) setActiveItinerary(newItinerary);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <section id="ai-planner" className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>CONVERSATIONAL AI TRIP CONCIERGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Chat, Plan & Book in One Seamless Experience
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Ask our AI assistant any trip questions, customize your itinerary, and lock in direct booking discounts.
          </p>
        </div>

        {/* Main Grid: Left Chat Panel / Right Interactive Itinerary & Room Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: AI Chat Console (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col h-[650px] bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Chat Top Bar */}
            <div className="px-5 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                    <Bot className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Lumière AI Concierge</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">ONLINE</span>
                  </h3>
                  <p className="text-xs text-slate-400">Direct Booking & Itinerary Specialist</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMessages([
                    {
                      id: `reset-${Date.now()}`,
                      sender: 'assistant',
                      text: 'Chat history reset. How may I assist with your hotel booking today?',
                      timestamp: 'Just now',
                      suggestedActions: ['Show Overwater Villas', 'Plan 3-Day Wellness Retreat']
                    }
                  ]);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-800 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-amber-500/10'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Embedded Room Recommendations if present */}
                      {msg.recommendedRoomIds && msg.recommendedRoomIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-700/80 space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                            Matched Suites for Direct Booking:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.recommendedRoomIds.map(id => {
                              const r = rooms.find(item => item.id === id);
                              if (!r) return null;
                              return (
                                <div
                                  key={r.id}
                                  className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-white truncate">{r.name}</span>
                                      <span className="text-xs font-mono font-bold text-emerald-400">${r.directPrice}/n</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{r.tagline}</p>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800">
                                    <span className="text-[10px] text-amber-300 font-medium">Includes $100 Credit</span>
                                    <button
                                      onClick={() => {
                                        onSelectRoom(r);
                                        onBookDirect(r);
                                      }}
                                      className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400 transition-colors flex items-center gap-1"
                                    >
                                      <span>Select</span>
                                      <ArrowRight className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timestamp & Suggested Action Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 px-1">
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>

                      {msg.suggestedActions && msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 items-center text-slate-400 text-xs py-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Bot className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-slate-300 ml-1">Lumière AI is calculating direct rates & itinerary...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask anything (e.g., 'Plan a 3-day honeymoon villa trip with floating breakfast')..."
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: AI Trip Itinerary & Dynamic Summary (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Itinerary Container Box */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Trip Itinerary</h3>
                    <p className="text-xs text-slate-400">Tailored schedule with included direct perks</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowItinerary(!showItinerary)}
                  className="text-slate-400 hover:text-white p-1 rounded"
                >
                  {showItinerary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {showItinerary && activeItinerary && (
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
                  {activeItinerary.map((day) => (
                    <div key={day.day} className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          Day {day.day}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">{day.title}</span>
                      </div>

                      <div className="space-y-3 mt-3">
                        {day.activities.map((act, actIdx) => (
                          <div key={actIdx} className="flex items-start gap-3 text-xs border-l-2 border-slate-800 pl-3">
                            <div className="text-slate-400 font-mono shrink-0 w-16 pt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400/80" />
                              <span>{act.time}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-white flex items-center gap-1.5">
                                <span>{act.activity}</span>
                                {act.includedPrice && (
                                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                                    ${act.includedPrice} Direct Benefit
                                  </span>
                                )}
                              </h4>
                              <p className="text-slate-400 mt-0.5 leading-relaxed">{act.description}</p>
                              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{act.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Booking Lock-In Card */}
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-emerald-950/40 rounded-2xl border border-amber-500/40 p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Active Room Selected: {selectedRoom.name}</h4>
                  <p className="text-xs text-amber-300">Direct Rate: ${selectedRoom.directPrice}/night</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Direct Rate Discount:</span>
                  <span>-18% vs Booking.com</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Resort Spa Voucher:</span>
                  <span>$100 Credit Included</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Breakfast Package:</span>
                  <span>Free Daily ($80/d value)</span>
                </div>
              </div>

              <button
                onClick={() => onBookDirect(selectedRoom)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <span>Proceed to Direct Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
