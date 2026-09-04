export interface Ticket {
  id: string;
  customerName: string;
  customerTier: 'VIP Platinum' | 'Enterprise Gold' | 'Standard Pro' | 'Basic';
  accountNo: string;
  phone: string;
  location: string;
  areaRegion: string;
  rawComplaint: string;
  timestamp: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Linked to Outage';
  slaTimeRemainingMin: number;
  initialPriority: 'Urgent' | 'High' | 'Medium' | 'Low';

  // System telemetry data
  telemetry: {
    serviceType: 'Fiber Broadband' | '5G Mobile Network' | 'VoIP Enterprise' | 'Direct Satellite';
    routerModel?: string;
    modemStatus: 'OFFLINE' | 'DEGRADED' | 'ONLINE' | 'NO_SIGNAL';
    nodeId: string;
    signalPowerDbm?: number;
    latencyMs?: number;
    lastPing: string;
  };

  // Prior Customer History
  history: {
    totalTickets30Days: number;
    lastResolution: string;
    avgSatisfaction: number;
    monthlySpend: string;
  };

  // AI Copilot Output Analysis
  copilot: {
    summary: string;
    issueType: string;
    keyFacts: string[];
    sentiment: 'Angry' | 'Frustrated' | 'Neutral' | 'Polite';
    
    // Priority calculation breakdown
    urgencyScore: number; // 0 - 100
    urgencyReasoning: string;
    slaRiskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    
    // Duplicate & Outage Detection (5th feature)
    outageDetected: boolean;
    outageIncidentId?: string;
    outageClusterCount?: number;
    outageLocation?: string;
    probableCause: string;

    // Recommended Actions
    nextBestActions: {
      id: string;
      title: string;
      description: string;
      type: 'OUTAGE_LINK' | 'REMOTE_RESET' | 'SCHEDULE_TECH' | 'SEND_ETA' | 'WAIVE_FEE';
      recommended?: boolean;
    }[];

    // Generated Customer Response Draft
    draftResponse: string;
  };
}

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TC-8921',
    customerName: 'Aarav Sharma (Corporate Account)',
    customerTier: 'VIP Platinum',
    accountNo: 'ACC-994820',
    phone: '+91 98765 43210',
    location: 'Indiranagar, Bangalore East',
    areaRegion: 'Bangalore East',
    rawComplaint: 'Internet not working since morning. We have an executive board meeting online right now and none of our fiber routers are connecting! Need urgent fix or SLA penalty will apply.',
    timestamp: '10 mins ago',
    status: 'Open',
    slaTimeRemainingMin: 18,
    initialPriority: 'Urgent',
    telemetry: {
      serviceType: 'Fiber Broadband',
      routerModel: 'Cisco Enterprise Gateway X9',
      modemStatus: 'OFFLINE',
      nodeId: 'BLR-EAST-NODE-409',
      signalPowerDbm: -34.5,
      latencyMs: 999,
      lastPing: 'Dropped at 08:14 AM'
    },
    history: {
      totalTickets30Days: 1,
      lastResolution: 'Speed upgrade processed on July 14',
      avgSatisfaction: 4.9,
      monthlySpend: '₹14,500/mo'
    },
    copilot: {
      summary: 'Complete loss of fiber broadband connectivity affecting executive operations since 08:14 AM. High SLA breach risk due to VIP Platinum tier.',
      issueType: 'Regional Broadband Outage',
      keyFacts: [
        'No WAN connection on Cisco Enterprise Gateway',
        'Customer running high-stakes board meeting',
        'SLA timer expiring in 18 minutes'
      ],
      sentiment: 'Angry',
      urgencyScore: 96,
      urgencyReasoning: 'VIP Platinum tier (+30), Active regional node outage affecting 27 users (+35), Critical SLA remaining < 20 min (+25), Escalated tone (+6)',
      slaRiskLevel: 'CRITICAL',
      outageDetected: true,
      outageIncidentId: 'INC-BLR-4092',
      outageClusterCount: 27,
      outageLocation: 'Bangalore East Substation 4',
      probableCause: 'Local Substation Fiber Cut during metro excavation in Bangalore East.',
      nextBestActions: [
        {
          id: 'nba-1',
          title: 'Link Ticket to Major Outage #INC-BLR-4092',
          description: 'Attaches customer to incident cluster & suppresses redundant field tech dispatch.',
          type: 'OUTAGE_LINK',
          recommended: true
        },
        {
          id: 'nba-2',
          title: 'Send Outage Alert & Repair ETR (Estimated 45 Min)',
          description: 'Automated SMS & email response reassuring VIP client with live field repair tracker.',
          type: 'SEND_ETA',
          recommended: true
        },
        {
          id: 'nba-3',
          title: 'Trigger Remote Backup LTE Failover Activation',
          description: 'Activates secondary SIM failover on enterprise gateway remotely.',
          type: 'REMOTE_RESET'
        },
        {
          id: 'nba-4',
          title: 'Apply Pro-rated SLA Bill Credit',
          description: 'Instantly applies 15% billing credit for VIP downtime policy compliance.',
          type: 'WAIVE_FEE'
        }
      ],
      draftResponse: 'Dear Mr. Sharma,\n\nWe sincerely apologize for the unexpected interruption to your fiber broadband connection during your critical meetings today.\n\nOur automated telemetry system has detected a physical fiber line outage affecting Substation BLR-EAST-NODE-409 in Bangalore East due to ongoing municipal road work. Our field engineering team is actively repairing the line on site.\n\n• Estimated Restoration Time: 45 minutes (approx 01:15 PM)\n• Incident Tracking ID: INC-BLR-4092\n\nWe have automatically credited your account for today\'s downtime. As an immediate workaround, we have sent a command to activate your secondary LTE failover line. Please power cycle your gateway once if lights remain amber.\n\nWe will update you directly the moment primary service is fully restored.\n\nWarm regards,\nTelecom Executive Support Team'
    }
  },
  {
    id: 'TC-8924',
    customerName: 'Priya Sundaram',
    customerTier: 'Enterprise Gold',
    accountNo: 'ACC-410928',
    phone: '+91 99001 12233',
    location: 'Koramangala, Bangalore South',
    areaRegion: 'Bangalore South',
    rawComplaint: 'My 5G SIM card lost network coverage after updating my plan to Unlimited Enterprise. Phone shows "No Service" repeatedly.',
    timestamp: '25 mins ago',
    status: 'Open',
    slaTimeRemainingMin: 45,
    initialPriority: 'High',
    telemetry: {
      serviceType: '5G Mobile Network',
      modemStatus: 'DEGRADED',
      nodeId: 'BLR-SOUTH-TOWER-12',
      lastPing: 'Connected (2G Fallback)'
    },
    history: {
      totalTickets30Days: 2,
      lastResolution: 'Plan upgrade executed yesterday',
      avgSatisfaction: 4.2,
      monthlySpend: '₹3,499/mo'
    },
    copilot: {
      summary: '5G network provisioning failure following plan migration to Unlimited Enterprise. SIM requires Over-The-Air (OTA) profile refresh.',
      issueType: 'SIM Provisioning Anomaly',
      keyFacts: [
        '5G plan active in billing database',
        'HLR network profile stuck in legacy state',
        'Device falling back to 2G/No Service'
      ],
      sentiment: 'Frustrated',
      urgencyScore: 74,
      urgencyReasoning: 'Enterprise Gold (+20), Single user issue without regional outage (+10), SLA time remaining 45m (+20), Provisioning mismatch (+24)',
      slaRiskLevel: 'MEDIUM',
      outageDetected: false,
      probableCause: 'Post-paid plan upgrade failed to sync with HLR (Home Location Register) network switch.',
      nextBestActions: [
        {
          id: 'nba-5G-1',
          title: 'Trigger Automated OTA SIM Profile Refresh',
          description: 'Sends network re-registration signal to refresh 5G credentials in 60s.',
          type: 'REMOTE_RESET',
          recommended: true
        },
        {
          id: 'nba-5G-2',
          title: 'Send eSIM / SIM Activation Confirmation SMS',
          description: 'Notifies customer with simple steps to toggle Flight Mode.',
          type: 'SEND_ETA',
          recommended: true
        }
      ],
      draftResponse: 'Hello Ms. Sundaram,\n\nThank you for reaching out to Enterprise Support. We noticed that your recent upgrade to the Unlimited Enterprise 5G plan required a quick network synchronization signal.\n\nOur system has just dispatched an Over-The-Air (OTA) SIM refresh to your device. Please follow these quick steps:\n1. Turn ON Flight Mode on your phone for 10 seconds.\n2. Turn OFF Flight Mode.\n\nYour phone will connect directly to the 5G Ultra-Fast network. Please let us know if signal returns!\n\nBest regards,\nTelecom Support Engine'
    }
  },
  {
    id: 'TC-8927',
    customerName: 'Venkatesh Rao',
    customerTier: 'Standard Pro',
    accountNo: 'ACC-104921',
    phone: '+91 94480 88776',
    location: 'Whitefield, Bangalore East',
    areaRegion: 'Bangalore East',
    rawComplaint: 'Broadband red light blinking since 9 AM. Need technician visit as soon as possible.',
    timestamp: '40 mins ago',
    status: 'Open',
    slaTimeRemainingMin: 110,
    initialPriority: 'Medium',
    telemetry: {
      serviceType: 'Fiber Broadband',
      routerModel: 'Huawei HG8145V5',
      modemStatus: 'OFFLINE',
      nodeId: 'BLR-EAST-NODE-409',
      lastPing: 'Offline since 08:14 AM'
    },
    history: {
      totalTickets30Days: 0,
      lastResolution: 'Installation completed 6 months ago',
      avgSatisfaction: 4.8,
      monthlySpend: '₹999/mo'
    },
    copilot: {
      summary: 'Broadband LOS (Loss of Signal) red light. Correlated with the major Bangalore East metro excavation outage.',
      issueType: 'Regional Outage Correlation',
      keyFacts: [
        'Modem LOS red light blinking',
        'Same node BLR-EAST-NODE-409 as INC-BLR-4092',
        'Technician visit NOT required (Outage on main cable line)'
      ],
      sentiment: 'Neutral',
      urgencyScore: 82,
      urgencyReasoning: 'Part of 27-ticket outage cluster in Bangalore East. Prevents unnecessary field technician dispatch.',
      slaRiskLevel: 'HIGH',
      outageDetected: true,
      outageIncidentId: 'INC-BLR-4092',
      outageClusterCount: 27,
      outageLocation: 'Bangalore East Substation 4',
      probableCause: 'Correlated with active Incident INC-BLR-4092.',
      nextBestActions: [
        {
          id: 'nba-v-1',
          title: 'Link to Outage INC-BLR-4092 & Cancel Tech Request',
          description: 'Prevents redundant truck roll and links ticket for auto-resolution when node recovers.',
          type: 'OUTAGE_LINK',
          recommended: true
        },
        {
          id: 'nba-v-2',
          title: 'Send Bulk Outage Status Notification',
          description: 'Informs subscriber about estimated repair time (01:15 PM).',
          type: 'SEND_ETA',
          recommended: true
        }
      ],
      draftResponse: 'Dear Mr. Rao,\n\nThank you for informing us. The blinking red light on your modem indicates a temporary signal loss from our main fiber hub in Bangalore East.\n\nThis is part of a local cable cut issue affecting multiple homes in your neighborhood (Incident #INC-BLR-4092). Our repair crew is already on site working to restore connection.\n\n• Expected Time of Repair: 01:15 PM\n\nYou do not need a technician visit at your home. Your modem will automatically reconnect once the main cable splice is completed.\n\nThank you for your patience,\nTelecom Customer Operations'
    }
  },
  {
    id: 'TC-8930',
    customerName: 'Meera Nair',
    customerTier: 'Basic',
    accountNo: 'ACC-883920',
    phone: '+91 97412 55443',
    location: 'MG Road, Central Business District',
    areaRegion: 'Bangalore Central',
    rawComplaint: 'Charged extra ₹450 on my monthly bill for international roaming packs that I never subscribed to.',
    timestamp: '1 hour ago',
    status: 'Open',
    slaTimeRemainingMin: 180,
    initialPriority: 'Low',
    telemetry: {
      serviceType: '5G Mobile Network',
      modemStatus: 'ONLINE',
      nodeId: 'BLR-CENTRAL-TOWER-01',
      lastPing: 'Active 1 min ago'
    },
    history: {
      totalTickets30Days: 1,
      lastResolution: 'Billing query resolved in June',
      avgSatisfaction: 4.0,
      monthlySpend: '₹599/mo'
    },
    copilot: {
      summary: 'Billing dispute regarding ₹450 international roaming charge. Telemetry shows subscriber was near airport border zone during network handoff.',
      issueType: 'Billing Discrepancy & Border Handoff',
      keyFacts: [
        '₹450 auto-roaming charge logged on July 22',
        'Data session logged near airport border cell tower',
        'Customer claims no international travel'
      ],
      sentiment: 'Polite',
      urgencyScore: 42,
      urgencyReasoning: 'Low SLA urgency (180m remaining), Non-disruptive billing query, Basic account tier.',
      slaRiskLevel: 'LOW',
      outageDetected: false,
      probableCause: 'Accidental transient border cell tower handoff near international transit hub.',
      nextBestActions: [
        {
          id: 'nba-m-1',
          title: 'Issue Courtesy Bill Refund of ₹450',
          description: 'One-click billing adjustment for inadvertent border tower usage.',
          type: 'WAIVE_FEE',
          recommended: true
        },
        {
          id: 'nba-m-2',
          title: 'Enable Free International Roaming Safeguard Lock',
          description: 'Prevents automatic border tower roaming without explicit SMS consent.',
          type: 'REMOTE_RESET'
        }
      ],
      draftResponse: 'Dear Ms. Nair,\n\nThank you for reaching out regarding the ₹450 roaming charge on your invoice.\n\nUpon checking our network logs, we found that your device briefly registered on a transit cell tower while passing near the airport zone, triggering an automatic roaming safety pack.\n\nBecause this was an unintended network handoff, we have immediately issued a ₹450 credit to your account balance and activated our Roaming Protection Guard on your SIM.\n\nYour revised invoice balance is now updated in the self-care app.\n\nWarm regards,\nTelecom Customer Support'
    }
  }
];

export const OUTAGE_CLUSTERS = [
  {
    incidentId: 'INC-BLR-4092',
    name: 'Bangalore East Metro Line Cable Disruption',
    nodeId: 'BLR-EAST-NODE-409',
    affectedArea: 'Bangalore East (Indiranagar, Whitefield, Marathahalli)',
    activeTicketCount: 27,
    status: 'IN_PROGRESS',
    startedAt: '08:14 AM',
    estimatedRestoration: '01:15 PM (In ~45 minutes)',
    impactSeverity: 'MAJOR',
    rootCause: 'Fiber trunk severed by heavy excavation equipment during Namma Metro extension work.'
  },
  {
    incidentId: 'INC-BOM-1022',
    name: 'Mumbai Central Substation Power Dip',
    nodeId: 'BOM-CENTRAL-NODE-102',
    affectedArea: 'Mumbai South / Lower Parel',
    activeTicketCount: 14,
    status: 'INVESTIGATING',
    startedAt: '11:30 AM',
    estimatedRestoration: '02:30 PM',
    impactSeverity: 'MODERATE',
    rootCause: 'Backup UPS power switch delay following grid voltage fluctuation.'
  }
];
