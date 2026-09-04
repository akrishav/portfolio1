export interface InterviewQA {
  id: string;
  category: "Elevator Pitch" | "FaktorOS & AI" | "Media.Net & Scale" | "0→1 & Founder" | "Strategy & Behavior" | "Fit & Transition";
  question: string;
  answer: string;
  keyTakeaways: string[];
  keyMetrics?: string[];
}

export interface TelecomCaseStep {
  step: string;
  title: string;
  content: string[];
}

export interface DemoScenario {
  id: string;
  customerInput: string;
  detectedType: string;
  detectedTier: "Premium" | "Standard" | "Enterprise";
  detectedArea: string;
  similarCount: number;
  slaRisk: "High" | "Medium" | "Low";
  priorityScore: number; // 0-100
  probableCause: string;
  nextBestAction: string;
  draftResponse: string;
}

export const INTERVIEW_QA_DATA: InterviewQA[] = [
  {
    id: "tell-me-about-yourself",
    category: "Elevator Pitch",
    question: "Tell me about yourself",
    answer:
      "I’m a product manager with 5+ years across AdTech, B2B SaaS, and AI. I started by building 0 to 1 products as a founder, then moved into scaled ad-tech at Media.net where I worked on targeting, classification workflows, and revenue optimization. Most recently at FaktorOS, I led an agentic AI ad platform, from customer discovery and PRD definition to MVP launch, pricing, and early design partner validation. My strength is combining user insight, analytics, and execution to build products that drive measurable business outcomes.",
    keyTakeaways: [
      "5+ years product experience across AdTech, B2B SaaS, and AI",
      "0 to 1 founder experience combined with scaled platform execution at Media.net",
      "Recent focus leading an agentic AI platform from discovery to MVP & GTM at FaktorOS",
      "Core value: Combining user insight, analytics, and fast execution for business outcomes",
    ],
    keyMetrics: ["5+ Years Exp", "0→1 Founder", "FaktorOS Agentic AI", "Media.net Scaled AdTech"],
  },
  {
    id: "walk-through-experience",
    category: "Elevator Pitch",
    question: "Walk me through your experience",
    answer:
      "I began with GoodMinds, where I was co-founder and product lead. That taught me customer discovery, MVP thinking, and fast experimentation. Then at Media.net, I worked in a large-scale ad-tech environment, improving contextual targeting, workflow automation, and monetization efficiency. At FaktorOS, I shifted into AI-native product management, leading a compliant agentic AI ad platform and working across product, GTM, and early partner validation.",
    keyTakeaways: [
      "GoodMinds: Founder mindset, customer discovery, MVP & fast experimentation",
      "Media.net: Scaled platform, contextual targeting, workflow automation",
      "FaktorOS: AI-native product management, compliance guardrails, early GTM",
    ],
    keyMetrics: ["GoodMinds 0→1", "Media.net Scale", "FaktorOS AI-Native"],
  },
  {
    id: "why-interested-in-role",
    category: "Fit & Transition",
    question: "Why are you interested in this role?",
    answer:
      "I’m most excited by roles where I can work at the intersection of user problems, business impact, and technology. My background in scaled platforms plus 0 to 1 AI products makes me effective in ambiguous environments. This role stands out because it seems to value both strategic thinking and hands-on execution, which is where I do my best work.",
    keyTakeaways: [
      "Thrives at the intersection of user problems, business impact, and technology",
      "Effective in ambiguous environments due to 0→1 + scaled platform blend",
      "Appreciates culture valuing strategic thinking paired with hands-on execution",
    ],
    keyMetrics: ["Ambiguity Navigation", "Strategy + Execution Blend"],
  },
  {
    id: "what-did-you-do-at-faktoros",
    category: "FaktorOS & AI",
    question: "What did you do at FaktorOS?",
    answer:
      "At FaktorOS, I was building an agentic AI ad platform for agencies. I conducted 12+ customer interviews and found that compliance, especially around data retention, was the biggest adoption blocker. That shaped our product roadmap toward zero-retention infrastructure. I led the MVP across Meta, Google, and TikTok, built the product framework for agentic decisioning and monitoring, and supported GTM with pricing and LOIs from design partners.",
    keyTakeaways: [
      "Conducted 12+ agency interviews pinpointing CISO compliance as adoption blocker #1",
      "Pivoted roadmap to zero-retention infrastructure & filed provisional patent IN202631054993",
      "Shipped 0→1 MVP across Meta, Google, TikTok",
      "Defined dual-tier pricing ($325 SME / $2,700 agency) & secured 3 signed LOIs",
    ],
    keyMetrics: ["12+ Agency Interviews", "Patent IN202631054993", "15-20% ROAS Lift", "3 Signed LOIs"],
  },
  {
    id: "agentic-ai-platform-meaning",
    category: "FaktorOS & AI",
    question: "What does ‘agentic AI platform’ mean in your work?",
    answer:
      "In our context, it meant building AI systems that could make bounded campaign decisions autonomously, such as pausing, reallocating, or optimizing budgets, while staying within compliance and monitoring guardrails. My role was to define where autonomy should exist, what needed human oversight, and how trust could be built through observability and attestation.",
    keyTakeaways: [
      "Autonomous campaign decisions (pause, reallocate, optimize) within strict guardrails",
      "Defined boundaries between fully autonomous actions and human-in-the-loop oversight",
      "Built enterprise trust via attestation and real-time observability dashboards",
    ],
    keyMetrics: ["Attested Pause-Reallocate", "Bounded Autonomy", "Human-in-the-Loop"],
  },
  {
    id: "biggest-achievement-faktoros",
    category: "FaktorOS & AI",
    question: "What was your biggest achievement at FaktorOS?",
    answer:
      "I’d say the biggest achievement was turning a vague AI opportunity into a validated product direction. We identified compliance as the core blocker, translated that into a differentiated roadmap, shipped an MVP, and demonstrated measurable performance improvement with a 15 to 20% ROAS lift for early partners.",
    keyTakeaways: [
      "Transformed vague AI hype into a validated enterprise product direction",
      "Translated CISO compliance friction into competitive advantage",
      "Delivered 15–20% ROAS uplift for early design partners",
    ],
    keyMetrics: ["15–20% ROAS Lift", "Vague Idea → Validated Roadmap"],
  },
  {
    id: "tell-me-about-the-patent",
    category: "FaktorOS & AI",
    question: "Tell me about the patent",
    answer:
      "The provisional patent (IN202631054993) was around zero-retention orchestration for compliant AI agents in AdTech. The idea was to enable AI-led decisioning without persistent storage of sensitive client data, which directly addressed enterprise trust and compliance concerns. My contribution was helping shape the product and system concept based on actual customer pain points.",
    keyTakeaways: [
      "Provisional Patent IN202631054993 filed on zero-retention agent orchestration",
      "Enables autonomous decisioning without persisting sensitive PII client data",
      "Bridge between enterprise CISO compliance requirements and real-time agent execution",
    ],
    keyMetrics: ["Patent IN202631054993", "Zero-Retention Infrastructure"],
  },
  {
    id: "what-did-you-do-at-medianet",
    category: "Media.Net & Scale",
    question: "What did you do at Media.net?",
    answer:
      "At Media.net, I worked on improving contextual ad targeting and supply efficiency. One major initiative involved mapping over 500K ad URLs, which improved data precision by 21% and contributed to 2% revenue growth. I also designed automation workflows for image and video classification, reducing manual review time by 30%, and analyzed high-value keywords to improve algorithmic matching by 18%.",
    keyTakeaways: [
      "Mapped 500K+ ad URLs -> +21% data precision and +2% revenue growth",
      "Automated image/video classification workflows -> 30% reduction in manual review time",
      "Analyzed 100K+ high-revenue keywords -> 18% ad-matching optimization",
      "Built custom Power BI dashboards identifying 8 monetization funnels -> 12% supply efficiency boost",
    ],
    keyMetrics: ["500K+ URLs Mapped", "+21% Data Precision", "-30% Review Time", "+18% Matching"],
  },
  {
    id: "how-measure-success",
    category: "Strategy & Behavior",
    question: "How did you measure success in your roles?",
    answer:
      "I usually measure success at three levels: user impact, business impact, and operational efficiency. For example, at FaktorOS, success was measured through partner validation, ROAS uplift, and LOIs. At Media.net, it was revenue growth, targeting precision, and reduced manual effort. I like defining clear success metrics early and revisiting them as the product evolves.",
    keyTakeaways: [
      "Three-tiered metric framework: User impact, Business impact, Operational efficiency",
      "FaktorOS: ROAS uplift (15-20%), LOIs, partner validation",
      "Media.net: Revenue (+2%), Precision (+21%), Review time reduction (-30%)",
    ],
    keyMetrics: ["3-Tier Metric Framework", "Early Alignment"],
  },
  {
    id: "0-to-1-product-built",
    category: "0→1 & Founder",
    question: "Tell me about a 0 to 1 product you built",
    answer:
      "GoodMinds was my first strong 0 to 1 experience. We started with a hypothesis around video-led learning and habit formation. Instead of overbuilding, we tested demand through a lightweight MVP and YouTube distribution, which got 5K+ views and 340 subscribers within 30 days. That helped validate interest before scaling investment.",
    keyTakeaways: [
      "Hypothesis: Video-led learning accelerates habit formation",
      "Lean MVP approach using YouTube distribution to test demand without overbuilding",
      "Gained 5K+ views and 340 subscribers in <30 days to validate PMF before capital outlay",
    ],
    keyMetrics: ["5K+ Views <30 Days", "340 Subscribers", "Lean Validation"],
  },
  {
    id: "customer-discovery-approach",
    category: "Strategy & Behavior",
    question: "How do you approach customer discovery?",
    answer:
      "I try to focus less on what users say they want and more on what blocks adoption or causes friction in their workflow. At FaktorOS, structured agency interviews revealed that compliance mattered more than performance claims at the early stage. That insight significantly changed our roadmap. I usually combine interviews, workflow observation, and behavioral signals from usage data where available.",
    keyTakeaways: [
      "Focus on friction points and adoption blockers rather than feature wish lists",
      "Uncovered CISO compliance priority over performance claims at FaktorOS",
      "Triangulate qualitative user interviews, direct workflow observation, and quantitative usage data",
    ],
    keyMetrics: ["Blocker Identification", "Qual + Quant Triangulation"],
  },
  {
    id: "prioritize-features",
    category: "Strategy & Behavior",
    question: "How do you prioritize features?",
    answer:
      "I use a mix of frameworks like RICE or MoSCoW, but I don’t treat them mechanically. I look at strategic importance, customer pain severity, implementation effort, and how quickly we can validate learning. For early-stage products, I prioritize features that reduce adoption friction or prove core value fast. For mature products, I focus more on scale and optimization.",
    keyTakeaways: [
      "Pragmatic RICE / MoSCoW usage balanced with business intuition",
      "Early-stage: Prioritize friction reduction and rapid value proof",
      "Mature stage: Prioritize scalable infrastructure, data precision, and margin optimization",
    ],
    keyMetrics: ["Pragmatic Frameworks", "Stage-dependent Prioritization"],
  },
  {
    id: "data-decision-example",
    category: "Strategy & Behavior",
    question: "Tell me about a time you used data to make a decision",
    answer:
      "At Media.net, I analyzed 100K+ high-revenue keywords to identify where ad-matching quality could be improved. That led to refinements in targeting logic and an 18% optimization across key categories. The important part was not just finding patterns, but connecting them to product or algorithm changes that had measurable business value.",
    keyTakeaways: [
      "Analyzed dataset of 100K+ high-value keywords to find targeting mismatch trends",
      "Refined algorithmic matching logic -> +18% targeting optimization",
      "Core principle: Connecting data insights directly to product & business changes",
    ],
    keyMetrics: ["100K+ Keywords Analyzed", "+18% Optimization"],
  },
  {
    id: "work-with-engineering-design",
    category: "Strategy & Behavior",
    question: "How do you work with engineering and design?",
    answer:
      "I try to create clarity early through PRDs, user flows, and success metrics, while still leaving room for technical input. With engineering, I focus on tradeoffs, dependencies, and scope control. With design, I work closely on user journeys and friction points. I see product management as creating alignment, not just requirements.",
    keyTakeaways: [
      "Early clarity with PRDs, user flows, and measurable OKRs",
      "Engineering: Collaborate on technical tradeoffs, edge cases, and scope control",
      "Design: Deep collaboration on user journeys and reducing cognitive load",
    ],
    keyMetrics: ["Alignment-First", "PRD Clarity"],
  },
  {
    id: "pm-style",
    category: "Strategy & Behavior",
    question: "What is your product management style?",
    answer:
      "My style is analytical, user-centered, and execution-focused. I like grounding decisions in evidence, whether that’s interviews, experiments, or usage data. At the same time, I’m comfortable making decisions under ambiguity and iterating quickly when information is incomplete.",
    keyTakeaways: [
      "Analytical: Grounded in empirical data and experiment results",
      "User-Centered: Deep empathy and direct workflow observation",
      "Execution-Focused: Comfortable with ambiguity, fast iteration, and shipping value",
    ],
    keyMetrics: ["Analytical + User-Centric", "Comfortable with Ambiguity"],
  },
  {
    id: "challenge-faced",
    category: "Strategy & Behavior",
    question: "Tell me about a challenge you faced",
    answer:
      "One challenge at FaktorOS was that agencies were interested in AI-led optimization, but hesitant to adopt because of compliance concerns. Instead of pushing performance features first, we reframed the problem around trust and infrastructure. That shift helped us build a stronger value proposition and made conversations with partners much more concrete.",
    keyTakeaways: [
      "Challenge: Agency hesitation to adopt AI optimization due to CISO security policy",
      "Pivot: Reframed value prop from performance claims to zero-retention trust infrastructure",
      "Outcome: Breakthrough in partner engagement and signed LOIs",
    ],
    keyMetrics: ["Hesitation → Trust Reframe", "3 Signed LOIs"],
  },
  {
    id: "strengths",
    category: "Strategy & Behavior",
    question: "What are your strengths?",
    answer:
      "My key strengths are 0 to 1 thinking, customer discovery, structured problem solving, and translating ambiguity into execution. I’m also strong in analytics and can move comfortably between strategy discussions and operational detail.",
    keyTakeaways: [
      "0→1 product thinking & lean validation",
      "Structured problem solving & customer discovery",
      "Translating high-level ambiguity into concrete PRDs and code execution",
      "Full spectrum capability: From board-level strategy to SQL/analytics detail",
    ],
    keyMetrics: ["0→1 Thinking", "Structured Problem Solving", "Analytics Rigor"],
  },
  {
    id: "weakness",
    category: "Strategy & Behavior",
    question: "What is a weakness you are working on?",
    answer:
      "One area I’ve worked on is balancing depth with speed. Earlier, I sometimes spent too much time refining before testing. Over time, especially through startup and AI product work, I’ve become much better at shipping lean, validating quickly, and improving through iteration.",
    keyTakeaways: [
      "Past tendency: Spending excess time refining PRDs/designs before initial validation",
      "Growth: Adopted fast prototyping, lean MVPs, and rapid iteration cycles",
      "Current state: High speed without compromising analytical rigor",
    ],
    keyMetrics: ["Depth vs Speed Balance", "Iterative Execution"],
  },
  {
    id: "founder-to-pm",
    category: "Fit & Transition",
    question: "Why did you move from founder to product management?",
    answer:
      "Founding gave me ownership and first-principles thinking, but I realized what I enjoy most is solving product problems at depth, especially where user needs, technology, and business strategy meet. Product management lets me do that repeatedly, whether in startup or scaled environments.",
    keyTakeaways: [
      "Founding cultivated first-principles ownership and resilience",
      "Passionate about deep product problem-solving at the tech + business nexus",
      "PM allows repeating this 0→1 and scale cycle continuously",
    ],
    keyMetrics: ["First-Principles Ownership", "Product Depth Focus"],
  },
  {
    id: "why-should-we-hire-you",
    category: "Fit & Transition",
    question: "Why should we hire you?",
    answer:
      "You should hire me because I bring a mix of startup speed, analytical rigor, and real product execution across both traditional ad-tech and emerging AI products. I’ve worked on customer discovery, platform optimization, workflow automation, and 0 to 1 AI systems, and I know how to connect product decisions to measurable business outcomes.",
    keyTakeaways: [
      "Unique combo: Startup 0→1 speed + scaled ad-tech analytical rigor",
      "Proven track record in emerging Agentic AI & zero-retention compliance",
      "Consistently connects product execution to top-line & efficiency metrics",
    ],
    keyMetrics: ["Startup Speed + Enterprise Scale", "Proven Agentic AI Delivery"],
  },
  {
    id: "three-to-five-year-vision",
    category: "Fit & Transition",
    question: "Where do you see yourself in 3 to 5 years?",
    answer:
      "I see myself growing into a senior product leadership role, ideally continuing to work on AI-native or platform products. I want to keep building products that solve meaningful problems, while becoming stronger at leading teams, product strategy, and cross-functional execution.",
    keyTakeaways: [
      "Path toward Senior Product Leadership in AI-native or platform products",
      "Goal: Drive high-impact product strategy while mentoring cross-functional teams",
    ],
    keyMetrics: ["Product Leadership Growth", "AI-Native Focus"],
  },
  {
    id: "education-timeline",
    category: "Fit & Transition",
    question: "If asked about education timeline or degree blend",
    answer:
      "I pursued my master’s while continuing to build product experience, and I’ve been intentional about combining academic learning in data science with hands-on product work. For me, the value has been in applying technical understanding directly to product decisions.",
    keyTakeaways: [
      "Intentional combination of MS Data Science with hands-on product management",
      "B.Tech CS + MS Data Science directly powers technical AI & analytics product work",
    ],
    keyMetrics: ["MS Data Science", "B.Tech CS"],
  },
  {
    id: "international-exposure",
    category: "Fit & Transition",
    question: "If asked about international exposure",
    answer:
      "I’ve worked in cross-cultural contexts and have also traveled to 20+ countries, which has helped me become adaptable and comfortable with different users, teams, and market perspectives. That’s especially useful in products with global customers or distributed stakeholders.",
    keyTakeaways: [
      "Worked across Berlin, Germany and Bangalore, India tech ecosystems",
      "Traveled to 20+ countries with German A2 proficiency",
      "High adaptability and global user empathy for multi-market platforms",
    ],
    keyMetrics: ["Berlin & India Experience", "20+ Countries Traveled"],
  },
  {
    id: "closing-statement",
    category: "Fit & Transition",
    question: "Closing statement",
    answer:
      "My background has been a mix of 0 to 1 building, scaled platform execution, and AI product development. I’m excited about opportunities where I can use that mix to build products that are both technically strong and commercially meaningful.",
    keyTakeaways: [
      "0→1 building + Scaled execution + AI product innovation",
      "Excited to drive technically strong and commercially meaningful products",
    ],
    keyMetrics: ["Commercially Meaningful", "Technically Rigorous"],
  },
];

export const TELECOM_CASE_STUDY: {
  title: string;
  problem: string;
  goal: string;
  personas: string[];
  assumptions: string[];
  frameworkSteps: TelecomCaseStep[];
  rolloutRoadmap: { phase: string; details: string }[];
  hybridJustification: string;
  metrics: string[];
  demoScenarios: DemoScenario[];
} = {
  title: "AI-Assisted Telecom Service Orchestration & Agent Copilot",
  problem:
    "Rising complaint volume, SLA breaches, un-prioritized premium customers, agent burnout, and inefficient ticket routing across internet/cellular support channels.",
  goal: "Reduce SLA misses, improve response/resolution time, prioritize high-value users, lower agent workload through automation, and elevate CSAT.",
  personas: [
    "Telecom Customer (Standard & Premium Tiers)",
    "Service Support Agent (Frontline triage & resolution)",
    "Field Technician (Physical fiber cut & hardware repairs)",
    "Service Operations Manager (Queue supervision & SLA metrics)",
  ],
  assumptions: [
    "Multi-channel ingestion (App, WhatsApp, Call Center, Email)",
    "Historical ticket & resolution data available for model training",
    "Customer CRM data integrated with real-time network outage monitors",
  ],
  frameworkSteps: [
    {
      step: "1",
      title: "Problem Understanding & Diagnosis",
      content: [
        "Unprecedented ticket volume surge causing SLA breaches on high-tier customers",
        "Agents context-switching between 4 different legacy tools without root-cause guidance",
        "Isolated complaints coming from identical pin codes not auto-clustered into network outage incidents",
      ],
    },
    {
      step: "2",
      title: "Core Solution: AI Service Orchestration Layer",
      content: [
        "AI Intake & Classification: Converts raw complaints into structured tags (broadband down, SIM activation, billing)",
        "Priority Engine: Multi-factor scoring combining Customer Tier, SLA Risk, Geography, Sentiment, and Outage Probability",
        "Automated Resolution: Auto-deflect routine issues (router reset, KYC, appointment scheduling) via self-serve",
        "Smart Routing: Instant skill & regional dispatch for field teams vs software agents",
      ],
    },
    {
      step: "3",
      title: "MVP Narrowing: Service Agent Copilot",
      content: [
        "Selected Frontline Service Agent as initial MVP focus persona for fastest SLA impact",
        "Top 4 Features: Automated Ticket Summarizer, Priority Recommendation Score, Next Best Action Suggestion, Pre-drafted Customer Response",
      ],
    },
  ],
  rolloutRoadmap: [
    {
      phase: "0 to 1 (MVP Launch)",
      details:
        "Rule-based + light NLP classifier for issue tagging & priority scoring. Launch Agent Copilot dashboard focusing on top 5 high-volume ticket types.",
    },
    {
      phase: "1 to 10 (ML & Outage Clustering)",
      details:
        "Train ML models on historical resolution data to predict SLA breaches early. Auto-cluster geo-located tickets into single network incident tickets.",
    },
    {
      phase: "10 to 100 (Proactive Autonomous Resolution)",
      details:
        "Predictive network monitoring triggers proactive customer notifications before complaints are logged. Auto-dispatch field technicians.",
    },
  ],
  hybridJustification:
    "We start hybrid. Pure rules are faster and controllable initially, especially for hard SLA thresholds and premium customer rules. AI adds immense value in NLP ticket classification, incident clustering, SLA risk prediction, and drafting agent responses. Best practical approach is hybrid, not AI for everything.",
  metrics: [
    "SLA Adherence %",
    "Average First Response Time (AFRT)",
    "Mean Time to Resolution (MTTR)",
    "First Contact Resolution (FCR) %",
    "Ticket Deflection Rate",
    "Premium Customer CSAT / NPS",
    "Agent Productivity per Shift",
  ],
  demoScenarios: [
    {
      id: "scen-1",
      customerInput: "My home broadband has been completely down since 8 AM today in HSR Layout! Need urgent help.",
      detectedType: "Broadband Network Outage",
      detectedTier: "Premium",
      detectedArea: "Bangalore East (HSR Layout)",
      similarCount: 34,
      slaRisk: "High",
      priorityScore: 94,
      probableCause: "Local Area Fiber Infrastructure Cut (Substation #4)",
      nextBestAction: "Cluster with Incident #OUT-8821, send proactive ETA notification, suppress individual field dispatch.",
      draftResponse:
        "Hi Ashish, we noticed a temporary local fiber disruption in HSR Layout affecting your line. Our network team is actively fixing it with estimated resolution by 2:30 PM. We have prioritized your account and will send an SMS update as soon as service is restored.",
    },
    {
      id: "scen-2",
      customerInput: "I tried inserting my new 5G SIM card but it says No Service and unactivated.",
      detectedType: "SIM Provisioning / Activation",
      detectedTier: "Standard",
      detectedArea: "Indiranagar",
      similarCount: 2,
      slaRisk: "Medium",
      priorityScore: 58,
      probableCause: "Pending ICCID Registration in Telco Core DB",
      nextBestAction: "Trigger Automated eSIM/SIM OTA re-provisioning flow.",
      draftResponse:
        "Hi! We've triggered an automatic OTA refresh for your 5G SIM. Please restart your device in 3 minutes. If you still see 'No Service', click here to complete instant identity verification.",
    },
    {
      id: "scen-3",
      customerInput: "My monthly bill was charged twice on my credit card this morning!",
      detectedType: "Billing & Charge Discrepancy",
      detectedTier: "Enterprise",
      detectedArea: "Whitefield",
      similarCount: 1,
      slaRisk: "High",
      priorityScore: 88,
      probableCause: "Payment Gateway Duplicate Webhook Signal",
      nextBestAction: "Auto-verify payment gateway transaction ID and issue instant 1-click refund authorization.",
      draftResponse:
        "Hello! We identified a temporary payment gateway duplicate processing error. A full refund of ₹1,499 has been initiated to your card (Ref #RF-99410). It will reflect within 24 hours.",
    },
  ],
};
