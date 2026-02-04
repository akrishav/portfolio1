export default function Projects() {
    const projects = [
        {
            title: "Neon Horizon",
            category: "WebGL Experience",
            description: "A procedural terrain generation experiment utilizing Three.js and custom shaders.",
        },
        {
            title: "Velvet UI",
            category: "Design System",
            description: "A comprehensive React component library focusing on accessibility and motion.",
        },
        {
            title: "Echo Space",
            category: "Audio Visualizer",
            description: "Real-time audio reaction engine mapping frequency data to particle systems.",
        },
    ];

    return (
        <section className="relative z-10 w-full min-h-screen py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-20 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                    Selected Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group relative h-[400px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-accent/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Decorative glow for card */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/30 blur-[60px] rounded-full group-hover:bg-accent/40 transition-colors duration-500" />

                            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                <p className="text-sm font-semibold text-secondary mb-2 uppercase tracking-wide">
                                    {project.category}
                                </p>
                                <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-purple-50 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-purple-100/70 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center py-20 border-t border-white/5">
                    <h3 className="text-3xl font-light mb-8 text-purple-100">Ready to build the future?</h3>
                    <button className="px-10 py-4 rounded-full bg-gradient-to-r from-secondary to-accent text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:scale-105 transition-all duration-300">
                        Get in touch
                    </button>
                </div>
            </div>
        </section>
    );
}
