import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Accordion, AccordionItem } from "@heroui/react"

const FaqSection = () => {

    const faqs = [
        "When should I talk to a mentor?",
        "What is included in a mentorship session and how long is each session?",
        "What IT roles can I apply for as a beginner?",
        "How can I improve my chances of getting hired?",
        "What is your refund policy?",
        "In which countries can I use Buddie-X?",
        "How do I build a strong portfolio for IT jobs?",
        "Do I need prior experience?",
    ]

    return (
        <div className="container max-w-4xl space-y-12">

            <div className="space-y-0.5 text-center max-w-lg mx-auto">
                <h2 className="text-xl font-medium text-[#011632]">
                    FAQ
                </h2>
                <p className="text-sm font-light text-[#3C4959]">
                    Get clear answers about how our mentorship sessions work, what you’ll learn, and how to get the most value from your consultation.
                </p>
            </div>

            {/* ======================== FAQ ITEMS ======================== */}
            <Accordion
                variant="splitted"
                selectionMode="multiple"
                itemClasses={{
                    base: "px-0 bg-transparent shadow-none rounded-none",
                    trigger: "py-4 px-0 data-[hover=true]:bg-transparent [&[aria-expanded=true]_.faq-indicator]:-rotate-90",
                    title: "text-[#31343A] text-lg font-normal",
                    content: "pb-4 pt-0 text-sm text-[#586174]",
                    indicator: "text-[#31343A]",
                }}>
                {faqs.map((question, index) => (
                    <AccordionItem
                        key={String(index + 1)}
                        aria-label={question}
                        title={question}
                        indicator={<ChevronDownIcon className="faq-indicator size-4 transition-transform duration-300" />}
                        classNames={{
                            title: 'text-sm'
                        }}
                        className="border-b border-[#E7E8EA]">
                        <p className="text-xs">
                            We match you with practical guidance based on your current level,
                            goals, and timeline so you can move faster with clarity.
                        </p>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="space-y-1 text-[#404145] text-center">
                <h2 className="text-sm font-medium">I’ve got more questions!</h2>
                <p className="text-xs">
                    I’ve got more questions!
                    We can’t wait to hear them. <span className="text-primary">Chat with</span> us or <span className="text-primary">drop us a message</span> any time.
                </p>
            </div>

        </div>
    )
}

export default FaqSection