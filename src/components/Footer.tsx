"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, FileText, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-glass-border bg-black/40">
            <div className="container max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's Connect</h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        Ready to build something impact? I'm always open to discussing new opportunities, product ideas, or just geeking out over tech.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:rishavashishkumar@gmail.com"
                            className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center gap-2"
                        >
                            <Mail className="w-5 h-5" />
                            rishavashishkumar@gmail.com
                        </a>

                        <a
                            href="https://www.linkedin.com/in/akrishav/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 font-semibold transition-all flex items-center gap-2"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn Profile
                        </a>

                        <a
                            href="https://drive.google.com/file/d/14P9kyzRr71-Q6ks5mFrboYK3GNU1eKAG/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full border border-glass-border bg-glass-bg hover:bg-white/5 text-white font-semibold transition-all flex items-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            Download Resume
                        </a>
                    </div>
                </motion.div>

                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Ashish Rishav. All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Design inspired by <span className="text-slate-400">best practices</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}
