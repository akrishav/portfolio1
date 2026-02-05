"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
    {
        company: "B&B Gastro",
        role: "Product Manager",
        period: "2022 - Present",
        category: "Restaurant Management SaaS",
        description: "Leading product development for a comprehensive restaurant management platform serving multi-outlet chains",
        metrics: [
            "Launched analytics dashboard improving multi-outlet visibility by 34%",
            "Automated workflow processes increasing service efficiency by 42%",
            "Drove supply chain optimization boosting efficiency by 12%"
        ],
        tags: ["SaaS", "Hospitality", "Product Strategy"]
    },
    {
        company: "Media.net",
        role: "Senior Associate Product Manager",
        period: "2020 - 2022",
        category: "AdTech Platform",
        description: "Managed ad targeting and analytics products for a leading contextual advertising platform",
        metrics: [
            "Enhanced data precision in ad targeting by 21%",
            "Reduced manual review time by 30% through ML integration",
            "Shipped features impacting 500K+ daily active users"
        ],
        tags: ["AdTech", "Algorithms", "Optimization"]
    },
    {
        company: "GoodMinds",
        role: "Associate Product Manager",
        period: "2019 - 2020",
        category: "0→1 Consumer Startup",
        description: "Built consumer-facing mental wellness products from ground up",
        metrics: [
            "Launched MVP serving 50K+ users in first 6 months",
            "Designed onboarding flow with 65% completion rate",
            "Established product analytics framework from scratch"
        ],
        tags: ["Consumer App", "Mental Health", "MVP"]
    }
];

export default function ExperienceJourney() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/20">
            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience Journey</h2>
                    <p className="text-muted">4.5+ years building products across B2B SaaS, AdTech, and 0→1 consumer startups</p>
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
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background group-hover:bg-accent transition-colors" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
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
                                <span className="text-sm font-mono text-muted bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-slate-300 mb-4 leading-relaxed max-w-2xl mt-4">
                                {exp.description}
                            </p>

                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                                <ul className="space-y-1">
                                    {exp.metrics && exp.metrics.map((metric, i) => (
                                        <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
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
