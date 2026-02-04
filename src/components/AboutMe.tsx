"use client";

import { motion } from "framer-motion";
import { User, Heart, Globe, Book, Languages } from "lucide-react";
import Image from "next/image";

export default function AboutMe() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-glass-border">
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />

                            {/* Placeholder for About Image */}
                            <Image
                                src="/travel-world.png"
                                alt="Travel Adventures"
                                fill
                                className="object-cover"
                            />

                            {/* Floating Cards */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="absolute bottom-6 left-6 z-20 p-4 rounded-xl bg-glass-bg border border-glass-border backdrop-blur-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Personal Interest</p>
                                        <p className="font-semibold">Explored 20+ Countries</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <User className="w-4 h-4" />
                            <span>About Me</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            More than just a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Product Manager</span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                            <p>
                                I approach product management with an entrepreneurial mindset. Having worn multiple hats in early-stage startups, I understand that great products are born at the intersection of user empathy, technical feasibility, and business viability.
                            </p>
                            <p>
                                I am customer-obsessed and believe that the best answers come from talking to users, not just looking at dashboards.
                            </p>
                            <p>
                                Outside of work, you can find me planning my next travel adventure or writing about my experiences in tech and culture.
                            </p>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <div className="flex items-center gap-2 text-pink-400 font-medium">
                                <Heart className="w-5 h-5" />
                                <span>Travel Enthusiast</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
