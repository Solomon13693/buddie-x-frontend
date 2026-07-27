const sections = [
    {
        title: "1. Introduction",
        body: [
            "The Buddie-X community exists to help people ask questions, exchange insight, learn from mentors and peers, and move forward with clarity.",
            "These standards apply to community spaces, questions, answers, comments, reviews, and discussions.",
        ],
    },
    {
        title: "2. Be Respectful",
        body: [
            "Treat others with dignity, even when you disagree.",
            "Do not post harassment, insults, threats, hate speech, discrimination, or personal attacks.",
        ],
    },
    {
        title: "3. Ask Clearly",
        intro: "When asking a question, try to explain:",
        bullets: [
            "Your goal",
            "Your challenge",
            "What you have tried",
            "What kind of support you need",
        ],
        footer: "Avoid sharing private, sensitive, or confidential information.",
    },
    {
        title: "4. Answer Helpfully",
        intro: "When answering others:",
        bullets: [
            "Be practical",
            "Be kind",
            "Share experience where useful",
            "Be honest about what you know",
            "Avoid pretending to be an expert where you are not",
            "Encourage qualified help where needed",
        ],
    },
    {
        title: "5. No Harmful or Misleading Advice",
        body: [
            "Do not share advice that could cause harm, including unsafe medical, legal, financial, immigration, technical, or mental health guidance.",
            "Do not promise guaranteed outcomes.",
        ],
    },
    {
        title: "6. No Spam or Excessive Promotion",
        body: [
            "Do not use Buddie-X community spaces for spam, irrelevant links, repeated self-promotion, unsolicited sales messages, or recruitment away from the platform without permission.",
            "Mentors may share expertise, but it should be helpful and relevant.",
        ],
    },
    {
        title: "7. Protect Privacy",
        body: [
            "Do not share another person's private information, screenshots, confidential documents, employer information, client information, payment details, or login details without permission.",
        ],
    },
    {
        title: "8. Keep Spaces Relevant",
        body: [
            "Community spaces are topic-based. Keep your posts relevant to the space or discussion.",
            "Buddie-X may move, hide, edit, or remove content that is off-topic or breaches these standards.",
        ],
    },
    {
        title: "9. Moderation",
        body: [
            "Buddie-X may remove content, warn users, restrict features, remove users from spaces, suspend accounts, or close accounts where community standards are breached.",
        ],
    },
    {
        title: "10. Reporting Issues",
        body: [
            "If you see something that breaches these standards, contact: support@buddie-x.com",
            "Please include a link, screenshot, or clear description where possible.",
        ],
    },
]

const CommunityStandardsView = () => {
    return (
        <div className="container max-w-3xl py-20 pb-28 space-y-10">

            <div className="space-y-3">
                <p className="text-xs font-medium text-primary tracking-widest uppercase">Community</p>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Community Standards</h1>
                <p className="text-sm text-neutral-500">Last updated: June 2026</p>
            </div>

            <div className="space-y-8">
                {sections.map(({ title, body, intro, bullets, footer }) => (
                    <div key={title} className="space-y-3">
                        <h2 className="text-base font-semibold text-neutral-800">{title}</h2>
                        <div className="space-y-2">
                            {intro && (
                                <p className="text-sm text-neutral-600 leading-7">{intro}</p>
                            )}
                            {bullets && (
                                <ul className="space-y-1.5 pl-4">
                                    {bullets.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 leading-7">
                                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {footer && (
                                <p className="text-sm text-neutral-600 leading-7">{footer}</p>
                            )}
                            {body?.map((paragraph, i) => (
                                <p key={i} className="text-sm text-neutral-600 leading-7">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default CommunityStandardsView
