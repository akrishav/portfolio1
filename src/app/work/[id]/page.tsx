"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, X, User, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { uxProjects } from "@/data/uxProjects";
import { useState } from "react";

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const project = uxProjects.find(p => p.id === projectId);
    const [activeMedia, setActiveMedia] = useState<{ type: 'video' | 'image', src: string } | null>(null);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/work" className="text-purple-400 hover:text-purple-300">
                        Back to Works
                    </Link>
                </div>
            </div>
        );
    }

    const isYouTube = (url: string) => url.includes("youtube.com") || url.includes("youtu.be");

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        if (url.includes("/embed/")) return url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`
            : null;
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pb-24">
            {/* Navigation */}
            <div className="fixed top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="container max-w-7xl mx-auto">
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all pointer-events-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Works
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="container max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200">
                            {project.title}
                        </h1>
                        <p className="text-2xl text-purple-400 font-medium mb-8">
                            {project.subtitle}
                        </p>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    {/* Video Player */}
                    {/* Cinematic Video Player */}
                    {project.video && (
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
                            <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden aspect-video shadow-2xl group cursor-pointer"
                                onClick={() => setActiveMedia({ type: 'video', src: project.video })}>
                                {isYouTube(project.video) ? (
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.video) || ""}
                                        title={project.title}
                                        className="w-full h-full pointer-events-none"
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
                    )}
                </div>
            </section>

            {/* Screens Gallery */}
            <section className="container max-w-7xl mx-auto px-4 mt-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-white/10 flex-grow" />
                    <h2 className="text-2xl font-bold text-white/50 uppercase tracking-widest">Project Gallery</h2>
                    <div className="h-px bg-white/10 flex-grow" />
                </div>

                <div className="relative group/gallery">
                    {/* Scroll Hint */}
                    <div className="text-center mb-6 opacity-60 text-sm tracking-widest uppercase">
                        Drag to Explore &bull; {project.screens.length} Screens
                    </div>

                    <div className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 sm:px-0 snap-x custom-scrollbar cursor-grab active:cursor-grabbing">
                        {project.screens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex-shrink-0 w-[280px] aspect-[9/19] relative group/item snap-center cursor-pointer"
                                onClick={() => setActiveMedia({ type: 'image', src: screen.src })}
                            >
                                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl group-hover:border-purple-500/50 group-hover:shadow-purple-500/20 transition-all duration-300 transform group-hover:-translate-y-2">
                                    <Image
                                        src={screen.src}
                                        alt={screen.alt}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <span className="text-white font-medium">{screen.alt}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Lightbox */}
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
        </main>
    );
}
