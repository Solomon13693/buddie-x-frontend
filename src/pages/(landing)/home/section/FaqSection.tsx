import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Accordion, AccordionItem } from "@heroui/react"

const FaqSection = () => {

    const faqs = [
        {
        question: "When should I talk to a mentor?",
        answer: "You should talk to a mentor when you need clarity, direction, or expert insight before taking your next step. This could be when you are changing careers, preparing for interviews, building proof of work, growing a business idea, learning a new skill, or feeling unsure about what to do next."
        },
        {
        question: "How does a Buddie-X mentorship session work?",
        answer: "A Buddie-X session is a focused 1:1 conversation with a mentor who understands your goal or challenge. Before the session, you can share context, so your mentor comes prepared. During the session, you can discuss your situation, explore options, ask questions, receive practical insight, and agree clear next steps."
        },
        {
        question: "How do I choose the right mentor?",
        answer: "You can choose a mentor based on their expertise, background, experience level, availability, ratings, and the areas they support. Buddie-X helps you discover mentors aligned to your goals, whether you need help with career growth, technology, business, product, data, leadership, or personal growth."
        },
        {
        question: "Can beginners use Buddie-X?",
        answer: "Yes. Buddie-X is designed for people at different stages, including beginners. Whether you are starting from scratch, changing direction, or trying to build confidence, you can connect with mentors who understand your stage and can help you take practical next steps."
        },
        {
        question: "What can I get help with?",
        answer: "Buddie-X mentors can support you across a wide range of goals, from career moves and technical growth to business decisions, leadership development, and personal progress. For example, you might use Buddie-X to prepare for interviews, improve your CV or profile, build proof of work, explore AI or cybersecurity, shape a business idea, develop leadership confidence, or get clarity on your next move. Each session is designed to help you access relevant expertise, gain clarity, and leave with practical next steps."
        },
        {
        question: "Is Buddie-X available globally?",
        answer: "Yes. Buddie-X was founded to make mentorship more accessible to people who need it, wherever they are. Whether you are in Lagos or London, Mumbai or New York, Buddie-X helps make the connection possible so you can access the support, expertise, and direction you need to grow your dreams. Mentor availability may vary depending on time zone, schedule, and session format."
        },
        {
        question: "How does pricing work?",
        answer: "You can get started on Buddie-X for free. There is no subscription required to explore mentors, browse the community, ask questions, or discover support areas. You only pay when you choose to book mentor time, and session prices may vary depending on the mentor’s expertise, experience, and availability."
        },
        {
        question: "What is your refund policy?",
        answer: "Buddie-X is committed to a fair and transparent booking experience. If a mentor cancels, does not attend, or a session cannot take place as agreed, you may be eligible for a reschedule, platform credit, or refund depending on the circumstances. For full details, please refer to the Refund Policy in the policy section before booking."
        }
        ]


    return (
        <div className="container max-w-4xl space-y-12">

            <div className="space-y-0.5 text-center max-w-lg mx-auto">
                <h2 className="text-xl font-medium text-[#011632]">
                    FAQ
                </h2>
                <p className="text-sm font-light text-[#3C4959]">
                    Get clear answers about how Buddie-X works, what to expect from mentorship, and how to get the most value from the platform.
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
     {faqs.map((faq, index) => (
    <AccordionItem
        key={String(index + 1)}
        aria-label={faq.question}
        title={faq.question}
        indicator={<ChevronDownIcon className="faq-indicator size-4 transition-transform duration-300" />}
        classNames={{
            title: "text-sm",
        }}
        className="border-b border-[#E7E8EA]"
    >
        <p className="text-xs">{faq.answer}</p>
    </AccordionItem>
))}
            </Accordion>

            <div className="space-y-1 text-[#404145] text-center">
                <h2 className="text-sm font-medium">I’ve got more questions!</h2>
                <p className="text-xs">
                    Still have questions?
                    We can’t wait to hear them. <span className="text-primary">Chat with</span> us or <span className="text-primary">drop us a message</span> any time.
                </p>
            </div>

        </div>
    )
}

export default FaqSection