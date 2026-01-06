import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "They turned our 2 BHK into an elegant space to live in. Loved the colour combination and minimalism. There were some hiccups but in the end the results speak for themselves.",
    author: "Mr. Somesh & Priyanka",
    location: "Pune",
    image: "",
  },
  {
    quote: "The Bauhaus Team transformed our home beautifully, blending creativity with practicality. Shrey and Prachi were professional, attentive, and delivered on time and within budget.",
    author: "Mr. Prashant & Mrs. Vatika",
    location: "Pune",
    image: "",
  },
  {
    quote: "The Bauhaus Team transformed our home beautifully, blending creativity with practicality. Shrey and Prachi were professional, attentive, and delivered on time and within budget. Highly recommend!",
    author: "Mr. Upendra",
    location: "Pune",
    image: "",
  },
  {
    quote: "Bauhaus Spaces impresses with innovative designs and excellent customer service. Their attention to detail is evident in project, and they truly listen to clients'. I highly recommend them.",
    author: "Rahul & Nisha",
    location: "Pune",
    image: "",
  },
  {
    quote: "It was a wonderful experience working with Shilpi. We were in a hurry to shift to the new home and had strict timelines and she made sure all the work was completed on time. Classy and minimal! ",
    author: "Ms. Ananya",
    location: "Pune",
    image: "",
  },
  {
    quote: "The quality of the workmanship was exceptional, and the attention to detail was impressive. I love the custom furniture pieces and the clever use of space.",
    author: "Mr. Rajkiran & Trupti",
    location: "Pune",
    image: "",
  },
  {
    quote: "Bauhaus Spaces exceeded our expectations, turning our vision into something magical. Huge thanks to Shilpi, Sakshi, and Snehal for their dedication and creativity. Highly recommend",
    author: "Mr. Sachendra",
    location: "Pune",
    image: "",
  },
  {
    quote: "Bauhaus Spaces exceeded our expectations, turning our vision into something magical. Huge thanks to Shilpi, Sakshi, and Snehal for their dedication. Despite working remotely, they delivered perfection.",
    author: "Mrs. Akiriti & Ritin",
    location: "Pune",
    image: "",
  },
];

const getInitial = (name: string) => {
  // Remove common prefixes
  const cleanName = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, '');
  return cleanName.charAt(0).toUpperCase();
};

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
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
    <section className="section-padding bg-charcoal" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <p className="text-gold text-sm tracking-[0.4em] uppercase mb-6">Client Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background">
            Designed Around You
          </h2>
          <div className={cn(
            "w-16 h-px bg-gold mx-auto mt-6 mb-6 transition-transform duration-1000 origin-center",
            isVisible ? "scale-x-100" : "scale-x-0"
          )} style={{ transitionDelay: '200ms' }} />
          <p className="text-background/80 text-lg max-w-2xl mx-auto leading-relaxed" style={{ textAlign: 'center' }}>
            Our clients value our ability to listen, interpret, and translate ideas into well-crafted spaces.We focus on creating a smooth, collaborative experience from concept to completion.
          </p>
        </div>

        {/* Testimonials Carousel */}
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
            className="w-full relative px-10 md:px-16 lg:px-20"
          >
            <CarouselContent className="-ml-6 select-none cursor-grab active:cursor-grabbing">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="relative p-7 md:p-10 lg:p-12 border border-background/10 card-hover h-full flex flex-col">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center mb-8 flex-shrink-0 overflow-hidden bg-charcoal">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-serif text-gold">
                          {getInitial(testimonial.author)}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-background/85 text-lg leading-relaxed mb-8 italic font-serif line-clamp-6">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-background font-medium text-lg text-gold">{testimonial.author}</p>
                      <p className="text-background/50 text-sm mt-1">{testimonial.location}</p>
                    </div>
                  </div>
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
              <div className="flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      current === index + 1
                        ? "w-8 bg-gold"
                        : "w-1.5 bg-gold/20 hover:bg-gold/40"
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}