import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ShieldCheck, CreditCard, Clock } from 'lucide-react';

const terms = [
    {
        icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-black" />,
        title: <span className="font-serif text-xl md:text-2xl text-gold mb-3">10-Year Warranty</span>,
        description: 'We stand by our quality. Enjoy a comprehensive 10-year warranty on all modular furniture and craftsmanship defects.',
    },
    {
        icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-black" />,
        title: <span className="font-serif text-xl md:text-2xl text-gold mb-3">Transparent Payment</span>,
        description: 'No hidden costs. Pay in clear, staged milestones: 10% booking, 40% design, and 50% before final installation.',
    },
    {
        icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-black" />,
        title: <span className="font-serif text-xl md:text-2xl text-gold mb-3">Book Us 10%</span>,
        description: 'We value your time. Guaranteed delivery and installation within 45 days of design finalization.',
    },
];

export function TermsSection() {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <section className="py-20 bg-background border-t border-border/40" ref={ref}>
            <div className="container-custom">
                <div className={cn(
                    "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                )}>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Terms & Conditions</h2>
                    <div className="w-16 h-px bg-gold mx-auto mb-6"></div>
                    <p className="text-muted-foreground text-lg">
                        We believe in transparency and trust. Here are the core policies that guide our work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {terms.map((term, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col items-center text-center p-8 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/60 hover:shadow-sm transition-all duration-500",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            )}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="mb-6 p-4 bg-background rounded-full shadow-sm">{term.icon}</div>
                            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{term.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {term.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
