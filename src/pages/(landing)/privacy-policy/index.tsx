const sections = [
    {
        title: "1. Introduction",
        body: [
            "Buddie-X respects your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our platform, community spaces, mentor profiles, bookings, and related services.",
            "Buddie-X is a mentorship and community platform that helps people access trusted mentors, community insight, accountability support, collaboration, and practical guidance.",
        ],
    },
    {
        title: "2. Information We Collect",
        intro: "We may collect:",
        bullets: [
            "Account details, such as your name, email address, username, profile photo, and password",
            "Profile details, such as your interests, goals, skills, background, mentor profile, availability, and areas of expertise",
            "Booking details, such as session time, mentor selected, session status, cancellation, review, or refund request",
            "Community activity, such as questions, answers, comments, spaces joined, likes, reports, and saved content",
            "Payment-related information, such as payment status, transaction reference, and refund status",
            "Technical information, such as device type, browser, IP address, cookies, and platform usage",
            "Messages or support requests you send to Buddie-X",
        ],
        footer: "We do not intend to store full card details on Buddie-X. Payments may be handled by third-party payment providers.",
    },
    {
        title: "3. How We Use Your Information",
        intro: "We use your information to:",
        bullets: [
            "Create and manage your account",
            "Show mentor, user, and community profiles",
            "Help users find mentors, community spaces, and relevant support",
            "Manage bookings, payments, cancellations, and refunds",
            "Support community discussions and platform features",
            "Send account updates and service messages",
            "Respond to support requests",
            "Improve Buddie-X and understand how people use the platform",
            "Keep the platform safe and prevent misuse",
            "Comply with legal or regulatory obligations",
        ],
    },
    {
        title: "4. Sharing Your Information",
        intro: "We may share relevant information with:",
        bullets: [
            "Mentors, where needed for bookings or sessions",
            "Other users, where you post publicly in community spaces",
            "Payment providers",
            "Hosting, email, analytics, support, and technical service providers",
            "Professional advisers, regulators, or authorities where required",
        ],
        footer: "We do not sell your personal information.",
    },
    {
        title: "5. Public Content",
        body: [
            "Some information may be visible to others, including your display name, profile photo, mentor profile, public questions, answers, comments, reviews, and community activity.",
            "Please do not share private, sensitive, or confidential information in public spaces.",
        ],
    },
    {
        title: "6. Cookies",
        body: [
            "Buddie-X may use cookies and similar tools to keep the platform working, remember preferences, improve performance, and understand platform usage.",
            "Where required, we will ask for consent before using non-essential cookies.",
        ],
    },
    {
        title: "7. Your Rights",
        body: [
            "Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or request a copy of your personal information.",
            "To make a privacy request, contact us at: support@buddie-x.com",
        ],
    },
    {
        title: "8. Data Security",
        body: [
            "We take reasonable steps to protect your information. However, no online platform can guarantee complete security.",
            "You are responsible for keeping your login details safe.",
        ],
    },
    {
        title: "9. Data Retention",
        body: [
            "We keep personal information only for as long as needed for platform use, legal obligations, safety, disputes, accounting, or legitimate business purposes.",
        ],
    },
    {
        title: "10. Changes to This Policy",
        body: [
            "We may update this Privacy Policy as Buddie-X grows. The latest version will be available on our website.",
        ],
    },
]

const PrivacyPolicyView = () => {
    return (
        <div className="container max-w-3xl py-20 pb-28 space-y-10">

            <div className="space-y-3">
                <p className="text-xs font-medium text-primary tracking-widest uppercase">Legal</p>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Privacy Policy</h1>
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

export default PrivacyPolicyView
