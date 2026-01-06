import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import heroImage from '@/assets/about.jpg';
import project1 from '@/assets/project-1.jpg'; // Placeholder for team/collage

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const teamMembers = [
    { name: "Arjun Mehta", role: "Principal Architect", image: project1, level: 0 },
    { name: "Sara Ali", role: "Interior Designer", image: project1, level: 1 },
    { name: "Rohan Das", role: "Project Manager", image: project1, level: 1 },
    { name: "Priya Sharma", role: "3D Visualizer", image: project1, level: 1 },
    { name: "Vikram Singh", role: "Site Supervisor", image: project1, level: 2 },
    { name: "Ananya Roy", role: "Stylist", image: project1, level: 2 },
];

const About = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative hero-padding bg-charcoal overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src={heroImage}
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-30"
                    />
                </motion.div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-gold text-sm tracking-[0.4em] uppercase mb-6"
                        >
                            Who We Are
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8"
                        >
                            Designing Spaces with Purpose
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="w-16 h-px bg-gold origin-left mb-8"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-white/80 text-lg leading-relaxed mb-8"
                        >
                            At Bauhaus-Spaces, we believe interiors should feel intuitive, elegant, and enduring. From modern homes to commercial spaces, our work combines clean aesthetics with practical solutions, tailored to each client’s lifestyle and vision.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="font-serif text-4xl md:text-6xl leading-tight mb-8 text-foreground"
                        >
                            Introduction To <span className="text-gold italic">Bauhaus Spaces</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-muted-foreground leading-relaxed">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <p style={{ background: "#ffffff", padding: "16px 20px", border: "1px solid #e5e7eb", borderRadius: "8px", lineHeight: "1.9", textAlign: "justify", textJustify: "inter-word", hyphens: "auto" }}>
                                At Bauhaus Spaces, we redefine interior design in Pune by creating spaces that are functional,  elegant, minimalistic and timeless. Design for us is more than aesthetics — it’s about enhancing how you live, work, and interact with your surroundings projects are extractly from the acceptable.
                            </p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                        >
                            <p style={{ background: "#ffffff", padding: "16px 20px", border: "1px solid #e5e7eb", borderRadius: "8px", lineHeight: "1.9", textAlign: "justify", textJustify: "inter-word", hyphens: "auto" }}>
                                We specialize in residential and commercial interiors, transforming homes, offices, and retail spaces into personalized sanctuaries that reflect your style and lifestyle. Every project combines innovative solutions, premium materials, and thoughtful detailing, ensuring a perfect balance of beauty and functionality.
                            </p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: 0.4 }}
                        >
                            <p style={{ background: "#ffffff", padding: "16px 20px", border: "1px solid #e5e7eb", borderRadius: "8px", lineHeight: "1.9", textAlign: "justify", textJustify: "inter-word", hyphens: "auto" }}>
                                From initial concept to flawless execution, our team manages every stage with precision. With over a decade of experience serving clients across Pune, Baner, Aundh, Kalyani Nagar, Hinjewadi, Koregaon Park, and PCMC, we deliver exceptional interiors that stand the test of time.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-zinc-900 text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 p-10 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <CircleDollarSign className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl mb-3">Best Price Guaranteed</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Luxury interiors within your budget — transparent pricing, value-driven solutions, and uncompromised quality across Pune.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/5 p-10 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl mb-3">Finance Analysis</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Smart financial planning for interiors — transparent budgets, detailed cost analysis, and stress-free execution across Pune.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white/5 p-10 rounded-xl hover:bg-white/10 transition-colors border border-white/10 group"
                        >
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl mb-3">Professional Team</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Your vision, our expertise — a dedicated team of architects and designers crafting interiors with precision and style across Pune.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Hierarchy Section */}
            <section className="py-24 bg-background overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <p className="text-gold text-sm tracking-[0.4em] uppercase mb-3">Our Experts</p>
                        <h2 className="font-serif text-4xl md:text-5xl">Work with Our Expert Team</h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto px-4">
                        {/* Organizational Structure */}
                        <div className="flex flex-col items-center gap-16 md:gap-24 relative">

                            {/* Level 0: Top */}
                            <div className="relative">
                                {teamMembers.filter(m => m.level === 0).map((member, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center">
                                        <div className="relative p-1 rounded-full border-2 border-gold/30 mb-4 transition-transform duration-500 hover:scale-105">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-2 border-white">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <h3 className="font-serif text-xl md:text-2xl text-foreground">{member.name}</h3>
                                        <span className="text-xs uppercase tracking-widest text-gold font-medium mt-1">{member.role}</span>
                                    </div>
                                ))}
                                {/* Line to next level (Desktop) */}
                                <div className="hidden md:block absolute -bottom-12 left-1/2 w-0.5 h-12 bg-gold/40" />
                            </div>

                            {/* Level 1: Middle */}
                            <div className="relative w-full">
                                {/* Horizontal line (Desktop) */}
                                <div className="hidden md:block absolute -top-12 left-[16%] right-[16%] h-0.5 bg-gold/40" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                                    {teamMembers.filter(m => m.level === 1).map((member, idx) => (
                                        <div key={idx} className="relative flex flex-col items-center text-center">
                                            {/* Vertical line from horizontal line (Desktop) */}
                                            <div className="hidden md:block absolute -top-12 left-1/2 w-0.5 h-12 bg-gold/40" />

                                            <div className="relative p-1 rounded-full border-2 border-gold/20 mb-4 transition-transform duration-500 hover:scale-105">
                                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-2 border-white">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <h3 className="font-serif text-lg md:text-xl text-foreground">{member.name}</h3>
                                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1 px-3 py-1 bg-secondary/30 rounded-full">{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Line to next level (Desktop - from Rohan Das) */}
                                <div className="hidden md:block absolute -bottom-12 left-1/2 w-0.5 h-12 bg-gold/40" />
                            </div>

                            {/* Level 2: Bottom */}
                            <div className="relative w-full">
                                {/* Horizontal line (Desktop) */}
                                <div className="hidden md:block absolute -top-12 left-[33%] right-[33%] h-0.5 bg-gold/40" />

                                <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                                    {teamMembers.filter(m => m.level === 2).map((member, idx) => (
                                        <div key={idx} className="relative flex flex-col items-center text-center">
                                            {/* Vertical line from horizontal line (Desktop) */}
                                            <div className="hidden md:block absolute -top-12 left-1/2 w-0.5 h-12 bg-gold/40" />

                                            <div className="relative p-1 rounded-full border-2 border-gold/10 mb-4 transition-transform duration-500 hover:scale-105">
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-sm border-2 border-white">
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <h3 className="font-serif text-lg text-foreground">{member.name}</h3>
                                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/70 mt-1">{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
