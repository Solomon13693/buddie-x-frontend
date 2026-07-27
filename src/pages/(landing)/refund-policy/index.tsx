const sections = [
    {
        title: "1. Introduction",
        body: [
            "This Refund Policy explains when and how refunds are available on Buddie-X. By booking a session or using our platform, you agree to this policy.",
        ],
    },
    {
        title: "2. Session Cancellations by Users",
        body: [
            "If you cancel a booked session more than 24 hours before the scheduled start time, you are eligible for a full refund.",
            "If you cancel within 24 hours of the session start time, the refund will be at the discretion of Buddie-X and may not be issued.",
            "No-shows without prior notice are not eligible for a refund.",
        ],
    },
    {
        title: "3. Session Cancellations by Mentors",
        body: [
            "If a mentor cancels a confirmed session, you will be eligible for a full refund or the option to reschedule at no extra cost.",
            "If a mentor fails to attend a session without notice, please contact us at support@buddie-x.com and we will review your case promptly.",
        ],
    },
    {
        title: "4. Technical Issues",
        body: [
            "If a session cannot take place due to a technical fault on Buddie-X's side, you will be eligible for a full refund or a complimentary rescheduled session.",
            "Technical issues on the user's or mentor's side, such as poor internet connection or device problems, are not the responsibility of Buddie-X. Refunds in these cases will be assessed on a case-by-case basis.",
        ],
    },
    {
        title: "5. Unsatisfactory Sessions",
        body: [
            "We want every session on Buddie-X to be valuable. If you feel a session did not meet reasonable expectations, please contact us within 48 hours of the session with details of your experience.",
            "Refunds for dissatisfaction are not automatic and will be assessed individually. Buddie-X's decision in these matters is final.",
            "Mentorship does not guarantee specific outcomes such as job offers, promotions, salary increases, or business results. Dissatisfaction based on outcomes alone does not qualify for a refund.",
        ],
    },
    {
        title: "6. Duplicate or Accidental Payments",
        body: [
            "If you have been charged more than once for the same session, or made a payment in error, please contact us at support@buddie-x.com as soon as possible.",
            "We will investigate and issue a refund for any confirmed duplicate or erroneous charge.",
        ],
    },
    {
        title: "7. How to Request a Refund",
        intro: "To request a refund, please contact us at support@buddie-x.com with the following information:",
        bullets: [
            "Your full name and registered email address",
            "The date and time of the session",
            "The name of the mentor",
            "The reason for your refund request",
        ],
        footer: "We aim to respond to all refund requests within 3 to 5 business days.",
    },
    {
        title: "8. Refund Processing",
        body: [
            "Approved refunds will be returned to the original payment method used at the time of booking.",
            "Refunds may take 5 to 10 business days to appear on your statement, depending on your bank or payment provider.",
            "Buddie-X is not responsible for delays caused by third-party payment processors.",
        ],
    },
    {
        title: "9. Non-Refundable Items",
        intro: "The following are not eligible for refunds:",
        bullets: [
            "Sessions that have been fully completed",
            "Cancellations made within 24 hours of the session without an accepted reason",
            "No-shows by the user",
            "Dissatisfaction based solely on session outcomes",
            "Subscription or membership fees, where applicable, unless otherwise stated",
        ],
    },
    {
        title: "10. Changes to This Policy",
        body: [
            "Buddie-X may update this Refund Policy from time to time. The latest version will always be available on our website. Continued use of the platform means you accept the current policy.",
        ],
    },
    {
        title: "11. Contact Us",
        body: [
            "If you have any questions about this Refund Policy, please reach out to us at support@buddie-x.com. We are happy to help.",
        ],
    },
]

const RefundPolicyView = () => {
    return (
        <div className="container max-w-3xl py-20 pb-28 space-y-10">

            <div className="space-y-3">
                <p className="text-xs font-medium text-primary tracking-widest uppercase">Legal</p>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Refund Policy</h1>
                <p className="text-sm text-neutral-500">Last updated: June 2026</p>
            </div>

            <p className="text-sm text-neutral-600 leading-7">
                At Buddie-X, we are committed to ensuring a fair and transparent experience for both users and mentors. Please read this policy carefully before making a booking.
            </p>

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

export default RefundPolicyView
