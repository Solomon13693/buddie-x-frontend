import { StarIcon } from "@heroicons/react/24/solid"
import { Avatar, Button, Chip } from "@heroui/react"
import { useState } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import MentorSideDrawer from "./MentorSideDrawer"

const MentorProfile = () => {
    const [isBookSessionOpen, setIsBookSessionOpen] = useState(false)

    return (
        <div className="pb-10 border-b border-[#DADADA]">

            <div className="container max-w-4xl mx-auto space-y-5">

                <div className="space-y-0.5 text-center">

                    <Avatar src="https://i.pravatar.cc/150?u=a04224d"
                        size='lg' className="size-28 mx-auto mb-3" />

                    <h1 className="text-xl font-semibold text-[#141B34] pb-1.5">Charles Johnson</h1>

                    <p className="text-xs text-[#141B34]">
                        Senior Web Developer | JavaScript, React & Node | High-Performance Web Experiences
                    </p>
                    <span className="text-[11px] text-[#74767E]">
                        West Africa Time (WAT) English, from Lagos, Nigeria  Joined August, 2022
                    </span>
                </div>

                <div className="w-full border border-[#C2C2C3] rounded-xl lg:rounded-2xl">

                    <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-4 border-b border-[#C2C2C3]">

                        <div className="">
                            <h2 className="text-baselg:text-xl font-medium">Free</h2>
                            <p className="text-xs text-[#62646A] -mt-1">Price per hour</p>
                        </div>

                        <div className="space-y-0.5">

                            <div className="flex items-center gap-2">
                                <Chip size="sm" className="text-[11px] bg-[#F6D7A7B2] text-[#EF7420]" radius="full">15 min</Chip>
                                <Chip size="sm" className="text-[11px] bg-[#F6D7A7B2] text-[#EF7420]" radius="full">40 min</Chip>
                            </div>

                            <span className="text-[11px] font-light text-[#62646A]">
                                Time Blocks Available
                            </span>

                        </div>

                        <div className="flex flex-col items-start sm:items-end gap-y-0.5">
                            <div className="inline-flex items-center gap-2">
                                <StarIcon className="size-4 text-[#FF9900]" />
                                <h4 className="text-sm font-medium">4.91</h4>
                            </div>
                            <p className="text-[#62646A] font-light text-[12px]">55 Sessions / 41 reviews</p>
                        </div>

                    </div>

                    <div className="flex items-center justify-between px-5 py-4">

                        <div className="flex items-center gap-2">

                            <div className="bg-[#D0D6DF] p-0.5 rounded-md flex flex-col items-center gap-y-0.5 pt-1">
                                <p className="text-[10px] text-[#74767E]">THU</p>
                                <div className="flex items-center justify-center bg-white py-1 px-2.5 
                                font-medium text-[10px] rounded-md">
                                    31
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <h2 className="font-medium text-xs text-[#141B34]">Next availability</h2>
                                <p className="text-[11px] text-[#74767E]">
                                    Thursday, 31 March |  6:30 AM
                                </p>
                            </div>

                        </div>

                        <div className="space-y-0.5 text-right">
                            <h2 className="font-medium text-xs text-[#141B34]">Check availability</h2>
                            <p className="text-[11px] text-[#74767E]">
                                Select a time slot that works for you
                            </p>
                        </div>

                    </div>

                </div>

                <div className="flex items-center justify-between gap-2 lg:px-5">

                    <Button size="sm" color="primary" radius="sm" className="text-[12px] h-9 px-5"
                        onPress={() => setIsBookSessionOpen(true)}>
                        Book Session</Button>

                    <div className="inline-flex items-center gap-x-4">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter className="size-4 text-[#74767E]" />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="size-4 text-[#74767E]" />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="size-4 text-[#74767E]" />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="size-4 text-[#74767E]" />
                        </a>
                    </div>

                </div>

            </div>

            <MentorSideDrawer
                isOpen={isBookSessionOpen}
                onClose={() => setIsBookSessionOpen(false)}
            />

        </div>
    )
}

export default MentorProfile