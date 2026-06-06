"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
    {
        company: "FaktorOS",
        role: "0→1 Builder",
        period: "Sep 2024 – Apr 2026",
        category: "Agentic-AI Ad Platform | Berlin, Germany",
        description: "Led the 0→1 product development and compliance strategy for a privacy-first, agentic-AI advertising platform.",
        metrics: [
            "Ran 12+ agency interviews; identified CISO compliance as #1 adoption blocker, shaping zero-retention infrastructure roadmap",
            "Filed provisional patent (IN202631054993) on zero-retention orchestration enabling compliant AI agents in AdTech",
            "Led 0→1 Agentic-AI Ad Platform — shipped attested MVP across Meta, Google, TikTok to 3 design partners",
            "Built Agentic Decision Framework with real-time monitoring and attested pause-reallocate — 15–20% ROAS lift",
            "Defined GTM and dual-tier pricing ($325 SME / $2,700 agency) — validated 30–60 day sales cycle and secured 3 signed LOIs"
        ],
        tags: ["Agentic AI", "AdTech", "SaaS", "Product Strategy"]
    },
    {
        company: "Media.net",
        role: "Associate Product Manager",
        period: "Feb 2021 – Jul 2024",
        category: "AdTech Platform | Bangalore, India",
        description: "Managed ad targeting, algorithmic categorization, and analytics products for a leading contextual advertising platform.",
        metrics: [
            "Drove 2% revenue growth and boosted data precision by 21% by mapping 500K+ ad URLs, enhancing contextual ad-targeting",
            "Cut manual review time by 30% by designing and automating image/video classification workflows",
            "Optimized ad-matching by 18% across key categories by analyzing 100K+ high-revenue keywords to refine algorithm-targeting",
            "Improved supply efficiency by 12% by identifying 8 under-utilized monetization funnels through custom Power BI dashboards"
        ],
        tags: ["AdTech", "Algorithms", "Optimization"]
    },
    {
        company: "GoodMinds",
        role: "Co-Founder & Product Lead",
        period: "Mar 2019 – Dec 2020",
        category: "0→1 Consumer Startup | Bangalore, India",
        description: "Co-founded and scaled a video-first learning platform summarizing key non-fiction insights.",
        metrics: [
            "Validated early demand (5K+ views, 340 subscribers in <30 days) by creating a 0→1 MVP and testing it via YouTube",
            "Defined product-market fit strategy by analyzing 20+ global competitors",
            "Managed end-to-end product roadmap, aligning development resources with immediate market feedback",
            "Led research with 200+ users, identifying core value propositions in learning & habit formation",
            "Optimized YouTube ad performance (CPV ↓ to ₹0.7) through funnel optimization"
        ],
        tags: ["Consumer App", "EdTech", "MVP"]
    },
    {
        company: "Moodcafe",
        role: "Product Analyst (Internship)",
        period: "Mar 2019 – Aug 2019",
        category: "Mental Health App | Ahmedabad, India",
        description: "Conducted UX research, prototyping, and acquisition experiments for a mental health platform (conferred PPO).",
        metrics: [
            "Enhanced onboarding and mental-health journeys through UX research with 1,000+ users",
            "Raised retention by 20% by establishing automated CRM workflows and funnels",
            "Lowered drop-offs by 22% by creating Balsamiq prototypes leveraging behavioral psychology",
            "Reduced CAC by 30% by executing 19-channel acquisition experiments",
            "Amplified organic discovery by 25% via SEO using Moz, SEMrush, and Ubersuggest"
        ],
        tags: ["UX Research", "Analytics", "Growth"]
    }
];

export default function ExperienceJourney() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/30 dark:bg-black/20">
            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Experience Journey</h2>
                    <p className="text-muted">5+ years building products across B2B SaaS, AdTech, and 0→1 consumer startups</p>
                </motion.div>

                <div className="relative border-l border-glass-border ml-4 md:ml-12 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background group-hover:bg-accent transition-colors" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {exp.company}
                                    </h3>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <div className="flex items-center gap-2 text-primary font-medium">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{exp.role}</span>
                                        </div>
                                        <span className="inline-block px-3 py-1 rounded-full border border-glass-border bg-glass-bg text-xs text-muted w-fit">
                                            {exp.category}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-muted bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full whitespace-nowrap mt-1">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed max-w-2xl mt-4">
                                {exp.description}
                            </p>

                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                                <ul className="space-y-1">
                                    {exp.metrics && exp.metrics.map((metric, i) => (
                                        <li key={i} className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/70 mt-1.5 flex-shrink-0"></span>
                                            {metric}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
