"use client";

import { motion } from "framer-motion";
import {
    Figma,
    Trello,
    Database,
    BarChart,
    MessageSquare,
    Slack,
    Globe,
    Terminal,
    Zap,
    Layout
} from "lucide-react";

// Lucide doesn't have all specific brand logos so I'll use generic approximations or existing ones
// Figma -> Figma
// Jira -> Trello (closest generic)
// SQL -> Database
// Mixpanel/Amplitude -> BarChart
// Notion -> Layout
// Slack -> Slack
// Postman -> Globe/Terminal
// Optimizely -> Zap

const skillCategories = [
    {
        title: "Product Thinking",
        skills: ["User Research", "Roadmapping", "PRD Writing", "Prioritization"]
    },
    {
        title: "Execution & Delivery",
        skills: ["Agile/Scrum", "Sprint Planning", "A/B Testing", "QA Testing"]
    },
    {
        title: "Analytics & Data",
        skills: ["SQL Queries", "Funnel Analysis", "Cohort Retention", "Data Viz"]
    },
    {
        title: "Collaboration",
        skills: ["Stakeholder Mgmt", "Workshop Facilitation", "Tech Specs", "Mentorship"]
    }
];

const tools = [
    { name: "Figma", icon: Figma, color: "text-purple-400" },
    { name: "Jira", icon: Trello, color: "text-blue-500" },
    { name: "SQL", icon: Database, color: "text-slate-300" },
    { name: "Mixpanel", icon: BarChart, color: "text-indigo-400" },
    { name: "Notion", icon: Layout, color: "text-white" },
    { name: "Slack", icon: Slack, color: "text-emerald-400" },
    { name: "Postman", icon: Globe, color: "text-orange-500" },
    { name: "Optimizely", icon: Zap, color: "text-yellow-400" },
];

export default function SkillsTools() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-6xl mx-auto">

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-glass-border hover:border-primary/50 transition-colors"
                        >
                            <h3 className="text-lg font-bold mb-4 text-primary">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map(skill => (
                                    <li key={skill} className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Tools Belt */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold mb-10">Tools I Use Daily</h3>

                    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className={`p-5 rounded-2xl bg-white/5 border border-glass-border group-hover:bg-white/10 group-hover:border-primary/30 transition-all ${tool.color}`}>
                                    <tool.icon className="w-8 h-8" />
                                </div>
                                <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                                    {tool.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
