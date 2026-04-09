import { Link } from "react-router-dom";
import { Chip } from "@heroui/react";
import { Container } from "../components";

interface ServiceSection {
    tag: string;
    title: string;
    subtitle: string;
    points: string[];
}

const SERVICE_TAGS = [
    "IT project management",
    "Cyber security",
    "Data analytics",
    "Business analysis",
    "AI and automation",
    "Product management",
    "Software development",
    "Career coaching",
    "Interview preparation",
    "Prompt engineering",
];

const SERVICE_SECTIONS: ServiceSection[] = [
    {
        tag: "Software development · web-based application delivery",
        title: "Mentorship in software development and web-based application delivery",
        subtitle: "Practitioner-led sessions with a written deliverable every time",
        points: [
            "Design, develop, and deploy custom web and software applications",
            "Build scalable, secure, and user-friendly digital platforms",
            "Deliver full end-to-end software development lifecycle solutions",
            "Develop front-end interfaces using modern frameworks - React and Angular",
            "Build robust back-end systems and APIs - Node.js, Python, and .NET",
            "Integrate third-party services, APIs, and payment systems",
            "Design and manage cloud-based infrastructure - AWS, Azure, and GCP",
            "Ensure applications meet performance, security, and scalability requirements",
            "Conduct testing, debugging, and quality assurance",
            "Provide ongoing maintenance, updates, and technical support",
            "Implement version control and deployment pipelines - CI/CD",
            "Optimise user experience and system performance",
            "Support development of marketplace and platform-based solutions",
            "Deliver MVPs for startups and scalable solutions for growing businesses",
        ],
    },
    {
        tag: "IT business analysis",
        title: "Mentorship in IT business analysis",
        subtitle: "Practitioner-led sessions with a written deliverable every time",
        points: [
            "Elicit, analyse, and document business and system requirements",
            "Conduct stakeholder interviews, workshops, and discovery sessions",
            "Translate business needs into functional and technical specifications",
            "Develop process maps, workflows, and system diagrams - As-Is and To-Be",
            "Perform gap analysis to identify inefficiencies and improvement opportunities",
            "Support the design of scalable digital platforms and systems",
            "Collaborate with developers and technical teams to ensure accurate implementation",
            "Define user stories, use cases, and acceptance criteria",
            "Support solution evaluation and vendor selection",
            "Assist with user acceptance testing and validation of solutions",
            "Ensure alignment between business objectives and technical delivery",
            "Monitor and review system performance and recommend improvements",
        ],
    },
    {
        tag: "Data analytics",
        title: "Mentorship in data analytics",
        subtitle: "Practitioner-led sessions with a written deliverable every time",
        points: [
            "Collect, clean, and transform data from multiple sources",
            "Design and develop interactive dashboards and reports - Power BI and Tableau",
            "Perform data analysis and interpretation to identify trends and insights",
            "Develop business intelligence solutions",
            "Track and monitor KPIs and performance metrics",
            "Conduct predictive analytics and forecasting",
            "Provide actionable insights to support strategic decision-making",
            "Automate reporting processes and data pipelines",
            "Support data governance and data quality management",
            "Translate complex data into clear business recommendations",
        ],
    },
    {
        tag: "Artificial intelligence · automation · prompt engineering",
        title: "Mentorship in AI, automation and prompt engineering",
        subtitle: "Practitioner-led sessions with a written deliverable every time",
        points: [
            "Design and implement AI-driven solutions for business processes",
            "Develop automation workflows to reduce manual tasks and improve efficiency",
            "Build and integrate chatbots and AI assistants",
            "Create and optimise prompt engineering strategies for AI tools",
            "Implement machine learning models where applicable",
            "Automate repetitive tasks using RPA - Robotic Process Automation",
            "Enhance customer experience using AI-powered solutions",
            "Integrate AI tools into existing systems and platforms",
            "Analyse processes and identify opportunities for automation",
            "Provide training and guidance on effective use of AI tools",
        ],
    },
    {
        tag: "Product ownership · product management",
        title: "Mentorship in product ownership and product management",
        subtitle: "Practitioner-led sessions with a written deliverable every time",
        points: [
            "Define product vision, strategy, and objectives",
            "Develop and manage product roadmaps and delivery plans",
            "Create, prioritise, and manage product backlogs",
            "Write clear and detailed user stories and acceptance criteria",
            "Collaborate with development teams to ensure product delivery",
            "Conduct user research and gather feedback",
            "Ensure alignment between business goals and product development",
            "Monitor product performance and drive continuous improvement",
            "Manage product lifecycle from concept to launch and beyond",
            "Facilitate stakeholder engagement and decision-making",
        ],
    },
];

const ServicesView = () => {
    return (
        <div className="py-10 md:py-14">
            <Container width="max-w-6xl">
                <section className="rounded-3xl border border-primary/40 bg-[#131417] px-5 py-8 md:px-10 md:py-12 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
                    <p className="text-primary uppercase tracking-[0.2em] text-[11px] md:text-xs font-semibold">
                        Buddie-X · Practitioner mentorship
                    </p>

                    <h1 className="mt-3 text-white text-3xl md:text-5xl font-semibold leading-tight font-grotesk">
                        The right expertise.
                        <span className="block text-primary">One session away.</span>
                    </h1>

                    <p className="mt-4 md:mt-6 max-w-3xl text-white/75 text-sm md:text-lg leading-7">
                        Every service is delivered by a practitioner who has done the work. Structured
                        30-minute sessions, written deliverables every time, and a full refund guarantee on
                        every booking.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2.5">
                        {SERVICE_TAGS.map((service) => (
                            <Chip
                                key={service}
                                radius="full"
                                variant="bordered"
                                className="capitalize border-primary/55 text-primary bg-primary/10 px-1 text-xs md:text-sm"
                            >
                                {service}
                            </Chip>
                        ))}
                    </div>
                </section>

                <section className="mt-8 md:mt-10 space-y-6">
                    {SERVICE_SECTIONS.map((service) => (
                        <article
                            key={service.title}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(15,15,15,0.06)]"
                        >
                            <div className="bg-[#131417] px-5 py-5 md:px-7 md:py-6">
                                <p className="uppercase tracking-[0.18em] text-primary text-[11px] md:text-xs font-semibold">
                                    {service.tag}
                                </p>
                                <h2 className="mt-2 text-white text-xl md:text-4xl font-semibold leading-tight font-grotesk">
                                    {service.title}
                                </h2>
                                <p className="mt-2 text-white/70 text-sm md:text-xl">{service.subtitle}</p>
                            </div>

                            <div className="px-5 py-6 md:px-7 md:py-8">
                                <ul className="space-y-3.5">
                                    {service.points.map((point) => (
                                        <li key={point} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                                            <span className="mt-1.5 size-2 rounded-full bg-primary flex-shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="mt-10 md:mt-14 rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-semibold text-black font-grotesk">
                        Ready to book a service session?
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-gray-700 max-w-2xl">
                        Explore practitioner profiles and choose the service that matches your goals.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                        >
                            Back to home
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center rounded-lg border border-primary/40 px-4 py-2.5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                        >
                            Contact us
                        </Link>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default ServicesView;
