"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Database, Eye, Zap } from "lucide-react";

const stats = [
    {
        icon: Zap,
        value: "15-20%",
        label: "Client ROAS Lift",
        description: "Boosted advertising returns by building the FaktorOS Agentic Decision Framework with real-time optimization.",
        color: "text-yellow-400"
    },
    {
        icon: Users,
        value: "+20%",
        label: "User Retention",
        description: "Raised product retention rate by establishing automated CRM workflows and funnels for mental health apps.",
        color: "text-blue-400"
    },
    {
        icon: Database,
        value: "+21%",
        label: "Data Precision",
        description: "Enhanced contextual targeting accuracy at Media.net by programmatically mapping ad URLs.",
        color: "text-green-400"
    },
    {
        icon: Clock,
        value: "-30%",
        label: "Manual Review Time",
        description: "Reduced hours of manual work by designing automated content classification pipelines.",
        color: "text-red-400"
    },
    {
        icon: TrendingUp,
        value: "+12%",
        label: "Supply Efficiency",
        description: "Streamlined publisher yield by identifying under-utilized monetization funnels via custom dashboards.",
        color: "text-purple-400"
    },
    {
        icon: Eye,
        value: "500K+",
        label: "Ad URLs Mapped",
        description: "Classified and indexed high-revenue URLs to scale ad relevancy across key search queries.",
        color: "text-orange-400"
    }
];

export default function ImpactSnapshot() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Impact Snapshot</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        Measurable outcomes delivered across B2B SaaS, AdTech, and consumer products.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl border border-glass-border bg-glass-bg hover:bg-white/5 transition-all backdrop-blur-sm group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                            <p className="text-sm text-slate-400">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
