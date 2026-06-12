import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"

const FollowUs = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0E0E0E]">Follow Us</h3>
            <div className="flex items-center gap-4 text-[#6B7280]">
                <FaXTwitter className="size-4 cursor-pointer hover:text-[#404145]" />
                <FaFacebookF className="size-4 cursor-pointer hover:text-[#404145]" />
                <FaLinkedinIn className="size-4 cursor-pointer hover:text-[#404145]" />
                <FaInstagram className="size-4 cursor-pointer hover:text-[#404145]" />
            </div>
        </div>
    )
}

export default FollowUs
