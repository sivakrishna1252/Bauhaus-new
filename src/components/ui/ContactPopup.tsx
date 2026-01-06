import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function ContactPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false); // Only open once automatically
    const { toast } = useToast();

    useEffect(() => {
        // Trigger popup 5 seconds after page load
        const timer = setTimeout(() => {
            if (!hasOpened) {
                setIsOpen(true);
                setHasOpened(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [hasOpened]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Request Received",
            description: "We'll call you back shortly!",
        });
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[105] backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Centering Wrapper */}
                    <div className="fixed inset-0 z-[110] grid place-items-center p-4 pointer-events-none overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[450px] pointer-events-auto my-auto"
                        >
                            <div className="bg-background border border-border shadow-2xl rounded-2xl overflow-hidden relative max-h-[92vh] flex flex-col w-full">
                                <div className="overflow-y-auto p-6 md:p-8 text-left">
                                    <div className="mb-6 pr-10">
                                        <p className="text-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 md:mb-2">Get A Free Quote</p>
                                        <h3 className="font-serif text-lg md:text-2xl text-foreground leading-tight">Let's Discuss Your Dream Space</h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                        <div>
                                            <Input placeholder="Your Name" required className="bg-secondary/30 border-border/50 text-foreground" />
                                        </div>
                                        <div>
                                            <Input placeholder="Phone Number" type="tel" required className="bg-secondary/30 border-border/50 text-foreground" />
                                        </div>
                                        <div>
                                            <Input placeholder="Requirement" required className="bg-secondary/30 border-border/50 text-foreground" />
                                        </div>
                                        <div>
                                            <Textarea placeholder="Tell us more (Optional)" className="bg-secondary/30 border-border/50 resize-none h-20 text-foreground" />
                                        </div>
                                        <Button type="submit" variant="gold" size="lg" className="w-full font-bold tracking-wider py-6">
                                            REQUEST CALL BACK
                                        </Button>
                                    </form>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        We respect your privacy. No spam.
                                    </p>
                                </div>
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors z-20"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
