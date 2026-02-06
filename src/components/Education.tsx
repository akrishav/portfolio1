"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const educationData = [
    {
        degree: "MS (Data Science)",
        institution: "University of Europe",
        year: "2025",
        grade: "7.9 CGPA",
        description: "Specialized in Machine Learning, Statistical Analysis, and Big Data Technologies."
    },
    {
        degree: "B.Tech (Computer Science)",
        institution: "Rajasthan Technical University",
        year: "2020",
        grade: "7.8 CGPA",
        description: "Foundation in Computer Science, Algorithms, Data Structures, and Software Engineering."
    }
];

export default function Education() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Education</h2>
                    <p className="text-muted">Academic background and qualifications</p>
                </motion.div>

                <div className="relative pl-8 md:pl-0">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-glass-border to-transparent hidden md:block" />
                    <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-glass-border to-transparent md:hidden" />

                    <div className="space-y-12">
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(124,58,237,0.5)] transform -translate-x-[5px] md:-translate-x-1/2 z-10" />

                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2">
                                    <div className={`p-6 rounded-2xl bg-white/5 border border-glass-border hover:border-primary/30 transition-all duration-300 relative group overflow-hidden ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className={`flex items-center gap-3 mb-3 text-primary ${index % 2 === 0 ? "flex-row" : "md:flex-row-reverse"
                                            }`}>
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm font-mono tracking-wider">{edu.year}</span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                            {edu.degree}
                                        </h3>

                                        <p className="text-lg text-slate-300 font-medium mb-3">
                                            {edu.institution}
                                        </p>

                                        <p className="text-sm text-muted leading-relaxed mb-4">
                                            {edu.description}
                                        </p>

                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary ${index % 2 === 0 ? "mr-auto" : "md:ml-auto"
                                            }`}>
                                            <GraduationCap className="w-3.5 h-3.5" />
                                            <span>Grade: {edu.grade}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer Side - to balance the grid on desktop */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
