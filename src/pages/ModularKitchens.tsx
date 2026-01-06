import { Layout } from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import kitchenImage from '@/assets/kitchen-service.jpg';

const kitchenTypes = [
  { name: 'L-Shaped Kitchen', description: 'Efficient corner utilization, ideal for open-plan homes.' },
  { name: 'U-Shaped Kitchen', description: 'Spacious countertop area with maximum storage.' },
  { name: 'Parallel / Galley Kitchen', description: 'Professional workflow with separate wet and dry zones.' },
  { name: 'Island Kitchen', description: 'A luxurious centerpiece perfect for social cooking.' },
  { name: 'Straight / Linear Kitchen', description: 'Compact, functional design for smaller spaces.' },
];

const materials = [
  {
    name: 'Acrylic',
    description: 'High-gloss, scratch-resistant finish for a modern look.',
  },
  {
    name: 'PU Finish',
    description: 'Seamless, premium coating available in matte and gloss.',
  },
  {
    name: 'Laminates',
    description: 'Versatile, durable, and cost-effective with endless textures.',
  },
  {
    name: 'Veneer',
    description: 'Natural wood texture for a warm, timeless appeal.',
  },
  {
    name: 'Glass & Aluminum',
    description: 'Modern, high-end aesthetics for contemporary kitchens.',
  },
];

const features = [
  { name: 'Soft-Close Drawers', description: 'Silent, effortless closing for premium utility.' },
  { name: 'Corner Solutions', description: 'Magic corners and carousel units for maximum space usage.' },
  { name: 'Tall Units', description: 'Pantry storage for dry groceries and built-in appliances.' },
  { name: 'Under-Cabinet Lighting', description: 'Ambiance and functional lighting for workspaces.' },
];

const ModularKitchens = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: materialsRef, isVisible: materialsVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.2 });

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
            src={kitchenImage}
            alt="Modular kitchen design"
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
              Elevate Your Culinary Experience
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-8"
            >
              Heart of the Home – Modular Kitchens
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
              At Bauhaus-Spaces, we believe the kitchen is more than just a place to cook—it’s where lifestyle meets function. Our modular kitchens are designed for efficiency, durability, and elegance, ensuring a seamless culinary experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <Button variant="gold" size="xl" asChild> */}
              <Button variant="elegant" size="lg" asChild>

                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kitchen Types */}
      <section className="section-padding bg-background" ref={ref}>
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-20 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Kitchen Layouts</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Types of Kitchen We Design
            </h2>
            <div className={cn(
              "w-16 h-px bg-gold mx-auto transition-transform duration-1000 origin-center",
              isVisible ? "scale-x-100" : "scale-x-0"
            )} style={{ transitionDelay: '200ms' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kitchenTypes.map((type, index) => (
              <div
                key={type.name}
                className={cn(
                  "p-10 bg-secondary text-center card-hover transition-all duration-700 rounded-2xl",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="font-serif text-2xl text-foreground mb-4">{type.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding bg-secondary" ref={materialsRef}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className={cn(
              "transition-all duration-1000",
              materialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Premium Finishes</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Core Materials
              </h2>
              <div className={cn(
                "w-16 h-px bg-gold mb-8 transition-transform duration-1000 origin-left",
                materialsVisible ? "scale-x-100" : "scale-x-0"
              )} style={{ transitionDelay: '200ms' }} />
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                All of our modular kitchens feature the best materials in the manufacturing
                process, with a range of finishes to choose from that effortlessly match your style.
              </p>

              <div className="space-y-8">
                {materials.map((material, index) => (
                  <div
                    key={material.name}
                    className={cn(
                      "flex gap-6 group transition-all duration-700",
                      materialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-black transition-colors duration-500">
                      <Check className="w-6 h-6 text-gold group-hover:text-background transition-colors duration-500" />
                    </div>
                    <div className="pt-2">
                      <h4 className="font-serif text-xl text-foreground mb-2 group-hover:text-gold transition-colors duration-300">{material.name}</h4>
                      <p className="text-muted-foreground">{material.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={cn(
              "aspect-square img-scale-reveal transition-all duration-1000 rounded-2xl overflow-hidden",
              materialsVisible ? "opacity-100 translate-x-0 is-visible" : "opacity-0 translate-x-12"
            )} style={{ transitionDelay: '200ms' }}>
              <img
                src={kitchenImage}
                alt="Premium kitchen materials"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white" ref={featuresRef}>
        <div className="container-custom">
          <div className={cn(
            "text-center max-w-2xl mx-auto mb-20 transition-all duration-1000",
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}>
            <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Smart Features</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black">
              Why Choose Us
            </h2>
            <div className={cn(
              "w-16 h-px bg-gold mx-auto mt-6 transition-transform duration-1000 origin-center",
              featuresVisible ? "scale-x-100" : "scale-x-0"
            )} style={{ transitionDelay: '200ms' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={cn(
                  "flex items-start gap-4 group transition-all duration-700",
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(index + 1) * 80}ms` }}
              >
                <div className="w-3 h-3 bg-gold rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300 mt-2" />
                <div>
                  <h3 className="text-black text-xl font-serif mb-1 group-hover:text-gold transition-colors duration-300">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={cn(
            "text-center mt-20 transition-all duration-700",
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )} style={{ transitionDelay: '600ms' }}>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModularKitchens;