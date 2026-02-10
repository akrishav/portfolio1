import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Target, Lightbulb, CheckCircle2, Rocket, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudies() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const displayedCases = caseStudies.slice(0, 3);

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
                    {displayedCases.map((project, index) => (
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
                                                        {project.impact_stats?.map((stat, i) => (
                                                            <div key={i} className="flex items-start gap-3">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 mt-1.5" />
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

                                            {/* Link to Full Case Study Page */}
                                            <div className="mt-8 flex justify-end">
                                                <Link
                                                    href={`/case-studies/${project.id}`}
                                                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group/link"
                                                >
                                                    Read Full Case Study <ArrowUpRight className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 group"
                    >
                        View All Case Studies
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
