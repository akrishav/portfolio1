"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { uxProjects } from "@/data/uxProjects";
import Image from "next/image";

export default function WorkPage() {
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
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x bg-300%"
                    >
                        Selected Works
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-purple-200/80 max-w-2xl"
                    >
                        A comprehensive collection of my UX research, UI design, and prototyping projects.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {uxProjects.map((project, index) => (
                        <Link
                            href={`/work/${project.id}`}
                            key={project.id}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-colors h-full"
                            >
                                {/* Project Thumbnail (First screen as cover) */}
                                <div className="aspect-[4/3] bg-[#050505] relative overflow-hidden">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={project.cover || project.screens[0].src}
                                            alt={project.title + " Cover"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-purple-300 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-slate-400 mb-6 line-clamp-2">{project.subtitle}</p>

                                    <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:translate-x-2 transition-transform">
                                        View Case Study <ChevronRight className="w-4 h-4" />
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
