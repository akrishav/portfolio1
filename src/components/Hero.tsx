"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
            {/* Background Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block px-4 py-2 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md mb-6"
                    >
                        <span className="text-sm font-medium text-secondary tracking-wide">
                            PRODUCT MANAGER
                        </span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Ashish <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Rishav</span>
                    </h1>

                    <h2 className="text-xl lg:text-2xl text-muted font-light mb-8">
                        Data-driven | 0→1 & Scale
                    </h2>

                    <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                        Data-driven Product Manager with over 4.5 years of experience across B2B SaaS, AdTech, and consumer products.
                        I bridge the gap between user needs and business goals through data and empathy.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a
                            href="#case-studies"
                            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2"
                        >
                            View Case Studies
                            <Sparkles className="w-4 h-4" />
                        </a>
                        <a
                            href="https://drive.google.com/file/d/14P9kyzRr71-Q6ks5mFrboYK3GNU1eKAG/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 border border-glass-border bg-glass-bg hover:bg-white/5 text-white rounded-full font-semibold transition-all backdrop-blur-md flex items-center justify-center gap-2"
                        >
                            Download Resume
                            <Download className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="relative mx-auto lg:mr-0"
                >
                    <div className="relative w-[320px] h-[320px] lg:w-[450px] lg:h-[450px]">
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 rounded-full border border-primary/30 shadow-[0_0_60px_rgba(124,58,237,0.2)] animate-pulse" />
                        <div className="absolute -inset-4 rounded-full border border-secondary/20 opacity-50" />

                        {/* Image Placeholder */}
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-glass-border relative flex items-center justify-center group">
                            <Image
                                src="/ashish-white-jacket.jpg"
                                alt="Ashish Rishav"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 450px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
