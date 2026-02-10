"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 animate-gradient-x bg-300%"
                    >
                        Case Studies
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-emerald-100/60 max-w-2xl"
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
                                className="bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 h-full flex flex-col"
                            >
                                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />

                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${study.gradient} bg-opacity-20`}>
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                                        {study.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-sm font-semibold text-white/90">{study.company}</span>
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {study.subtitle}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {study.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-emerald-200/70 border border-white/5">
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
