import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import heroImage1 from '@/assets/banner1.jpg';
import heroImage2 from '@/assets/banner2.jpg';
import heroImage3 from '@/assets/banner3.jpg';

const slides = [
  {
    image: heroImage1,
    subtitle: "Luxury Interior Design Studio in Pune",
    title: "Transform Your Space Into Your Dream",
    highlight: "",
    description: "We design modern, functional, and timeless interiors that perfectly reflect your lifestyle and elevate your everyday living experience.",
    ctaPrimary: { text: "Book a Consultation", link: "/contact" },
    ctaSecondary: { text: "View Our Work", link: "/portfolio" }
  },
  {
    image: heroImage2,
    subtitle: "Modern interior design inspired by clarity, function, and timeless elegance.",
    title: "Design That Works. Spaces That Last.",
    highlight: "",
    description: "At Bauhaus-Spaces, we create interiors that balance aesthetics and purpose. Rooted in modern design principles, our spaces are thoughtful, refined, and built to enhance everyday living",
    ctaPrimary: { text: "Book a Consultation", link: "/contact" },
    ctaSecondary: { text: "Explore Our Work", link: "/portfolio" }
  },
  {
    image: heroImage3,
    subtitle: "Sanctuaries of Comfort and Elegance",
    title: "Where Elegance Meets Functionality",
    highlight: "",
    description: "Every interior we design is tailored to the client's lifestyle, ensuring a seamless balance between comfort, usability, and visual harmony.",
    ctaPrimary: { text: "Book a Consultation", link: "/contact" },
    ctaSecondary: { text: "View Portfolio", link: "/portfolio" }
  }
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image Slider with Cross-fade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={slides[currentImageIndex].image}
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-gold text-sm tracking-[0.4em] uppercase mb-8 font-semibold"
              >
                {slides[currentImageIndex].subtitle}
              </motion.p>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-8"
              >
                {slides[currentImageIndex].title}
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-24 h-px bg-gold mx-auto mb-8"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
              >
                {slides[currentImageIndex].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button variant="default" size="xl" asChild >
                  <Link to={slides[currentImageIndex].ctaPrimary.link} >{slides[currentImageIndex].ctaPrimary.text}</Link>
                </Button>
                <Button variant="elegant-light" size="xl" asChild>
                  <Link to={slides[currentImageIndex].ctaSecondary.link}>
                    {slides[currentImageIndex].ctaSecondary.text}
                    {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              "h-1 transition-all duration-300 rounded-full",
              index === currentImageIndex
                ? "w-8 bg-gold"
                // #test wii be black change bg-gold

                : "w-4 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}