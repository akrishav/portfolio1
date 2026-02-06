"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

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
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/40">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="container max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Education</h2>
                    <p className="text-muted">Academic background and qualifications</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-glass-bg border border-glass-border hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {edu.degree}
                                </h3>

                                <p className="text-lg text-slate-300 mb-4">
                                    {edu.institution}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span>{edu.year}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-primary" />
                                        <span>{edu.grade}</span>
                                    </div>
                                </div>

                                {/* Decorative Line */}
                                <div className="w-full h-px bg-glass-border group-hover:bg-primary/20 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
