import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-secondary w-full py-24 md:py-32 lg:py-40"
    >
      {/* Content wrapper */}
      <div
        className={cn(
          "max-w-6xl mx-auto px-6 md:px-12 text-center",
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {/* Eyebrow */}
        <p
          className={cn(
            "text-gold text-sm tracking-[0.4em] uppercase mb-6 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "100ms" }}
        >
          Let’s Design Your Space
        </p>

        {/* Heading */}
        <h2
          className={cn(
            "font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
            "text-foreground mb-8 max-w-4xl mx-auto transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          Ready to Transform Your Space?
        </h2>

        {/* Divider */}
        <div
          className={cn(
            "w-16 h-px bg-gold mx-auto mb-8 transition-transform duration-700",
            isVisible ? "scale-x-100" : "scale-x-0"
          )}
          style={{ transitionDelay: "300ms" }}
        />

        {/* Description */}
        <p
          className={cn(
            "text-muted-foreground text-lg max-w-xl mx-auto mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          Whether you’re building a new home or transforming an existing one, Bauhaus-Spaces is here to bring your vision to life.
        </p>

        {/* Actions */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "500ms" }}
        >
          <Button variant="elegant" size="xl" asChild>
            <Link to="/contact">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <Button variant="elegant-outline" size="xl" asChild>
            <a href="tel:+918085010847">Call</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
