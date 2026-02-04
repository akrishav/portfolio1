"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
    {
        company: "B&B Gastro",
        role: "Product Manager",
        period: "Jan 2024 - Present",
        description: "Leading the product vision for restaurant management solutions. Focused on scaling operations and improving user retention.",
        metrics: ["Increased checkout speed by 20%", "Reduced manual review time by 30%"],
        tags: ["SaaS", "Hospitality", "Product Strategy"]
    },
    {
        company: "Media.net",
        role: "Senior Associate PM",
        period: "Jun 2022 - Dec 2023",
        description: "Optimized ad-tech algorithms to maximize revenue per session. Collaborated with engineering to reduce latency by 15%.",
        metrics: ["Launched analytics dashboard", "Improved multi-outlet visibility by 34%"],
        tags: ["AdTech", "Algorithms", "Optimization"]
    },
    {
        company: "GoodMinds",
        role: "Associate PM",
        period: "Aug 2021 - May 2022",
        description: "Launched the MVP for a mental wellness platform. Grew user base to 10k+ within the first 6 months.",
        metrics: ["Achieved 4.8 App Store Rating", "Grew DAU by 300%"],
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
                    <p className="text-muted">A timeline of my professional growth.</p>
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
                                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{exp.role}</span>
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-muted bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-slate-300 mb-4 leading-relaxed max-w-2xl">
                                {exp.description}
                            </p>

                            <ul className="mb-4 space-y-1">
                                {exp.metrics && exp.metrics.map((metric, i) => (
                                    <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary/70"></span>
                                        {metric}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {exp.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full border border-glass-border bg-glass-bg text-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
