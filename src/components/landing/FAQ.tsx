'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../Container';

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: 'What is the mentorship program about?',
        answer:
            'Our mentorship program connects experienced professionals with mentees looking to grow in their careers or personal development.',
    },
    {
        question: 'How do I register as a mentor?',
        answer:
            'Click the "Register as Mentor" button on our homepage and fill out the required information to join as a mentor.',
    },
    {
        question: 'Can I join as both a mentor and a mentee?',
        answer:
            'Yes, you can register as both. Just make sure to complete the profiles for both roles separately.',
    },
    {
        question: 'Is there a fee to join the mentorship program?',
        answer:
            'No, joining the mentorship program is completely free for both mentors and mentees.',
    },
    {
        question: 'How are mentors and mentees matched?',
        answer:
            'We match based on shared interests, career goals, and areas of expertise using our smart matching algorithm.',
    },
    {
        question: 'How often should mentors and mentees meet?',
        answer:
            'We recommend meeting at least once a month, but you’re free to decide on a schedule that works best for both parties.',
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    return (
        <section id="faqs" className="py-16">

            <Container width="max-w-6xl">

                <div className="text-center pb-16 fadeInUp" data-delay="0.2">
                    <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl text-sm inline-block font-normal mb-[5px]">
                        <i className="ri-arrow-right-up-line text-primary"></i> FAQs
                    </h3>
                    <h2 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">
                        Frequently Asked Questions
                    </h2>
                    <p className="md:text-xl md:leading-7 text-sm mt-2">
                        Unsure about subscription design?
                    </p>
                </div>

                <div className="">

                    <div className="flex flex-col gap-[15px] lg:pl-7.5">
                        {faqItems.map((item, index) => (
                            <div className="accordion-item" key={index}>
                                <h2
                                    onClick={() => toggleAccordion(index)}
                                    className="accordion-header flex justify-between items-center text-base rounded-[10px] border border-[#ccc] py-4 px-5 font-medium cursor-pointer">
                                    {item.question}
                                    <span className="inline-block w-[11px] h-[11px] rounded-full bg-black shrink-0"></span>
                                </h2>
                                <AnimatePresence initial={false}>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="accordion-body px-5 overflow-hidden">
                                            <p className="py-4 text-sm">{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

            </Container>

        </section>
    );
};

export default FAQ;
