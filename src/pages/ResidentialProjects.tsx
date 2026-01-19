import { Layout } from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import rajesh from '@/assets/rajesh.jpg';
import { useState } from 'react';
import { projects } from '@/data/projects';

const ResidentialProjects = () => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const residentialProjects = projects.filter(p => p.type === 'residential');

    const [pageLength, setPageLength] = useState(4)

    const handlePageLength = () => {
        if (pageLength < residentialProjects.length) {
            setPageLength(prev => prev + 4)
        }
    }

    return (
        <Layout>
            {/* Hero */}
            <section className="relative hero-padding bg-charcoal overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src={residentialProjects[0]?.image || rajesh}
                        alt="Residential Projects Hero"
                        className="w-full h-full object-cover opacity-40"
                    />
                </motion.div>
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-gold text-sm tracking-[0.4em] uppercase mb-6"
                        >
                            Our Work
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-8"
                        >
                            Residential Projects
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="w-16 h-px bg-gold origin-left mb-8"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="text-background/80 text-lg leading-relaxed"
                        >
                            Crafting personalized homes that reflect your unique lifestyle and taste.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding bg-background" ref={ref}>
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                        {residentialProjects.slice(0, pageLength).map((project, index) => (
                            <Link
                                key={project.id}
                                to={`/project/${project.id}`}
                                className={cn(
                                    "group card-hover transition-all duration-700 block h-full",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                )}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 h-full flex flex-col">
                                    <div className={cn(
                                        "aspect-[16/11] img-scale-reveal overflow-hidden",
                                        isVisible && "is-visible"
                                    )}>
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-8 md:p-10 flex flex-col items-start text-left flex-grow">
                                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-semibold">{project.location}</p>
                                        <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">{project.title}</h3>
                                        <div className="w-16 h-px bg-gold/40 mb-6" />
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <p className="text-gold font-semibold text-[11px] tracking-[0.2em] uppercase">Designed for {project.client}</p>
                                            {project.configuration && (
                                                <p className="text-neutral-400 text-[11px] tracking-[0.2em] uppercase">/ {project.configuration}</p>
                                            )}
                                            {project.handoverYear && (
                                                <p className="text-neutral-400 text-[11px] tracking-[0.2em] uppercase">/ {project.handoverYear}</p>
                                            )}
                                        </div>
                                        <p className="text-neutral-600 leading-relaxed text-base lg:text-lg text-justify line-clamp-3">{project.description}</p>
                                        <div className="mt-6 inline-flex items-center text-gold font-medium group/btn">
                                            View Project Details
                                            <span className="ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {pageLength < residentialProjects.length && (
                        <div className="mt-16 text-center">
                            <Button
                                variant="outline"
                                className="border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] text-[11px] font-bold px-10 py-6"
                                onClick={handlePageLength}
                            >
                                Load More Projects
                            </Button>
                        </div>
                    )}

                    {/* CTA */}
                    <div className={cn(
                        "text-center mt-24 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )} style={{ transitionDelay: '500ms' }}>
                        <p className="text-muted-foreground text-lg mb-8">
                            Ready to build your dream home?
                        </p>
                        <Button variant="elegant" size="xl" asChild>
                            <Link to="/contact">Start Your Residential Project</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ResidentialProjects;
