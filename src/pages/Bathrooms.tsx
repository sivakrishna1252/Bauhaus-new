import { Layout } from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import bathroomImage from '@/assets/bathroom-service.jpg';

const services = [
  {
    title: 'Complete Renovation',
    description: 'Full bathroom makeover including plumbing, tiling, fixtures, and finishes.',
  },
  {
    title: 'Fixture Upgrades',
    description: 'Premium sanitary ware and fittings for a fresh, modern look.',
  },
  {
    title: 'Tile Work',
    description: 'Expert tile installation with premium materials and patterns.',
  },
  {
    title: 'Vanity Design',
    description: 'Custom vanity units designed for storage and style.',
  },
];

const Bathrooms = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: craftRef, isVisible: craftVisible } = useScrollAnimation({ threshold: 0.15 });

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
            src={bathroomImage}
            alt="Luxury bathroom design"
            className="w-full h-full object-cover opacity-50"
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
              Interior Design
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-8"
            >
              Bathrooms & Renovations
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
              className="text-background/80 text-lg leading-relaxed mb-10"
            >
              Transform your bathroom into a luxurious spa-like retreat.
              We specialize in creating functional, beautiful bathroom spaces.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button variant="gold" size="xl" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background" ref={ref}>
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-20 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Our Services</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              What We Offer
            </h2>
            <div className={cn(
              "w-16 h-px bg-gold mx-auto mb-8 transition-transform duration-1000 origin-center",
              isVisible ? "scale-x-100" : "scale-x-0"
            )} style={{ transitionDelay: '200ms' }} />
            <p className="text-muted-foreground text-lg leading-relaxed">
              From minor updates to complete overhauls, we handle every aspect
              of bathroom design and renovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={cn(
                  "p-10 lg:p-14 bg-secondary card-hover transition-all duration-700 rounded-2xl",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section-padding bg-secondary" ref={craftRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={cn(
              "aspect-[4/5] img-scale-reveal transition-all duration-1000 rounded-2xl overflow-hidden",
              craftVisible ? "opacity-100 translate-x-0 is-visible" : "opacity-0 -translate-x-12"
            )}>
              <img
                src={bathroomImage}
                alt="Bathroom design showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={cn(
              "transition-all duration-1000",
              craftVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )} style={{ transitionDelay: '200ms' }}>
              <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Why Choose Us</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Expert Craftsmanship
              </h2>
              <div className={cn(
                "w-16 h-px bg-gold mb-8 transition-transform duration-1000 origin-left",
                craftVisible ? "scale-x-100" : "scale-x-0"
              )} style={{ transitionDelay: '400ms' }} />
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our team of skilled professionals brings years of experience in bathroom
                renovations. We work with premium materials and trusted brands to ensure
                lasting quality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                From concept to completion, we manage every detail of your project,
                ensuring a seamless renovation experience with minimal disruption to
                your daily life.
              </p>
              <Button variant="elegant" size="xl" asChild>
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bathrooms;