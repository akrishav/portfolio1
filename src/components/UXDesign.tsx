"use client";

import { motion } from "framer-motion";
import { Play, Maximize2, X, ChevronRight, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { uxProjects } from "@/data/uxProjects";

export default function UXDesign() {
    const [activeMedia, setActiveMedia] = useState<{ type: 'video' | 'image', src: string } | null>(null);

    // Show only the first 1 project on the home page
    const displayedProjects = uxProjects.slice(0, 1);

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        if (url.includes("/embed/")) return url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (url.includes("shorts/")) {
            const shortId = url.split("shorts/")[1].split("?")[0];
            return `https://www.youtube.com/embed/${shortId}?autoplay=1&mute=1&loop=1&playlist=${shortId}`;
        }
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`
            : null;
    };

    const isYouTube = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/40 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="container max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
                        UX Design & Prototyping
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        Crafting intuitive and empathetic user experiences through research-driven design and interactive animated prototypes.
                    </p>
                </motion.div>

                {displayedProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-16"
                    >
                        {/* Project Info Header - Centered */}
                        <div className="text-center max-w-4xl mx-auto space-y-6">
                            <div className="flex flex-wrap justify-center gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-purple-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">{project.title}</h3>
                            <p className="text-2xl text-purple-400 font-medium">{project.subtitle}</p>
                            <p className="text-slate-300 leading-relaxed text-lg max-w-2xl mx-auto">
                                {project.description}
                            </p>
                            <div className="pt-4">
                                <button
                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-purple-50 transition-all font-medium"
                                    onClick={() => window.open(project.link || "https://bounce-fluid-02802409.figma.site", "_blank")}
                                >
                                    View Figma Prototype
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Cinematic Video Player */}
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden aspect-video shadow-2xl group cursor-pointer"
                                onClick={() => setActiveMedia({ type: 'video', src: project.video })}>
                                {isYouTube(project.video) ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.video) || ""}
                                        title={project.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={project.video}
                                        className="w-full h-full object-cover"
                                        muted loop autoPlay playsInline
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 border border-white/20">
                                        <Maximize2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horizontal Scroll Gallery */}
                        <div className="relative group/gallery">
                            {/* Gallery Label */}
                            <div className="text-center mb-8">
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">App Screens • Drag to Scroll</span>
                            </div>

                            <div className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 sm:px-8 snap-x custom-scrollbar cursor-grab active:cursor-grabbing max-w-[100vw]">
                                {project.screens.map((screen, i) => (
                                    <div
                                        key={i}
                                        className="flex-shrink-0 w-[240px] aspect-[9/19] relative group/item snap-center rounded-2xl overflow-hidden border border-white/5 bg-slate-900 hover:border-purple-500/50 transition-colors shadow-lg hover:shadow-purple-500/10 hover:-translate-y-2 duration-300"
                                        onClick={() => setActiveMedia({ type: 'image', src: screen.src })}
                                    >
                                        <div className="absolute inset-0 bg-slate-800 animate-pulse -z-10" />
                                        <Image
                                            src={screen.src}
                                            alt={screen.alt}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                            <p className="text-white font-medium text-sm transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300">
                                                {screen.alt}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Fade edges */}
                            <div className="absolute top-0 bottom-12 left-0 w-24 bg-gradient-to-r from-[#0A0A1A] to-transparent pointer-events-none" />
                            <div className="absolute top-0 bottom-12 right-0 w-24 bg-gradient-to-l from-[#0A0A1A] to-transparent pointer-events-none" />
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* View All Projects Button */}
            <div className="mt-24 text-center">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all font-semibold text-lg shadow-lg hover:shadow-purple-500/25 group"
                >
                    View All UX Work
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Media Lightbox/Modal */}
            {activeMedia && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setActiveMedia(null)}>

                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveMedia(null); }}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="w-full max-w-7xl max-h-[90vh] flex items-center justify-center relative"
                        onClick={(e) => e.stopPropagation()}>

                        {activeMedia.type === 'video' ? (
                            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                                {isYouTube(activeMedia.src) ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(activeMedia.src)?.replace("mute=1", "mute=0") || ""}
                                        title="Video Modal"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={activeMedia.src}
                                        controls
                                        autoPlay
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="relative max-h-[85vh] h-full w-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src={activeMedia.src}
                                    alt="Full screen preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
