"use client";

import { motion } from "framer-motion";
import {
    Figma,
    Trello,
    Database,
    BarChart,
    Slack,
    Globe,
    Zap,
    Layout,
    Activity,
    LineChart
} from "lucide-react";

// Lucide doesn't have all specific brand logos so I'll use generic approximations or existing ones
// Figma -> Figma
// Jira -> Trello (closest generic)
// SQL -> Database
// Mixpanel -> BarChart
// Google Analytics -> Activity
// Amplitude -> LineChart
// Notion -> Layout
// Slack -> Slack
// Postman -> Globe
// Optimizely -> Zap

const skillCategories = [
    {
        title: "Product Thinking",
        skills: ["0→1 Product Development", "User Research & Validation", "PRD & Spec Writing", "Product Strategy & Roadmapping", "Problem Definition & Prioritization", "Feature Scoping & Trade-offs"]
    },
    {
        title: "Execution & Delivery",
        skills: ["Agile/Scrum Methodologies", "Cross-functional Leadership", "Release Planning & QA", "Sprint Planning & Execution", "Stakeholder Management", "Technical Feasibility Assessment"]
    },
    {
        title: "Analytics & Data",
        skills: ["SQL & Data Analysis", "Funnel Analysis & Metrics", "Dashboard Design", "A/B Testing & Experimentation", "User Behavior Analytics", "Data-driven Decision Making"]
    },
    {
        title: "Collaboration & Communication",
        skills: ["Engineering Partnership", "Customer Interviews", "Documentation & Knowledge Sharing", "Design Collaboration", "Executive Presentations", "Conflict Resolution"]
    }
];

const tools = [
    { name: "Figma", icon: Figma, color: "text-purple-400" },
    { name: "Jira", icon: Trello, color: "text-blue-500" },
    { name: "SQL", icon: Database, color: "text-slate-300" },
    { name: "Mixpanel", icon: BarChart, color: "text-indigo-400" },
    { name: "Google Analytics", icon: Activity, color: "text-yellow-500" },
    { name: "Amplitude", icon: LineChart, color: "text-teal-400" },
    { name: "Notion", icon: Layout, color: "text-white" },
    { name: "Slack", icon: Slack, color: "text-emerald-400" },
    { name: "Postman", icon: Globe, color: "text-orange-500" },
    { name: "Optimizely", icon: Zap, color: "text-blue-400" },
];

export default function SkillsTools() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Skills & Tools</h2>
                    <p className="text-muted">Battle-tested capabilities used to ship real products at scale</p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-glass-border hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                                    {/* Icons based on category index for visual distinction */}
                                    {index === 0 && <Zap className="w-6 h-6" />}
                                    {index === 1 && <Trello className="w-6 h-6" />}
                                    {index === 2 && <BarChart className="w-6 h-6" />}
                                    {index === 3 && <Slack className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                {category.skills.map(skill => (
                                    <div key={skill} className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
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
                    <h3 className="text-2xl font-bold mb-10">Toolbelt</h3>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-colors"
                            >
                                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                <span className="text-sm font-medium text-slate-200">
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
