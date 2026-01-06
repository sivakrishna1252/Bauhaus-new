import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Headset } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import heroImage from '@/assets/contact.jpg';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";





const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    configuration: '',
    budget: '',
    message: '',
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8000/api/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.mobile,
            configuration: formData.configuration,
            budget: formData.budget,
            message: formData.message,
          }),
        });

        if (response.ok) {
          // Success
          setShowSuccessPopup(true);
          setFormData({ name: '', mobile: '', configuration: '', budget: '', message: '' });

          // Auto-hide popup after 3 seconds
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 3000);
        } else {
          const errorData = await response.json();
          toast({
            title: "Submission Error",
            description: errorData.message || "Failed to send message. Please try again.",
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
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the highlighted fields.",
        variant: "destructive"
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black/40 overflow-hidden">
        <div className="absolute inset-0 z-[-1]">
          <img src={heroImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="text-center text-white z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl mb-4 tracking-wide"
          >
            CONTACT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm tracking-[0.2em] uppercase"
          >
            Home &gt; Contact
          </motion.p>
        </div>
      </section>

      {/* LOCATION SECTION – UPDATED */}
      <section className="py-20 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container-custom max-w-5xl text-center"
        >
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-black mb-8">LOCATION</p>
          <br />

          {/* MAP */}
          {/* FULL WIDTH MAP */}
          <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-20">
            <div
              className="w-full h-[600px] overflow-hidden cursor-pointer"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps/search/?api=1&query=Fortuna+Complex+Shivar+Chowk+Pimple+Saudagar+Pune',
                  '_blank'
                )
              }
            >
              <iframe
                src="https://www.google.com/maps?q=Fortuna%20Complex%20Shivar%20Chowk%20Pimple%20Saudagar%20Pune&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>


          {/* ADDRESS */}
          <p className="max-w-3xl mx-auto font-medium text-lg md:text-xl text-foreground leading-snug mb-8">
            Office No 203, 2nd Floor, Fortuna Complex, Opposite McDonald's, Above PNB Bank, Shivar Chowk, Pimple Saudagar, Pune - 411027
          </p>

          <Button
            className="bg-black text-white hover:bg-zinc-800 rounded-full px-10 py-6 text-xs tracking-widest uppercase"
            onClick={() =>
              window.open(
                'https://www.google.com/maps/search/?api=1&query=Fortuna+Complex+Shivar+Chowk+Pimple+Saudagar+Pune',
                '_blank'
              )
            }
          >
            Find Us On Map
          </Button>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-background border-t border-b border-border/40">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3">
          {[{
            icon: <Phone className="w-8 h-8" />,
            title: 'Make a Call',
            desc: 'For general enquiries',
            value: '+91 7507353999',
            href: 'tel:+917507353999'
          }, {
            icon: <Mail className="w-8 h-8" />,
            title: 'Send a Mail',
            desc: 'For general enquiries',
            value: 'info@bauhauspaces.com',
            href: 'https://mail.google.com/mail/?view=cm&fs=1&to=sivatools1252@gmail.com'
          }, {
            icon: <Headset className="w-8 h-8" />,
            title: 'Support',
            desc: 'Existing clients',
            value: '+91 9966 952 864',
            href: 'tel:+919966952864'
          }].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="font-serif text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{item.desc}</p>
              {item.href ? (
                <a href={item.href} className="font-medium hover:text-gold transition-colors block">
                  {item.value}
                </a>
              ) : (
                <p className="font-medium">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form with Success Popup */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container-custom max-w-5xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 shadow-sm text-center relative overflow-hidden"
          >
            {/* Success Overlay Popup */}
            {showSuccessPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-8 backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="font-serif text-3xl mb-2 text-foreground">Thank You!</h3>
                <p className="text-muted-foreground mb-6">Your message has been sent successfully.</p>
                <Button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-black text-white hover:bg-zinc-800 rounded-full px-8"
                >
                  Send Another Message
                </Button>
              </motion.div>
            )}

            <p className="font-cursive text-gold text-2xl mb-2">Drop A Line</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              SEND YOUR MESSAGE
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 relative">
              <div className="text-left">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>

              <div className="text-left">
                <Input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number *"
                  className={errors.mobile ? "border-red-500" : ""}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</p>}
              </div>

              <Select onValueChange={(val) => handleSelectChange('configuration', val)} value={formData.configuration}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Configuration of Property ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1bhk">1BHK</SelectItem>
                  <SelectItem value="2bhk">2BHK</SelectItem>
                  <SelectItem value="3bhk">3BHK</SelectItem>
                  <SelectItem value="4bhk">4BHK+</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(val) => handleSelectChange('budget', val)} value={formData.budget}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Budget ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-12L">10 -12 L</SelectItem>
                  <SelectItem value="12-15L">12 -15 L</SelectItem>
                  <SelectItem value="15-20L">15 -20 L</SelectItem>
                  <SelectItem value="20-25L">20 -25 L</SelectItem>
                  <SelectItem value="25-30L">25 -30 L</SelectItem>
                </SelectContent>
              </Select>

              <div className="md:col-span-2 text-left">
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message... *"
                  className={`md:col-span-2 resize-none ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Button className="bg-black text-white rounded-full px-10 py-6 text-xs tracking-widest uppercase">
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
