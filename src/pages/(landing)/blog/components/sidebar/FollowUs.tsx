import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"

const SOCIAL_LINKS = [
    { icon: FaXTwitter, href: "https://x.com/Buddiexcompany", label: "X (Twitter)" },
    { icon: FaFacebookF, href: "https://www.facebook.com/share/1bQtonuymf/", label: "Facebook" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/buddie-x/", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/thebuddiex?igsh=MTZuNm1rZzJtajF2Yg==", label: "Instagram" },
]

const FollowUs = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0E0E0E]">Follow Us</h3>
            <div className="flex items-center gap-4 text-[#6B7280]">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#404145] transition-colors">
                        <Icon className="size-4" />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default FollowUs
