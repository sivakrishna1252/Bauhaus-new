import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import heroImage from '@/assets/website/Faheem.webp';
import { useState } from 'react';

const faqs = [
    {
        question: 'How can I get in touch with Bauhaus Spaces?',
        answer: 'You can reach us via phone, email, or by submitting a consultation form on our website. Our team in Pune will respond promptly to discuss your interior design project.',
    },
    {
        question: 'How much does it cost to design a 1BHK, 2BHK, or 3BHK?',
        answer: 'The cost of residential interior design varies based on project size, materials, and customization. At Bauhaus Spaces Pune, we provide a transparent cost estimate after understanding your requirements, ensuring the best value for your budget.',
    },
    {
        question: 'What services does Bauhaus Spaces offer?',
        answer: 'We offer comprehensive interior design services for residential and commercial projects. This includes space planning, modular kitchens, bedrooms, living rooms, bathrooms, turnkey interiors, custom furniture, and professional installation.',
    },
    {
        question: 'What types of interior projects do you specialize in?',
        answer: 'We specialize in residential homes, luxury apartments, penthouses, commercial offices, retail spaces, and bespoke modular kitchens in Pune and surrounding areas.',
    },
    {
        question: 'How many days does it take to complete the interior work?',
        answer: 'Project timelines vary based on scope, design complexity, and size of the space. Typically, residential projects range from 4–12 weeks, while commercial interiors may take longer. We ensure on-time delivery without compromising quality.',
    },
    {
        question: 'What is your refund policy?',
        answer: 'At Bauhaus Spaces Pune, we maintain transparent policies. Refunds and adjustments are handled according to the agreement terms, ensuring client satisfaction and trust throughout the project.',
    },
    {
        question: 'What is the design process at Bauhaus Spaces?',
        answer: (
            <div>
                Our design process includes:
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                        <strong>Consultation & Requirement Analysis</strong> – Understanding your lifestyle, vision, and budget.
                    </li>
                    <li>
                        <strong>Concept & Layout Design</strong> – Tailored space planning and 3D visualization.
                    </li>
                    <li>
                        <strong>Material Selection & Detailing</strong> – Choosing finishes, furniture, and hardware.
                    </li>
                    <li>
                        <strong>Execution & Installation</strong> – Professional implementation with quality checks.
                    </li>
                    <li>
                        <strong>Handover & Support</strong> – Ensuring your interiors are ready for functional, stylish living.
                    </li>
                </ul>
            </div>
        ),
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <Layout>
            {/* HERO SECTION */}
            <section className="relative hero-padding bg-charcoal overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src={heroImage}
                        alt="FAQ"
                        className="w-full h-full object-cover opacity-30"
                    />
                </motion.div>
                <div className="container-custom relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gold text-sm tracking-[0.4em] uppercase mb-6"
                    >
                        Frequently Asked Questions
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-8"
                    >
                        FAQ
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-16 h-px bg-gold origin-left"
                    />
                </div>
            </section>

            {/* FAQ LIST */}
            <section className="bg-white py-20">
                <div className="container-custom max-w-4xl space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                layout
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* QUESTION */}
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="
                    w-full
                    flex
                    justify-between
                    items-center
                    px-6
                    py-5
                    rounded-lg
                    bg-charcoal
                    text-white
                    text-left
                    text-lg
                    font-medium
                    tracking-wide
                  "
                                >
                                    {faq.question}
                                    <span className="text-2xl font-light">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                {/* ANSWER (SMOOTH ANIMATION) */}
                                <motion.div
                                    layout
                                    initial={false}
                                    animate={{
                                        opacity: isOpen ? 1 : 0,
                                        height: isOpen ? 'auto' : 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="
                    overflow-hidden
                    bg-[#f4efe9]
                    rounded-b-lg
                    text-gray-800
                    text-base
                  "
                                >
                                    <div className="px-6 py-4 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
}
