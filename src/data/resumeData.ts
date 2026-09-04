export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string; // e.g., "Full-time", "Co-Founder", "Internship"
  summary: string;
  achievements: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  highlightPatent?: boolean;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  year: string;
  grade: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  role: string;
}

export const RESUME_DATA = {
  personalInfo: {
    name: "Ashish Rishav",
    title: "Data-driven Product Manager & AI Founder",
    email: "rishavashishkumar@gmail.com",
    phone: "+91 7274076995",
    location: "Bangalore, India | Berlin, Germany",
    linkedin: "https://linkedin.com/in/ashishrishav",
    portfolio: "https://ashishrishav.com",
    summary:
      "Data-driven Product Manager and founder with 5+ years across B2B SaaS, AdTech, and deep-tech. Built and shipped agentic AI products from 0→1. Strong in PRDs, analytics, and driving measurable outcomes.",
    experienceYears: "5+ Years",
    patentNo: "IN202631054993",
  },

  experiences: [
    {
      id: "faktoros",
      role: "Agentic-AI Ad Platform Product Manager",
      company: "FaktorOS",
      duration: "Sep 2024 – Apr 2026",
      location: "Berlin, Germany",
      type: "Full-time / 0→1 AI",
      summary:
        "Led 0→1 development of an enterprise Agentic-AI ad platform for agencies, tackling CISO compliance blocks and shipping attested pause-reallocate systems.",
      achievements: [
        "Ran 12+ agency interviews; identified CISO compliance as #1 adoption blocker, shaping zero-retention infrastructure roadmap",
        "Filed provisional patent (IN202631054993) on zero-retention orchestration enabling compliant AI agents in AdTech",
        "Led 0→1 Agentic-AI Ad Platform — shipped attested MVP across Meta, Google, TikTok to 3 design partners",
        "Built Agentic Decision Framework with real-time monitoring and attested pause-reallocate — 15–20% ROAS lift",
        "Defined GTM and dual-tier pricing ($325 SME / $2,700 agency) — validated 30–60 day sales cycle and secured 3 signed LOIs",
      ],
      metrics: [
        { label: "ROAS Lift", value: "15–20%" },
        { label: "Design Partners LOIs", value: "3 Signed" },
        { label: "Provisional Patent", value: "IN202631054993" },
        { label: "Pricing Model", value: "$325 SME / $2.7k Agency" },
      ],
      tags: ["Agentic AI", "0→1 Product", "Patent", "CISO Compliance", "GTM"],
      highlightPatent: true,
    },
    {
      id: "medianet",
      role: "Online Advertising Technology Associate Product Manager",
      company: "Media.Net",
      duration: "Feb 2021 – Jul 2024",
      location: "Bangalore, India",
      type: "Full-time / Scaled AdTech",
      summary:
        "Drove core monetization efficiency, automated classification workflows, and algorithm targeting improvements across contextual ad infrastructure at scale.",
      achievements: [
        "Drove 2% revenue growth and boosted data precision by 21% by mapping 500K+ ad URLs, enhancing contextual ad-targeting",
        "Cut manual review time by 30% by designing and automating image/video classification workflows",
        "Optimized ad-matching by 18% across key categories by analyzing 100K+ high-revenue keywords to refine algorithm-targeting",
        "Improved supply efficiency by 12% by identifying 8 under-utilized monetization funnels through custom Power BI dashboards",
      ],
      metrics: [
        { label: "Data Precision Boost", value: "+21%" },
        { label: "Ad URLs Mapped", value: "500K+" },
        { label: "Manual Review Cut", value: "-30%" },
        { label: "Targeting Optimization", value: "+18%" },
      ],
      tags: ["Scaled AdTech", "Contextual Targeting", "Automation", "Power BI", "Algorithms"],
    },
    {
      id: "goodminds",
      role: "Co-Founder & Product Lead",
      company: "GoodMinds",
      duration: "Mar 2019 – Dec 2020",
      location: "Bangalore, India",
      type: "Founder / 0→1 MVP",
      summary:
        "Built and validated a video book platform from scratch, managing user research, roadmap, competitor analysis, and YouTube growth channels.",
      achievements: [
        "Validated early demand (5K+ views, 340 subscribers in <30 days) by creating a 0→1 MVP and testing it via YouTube",
        "Defined product-market fit strategy by analyzing 20+ global competitors",
        "Managed end-to-end product roadmap, aligning development resources with immediate market feedback",
        "Led research with 200+ users, identifying core value propositions in learning & habit formation",
        "Optimized YouTube ad performance (CPV ↓ to ₹0.7) through funnel optimization",
      ],
      metrics: [
        { label: "Early Validation", value: "5K+ views <30 days" },
        { label: "CPV Reduction", value: "Down to ₹0.7" },
        { label: "User Interviews", value: "200+" },
        { label: "Competitors Analyzed", value: "20+" },
      ],
      tags: ["Founder", "0→1 MVP", "User Research", "Funnel Optimization", "PLG"],
    },
    {
      id: "moodcafe",
      role: "Mental Health App Product Analyst Intern",
      company: "Moodcafe (CIIE, IIM-Ahmedabad)",
      duration: "Mar 2019 – Aug 2019",
      location: "Ahmedabad, India",
      type: "Internship / PPO Awarded",
      summary:
        "Only candidate selected out of 300 applicants at Moodcafe (CIIE IIM-A). Conferred PPO and awarded 'Moodstar: Intern of the Month'.",
      achievements: [
        "Enhanced onboarding and mental-health journeys through UX research with 1,000+ users",
        "Raised retention by 20% by establishing automated CRM workflows and funnels",
        "Lowered drop-offs by 22% by creating Balsamiq prototypes leveraging behavioral psychology",
        "Reduced CAC by 30% by executing 19-channel acquisition experiments",
        "Amplified organic discovery by 25% via SEO using Moz, SEMrush, and Ubersuggest",
        "Awarded 'Moodstar: Intern of the Month' & conferred PPO",
      ],
      metrics: [
        { label: "Retention Uplift", value: "+20%" },
        { label: "Drop-off Reduction", value: "-22%" },
        { label: "CAC Reduction", value: "-30%" },
        { label: "Organic Discovery", value: "+25%" },
      ],
      tags: ["UX Research", "Behavioral Psychology", "Balsamiq", "SEO", "PPO Awarded"],
    },
  ] as WorkExperience[],

  education: [
    {
      degree: "MS (Data Science)",
      field: "Data Science & Analytics",
      institution: "University of Europe for Applied Sciences",
      year: "2025",
      grade: "7.9 CGPA / Grade",
    },
    {
      degree: "B.Tech (Computer Science)",
      field: "Computer Science & Engineering",
      institution: "Rajasthan Technical University",
      year: "2020",
      grade: "7.8 CGPA",
    },
  ] as Education[],

  skills: {
    product: [
      "Roadmapping & Prioritization (RICE / MoSCoW)",
      "PRDs & User Stories",
      "OKRs & Metric Frameworks",
      "0→1 MVPs & PLG Strategy",
      "A/B Testing & Funnel Optimization",
    ],
    ai: [
      "Agentic AI Architecture",
      "LLM Integration & Prompt Design",
      "AI-Assisted Development (Claude, Antigravity)",
      "Zero-Retention Compliance & Guardrails",
      "API-First Product Thinking",
    ],
    design: [
      "Figma & Balsamiq Wireframing",
      "User Journey Mapping",
      "Behavioral UX Research (1,000+ users)",
      "Interactive Prototyping & Usability Testing",
    ],
    analytics: [
      "Google Analytics & MixPanel",
      "Power BI Dashboards",
      "SQL Data Extraction & Analysis",
      "Advanced Excel Modeling",
    ],
    collaboration: [
      "Agile & Scrum Ceremonies",
      "JIRA & Trello Workflow Management",
      "Cross-Functional Leadership",
      "CISO & Executive Stakeholder Management",
    ],
    marketing: [
      "SEO (Moz, SEMrush, Ubersuggest)",
      "Growth Funnel Experiments",
      "Campaign ROAS & CAC Optimization",
      "Retention & Automated CRM Workflows",
    ],
  },

  projects: [
    {
      id: "portfolio-ai",
      title: "Personal AI PM Portfolio & Command Center",
      description:
        "Designed and shipped independently using AI-assisted development (Antigravity). Features interactive interview preparation and live AI copilot simulation.",
      tech: ["Next.js", "React 19", "Tailwind CSS v4", "Framer Motion", "TypeScript"],
      role: "Product & Developer",
    },
    {
      id: "goodminds-web",
      title: "GoodMinds Website Redesign",
      description:
        "Redesigned and shipped using AI-assisted development (Claude) to validate early video-book subscription demand.",
      tech: ["React", "AI-assisted Dev", "UX Design"],
      role: "Co-Founder & Product Lead",
    },
    {
      id: "goodbrainy",
      title: "GoodBrainy Community Blogging Platform",
      description:
        "User-generated community blogging platform for sharing insights across science, tech, arts, and habit formation.",
      tech: ["Web Development", "Community Platform", "Content Strategy"],
      role: "Product Lead",
    },
  ] as Project[],

  achievements: [
    {
      id: "tmb25",
      title: "Talents Meet Bertelsmann (TMB-25)",
      description: "Selected as one of the top 60 young professionals across Europe.",
      badge: "Top 60 Europe",
    },
    {
      id: "ypp",
      title: "Young Professionals Program (YPP) Fellow",
      description: "Awarded YPP Fellowship at IIT Kanpur (2021).",
      badge: "IIT Kanpur Fellow",
    },
    {
      id: "bplan",
      title: "B-Plan Winner - CIIE IIM-Ahmedabad",
      description: "Won business plan competition in collaboration with Hiroshima University, Japan.",
      badge: "IIM-A Winner",
    },
    {
      id: "author",
      title: "Published Author (2 Amazon Books)",
      description: "Authored 'Play with Vocabs' and 'Play with Quants', achieving 20+ sales on Amazon.",
      badge: "Amazon Author",
    },
    {
      id: "global",
      title: "Global Perspective & Languages",
      description: "Traveled to 20+ countries; achieved German A2 proficiency.",
      badge: "20+ Countries",
    },
  ] as Achievement[],

  certifications: [
    "IELTS Overall Score: 7.5 / 9",
    "META101x: Philosophy and Critical Thinking — The University of Queensland, Australia",
  ],
};
