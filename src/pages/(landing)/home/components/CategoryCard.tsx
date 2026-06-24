import { Link } from "react-router-dom"

const CATEGORY_STYLES: Record<string, { gradient: string; icon: string; description: string }> = {
    "career-growth":              { gradient: "from-emerald-400 to-teal-600",    icon: "🚀", description: "Feeling stuck or unsure of your next move? Get clarity, build confidence and take your career further — faster." },
    "business-analysis":          { gradient: "from-blue-400 to-blue-700",        icon: "📊", description: "Learn to turn data into decisions. Master the skills that make you indispensable in any business." },
    "project-management":         { gradient: "from-violet-400 to-purple-700",    icon: "📋", description: "Deliver on time, every time. Learn how to lead teams, manage scope and get projects across the finish line." },
    "product-management":         { gradient: "from-orange-400 to-rose-500",      icon: "🎯", description: "From idea to launch — learn how to build products people actually love and lead cross-functional teams with confidence." },
    "ai-automation":              { gradient: "from-indigo-400 to-indigo-700",    icon: "🤖", description: "AI is reshaping every industry. Get ahead of the curve and learn how to use it to work smarter, not harder." },
    "ai-&-automation":            { gradient: "from-indigo-400 to-indigo-700",    icon: "🤖", description: "AI is reshaping every industry. Get ahead of the curve and learn how to use it to work smarter, not harder." },
    "data-analysis":              { gradient: "from-cyan-400 to-sky-600",         icon: "📈", description: "Data is the new oil — learn to refine it. Build skills in analytics, visualisation and storytelling with numbers." },
    "cyber-security":             { gradient: "from-red-400 to-red-700",          icon: "🔒", description: "One of the fastest-growing fields in tech. Learn to protect systems, spot threats and build a career that's always in demand." },
    "technology-&-digital-skills":{ gradient: "from-blue-500 to-cyan-600",        icon: "💻", description: "Whether you're just starting out or levelling up, build the digital skills that open doors in any modern workplace." },
    "startup-&-business":         { gradient: "from-amber-400 to-orange-600",     icon: "💡", description: "Got a big idea? Learn how to validate it, build it and grow it — from people who have already done it." },
    "marketing-sales-&-content":  { gradient: "from-pink-400 to-rose-600",        icon: "📣", description: "Stand out in a crowded market. Learn what actually drives growth — from SEO to storytelling to closing deals." },
    "leadership-&-communication": { gradient: "from-violet-500 to-fuchsia-600",   icon: "🎤", description: "Great leaders aren't born, they're built. Learn to inspire teams, communicate with impact and grow your influence." },
}

const DEFAULT_STYLE = { gradient: "from-gray-400 to-gray-600", icon: "⭐", description: "Connect with expert mentors who can guide you in this area." }

interface CategoryCardProps {
    label: string
    value: string
    description?: string | null
    image?: string | null
}

const CategoryCard = ({ label, value, description, image }: CategoryCardProps) => {
    const style = CATEGORY_STYLES[value] ?? DEFAULT_STYLE
    const displayDescription = description || style.description

    return (
        <Link
            to={`/explore?category=${encodeURIComponent(value)}`}
            className="flex flex-col gap-y-4 w-[200px] shrink-0 snap-start group"
        >
            <div className={`rounded-2xl aspect-[7/7] overflow-hidden ${image ? 'bg-gray-100' : `bg-gradient-to-br ${style.gradient} flex items-center justify-center`}`}>
                {image
                    ? <img src={image} alt={label} className="w-full h-full object-cover" loading="lazy" />
                    : <span className="text-5xl select-none">{style.icon}</span>
                }
            </div>

            <div className="space-y-1.5">
                <h2 className="text-sm font-medium text-[#0E0E0E] line-clamp-2">{label}</h2>
                <p className="text-xs text-[#424242] font-light line-clamp-3">{displayDescription}</p>
            </div>
        </Link>
    )
}

export default CategoryCard
