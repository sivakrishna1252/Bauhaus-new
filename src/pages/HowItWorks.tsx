import { Layout } from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import consultationImage from '@/assets/Consulation.png';
import heroImage from '@/assets/how it works.jpg';

const steps = [
  {
    number: '01',
    title: 'Meet Our Designer',
    subtitle: 'Know Your Goals',
    description:
      'Bring your floor plan and discuss your requirements, style, and lifestyle preferences. Our designers tackle every challenge to craft solutions that align with your vision.',
    details:
      'Get a Tentative Quote: Understanding your budget or comfort level helps us guide you efficiently through the design process',
  },
  {
    number: '02',
    title: 'Book Us',
    subtitle: 'Visualize Your Space',
    description:
      'Confirm your project with the preliminary quote and officially onboard Bauhaus Spaces Pune as your design partner..',
    details:
      'Sign the Mutual Contract: This ensures timely, disciplined execution and a clear understanding of responsibilities between client and firm.  ',
  },
  {
    number: '03',
    title: 'Finalize Design ',
    subtitle: 'Design Sign-Off  ',
    description:
      'Collaborate on detailed preferences, layout, and 3D visuals. After approval, we move on to material selection and Upholstery planning.Client Approval All desig:n elements, materials, and Upholstery are finalized with client consent to ensure complete satisfaction.  .',
    details:
      'Expert Guidance: Our team ensures that every material fits the design intent and budget.',
  },
  {
    number: '04',
    title: 'Execution',
    subtitle: 'Execution and installation',
    description:
      'We select vendors and craftsmen based on expertise, quality, and certifications. Our project manager and designers supervise every stage, ensuring that work is executed smoothly, professionally, and to luxury standard',
    details:
      'Seamless Process: Regular updates keep you informed as your home takes shape.',
  },
  {
    number: '05',
    title: 'Handover & Support',
    subtitle: 'Move In Stress-Free',
    description:
      'Your space is now ready! Move into your beautifully designed home or office and experience the transformation. Snag Closure Report: Receive a detailed handover report, ensuring your interiors meet our high standards and your expectations. Enjoy your new space with complete peace of mind',
    details:
      'Welcome Home: Your dream space is now a reality!',
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    threshold: 0.15,
  });

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
            src={heroImage}
            alt="Interior design process"
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
              Our Process
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-8"
            >
              How It Works
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
              className="text-background/80 text-lg leading-relaxed"
            >
              5 simple steps to make your space an ace space.
              <br />
              At Bauhaus Spaces Pune, we follow a structured, transparent approach to ensure a smooth journey from concept to completion. Whether it’s a residential home or commercial project, our process guarantees timely, high-quality, and luxurious results.
              <br />
            </motion.p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-background" ref={ref}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  'relative pl-24 pb-20 last:pb-0 transition-all duration-700',
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-[27px] top-20 bottom-0 w-px bg-border transition-all duration-1000',
                      isVisible ? 'scale-y-100' : 'scale-y-0'
                    )}
                    style={{
                      transitionDelay: `${index * 150 + 200}ms`,
                      transformOrigin: 'top',
                    }}
                  />
                )}

                {/*  UPDATED STEP NUMBER */}
                <div
                  className={cn(
                    "absolute left-0 top-0 w-14 h-14 bg-charcoal text-white font-serif text-xl flex items-center justify-center transition-all duration-500",
                    isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="group">
                  <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-black text-sm tracking-widest uppercase mb-6">
                    {step.subtitle}
                  </p>
                  <p className="text-black text-lg leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <p className="text-black/70 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATED CTA SECTION BG */}
      <section className="section-padding bg-[#F2F2F2]" ref={ctaRef}>

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div
              className={cn(
                'img-scale-reveal transition-all duration-1000 rounded-2xl overflow-hidden max-w-xl mx-auto',
                ctaVisible
                  ? 'opacity-100 translate-x-0 is-visible'
                  : 'opacity-0 -translate-x-12'
              )}
            >
              <img
                src={consultationImage}
                alt="Design consultation"
                className="w-full h-auto"
              />
            </div>

            <div
              className={cn(
                'transition-all duration-1000',
                ctaVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">
                Ready to Start?
              </p>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Design Consultation
              </h2>

              <div
                className={cn(
                  'w-16 h-px bg-gold mb-8 transition-transform duration-1000 origin-left',
                  ctaVisible ? 'scale-x-100' : 'scale-x-0'
                )}
                style={{ transitionDelay: '400ms' }}
              />

              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                At Bauhaus Spaces Pune, we guide you through every step of the interior design journey, from concept to completion when Whether it’s a residential home, luxury apartment, or projects like commercial space, our expert team ensures timeless of, when functional, and elegant interiors tailored to your lifestyle.
              </p>

              <Button variant="elegant" size="xl" asChild>
                <Link to="/contact">Book Your Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
