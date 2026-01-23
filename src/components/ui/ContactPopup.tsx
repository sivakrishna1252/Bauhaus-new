import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function ContactPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        propertyType: '',
        budget: '',
        message: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { toast } = useToast();
    const location = useLocation();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const popupCountRef = useRef(0);
    const isProjectPage = location.pathname === '/portfolio' || location.pathname.startsWith('/project/');

    useEffect(() => {
        // Reset popup count when navigating to project pages
        if (isProjectPage) {
            popupCountRef.current = 0;
        }

        if (isProjectPage) {
            // Project pages: Show popup every 30 seconds, maximum 3 times
            const showPopup = () => {
                if (popupCountRef.current < 3) {
                    setIsOpen(true);
                    popupCountRef.current += 1;
                    
                    // Stop interval after 3 popups
                    if (popupCountRef.current >= 3 && intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            };

            // First popup after 30 seconds
            const firstTimer = setTimeout(() => {
                showPopup();
                
                // Start interval for subsequent popups (every 30 seconds)
                intervalRef.current = setInterval(() => {
                    showPopup();
                }, 30000);
            }, 30000);

            return () => {
                clearTimeout(firstTimer);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        } else {
            // Other pages (like home): Show popup once after 5 seconds
            const timer = setTimeout(() => {
                if (!hasOpened) {
                    setIsOpen(true);
                    setHasOpened(true);
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isProjectPage, hasOpened]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Phone: Only allow digits, max 10
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 10) {
                setFormData({
                    ...formData,
                    [name]: digitsOnly,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        // Clear error when user selects
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        let newErrors: { [key: string]: string } = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!formData.propertyType) {
            newErrors.propertyType = "Please select property type";
        }
        
        if (!formData.budget) {
            newErrors.budget = "Please select budget";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validate()) {
            toast({
                title: "Validation Error",
                description: "Please check the highlighted fields.",
                variant: "destructive"
            });
            return;
        }
        
        try {
            const response = await fetch('http://localhost:8000/api/contacts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    configuration: formData.propertyType,
                    budget: formData.budget,
                    message: formData.message,
                    source: 'popup',
                }),
            });

            if (response.ok) {
                toast({
                    title: "Request Received",
                    description: "We'll call you back shortly!",
                });
                setIsOpen(false);
                setFormData({ name: '', phone: '', email: '', propertyType: '', budget: '', message: '' });
            } else {
                toast({
                    title: "Submission Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                title: "Connection Error",
                description: "Could not connect to the server. Please check your internet.",
                variant: "destructive"
            });
        }
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
                                            <Input 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Name" 
                                                required 
                                                className={`bg-secondary/30 border-border/50 text-foreground ${errors.name ? 'border-red-500' : ''}`} 
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Input 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number (10 digits)" 
                                                type="tel" 
                                                required 
                                                maxLength={10}
                                                className={`bg-secondary/30 border-border/50 text-foreground ${errors.phone ? 'border-red-500' : ''}`} 
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Input 
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address" 
                                                required 
                                                className={`bg-secondary/30 border-border/50 text-foreground ${errors.email ? 'border-red-500' : ''}`} 
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Select 
                                                onValueChange={(val) => handleSelectChange('propertyType', val)} 
                                                value={formData.propertyType}
                                            >
                                                <SelectTrigger className={`bg-secondary/30 border-border/50 text-foreground h-12 ${errors.propertyType ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Type of Property ?" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[120]">
                                                    <SelectItem value="residential">Residential</SelectItem>
                                                    <SelectItem value="commercial">Commercial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.propertyType && (
                                                <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Select 
                                                onValueChange={(val) => handleSelectChange('budget', val)} 
                                                value={formData.budget}
                                            >
                                                <SelectTrigger className={`bg-secondary/30 border-border/50 text-foreground h-12 ${errors.budget ? 'border-red-500' : ''}`}>
                                                    <SelectValue placeholder="Budget ?" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[120]">
                                                    <SelectItem value="15-20L">15 -20 L</SelectItem>
                                                    <SelectItem value="20-25L">20 -25 L</SelectItem>
                                                    <SelectItem value="25-30L">25 -30 L</SelectItem>
                                                    <SelectItem value="Above 30L">Above 30 L</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.budget && (
                                                <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Textarea 
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more (Optional)" 
                                                className="bg-secondary/30 border-border/50 resize-none h-20 text-foreground" 
                                            />
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
