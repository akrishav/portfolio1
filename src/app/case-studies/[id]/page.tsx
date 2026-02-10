"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, Lightbulb, CheckCircle2, Rocket, TrendingUp, BookOpen, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudyDetailPage() {
    const params = useParams();
    const studyId = params.id as string;
    const study = caseStudies.find(p => p.id === studyId);

    if (!study) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
                    <Link href="/case-studies" className="text-emerald-400 hover:text-emerald-300">
                        Back to Case Studies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pb-24">
            {/* Header / Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="container max-w-5xl mx-auto">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all pointer-events-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Studies
                    </Link>
                </div>
            </div>

            <article className="pt-32 px-4 sm:px-6">
                <div className="container max-w-4xl mx-auto">
                    {/* Title Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {study.tags.map(tag => (
                                <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            {study.title}
                        </h1>
                        <p className="text-xl text-emerald-400 font-medium mb-8">
                            {study.company}
                        </p>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            {study.subtitle}
                        </p>
                    </motion.div>

                    {/* Content Logic: Image vs Text */}
                    {study.noteImage ? (
                        /* Image-based Case Study (Handwritten Notes) */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="relative w-full h-auto min-h-[800px]">
                                <Image
                                    src={study.noteImage}
                                    alt="Handwritten Case Study Notes"
                                    width={1200}
                                    height={1600}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    ) : (
                        /* Text-based Structured Case Study */
                        <div className="space-y-12">
                            {/* Problem & Context */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-[#111] p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="flex items-center gap-3 mb-4 text-red-400">
                                        <div className="p-2 bg-red-400/10 rounded-lg"><Target className="w-5 h-5" /></div>
                                        <h3 className="text-xl font-bold">The Problem</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{study.problem}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-[#111] p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="flex items-center gap-3 mb-4 text-yellow-400">
                                        <div className="p-2 bg-yellow-400/10 rounded-lg"><Lightbulb className="w-5 h-5" /></div>
                                        <h3 className="text-xl font-bold">Context</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{study.context}</p>
                                </motion.div>
                            </div>

                            {/* Decisions & Execution */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                                        <CheckCircle2 className="w-6 h-6" /> Key Decisions
                                    </h3>
                                    <ul className="space-y-4">
                                        {study.decisions?.map((item, i) => (
                                            <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                                <span className="text-blue-400 font-bold">0{i + 1}</span>
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                                        <Rocket className="w-6 h-6" /> Execution
                                    </h3>
                                    <ul className="space-y-4">
                                        {study.execution?.map((item, i) => (
                                            <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2.5 flex-shrink-0" />
                                                <span className="text-slate-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>

                            {/* Impact Stats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`rounded-3xl p-8 md:p-12 bg-gradient-to-br ${study.gradient} relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8 text-white">
                                        <TrendingUp className="w-8 h-8" />
                                        <h3 className="text-3xl font-bold">Measurable Impact</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {study.impact_stats?.map((stat, i) => (
                                            <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                                <p className="text-white font-semibold text-lg">{stat}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Learnings */}
                            {study.learnings && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-purple-900/10 border border-purple-500/20 rounded-3xl p-8"
                                >
                                    <div className="flex items-center gap-3 mb-6 text-purple-400">
                                        <BookOpen className="w-6 h-6" />
                                        <h3 className="text-2xl font-bold">Key Learnings</h3>
                                    </div>
                                    <div className="grid gap-4">
                                        {study.learnings.map((item, i) => (
                                            <p key={i} className="text-slate-300 italic flex gap-3">
                                                <span className="text-purple-500 font-bold">"</span>
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}
