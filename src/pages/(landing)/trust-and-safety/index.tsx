const sections = [
    {
        title: "1. Introduction",
        body: [
            "Buddie-X is designed to be a safe, respectful, and useful space for mentorship, learning, accountability, collaboration, and community support.",
            "This policy explains how we protect users and respond to safety concerns.",
        ],
    },
    {
        title: "2. Our Safety Principles",
        intro: "Buddie-X is guided by:",
        bullets: [
            "Respect",
            "Trust",
            "Safety",
            "Progress",
        ],
        footer: "Everyone using Buddie-X should feel comfortable to ask questions, learn, and connect without harassment, abuse, discrimination, scams, or exploitation.",
    },
    {
        title: "3. Mentor Trust",
        body: [
            "Buddie-X may review mentor profiles, experience, expertise, and other information during onboarding.",
            "Verification helps build trust, but it does not guarantee a specific result or that every mentor is suitable for every user.",
        ],
    },
    {
        title: "4. Safe Behaviour",
        intro: "Users and mentors must not:",
        bullets: [
            "Harass, threaten, abuse, or exploit others",
            "Discriminate against others",
            "Send inappropriate or offensive messages",
            "Misrepresent their identity, experience, or qualifications",
            "Use Buddie-X for scams, fraud, spam, or manipulation",
            "Pressure users to move off-platform for unsafe reasons",
            "Share harmful, dangerous, or misleading advice",
            "Bypass platform payments or safety systems",
        ],
    },
    {
        title: "5. Confidentiality",
        body: [
            "Mentors and users should respect the privacy of session conversations and personal information shared in good faith.",
            "Information posted in public community spaces may be visible to others, so users should avoid sharing sensitive details publicly.",
        ],
    },
    {
        title: "6. Regulated Advice",
        body: [
            "Buddie-X is not a legal, medical, financial, therapy, immigration, or emergency service.",
            "Users should seek qualified professional advice where needed.",
        ],
    },
    {
        title: "7. Reporting Concerns",
        body: [
            "You can report concerns such as harassment, scams, fake profiles, unsafe advice, discrimination, inappropriate content, or mentor misconduct.",
            "Contact: support@buddie-x.com",
            "Buddie-X may review reports, remove content, warn users, restrict features, suspend accounts, cancel sessions, or take other appropriate action.",
        ],
    },
    {
        title: "8. Emergencies",
        body: [
            "If you or someone else is in immediate danger, contact emergency services in your country.",
            "Buddie-X is not an emergency response service.",
        ],
    },
]

const TrustAndSafetyView = () => {
    return (
        <div className="container max-w-3xl py-20 pb-28 space-y-10">

            <div className="space-y-3">
                <p className="text-xs font-medium text-primary tracking-widest uppercase">Legal</p>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Trust & Safety</h1>
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

export default TrustAndSafetyView
