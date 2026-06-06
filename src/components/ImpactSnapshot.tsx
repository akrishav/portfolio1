"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Clock, Database, Eye, Zap, HelpCircle } from "lucide-react";

interface StatItem {
    icon: any;
    color: string;
    bgLight: string;
    borderLight: string;
    professional: {
        value: string;
        label: string;
        description: string;
    };
    plainEnglish: {
        value: string;
        label: string;
        description: string;
    };
}

const stats: StatItem[] = [
    {
        icon: Zap,
        color: "text-amber-600 dark:text-amber-400",
        bgLight: "bg-amber-50 dark:bg-amber-950/20",
        borderLight: "border-amber-100 dark:border-amber-900/30",
        professional: {
            value: "15-20%",
            label: "Client ROAS Lift",
            description: "Boosted advertising returns by building the FaktorOS Agentic Decision Framework with real-time optimization."
        },
        plainEnglish: {
            value: "1.2x",
            label: "Ad Profitability",
            description: "Helped clients make 15-20% more money for every dollar they spent on online advertising campaigns."
        }
    },
    {
        icon: Users,
        color: "text-blue-600 dark:text-blue-400",
        bgLight: "bg-blue-50 dark:bg-blue-950/20",
        borderLight: "border-blue-100 dark:border-blue-900/30",
        professional: {
            value: "+20%",
            label: "User Retention",
            description: "Raised product retention rate by establishing automated CRM workflows and funnels for mental health apps."
        },
        plainEnglish: {
            value: "1 in 5",
            label: "Customer Loyalty",
            description: "Kept 20% more users returning to health apps daily through smart, personalized reminder campaigns."
        }
    },
    {
        icon: Database,
        color: "text-emerald-600 dark:text-emerald-400",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/20",
        borderLight: "border-emerald-100 dark:border-emerald-900/30",
        professional: {
            value: "+21%",
            label: "Data Precision",
            description: "Enhanced contextual targeting accuracy at Media.net by programmatically mapping ad URLs."
        },
        plainEnglish: {
            value: "95%+",
            label: "Ad Relevancy",
            description: "Ensured search ads accurately matched what users searched for, making them more helpful and clicked."
        }
    },
    {
        icon: Clock,
        color: "text-rose-600 dark:text-rose-400",
        bgLight: "bg-rose-50 dark:bg-rose-950/20",
        borderLight: "border-rose-100 dark:border-rose-900/30",
        professional: {
            value: "-30%",
            label: "Manual Review Time",
            description: "Reduced hours of manual work by designing automated content classification pipelines."
        },
        plainEnglish: {
            value: "-12 hrs",
            label: "Hours Saved / Wk",
            description: "Replaced boring, repetitive manual website checks with AI pipelines, saving teams half a day of work."
        }
    },
    {
        icon: TrendingUp,
        color: "text-violet-600 dark:text-violet-400",
        bgLight: "bg-violet-50 dark:bg-violet-950/20",
        borderLight: "border-violet-100 dark:border-violet-900/30",
        professional: {
            value: "+12%",
            label: "Supply Efficiency",
            description: "Streamlined publisher yield by identifying under-utilized monetization funnels via custom dashboards."
        },
        plainEnglish: {
            value: "+12%",
            label: "Publisher Earnings",
            description: "Spotted unused ad spaces on blogs and sites, directly increasing their monthly ad revenue."
        }
    },
    {
        icon: Eye,
        color: "text-orange-600 dark:text-orange-400",
        bgLight: "bg-orange-50 dark:bg-orange-950/20",
        borderLight: "border-orange-100 dark:border-orange-900/30",
        professional: {
            value: "500K+",
            label: "Ad URLs Mapped",
            description: "Classified and indexed high-revenue URLs to scale ad relevancy across key search queries."
        },
        plainEnglish: {
            value: "500,000+",
            label: "Webpages Scanned",
            description: "Built automated systems handling millions of searches, mapping half a million webpages to key queries."
        }
    }
];

export default function ImpactSnapshot() {
    const [globalPlain, setGlobalPlain] = useState(false);
    const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(stats.length).fill(false));

    const handleToggleGlobal = () => {
        const nextState = !globalPlain;
        setGlobalPlain(nextState);
        setFlippedCards(new Array(stats.length).fill(nextState));
    };

    const handleToggleCard = (index: number) => {
        const updated = [...flippedCards];
        updated[index] = !updated[index];
        setFlippedCards(updated);
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#FAFAFD] dark:bg-[#0A0A1A] transition-colors duration-300">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">Impact Snapshot</h2>
                    <p className="text-muted max-w-2xl mx-auto text-lg font-light">
                        Measurable outcomes delivered across B2B SaaS, AdTech, and consumer products.
                    </p>
                </motion.div>

                {/* Theme Mode Switcher */}
                <div className="flex flex-col items-center justify-center gap-2 mb-12">
                    <div className="flex items-center gap-4 bg-slate-100 dark:bg-white/5 p-1.5 rounded-full border border-glass-border shadow-sm">
                        <button
                            onClick={() => {
                                setGlobalPlain(false);
                                setFlippedCards(new Array(stats.length).fill(false));
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                                !globalPlain 
                                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                                    : "text-muted hover:text-foreground"
                            }`}
                        >
                            Professional Metrics
                        </button>
                        <button
                            onClick={() => {
                                setGlobalPlain(true);
                                setFlippedCards(new Array(stats.length).fill(true));
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                                globalPlain 
                                    ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                                    : "text-muted hover:text-foreground"
                            }`}
                        >
                            Plain English
                        </button>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Click any card to flip it individually
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => {
                        const isCardFlipped = flippedCards[index];
                        return (
                            <div
                                key={index}
                                className="w-full h-[240px] [perspective:1000px] cursor-pointer"
                                onClick={() => handleToggleCard(index)}
                            >
                                <motion.div
                                    className="relative w-full h-full [transform-style:preserve-3d] transition-all"
                                    animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                >
                                    {/* Front Face - Professional PM Metrics */}
                                    <div
                                        className="absolute inset-0 w-full h-full p-6 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl ${stat.bgLight} ${stat.borderLight} border ${stat.color}`}>
                                                    <stat.icon className="w-6 h-6" />
                                                </div>
                                                <span className={`text-4xl font-extrabold tracking-tight ${stat.color}`}>
                                                    {stat.professional.value}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-foreground">
                                                {stat.professional.label}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                            {stat.professional.description}
                                        </p>
                                    </div>

                                    {/* Back Face - Plain English */}
                                    <div
                                        className="absolute inset-0 w-full h-full p-6 rounded-2xl border border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.04] backdrop-blur-sm flex flex-col justify-between shadow-sm"
                                        style={{ 
                                            backfaceVisibility: "hidden", 
                                            transform: "rotateY(180deg)" 
                                        }}
                                    >
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary`}>
                                                    <stat.icon className="w-6 h-6" />
                                                </div>
                                                <span className="text-4xl font-extrabold tracking-tight text-primary">
                                                    {stat.plainEnglish.value}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 text-foreground flex items-center gap-1.5">
                                                {stat.plainEnglish.label}
                                                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary tracking-wider">
                                                    Plain English
                                                </span>
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                            {stat.plainEnglish.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
