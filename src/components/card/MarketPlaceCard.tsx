import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"
import { Button, Chip, User } from "@heroui/react"
import { formatCurrency } from "../../lib/formatCurrency"

const MarketPlaceCard = () => {
    return (
        <div className="bg-white p-5 border border-[#E6E8EC80] rounded-2xl space-y-3.5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_56px_0px_#454F5D1F]">

            <User
                avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
                description="Product Designer"
                name="Jane Doe"
                classNames={{
                    name: "text-sm text-[#222222] font-semibold",
                }}
            />

            {/* =============== CATEGORY & DESCRIPTION =============== */}
            <div className="space-y-2">

                <Chip size="sm" variant="bordered" className="text-[10px] 
                border-1 border-[#DADADA] text-[#29282B]" radius="sm">Design</Chip>

                <p className="text-[12px] text-[#676767] line-clamp-3">
                    Worked in UI/UX design for over 6 years, delivering user-centered solutions across multiple industries, get expert advice on UI/UX design principles and best practices before your next project
                </p>

            </div>

            {/* =============== WHAT YOU'LL ACHIEVE =============== */}
            <div className="space-y-2">
                <h3 className="text-xs font-medium text-[#222222]">What you'll achieve:</h3>
                <ul className="space-y-1 text-xs text-[#525252]">
                    <li className="flex items-center gap-2">
                        <CheckCircleIcon className="size-4 text-[#EF7420]" />
                        <span>Improved user experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircleIcon className="size-4 text-[#EF7420]" />
                        <span>Enhanced design systems</span>
                    </li>
                </ul>
            </div>

            {/* =============== You'll receive: =============== */}
            <div className="space-y-2">

                <h3 className="text-xs font-medium text-[#222222]">You'll receive:</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <Chip size="sm" className="text-[11px]" radius="sm">
                        Design guidelines
                    </Chip>
                    <Chip size="sm" className="text-[11px]" radius="sm">
                        Wireframes
                    </Chip>
                </div>

            </div>

            {/* =============== RATINGS =============== */}
            <div className="inline-flex flex-wrap items-center gap-2 text-[11px]">
                <StarIcon className="size-5 text-[#FF9900]" />
                <span className="text-black font-medium">4.5 (12 reviews)</span>
                <span className="text-[#62646A]">55 Sessions / 41 reviews</span>
            </div>

            <hr className="border-[#DADADA]" />

            <div className="flex items-center justify-between">

                <div className="inline-flex items-end gap-x-1">
                    <h2 className="text-2xl font-semibold text-[#2B2B2B]">
                        {formatCurrency(150)}
                    </h2>
                    <span className="text-[11px] text-[#2b2b2b9a] pb-1.5">Per session</span>
                </div>

                <Button className="h-9 px-6" size="sm" radius="sm" color="primary">
                    Book Now
                </Button>

            </div>

        </div>
    )
}

export default MarketPlaceCard