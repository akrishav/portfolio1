"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Sparkles, Calendar, ArrowUpRight } from "lucide-react";

const educationData = [
    {
        degree: "MS in Data Science",
        institution: "University of Europe",
        year: "2025",
        grade: "7.9 CGPA",
        description: "Specialized in Machine Learning, Statistical Analysis, and Big Data Technologies.",
        tags: ["Machine Learning", "Big Data"],
        color: "from-purple-500 to-indigo-500"
    },
    {
        degree: "B.Tech in Computer Science",
        institution: "Rajasthan Technical University",
        year: "2020",
        grade: "7.8 CGPA",
        description: "Foundation in Computer Science, Algorithms, Data Structures, and Software Engineering.",
        tags: ["Algorithms", "Software Eng."],
        color: "from-blue-500 to-cyan-500"
    }
];

function Card3D({ item, index }: { item: typeof educationData[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full min-h-[400px] rounded-3xl bg-glass-bg border border-glass-border group cursor-none"
        >
            {/* Neon Gradient Border Hover Effect */}
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-transparent z-0"
            />

            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 backdrop-blur-md">
                        {item.year}
                    </span>
                </div>

                {/* Body */}
                <div className="mt-8">
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                        {item.degree}
                    </h3>
                    <p className="text-primary/90 font-medium mb-4">{item.institution}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {item.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>{item.grade}</span>
                    </div>
                </div>
            </div>

            {/* Background Depth Elements */}
            <div
                style={{ transform: "translateZ(40px)" }}
                className={`absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br ${item.color} opacity-5 blur-[80px] rounded-full`}
            />
            <div
                style={{ transform: "translateZ(20px)" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
            >
                {item.year}
            </div>

        </motion.div>
    );
}

export default function Education() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative perspective-1000">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Education</h2>
                    <p className="text-muted">Mastering the craft through rigorous academia</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 perspective-container">
                    {educationData.map((item, index) => (
                        <div key={index} className="h-full">
                            <Card3D item={item} index={index} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .perspective-container {
                    perspective: 2000px;
                }
            `}</style>
        </section>
    );
}
