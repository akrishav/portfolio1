export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'suite' | 'villa' | 'penthouse' | 'executive';
  size: string;
  capacity: string;
  bed: string;
  directPrice: number;
  otaPrices: {
    bookingCom: number;
    expedia: number;
    agoda: number;
  };
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  amenities: string[];
  directPerks: string[];
  featured?: boolean;
}

export interface LoyaltyPerk {
  id: string;
  title: string;
  description: string;
  value: number;
  tierRequired: 'Member' | 'Silver' | 'Gold' | 'Platinum';
  icon: string;
  includedInDirect: boolean;
}

export interface PersonalizedOffer {
  id: string;
  title: string;
  badge: string;
  description: string;
  discountPercentage: number;
  resortCredit: number;
  bonusPerks: string[];
  validUntil: string;
  code: string;
}

export interface TripItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
    location: string;
    includedPrice?: number;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedRoomIds?: string[];
  generatedItinerary?: TripItineraryDay[];
  suggestedActions?: string[];
}

export interface BookingState {
  roomId: string | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  selectedPerks: string[];
  appliedOfferCode: string | null;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
    loyaltyNumber: string;
  };
}

export interface AnalyticsSummary {
  totalDirectRevenue: number;
  directRevenueGrowth: number;
  otaCommissionsSaved: number;
  directBookingShare: number; // percentage
  directConversionRate: number;
  industryAvgConversionRate: number;
  aiEngagementRate: number;
  aiSatisfactionScore: number;
  totalBookingsCount: number;
  avgBookingValue: number;
}

export interface RecentBooking {
  id: string;
  guestName: string;
  tier: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPaid: number;
  otaSaved: number;
  perksSelected: string[];
  bookingDate: string;
  status: 'Confirmed' | 'Checked-In' | 'Completed';
}
