import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Chip } from "@heroui/react"
import { formatCurrency } from "../../lib/formatCurrency"
import FavouriteButton from "../FavouriteButton"
import { Link } from "react-router-dom"

const ExploreCard = () => {
    return (
        <Link to="/mentor/1" className="block !cursor-pointer bg-white p-5 pb-3 border border-[#E6E8EC80] rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_56px_0px_#454F5D1F]">

            <div className="space-y-3 !cursor-pointer">

                <div className="flex items-start justify-between gap-2">

                    <Avatar size='lg' src="https://i.pravatar.cc/150?u=a04258114e29026702d" />

                    {/* =============== RATINGS =============== */}
                    <div className="flex flex-col items-end">
                        <div className="inline-flex items-center gap-2">
                            <StarIcon className="size-5 text-[#FF9900]" />
                            <h4 className="text-base font-medium">4.91</h4>
                        </div>
                        <p className="text-[#62646A] font-light text-[12px]">55 Sessions / 41 reviews</p>
                    </div>

                </div>

                <div className="space-y-1">
                    <h2 className="text-sm font-semibold">By Ronald Richards</h2>
                    <p className="text-xs text-[#676767]">Enterprise SEO & Content Marketing</p>
                    <p className="text-[11px] text-[#676767] pt-1">
                        I will design UI UX for mobile app with figma for ios or android
                    </p>
                </div>

                {/* =============== SKILLS =============== */}
                <div className="flex flex-wrap items-center gap-2">
                    <Chip size="sm" className="text-[11px] bg-[#E9ECF0]" radius="sm">
                        Design guidelines
                    </Chip>
                    <Chip size="sm" className="text-[11px] bg-[#E9ECF0]" radius="sm">
                        Wireframes
                    </Chip>
                </div>

                {/* =============== Next availability =============== */}
                <div className="flex items-center gap-2">

                    <div className="bg-[#D0D6DF] p-0.5 rounded-md flex flex-col items-center gap-y-0.5 pt-1">
                        <p className="text-[11px] text-[#74767E]">THU</p>
                        <div className="flex items-center justify-center bg-white py-1 px-3.5 
                    font-medium text-xs rounded-md">
                            31
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <h2 className="font-medium text-sm text-[#141B34]">Next availability</h2>
                        <p className="text-[11px] text-[#74767E]">
                            Thursday, 31 March |  6:30 AM
                        </p>
                    </div>

                </div>

            </div>

            <hr className="border-[#DADADA] mt-2.5" />

            <div className="flex items-center justify-between pt-1.5">

                <div className="cursor-pointer" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    <FavouriteButton mentorId="123" isActive={false} size="md" filled />
                </div>

                <div className="inline-flex items-end gap-x-1">
                    <h2 className="text-xl font-semibold">
                        {formatCurrency(150)}
                    </h2>
                    <span className="text-[11px] text-[#2b2b2b9a] pb-1.5">Per session</span>
                </div>

            </div>

        </Link>
    )
}

export default ExploreCard