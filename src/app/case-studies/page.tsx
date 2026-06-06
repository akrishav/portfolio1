"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-800 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400 animate-gradient-x bg-300%"
                    >
                        Case Studies
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted max-w-2xl"
                    >
                        Deep dives into complex product challenges, strategic decisions, and measurable outcomes.
                    </motion.p>
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <Link
                            href={`/case-studies/${study.id}`}
                            key={study.id}
                            className="block group h-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-3xl overflow-hidden border border-glass-border hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 h-full flex flex-col"
                            >
                                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />

                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${study.gradient} bg-opacity-20`}>
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-primary dark:text-white/30 dark:group-hover:text-white transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {study.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm font-semibold text-foreground/90">{study.company}</span>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {study.subtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {study.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-white/5 text-emerald-700 dark:text-emerald-200/70 border border-emerald-100 dark:border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
