"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, FileText, ArrowUpRight, ChevronUp } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-glass-border bg-slate-100/30 dark:bg-black/40">
            <div className="container max-w-4xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">Let&apos;s Connect</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
                        Ready to build something impact? I&apos;m always open to discussing new opportunities, product ideas, or just geeking out over tech.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:rishavashishkumar@gmail.com"
                            className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center gap-2"
                        >
                            <Mail className="w-5 h-5" />
                            rishavashishkumar@gmail.com
                        </a>

                        <a
                            href="https://www.linkedin.com/in/akrishav/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 font-semibold transition-all flex items-center gap-2 shadow-md"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn Profile
                        </a>

                        <a
                            href="https://drive.google.com/file/d/1HkSGa129niGQKm1nofJVWjGNFeT0Z7n9/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full border border-glass-border bg-glass-bg hover:bg-slate-50 dark:hover:bg-white/5 text-foreground font-semibold transition-all flex items-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            Download Resume
                        </a>
                    </div>
                </motion.div>

                <div className="mt-24 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Ashish Rishav. All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Design inspired by <span className="text-slate-600 dark:text-slate-400">best practices</span>
                    </p>
                </div>

            </div>
            {/* Scroll to Top Button */}
            <div className="flex justify-center mt-12 pb-4">
                <a
                    href="#hero"
                    className="p-3 rounded-full border border-glass-border hover:border-primary/30 bg-glass-bg hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shadow-sm group"
                >
                    <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </footer>
    );
}
