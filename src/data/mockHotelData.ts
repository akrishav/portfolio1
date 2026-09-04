import { Room, LoyaltyPerk, PersonalizedOffer, AnalyticsSummary, RecentBooking } from '../types/hotel';

export const LUXURY_ROOMS: Room[] = [
  {
    id: 'ocean-villa',
    name: 'Overwater Sunset Ocean Villa',
    tagline: 'Private Infinity Pool & Direct Ocean Access',
    category: 'villa',
    size: '185 m²',
    capacity: '2 Adults, 1 Child',
    bed: '1 King Bed',
    directPrice: 620,
    otaPrices: {
      bookingCom: 740,
      expedia: 725,
      agoda: 750,
    },
    rating: 4.98,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Suspended above crystal turquoise waters, this ocean villa features panoramic glass floor panels, a temperature-controlled infinity pool, personal butler service, and sunset viewing deck.',
    amenities: [
      'Private Infinity Pool',
      '24/7 Personal Butler',
      'Glass-bottom Lounge',
      'Freestanding Bath Tub',
      'Bose Sound System',
      'Nespresso & Premium Wine Cellar'
    ],
    directPerks: [
      'Guaranteed $100 Resort & Spa Credit',
      'Complimentary Floating Breakfast Daily',
      'Free Roundtrip Speedboat Transfer',
      'Flexible Cancellation up to 24h'
    ],
    featured: true
  },
  {
    id: 'sky-penthouse',
    name: 'Lumière Panoramic Sky Penthouse',
    tagline: 'Top Floor Corner Suite with Jacuzzi & City View',
    category: 'penthouse',
    size: '220 m²',
    capacity: '4 Guests',
    bed: '2 Super King Beds',
    directPrice: 890,
    otaPrices: {
      bookingCom: 1050,
      expedia: 1020,
      agoda: 1065,
    },
    rating: 4.96,
    reviewsCount: 98,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The pinnacle of luxury living on the 38th floor. Floor-to-ceiling glass walls frame stunning skyline views, accompanied by a private rooftop terrace and outdoor heated hydrotherapy jacuzzi.',
    amenities: [
      'Outdoor Heated Jacuzzi',
      'Private Dining Terrace',
      'Helipad Access Service',
      'Dyson Airwrap & Spa Bathrobes',
      'Cocktail Bar with Mixologist Service',
      'High-Speed Wi-Fi 6E'
    ],
    directPerks: [
      'Save $160/night Direct Member Savings',
      'VVIP Lounge Access & Afternoon Tea',
      'Late Checkout guaranteed till 3:00 PM',
      'Complimentary Champagne Bottled Welcome'
    ],
    featured: true
  },
  {
    id: 'zen-garden-suite',
    name: 'Kyoto Sanctuary Zen Suite',
    tagline: 'Private Onsen Bath & Bamboo Garden View',
    category: 'suite',
    size: '120 m²',
    capacity: '2 Guests',
    bed: '1 Luxury King Futon / Bed',
    directPrice: 450,
    otaPrices: {
      bookingCom: 535,
      expedia: 520,
      agoda: 540,
    },
    rating: 4.94,
    reviewsCount: 215,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed for peaceful retreat and rejuvenation. Features natural cedarwood architecture, private hot spring cedar tub (Onsen), tatami lounge area, and meditative garden views.',
    amenities: [
      'Private Natural Onsen Cedar Tub',
      'Matcha Tea Ceremony Set',
      'Organic Silk Robes & Yukata',
      'Aromatherapy Essential Oils',
      'Daily Meditation & Yoga Class Access'
    ],
    directPerks: [
      'Save $85/night vs Booking.com',
      'Complimentary Daily Organic Kaiseki Breakfast',
      '$50 Holistic Spa Coupon',
      'Free Early Check-in from 11:00 AM'
    ],
    featured: true
  },
  {
    id: 'executive-grand-suite',
    name: 'Grand Horizon Executive Ocean Suite',
    tagline: 'Spacious Suite with Private Balcony & Sea View',
    category: 'executive',
    size: '95 m²',
    capacity: '2 Adults, 2 Children',
    bed: '1 King Bed + Sofa Bed',
    directPrice: 380,
    otaPrices: {
      bookingCom: 445,
      expedia: 440,
      agoda: 455,
    },
    rating: 4.91,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Perfect blend of comfort, style, and functional elegance. Enjoy sweeping views of the coastline from your private sun deck with ergonomic work station and deep soaking tub.',
    amenities: [
      'Private Oceanview Balcony',
      'Marble Bathroom with Rain Shower',
      'Executive Work Desk & Ergonomic Chair',
      'Smart TV with Streaming Services',
      'In-room Dining 24/7'
    ],
    directPerks: [
      'Direct Member Discount (15% Off)',
      'Free High-Speed Wi-Fi Premium',
      'Complimentary Evening Cocktails',
      'Priority Room Upgrade Subject to Availability'
    ],
    featured: false
  }
];

export const LOYALTY_PERKS: LoyaltyPerk[] = [
  {
    id: 'perk-breakfast',
    title: 'Complimentary Gourmet Breakfast',
    description: 'Full daily buffet & à la carte breakfast for up to 2 guests.',
    value: 80,
    tierRequired: 'Member',
    icon: 'Coffee',
    includedInDirect: true
  },
  {
    id: 'perk-spa-credit',
    title: '$100 Resort & Spa Credit',
    description: 'Use towards holistic massage, fine dining, or private yacht charters.',
    value: 100,
    tierRequired: 'Gold',
    icon: 'Sparkles',
    includedInDirect: true
  },
  {
    id: 'perk-checkout',
    title: 'Guaranteed 2:00 PM Late Checkout',
    description: 'Relax longer on your departure day with guaranteed extended checkout.',
    value: 50,
    tierRequired: 'Silver',
    icon: 'Clock',
    includedInDirect: true
  },
  {
    id: 'perk-transfer',
    title: 'Luxury Airport / Harbor Transfer',
    description: 'Private Mercedes S-Class or Speedboat chauffeur transfer.',
    value: 120,
    tierRequired: 'Platinum',
    icon: 'Car',
    includedInDirect: true
  },
  {
    id: 'perk-upgrade',
    title: 'Instant Room Category Upgrade',
    description: 'Upgraded to next available room category upon check-in.',
    value: 150,
    tierRequired: 'Gold',
    icon: 'ArrowUpCircle',
    includedInDirect: true
  }
];

export const PERSONALIZED_OFFERS: PersonalizedOffer[] = [
  {
    id: 'offer-direct-exclusive',
    title: 'Direct Booking Privilege Pass',
    badge: 'EXCLUSIVE DIRECT SAVINGS',
    description: 'Book direct with Lumière AI assistant & get 18% instant rate drop plus $100 resort credit.',
    discountPercentage: 18,
    resortCredit: 100,
    bonusPerks: ['Free Floating Breakfast', 'Flexible Cancellation', 'Complimentary Champagne'],
    validUntil: 'Limited Time Deal',
    code: 'DIRECTPASS18'
  },
  {
    id: 'offer-romance-escape',
    title: 'Romantic Sanctuary Package',
    badge: 'COUPLES FAVOURITE',
    description: 'Includes candlelit beach dinner, 60-min couples massage, and rose petal bath setup.',
    discountPercentage: 15,
    resortCredit: 150,
    bonusPerks: ['Sunset Champagne Cruise', 'Late Checkout 3 PM', 'Couples Spa'],
    validUntil: 'Active Offer',
    code: 'ROMANCE2026'
  },
  {
    id: 'offer-wellness-retreat',
    title: 'Holistic Spa & Rejuvenation Stay',
    badge: 'WELLNESS SPECIAL',
    description: 'Daily private yoga session, organic detox meal plan, and unlimited thermal spa access.',
    discountPercentage: 20,
    resortCredit: 200,
    bonusPerks: ['Daily Thermal Bath Access', 'Organic Detox Juices', 'Personal Wellness Coach'],
    validUntil: 'Active Offer',
    code: 'WELLNESSVIP'
  }
];

export const SAMPLE_ITINERARY_DAY_BY_DAY = [
  {
    day: 1,
    title: 'Arrival & Tropical Sunset Magic',
    activities: [
      {
        time: '02:00 PM',
        activity: 'VIP Private Chauffeur Check-In',
        description: 'Warm welcome with cold towels, signature hibiscus cocktail, and seamless room check-in.',
        location: 'Lumière Resort Lobby'
      },
      {
        time: '05:30 PM',
        activity: 'Sunset Floating Lounge & Cocktails',
        description: 'Enjoy handcrafted botanical cocktails overlooking the infinity pool horizon.',
        location: 'Horizon Ocean Lounge'
      },
      {
        time: '07:30 PM',
        activity: 'Direct Guest Welcome Dinner',
        description: 'Fresh seafood & organic farm-to-table 4-course menu included with direct booking perk.',
        location: 'Azure Sea Grill Restaurant',
        includedPrice: 120
      }
    ]
  },
  {
    day: 2,
    title: 'Rejuvenation & Island Exploration',
    activities: [
      {
        time: '08:30 AM',
        activity: 'In-Villa Floating Gourmet Breakfast',
        description: 'Chef-prepared fresh pastries, tropical fruits, avocado toast & matcha lattes in your pool.',
        location: 'Your Private Villa',
        includedPrice: 80
      },
      {
        time: '11:00 AM',
        activity: 'Private Catamaran & Snorkeling Tour',
        description: 'Explore coral reefs, sea turtles, and hidden lagoons with private guide.',
        location: 'Resort Private Marina'
      },
      {
        time: '04:00 PM',
        activity: 'Signature Aromatherapy Spa Treatment',
        description: 'Relaxation session using local essential oils ($100 Resort Credit Applied).',
        location: 'Lumière Spa Sanctuary'
      }
    ]
  },
  {
    day: 3,
    title: 'Zen Relaxation & Departure Privileges',
    activities: [
      {
        time: '07:30 AM',
        activity: 'Sunrise Beach Meditation & Yoga',
        description: 'Mindfulness session led by master wellness instructor.',
        location: 'Private Ocean Pavilion'
      },
      {
        time: '01:00 PM',
        activity: 'Extended 2:00 PM Late Checkout',
        description: 'Relax without rushing thanks to Direct Booking Late Checkout Perk.',
        location: 'Your Villa'
      }
    ]
  }
];

export const ANALYTICS_DATA: AnalyticsSummary = {
  totalDirectRevenue: 184500,
  directRevenueGrowth: 34.2,
  otaCommissionsSaved: 36900, // 20% average saved on $184.5k
  directBookingShare: 68.4, // % of overall hotel bookings done direct vs OTAs
  directConversionRate: 18.2, // % vs 2.5% industry standard
  industryAvgConversionRate: 2.3,
  aiEngagementRate: 84.5,
  aiSatisfactionScore: 4.9,
  totalBookingsCount: 312,
  avgBookingValue: 591
};

export const RECENT_BOOKINGS: RecentBooking[] = [
  {
    id: 'BK-9082',
    guestName: 'Eleanor Vance',
    tier: 'Gold VIP',
    roomName: 'Overwater Sunset Ocean Villa',
    checkIn: '2026-08-10',
    checkOut: '2026-08-14',
    totalPaid: 2480,
    otaSaved: 480,
    perksSelected: ['Floating Breakfast', '$100 Spa Credit', 'Late Checkout'],
    bookingDate: '2 mins ago',
    status: 'Confirmed'
  },
  {
    id: 'BK-9081',
    guestName: 'Marcus Sterling',
    tier: 'Platinum',
    roomName: 'Lumière Panoramic Sky Penthouse',
    checkIn: '2026-08-15',
    checkOut: '2026-08-18',
    totalPaid: 2670,
    otaSaved: 510,
    perksSelected: ['Airport Transfer', 'Champagne Welcome', 'VVIP Lounge'],
    bookingDate: '14 mins ago',
    status: 'Confirmed'
  },
  {
    id: 'BK-9080',
    guestName: 'Dr. Aris Thorne',
    tier: 'Silver',
    roomName: 'Kyoto Sanctuary Zen Suite',
    checkIn: '2026-08-04',
    checkOut: '2026-08-07',
    totalPaid: 1350,
    otaSaved: 255,
    perksSelected: ['Kaiseki Breakfast', 'Spa Coupon'],
    bookingDate: '42 mins ago',
    status: 'Confirmed'
  },
  {
    id: 'BK-9079',
    guestName: 'Sophia Lorenzi',
    tier: 'Member',
    roomName: 'Grand Horizon Executive Ocean Suite',
    checkIn: '2026-08-01',
    checkOut: '2026-08-04',
    totalPaid: 1140,
    otaSaved: 195,
    perksSelected: ['Free High-Speed Wi-Fi', 'Evening Cocktails'],
    bookingDate: '1 hour ago',
    status: 'Checked-In'
  },
  {
    id: 'BK-9078',
    guestName: 'Jonathan Chen',
    tier: 'Gold VIP',
    roomName: 'Overwater Sunset Ocean Villa',
    checkIn: '2026-08-20',
    checkOut: '2026-08-25',
    totalPaid: 3100,
    otaSaved: 600,
    perksSelected: ['Floating Breakfast', 'Speedboat Transfer', '$100 Spa Credit'],
    bookingDate: '3 hours ago',
    status: 'Confirmed'
  }
];
