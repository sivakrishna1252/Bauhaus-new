import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { CircleDollarSign, TrendingUp, Users, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import heroImage from '@/assets/website/Rajesh Mohapatra.webp';
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

// Video Slider Component
const VideoSliderSection = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    
    // Initialize with first video(s) based on screen size
    const getInitialVisibleIndices = (): number[] => {
        if (typeof window === 'undefined') return [0];
        const width = window.innerWidth;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        
        if (isMobile) {
            return [0];
        } else if (isTablet) {
            return [0, 1];
        } else {
            return [0, 1, 2];
        }
    };
    
    const [activeVideoIndices, setActiveVideoIndices] = useState<number[]>(getInitialVisibleIndices());
    const [mounted, setMounted] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    // Ensure first video is active on initial mount and component is mounted
    useEffect(() => {
        setMounted(true);
        const initialIndices = getInitialVisibleIndices();
        setActiveVideoIndices(initialIndices);
        // Small delay to ensure iframe is ready
        setTimeout(() => {
            setFirstLoad(false);
        }, 500);
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }

        const updateActiveVideos = () => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrent(selectedIndex + 1);
            
            // Determine which videos are visible based on screen size
            const getVisibleIndices = (): number[] => {
                const width = window.innerWidth;
                const isMobile = width < 768;
                const isTablet = width >= 768 && width < 1024;
                
                if (isMobile) {
                    // Mobile: 1 slide visible
                    return [selectedIndex];
                } else if (isTablet) {
                    // Tablet: 2 slides visible
                    return [
                        selectedIndex,
                        (selectedIndex + 1) % youtubeVideos.length
                    ];
                } else {
                    // Desktop: 3 slides visible
                    return [
                        selectedIndex,
                        (selectedIndex + 1) % youtubeVideos.length,
                        (selectedIndex + 2) % youtubeVideos.length
                    ];
                }
            };
            
            setActiveVideoIndices(getVisibleIndices());
        };

        // Update immediately on mount to ensure first video is active
        updateActiveVideos();
        api.on("select", updateActiveVideos);

        // Update on window resize
        const handleResize = () => {
            setTimeout(updateActiveVideos, 100); // Small delay to ensure resize is complete
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [api]);

    // Autoplay functionality
    useEffect(() => {
        if (!api) return;

        let intervalId: NodeJS.Timeout;

        const startAutoplay = () => {
            intervalId = setInterval(() => {
                api.scrollNext();
            }, 5000); // Slide every 5 seconds
        };

        const stopAutoplay = () => {
            clearInterval(intervalId);
        };

        startAutoplay(); // Start autoplay on mount

        // Pause on hover
        const carouselElement = api.rootNode();
        if (carouselElement) {
            carouselElement.addEventListener('mouseenter', stopAutoplay);
            carouselElement.addEventListener('mouseleave', startAutoplay);
        }

        return () => {
            stopAutoplay();
            if (carouselElement) {
                carouselElement.removeEventListener('mouseenter', stopAutoplay);
                carouselElement.removeEventListener('mouseleave', startAutoplay);
            }
        };
    }, [api]);

    return (
        <section className="pt-8 pb-16 bg-background">
            <div className="container-custom max-w-[180rem] px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-8 md:mb-12"
                >
                    <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">Our Work</p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                        Featured Videos
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-16 h-px bg-gold mx-auto"
                    />
                </motion.div>

                {/* Video Carousel */}
                <div className="relative">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "center",
                            loop: true,
                            duration: 30,
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
                            {youtubeVideos.map((video, index) => {
                                const videoId = getYouTubeId(video.url);
                                const isActive = activeVideoIndices.includes(index);
                                // ALL videos will autoplay - every video gets autoplay parameter
                                const autoplayParam = '&autoplay=1&mute=1';
                                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&loop=1&playlist=${videoId}${autoplayParam}`;
                                
                                return (
                                    <CarouselItem 
                                        key={index} 
                                        className="pl-4 md:pl-6 lg:pl-8 basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                            className="relative w-full h-full flex items-center justify-center"
                                        >
                                            {/* Video Container - Rounded corners with increased height, no black borders */}
                                            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl aspect-[16/10] rounded-3xl overflow-hidden border-0 mx-auto">
                                                <iframe
                                                    key={`${videoId}-${index}`}
                                                    className="w-full h-full border-0"
                                                    src={embedUrl}
                                                    title={video.title || `Video ${index + 1}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    style={{ 
                                                        borderRadius: '1.5rem',
                                                        objectFit: 'cover'
                                                    }}
                                                ></iframe>
                                            </div>
                                            {video.title && (
                                                <h3 className="font-serif text-lg md:text-xl text-foreground mt-4 text-center line-clamp-2 px-2">
                                                    {video.title}
                                                </h3>
                                            )}
                                        </motion.div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        
                        {/* Navigation Buttons - Positioned outside video area, properly spaced */}
                        <CarouselPrevious className="hidden md:flex !absolute !-left-6 lg:!-left-16 xl:!-left-20 !top-1/2 !-translate-y-1/2 !h-16 !w-16 !bg-white hover:!bg-gold !border-2 !border-gold !shadow-2xl hover:!shadow-3xl !transition-all !duration-300 !z-20 !rounded-full [&_svg]:!text-foreground hover:[&_svg]:!text-background [&_svg]:!w-7 [&_svg]:!h-7" />
                        <CarouselNext className="hidden md:flex !absolute !-right-6 lg:!-right-16 xl:!-right-20 !top-1/2 !-translate-y-1/2 !h-16 !w-16 !bg-white hover:!bg-gold !border-2 !border-gold !shadow-2xl hover:!shadow-3xl !transition-all !duration-300 !z-20 !rounded-full [&_svg]:!text-foreground hover:[&_svg]:!text-background [&_svg]:!w-7 [&_svg]:!h-7" />
                    </Carousel>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {youtubeVideos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    current === index + 1
                                        ? 'w-8 bg-gold'
                                        : 'w-2 bg-gold/30 hover:bg-gold/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Video Counter */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-muted-foreground">
                            {current} / {youtubeVideos.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

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
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">
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
                                At Bauhaus-Spaces, we believe interiors should feel intuitive, elegant, and enduring. From modern homes to commercial spaces, our work combines clean aesthetics with practical solutions, tailored to each client's lifestyle and vision.
                            </motion.p>
                        </div>

                        {/* Social Icons */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-row gap-4 md:mt-8"
                        >
                            <a
                                href="https://www.facebook.com/Thebauhausdesigns"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                            >
                                <Facebook className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors" />
                            </a>
                            <a
                                href="https://www.instagram.com/bauhaus.spaces/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                            >
                                <Instagram className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors" />
                            </a>
                            <a
                                href="https://www.youtube.com/@bauhausspaces"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                            >
                                <Youtube className="w-5 h-5 text-gold group-hover:text-charcoal transition-colors" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="section-padding bg-background">
                <div className="container-custom max-w-6xl">
                    {/* Section Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-4xl mx-auto mb-20 md:mb-28"
                    >
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-foreground"
                        >
                            Introduction To <span className="text-gold italic font-light">Bauhaus Spaces</span>
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-16 h-px bg-gold mx-auto mb-12"
                        />
                    </motion.div>

                    {/* Content - Clean Editorial Layout */}
                    <div className="space-y-12 md:space-y-16">
                        {/* First Paragraph */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto"
                        >
                            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl font-light tracking-wide" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                At Bauhaus Spaces, we redefine interior design in Pune by creating spaces that are functional, elegant, minimalistic, and timeless. Design for us is more than aesthetics — it's about enhancing how you live, work, and interact with your surroundings. Our projects are executed exactly as acceptable.
                            </p>
                        </motion.div>

                        {/* Second Paragraph */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl mx-auto"
                        >
                            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl font-light tracking-wide" style={{ textAlign: "justify", textJustify: "inter-word" }}>
                                We specialize in residential and commercial interiors, transforming homes, offices, and retail spaces into personalized sanctuaries that reflect your style and lifestyle. Every project combines innovative solutions, premium materials, and thoughtful detailing, ensuring a perfect balance of beauty and functionality.
                            </p>
                        </motion.div>

                        {/* Third Paragraph */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: 0.4 }}
                            className="max-w-4xl mx-auto"
                        >
                            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl font-light tracking-wide" style={{ textAlign: "justify", textJustify: "inter-word" }}>
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
            <section className="py-24 pb-8 bg-background overflow-hidden">
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

            {/* YouTube Videos Section - Slider Format */}
            <VideoSliderSection />
        </Layout>
    );
};

// YouTube video data - Add your video URLs here
const youtubeVideos = [
    { url: "https://www.youtube.com/watch?v=IKz_nWhsjuE", title: "" },
    { url: "https://www.youtube.com/watch?v=QYg81VAOS8Y", title: "" },
    { url: "https://www.youtube.com/watch?v=XLJv5WHg1Z8", title: "" },
    { url: "https://www.youtube.com/watch?v=s4aouMesm2g", title: "" },
    { url: "https://www.youtube.com/watch?v=xTmOLz86Rzs", title: "" },
    { url: "https://www.youtube.com/watch?v=K10nmYGspn0", title: "" },
];

// Helper function to extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return '';
};

export default About;
