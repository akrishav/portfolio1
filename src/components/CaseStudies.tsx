"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Target, Lightbulb, CheckCircle2, Rocket, TrendingUp, BookOpen } from "lucide-react";

interface CaseStudy {
    title: string;
    company: string;
    subtitle: string;
    problem?: string;
    context?: string;
    decisions?: string[];
    execution?: string[];
    impact_stats: string[];
    learnings?: string[];
    tags: string[];
    gradient: string;
}

const cases: CaseStudy[] = [
    {
        title: "Restaurant SaaS Transformation",
        company: "B&B Gastro",
        subtitle: "Scaling multi-outlet restaurant operations through intelligent automation",
        problem: "Restaurant chains struggled with fragmented data across outlets, manual workflows, and lack of real-time visibility into operations and inventory.",
        context: "Operating in a competitive F&B tech market with limited engineering resources. Needed to balance feature velocity with technical debt while serving 100+ restaurant chains.",
        decisions: [
            "Prioritized analytics dashboard over CRM features based on customer interviews",
            "Built workflow automation engine to reduce manual overhead",
            "Implemented modular architecture for faster feature deployment"
        ],
        execution: [
            "Created comprehensive PRDs with user flows and acceptance criteria",
            "Set up analytics tracking for all critical user journeys",
            "Ran A/B tests on onboarding flow to optimize activation",
            "Established weekly sprint cycles with engineering and design"
        ],
        impact_stats: [
            "+42% increase in service efficiency through automated workflows",
            "+34% improvement in multi-outlet visibility via analytics dashboard",
            "+12% boost in supply chain efficiency",
            "Reduced customer support tickets by 25%"
        ],
        learnings: [
            "Early customer validation prevents building wrong features",
            "Incremental releases with strong analytics beat big-bang launches",
            "Technical debt must be explicitly prioritized, not deferred indefinitely"
        ],
        tags: ["SaaS", "UX Redesign", "B2B"],
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        title: "AdTech Intelligence Platform",
        company: "Media.net",
        subtitle: "Enhancing contextual ad targeting through ML-driven precision",
        problem: "Manual ad review processes created bottlenecks. Ad targeting lacked precision, leading to poor campaign performance and advertiser churn.",
        context: "Large-scale AdTech platform serving 500K+ users daily. Competing with Google/Facebook required differentiation through contextual intelligence.",
        decisions: [
            "Invested in ML models for automated ad categorization",
            "Built real-time analytics dashboard for campaign optimization",
            "Prioritized API performance over UI polish initially"
        ],
        execution: [
            "Collaborated with data science team to define ML model requirements",
            "Shipped iterative improvements based on advertiser feedback",
            "Created experiment framework for feature testing",
            "Established SLA monitoring and alerting systems"
        ],
        impact_stats: [
            "+21% improvement in data precision for ad targeting",
            "-30% reduction in manual review time",
            "Decreased ad rejection rate by 18%",
            "Improved campaign ROI for advertisers by 15%"
        ],
        learnings: [
            "ML models need constant monitoring and retraining in production",
            "API-first approach accelerates partner integrations",
            "Performance metrics must align with business outcomes, not just engagement"
        ],
        tags: ["AI", "Analytics", "Big Data"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Consumer Wellness MVP Launch",
        company: "GoodMinds",
        subtitle: "Building 0→1 mental wellness product from research to launch",
        problem: "Mental wellness stigma prevented users from seeking help. Existing solutions were expensive, clinical, and lacked accessibility.",
        context: "Early-stage startup with tight budget and 6-month runway. Needed to validate product-market fit quickly while building for long-term retention.",
        decisions: [
            "Started with lightweight MVP focusing on journaling and mood tracking",
            "Designed gamified onboarding to reduce user anxiety",
            "Built in-app community before launching professional therapy features"
        ],
        execution: [
            "Conducted 50+ user interviews to understand pain points",
            "Built low-fidelity prototypes and tested with beta users",
            "Established product analytics from day one",
            "Shipped fortnightly releases based on user feedback loops"
        ],
        impact_stats: [
            "Acquired 50K+ users in first 6 months",
            "Achieved 65% onboarding completion rate",
            "30-day retention rate of 42% (above industry average)",
            "App Store rating of 4.6/5 with 2K+ reviews"
        ],
        learnings: [
            "0→1 success depends on solving one problem exceptionally well",
            "Community-first approach drives organic growth and retention",
            "User research > assumptions, even in time-constrained environments"
        ],
        tags: ["Mobile", "B2C", "Wellness"],
        gradient: "from-emerald-500 to-teal-500"
    }
];

export default function CaseStudies() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="case-studies" className="py-24 px-4 sm:px-6 lg:px-8 bg-black/40">
            <div className="container max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Case Studies</h2>
                    <p className="text-muted">Deep dives into product challenges, decisions, and measurable outcomes</p>
                </motion.div>

                <div className="space-y-6">
                    {cases.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-3xl border border-glass-border bg-glass-bg overflow-hidden transition-all hover:bg-white/5"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient} bg-opacity-20`}>
                                            <Target className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="text-primary text-sm font-semibold mb-1">{project.company}</p>
                                    <p className="text-muted text-sm md:text-base">{project.subtitle}</p>
                                </div>
                                <div className={`p-3 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 border-t border-glass-border/50">

                                            {/* Problem & Context */}
                                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-red-400">
                                                        <Target className="w-5 h-5" />
                                                        <h4 className="font-semibold">Problem Statement</h4>
                                                    </div>
                                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                                        {project.problem}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-yellow-400">
                                                        <Lightbulb className="w-5 h-5" />
                                                        <h4 className="font-semibold">Context & Constraints</h4>
                                                    </div>
                                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                                        {project.context}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Decisions & Execution */}
                                            <div className="grid md:grid-cols-2 gap-8 mt-2">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-blue-400">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <h4 className="font-semibold">Product Decisions</h4>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {project.decisions?.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 text-green-400">
                                                        <Rocket className="w-5 h-5" />
                                                        <h4 className="font-semibold">Execution</h4>
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {project.execution?.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Impact Section */}
                                            <div className={`mt-8 rounded-2xl p-6 bg-gradient-to-r ${project.gradient} relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-black/10" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-4 text-white">
                                                        <TrendingUp className="w-5 h-5" />
                                                        <h4 className="font-bold text-lg">Impact</h4>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {project.impact_stats.map((stat, i) => (
                                                            <div key={i} className="flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 mt-2" />
                                                                <p className="text-white font-medium">{stat}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Learnings */}
                                            <div className="mt-8">
                                                <div className="flex items-center gap-2 mb-3 text-purple-400">
                                                    <BookOpen className="w-5 h-5" />
                                                    <h4 className="font-semibold">Key Learnings</h4>
                                                </div>
                                                <ul className="space-y-2">
                                                    {project.learnings?.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 italic">
                                                            <span className="text-purple-400">→</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
