import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

import { projects } from '@/data/projects';

// Stats data remains same
const statsCodes = [
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 10, suffix: '', label: 'Years Warranty' },
];

function Counter({ value, suffix, className }: { value: number; suffix: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Autoplay functionality
  useEffect(() => {
    if (!api) return;

    let intervalId: NodeJS.Timeout;

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        api.scrollNext();
      }, 4000); // Slide every 4 seconds
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
      stopAutoplay(); // Clear interval on unmount
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoplay);
        carouselElement.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [api]);

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Selected Works</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Our Projects
          </h2>
          <div className={cn(
            "w-16 h-px bg-gold mt-6 mb-6 mx-auto transition-transform duration-1000 origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )} style={{ transitionDelay: '200ms' }} />
          <p className={cn(
            "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delayed-fade-in",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Our work spans residential and commercial interiors across Pune. Each project reflects thoughtful design, refined detailing, and a deep understanding of space.
          </p>
        </div>

        {/* Projects Carousel */}
        <div className={cn(
          "transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              duration: 60,
            }}
            className="w-full relative px-10 md:px-12 lg:px-16"
          >
            <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 lg:pl-8 basis-full md:basis-full lg:basis-1/2">
                  <Link
                    to={`/project/${project.id}`}
                    className="group relative block aspect-[4/5] overflow-hidden cursor-pointer rounded-2xl"
                  >
                    <div className="w-full h-full img-scale-reveal is-visible">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-gold-light text-xs tracking-widest uppercase mb-2">{project.type} • {project.location}</p>
                      <h3 className="font-serif text-xl lg:text-2xl text-background mb-2">{project.title}</h3>
                      <p className="text-background/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.client}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - High Visibility */}
            <CarouselPrevious
              className="absolute -left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 h-9 w-9 md:h-12 md:w-12 bg-white border-2 border-gold/40 shadow-xl text-gold hover:bg-gold hover:text-white rounded-full transition-all duration-300 z-10"
            />
            <CarouselNext
              className="absolute -right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 h-9 w-9 md:h-12 md:w-12 bg-white border-2 border-gold/40 shadow-xl text-gold hover:bg-gold hover:text-white rounded-full transition-all duration-300 z-10"
            />

            {/* Controls: Dots */}
            <div className="flex flex-col items-center justify-center mt-12 gap-6 relative">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      current === index + 1 ? "w-8 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/50"
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </div>

        {/* Stats Section Moved from Testimonials */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}
          style={{ transitionDelay: '600ms' }}
        >
          {statsCodes.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-700",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: `${700 + index * 100}ms` }}
            >
              <p className="font-serif text-5xl md:text-6xl text-gold mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-foreground/60 text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <Button variant="elegant-outline" size="lg" asChild>
            <Link to="/portfolio">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section >
  );
}