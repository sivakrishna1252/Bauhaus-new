import { Layout } from '@/components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, User, Tag, Maximize2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center container-custom">
                    <h1 className="text-4xl font-serif mb-6">Project Not Found</h1>
                    <Button asChild variant="elegant">
                        <Link to="/portfolio">Back to Portfolio</Link>
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center overflow-hidden bg-charcoal">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* Deep Gradient Overlay for Text Clarity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
                </motion.div>

                <div className="container-custom relative z-10 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link
                            to={project.type === 'residential' ? '/projects/residential' : '/projects/commercial'}
                            className="inline-flex items-center text-gold hover:text-white transition-all mb-10 group bg-charcoal/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm font-medium tracking-wide">Back to {project.type.charAt(0).toUpperCase() + project.type.slice(1)} Projects</span>
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-serif text-5xl md:text-7xl lg:text-8xl text-background mb-10 leading-[1.1] tracking-tight"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap gap-8 md:gap-12"
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mr-4">
                                    <User className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Client</p>
                                    <p className="font-serif text-lg text-background">{project.client}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mr-4">
                                    <MapPin className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Location</p>
                                    <p className="font-serif text-lg text-background">{project.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mr-4">
                                    <Tag className="w-5 h-5 text-gold" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Category</p>
                                    <p className="font-serif text-lg text-background capitalize">{project.type}</p>
                                </div>
                            </div>
                            {project.configuration && (
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mr-4">
                                        <Maximize2 className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Configuration</p>
                                        <p className="font-serif text-lg text-background">{project.configuration}</p>
                                    </div>
                                </div>
                            )}
                            {project.handoverYear && (
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mr-4">
                                        <Tag className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">Year</p>
                                        <p className="font-serif text-lg text-background">{project.handoverYear}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding bg-background relative" ref={ref}>
                <div className="container-custom">
                    {/* Project Overview */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-gold text-sm tracking-[0.4em] uppercase mb-6"
                        >
                            The Vision
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl md:text-5xl mb-8"
                        >
                            Project Overview
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-20 h-px bg-gold mx-auto mb-10"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-muted-foreground text-xl leading-relaxed italic font-serif"
                        >
                            "{project.description}"
                        </motion.p>
                    </div>

                    {/* Project Gallery */}
                    <div className="mb-20">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h3 className="font-serif text-3xl mb-2">Visual Gallery</h3>
                                <p className="text-muted-foreground tracking-widest uppercase text-xs">Capturing the details</p>
                            </div>
                            <div className="hidden md:block w-1/3 h-px bg-neutral-200" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {project.gallery.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                                    className={cn(
                                        "group relative overflow-hidden rounded-2xl cursor-pointer shadow-md border border-neutral-100",
                                        index % 4 === 0 ? "lg:col-span-2 aspect-[16/9]" : "aspect-[1/1]"
                                    )}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`${project.title} - ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Maximize2 className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-32 p-12 md:p-20 bg-charcoal rounded-[2rem] text-center relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="font-serif text-4xl md:text-5xl text-background mb-8">Inspired by this project?</h2>
                            <p className="text-background/60 text-lg mb-12 max-w-2xl mx-auto">
                                Every space has a story. Let's start crafting yours. Our design experts are ready to bring your vision to life.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button variant="elegant" size="xl" asChild className="px-12">
                                    <Link to="/contact">Get Started</Link>
                                </Button>
                                <Button variant="outline" size="xl" asChild className="border-gold/30 text-gold hover:bg-gold hover:text-white transition-all px-12">
                                    <Link to="/portfolio">Explore More</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox / Fullscreen Image */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-20 cursor-zoom-out"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-7xl max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Selected project image"
                                className="w-full h-full object-contain rounded-lg shadow-2xl"
                            />
                            <button
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default ProjectDetail;
