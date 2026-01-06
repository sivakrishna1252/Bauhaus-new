import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/carrers.jpg';

const openings = [
    {
        role: 'Senior Interior Designer',
        type: 'Full Time',
        location: 'Pune',
        description: '5+ Years experience in luxury residential projects.',
    },
    {
        role: 'Project Manager',
        type: 'Full Time',
        location: 'Pune',
        description: 'Civil/Interior Architecture background required.',
    },
    {
        role: '3D Visualizer',
        type: 'Full Time',
        location: 'Pune',
    },
    {
        role: 'Project Manager – Interiors',
        type: 'Full Time',
        location: 'Pune',
    },
    {
        role: 'Modular Kitchen Specialist',
        type: 'Full Time',
        location: 'Pune',
    },
    {
        role: 'Carpenter / Furniture Craftsman',
        type: 'Contract',
        location: 'Pune',
    },
];

export default function Careers() {
    return (
        <Layout>
            {/* HERO */}
            <section className="relative hero-padding bg-charcoal overflow-hidden">
                <img
                    src={heroImage}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    alt="Careers"
                />
                <div className="container-custom relative z-10">
                    <p className="text-gold text-sm tracking-[0.4em] uppercase mb-4">
                        Careers
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-background">
                        Join Our Vision
                    </h1>
                </div>
            </section>

            {/* WHY WORK WITH US */}
            <section className="py-20 bg-background">
                <div className="container-custom max-w-3xl text-center">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        At Bauhaus-Spaces, we don’t just design interiors; we craft experiences. We are looking for passionate, creative, and driven individuals to join our growing team in Pune.
                    </p>
                </div>
            </section>

            {/* JOB LIST + QUICK APPLY */}
            <section className="py-20 bg-secondary/30">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* JOB OPENINGS */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="font-serif text-3xl mb-12 text-center">
                            Current Openings
                        </h2>

                        {openings.map((job, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex justify-between items-center bg-white p-6 border border-border/40 hover:shadow-sm transition"
                            >
                                <div>
                                    <h3 className="font-medium text-lg">{job.role}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {job.type} · {job.location}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {job.description}
                                    </p>
                                </div>

                                <Button variant="outline" size="sm">
                                    Apply <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    {/* QUICK APPLY */}
                    <div className="bg-white p-6 border border-border/60 h-fit mt-36 lg:mt-20">

                        <h3 className="font-serif text-xl mb-6">Quick Apply</h3>

                        <div className="space-y-4">
                            <Input placeholder="Your Name" />
                            <Input placeholder="Email Address" />
                            <Input placeholder="Mobile Number" />
                            <Textarea
                                placeholder="Tell us about your experience"
                                rows={4}
                            />
                            <Button className="w-full bg-black text-white hover:bg-zinc-800">
                                Submit Application
                            </Button>
                        </div>

                        <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                            <p className="flex gap-2 items-center">
                                <MapPin className="w-4 h-4" />
                                Koregaon Park, Pune
                            </p>
                            <p className="flex gap-2 items-center">
                                <Mail className="w-4 h-4" />
                                contact@bauhaus-spaces.com
                            </p>
                            <p className="flex gap-2 items-center">
                                <Phone className="w-4 h-4" />
                                +91 7507353999
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RESPONSE CTA */}
            <section className="py-24 bg-background">
                <div className="container-custom max-w-4xl text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-4">
                        Our Team Will Respond Within 24 Hours
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Shortlisted candidates will be contacted by our HR team for the next steps.
                    </p>
                    <Button variant="outline" className="px-10" asChild>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@bauhauspaces.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact HR
                        </a>
                    </Button>
                </div>
            </section>
        </Layout>
    );
}
