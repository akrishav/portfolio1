"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

    // Section 2: 25% - 45%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

    // Section 3: 50% - 70%
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.75], [100, -100]);

    return (
        <div ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute text-center p-12 rounded-3xl backdrop-blur-sm border border-white/5 bg-white/5 shadow-2xl shadow-purple-900/40"
                >
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        My Name.
                    </h1>
                    <p className="text-2xl md:text-3xl font-light text-purple-200 tracking-wide">
                        Creative Product Manager & <span className="text-accent font-medium">AI Enthusiast</span>
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-10 md:left-24 top-1/3 max-w-xl p-8 rounded-2xl backdrop-blur-md bg-black/20 border-l-4 border-accent"
                >
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                        I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">intelligent</span> <br />
                        digital experiences.
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-10 md:right-24 bottom-1/3 max-w-xl text-right p-8 rounded-2xl backdrop-blur-md bg-black/20 border-r-4 border-primary"
                >
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                        Bridging design, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">data & strategy.</span>
                    </h2>
                </motion.div>

            </div>
        </div>
    );
}
