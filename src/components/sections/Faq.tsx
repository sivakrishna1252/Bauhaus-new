import { motion } from 'framer-motion';
import { useState } from 'react';

const homeFaqs = [
    {
        question: 'Do you provide turnkey interior services in Pune?',
        answer:
            'Yes, we offer complete turnkey interior solutions from design to execution. ',
    },
    {
        question: 'What types of projects do you handle? ',
        answer:
            'We design residential, commercial, and mixed-use interior spaces. ',
    },
    {
        question: 'How do I start a project with Bauhaus-Spaces?',
        answer:
            'You can book a consultation through our website or contact us directly.',
    },

];

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-[#faf7f3] py-20">
            <div className="container-custom max-w-4xl">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
                        FAQs
                    </h2>
                    <div className="w-12 h-[2px] bg-black mx-auto" />
                </div>

                {/* FAQ LIST */}
                <div className="space-y-3">
                    {homeFaqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Question */}
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="
                    w-full
                    flex
                    justify-between
                    items-center
                    px-5
                    py-4
                    rounded-md
                    bg-white
                    border
                    border-black/10
                    text-left
                    font-medium
                    text-foreground
                  "
                                >
                                    {faq.question}
                                    <span className="text-xl font-light">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                {/* Answer */}
                                <motion.div
                                    layout
                                    initial={false}
                                    animate={{
                                        opacity: isOpen ? 1 : 0,
                                        height: isOpen ? 'auto' : 0,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="
                    overflow-hidden
                    bg-white
                    rounded-b-md
                    text-muted-foreground
                    text-sm
                  "
                                >
                                    <div className="px-5 py-4 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
