import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import consultationImage from '@/assets/Consulation.png';

const steps = [
  {
    number: '01',
    title: 'Meet Our Designer',
    description: "Share your vision, floor plans, and budget. We will guide you through the possibilities.",
  },
  {
    number: '02',
    title: 'Book Us',
    description: 'Start with payment and welcome us as your design partners.',
  },
  {
    number: '03',
    title: 'Finalize Design',
    description: 'Approve layouts, 3D visuals, materials, and fabrications.',
  },
  {
    number: '04',
    title: 'Execution',
    description: 'Our expert team brings your design to life with precision.',
  },
  {
    number: '05',
    title: 'Move In',
    description: 'Your dream space is ready. Welcome home!',
  },
];

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">

        {/* ✅ ONLY THIS MOVED TO CENTER */}
        <div className="text-center mb-12">
          <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Our Process
          </p>
          <div className="w-14 h-[2px] bg-gold mx-auto" />
        </div>


        {/* GRID (unchanged) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div
            className={cn(
              'img-scale-reveal transition-all duration-1000 rounded-2xl overflow-hidden max-w-xl mx-auto',
              isVisible ? 'is-visible' : ''
            )}
          >
            <img
              src={consultationImage}
              alt="Interior design consultation"
              className="w-full h-auto"
            />
          </div>

          {/* Content (AS-IS) */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            {/* stays exactly here */}
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
              Steps to Your Dream Space
            </h2>

            <div className="space-y-6 mb-10">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    "flex gap-8 group transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  )}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <span className="text-black font-serif text-3xl font-bold shrink-0 w-12">
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-serif text-2xl text-foreground font-bold mb-2">
                      {step.title}
                    </h4>
                    <p className="text-foreground text-base leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Centered Button */}
        <div className="mt-16 flex justify-center">
          <Button variant="elegant" size="lg" asChild className="px-10">
            <Link to="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section >
  );
}
