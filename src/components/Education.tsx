"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, ArrowUpRight } from "lucide-react";

const educationData = [
    {
        degree: "MS in Data Science",
        institution: "University of Europe",
        year: "2025",
        grade: "7.9 CGPA",
        description: "Specialized in Machine Learning, Statistical Analysis, and Big Data Technologies.",
        tags: ["Machine Learning", "Big Data", "Statistics"]
    },
    {
        degree: "B.Tech in Computer Science",
        institution: "Rajasthan Technical University",
        year: "2020",
        grade: "7.8 CGPA",
        description: "Foundation in Computer Science, Algorithms, Data Structures, and Software Engineering.",
        tags: ["Algorithms", "Software Engineering", "Data Structures"]
    }
];

export default function Education() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Education</h2>
                        <p className="text-muted text-lg">Academic background & qualifications</p>
                    </div>

                    <div className="h-px bg-glass-border flex-1 mx-8 hidden md:block" />

                    <div className="flex items-center gap-2 text-primary/80 font-mono text-sm">
                        <span>2 DEGREES EARNED</span>
                        <Award className="w-4 h-4" />
                    </div>
                </motion.div>

                <div className="space-y-6">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 md:p-10 rounded-3xl bg-glass-bg border border-glass-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Watermark Year */}
                            <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 text-[12rem] md:text-[15rem] font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none select-none leading-none">
                                {edu.year}
                            </div>

                            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 items-start">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-sm">
                                            {edu.year}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400 backdrop-blur-sm flex items-center gap-1.5">
                                            <Award className="w-3 h-3" />
                                            {edu.grade}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {edu.degree}
                                    </h3>

                                    <p className="text-lg text-primary/80 font-medium mb-6 flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5" />
                                        {edu.institution}
                                    </p>

                                    <p className="text-slate-400 leading-relaxed max-w-2xl mb-6">
                                        {edu.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {edu.tags.map((tag, i) => (
                                            <span key={i} className="text-sm text-muted/60 font-mono">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-col items-end justify-between h-full">
                                    <div className="p-3 rounded-full bg-white/5 text-white/50 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:-rotate-45">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
