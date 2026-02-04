"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const cases = [
    {
        title: "Restaurant SaaS Transformation",
        subtitle: "End-to-end redesign of POS workflow",
        description: "Led the complete overhaul of the point-of-sale interface for a major restaurant chain. Conducted user research to identify friction points and implemented a streamlined checkout flow.",
        metrics: [
            { label: "Checkout Speed", value: "+20%" },
            { label: "User Retention", value: "+15%" },
        ],
        tags: ["SaaS", "UX Redesign", "B2B"],
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        title: "AdTech Intelligence Platform",
        subtitle: "Predictive analytics dashboard for advertisers",
        description: "Built a new analytics product from scratch (0-1) enabling advertisers to forecast campaign performance using authorized historical data models.",
        metrics: [
            { label: "Revenue Impact", value: "$2M+" },
            { label: "Adoption Rate", value: "85%" },
        ],
        tags: ["AI", "Analytics", "Big Data"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Consumer Wellness MVP",
        subtitle: "0-1 Mobile app launch",
        description: "Managed the product lifecycle for a new meditation tracking app. Defined core features, prioritized roadmap, and coordinated launch across iOS and Android.",
        metrics: [
            { label: "App Store Rating", value: "4.8" },
            { label: "DAU Growth", value: "300%" },
        ],
        tags: ["Mobile", "B2C", "Wellness"],
        gradient: "from-emerald-500 to-teal-500"
    }
];

export default function CaseStudies() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/40">
            <div className="container max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Case Studies</h2>
                    <p className="text-muted">Deep dive into key projects and their outcomes.</p>
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
                                className="w-full flex items-center justify-between p-8 text-left group"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-muted">{project.subtitle}</p>
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
                                        <div className="p-8 pt-0 border-t border-glass-border/50">
                                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                                <div>
                                                    <p className="text-slate-300 leading-relaxed mb-6">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {project.tags.map(tag => (
                                                            <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <button className="text-sm font-semibold text-primary hover:text-white flex items-center gap-2 transition-colors">
                                                        Read Full Case Study <ArrowUpRight className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className={`rounded-2xl p-6 bg-gradient-to-br ${project.gradient} bg-opacity-10 text-white relative overflow-hidden`}>
                                                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                                                    <div className="relative z-10 grid grid-cols-2 gap-4">
                                                        {project.metrics.map((metric, i) => (
                                                            <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10">
                                                                <p className="text-3xl font-bold mb-1">{metric.value}</p>
                                                                <p className="text-xs text-white/70 uppercase tracking-wider">{metric.label}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
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
