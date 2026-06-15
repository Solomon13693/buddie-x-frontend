const sections = [
    {
        title: "1. Introduction",
        body: [
            "These Terms explain the rules for using Buddie-X.",
            "By creating an account, joining a community space, booking a session, or using Buddie-X, you agree to follow these Terms and our platform policies.",
        ],
    },
    {
        title: "2. What Buddie-X Does",
        body: [
            "Buddie-X connects people with mentors, experienced peers, accountability partners, collaborators, and community spaces.",
            "We help people gain clarity, make better decisions, build skills, access support, and move forward with confidence.",
        ],
    },
    {
        title: "3. Accounts",
        body: [
            "You must provide accurate information when creating an account.",
            "You are responsible for keeping your account secure and for activity that happens through your account.",
            "Buddie-X may suspend or close accounts that breach our rules, create risk, or misuse the platform.",
        ],
    },
    {
        title: "4. Mentorship and Guidance",
        body: [
            "Mentors may provide guidance, insight, accountability, experience, and practical support.",
            "Mentorship does not guarantee a job, promotion, salary increase, business success, investment, certification, or any specific outcome.",
            "You are responsible for your own decisions and actions after using Buddie-X.",
        ],
    },
    {
        title: "5. Mentor Responsibilities",
        intro: "Mentors must:",
        bullets: [
            "Be honest about their experience and expertise",
            "Treat users respectfully",
            "Attend booked sessions or give reasonable notice if they cannot attend",
            "Keep session information confidential where appropriate",
            "Avoid misleading claims or guaranteed outcomes",
            "Follow Buddie-X policies and community standards",
        ],
        footer: "Mentors must not offer regulated legal, medical, financial, therapeutic, immigration, or other specialist advice unless they are properly qualified and legally allowed to do so.",
    },
    {
        title: "6. User Responsibilities",
        intro: "Users must:",
        bullets: [
            "Treat mentors, peers, and community members respectfully",
            "Attend booked sessions on time",
            "Use the platform honestly and lawfully",
            "Avoid harassment, abuse, spam, scams, or misleading behaviour",
            "Avoid sharing private or sensitive information unnecessarily",
            "Follow Buddie-X policies and community standards",
        ],
    },
    {
        title: "7. Bookings and Payments",
        body: [
            "Session prices, availability, duration, and format may vary by mentor.",
            "Payments should be made through Buddie-X-approved payment methods.",
            "Users and mentors must not use Buddie-X to bypass platform payments where the relationship was introduced through Buddie-X.",
        ],
    },
    {
        title: "8. Community Spaces",
        body: [
            "Buddie-X community spaces allow users to ask questions, join discussions, learn from mentors and peers, and explore topics.",
            "Buddie-X may moderate, hide, move, or remove content that breaches our rules or creates risk.",
        ],
    },
    {
        title: "9. Content You Post",
        body: [
            "You are responsible for the content you post.",
            "By posting on Buddie-X, you allow us to host, display, moderate, and use that content to operate and improve the platform.",
            "Do not post content that is unlawful, abusive, misleading, harmful, confidential, infringing, or unsafe.",
        ],
    },
    {
        title: "10. Reviews",
        body: [
            "Reviews must be honest, genuine, and based on real experiences.",
            "Buddie-X may remove reviews that are fake, abusive, misleading, discriminatory, irrelevant, or used to manipulate ratings.",
        ],
    },
    {
        title: "11. Platform Ownership",
        body: [
            "Buddie-X owns or licenses its brand, logo, design, platform, content, systems, and related intellectual property.",
            "You must not copy, misuse, or exploit Buddie-X intellectual property without permission.",
        ],
    },
    {
        title: "12. Suspension or Removal",
        body: [
            "Buddie-X may suspend or remove users, mentors, content, or community access where we believe there has been misuse, fraud, unsafe behaviour, policy breach, or harm to the platform or users.",
        ],
    },
    {
        title: "13. Changes to These Terms",
        body: [
            "We may update these Terms as Buddie-X grows. Continued use of Buddie-X means you accept the latest version.",
        ],
    },
]

const TermsOfServiceView = () => {
    return (
        <div className="container max-w-3xl py-20 pb-28 space-y-10">

            <div className="space-y-3">
                <p className="text-xs font-medium text-primary tracking-widest uppercase">Legal</p>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Terms of Service</h1>
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

export default TermsOfServiceView
