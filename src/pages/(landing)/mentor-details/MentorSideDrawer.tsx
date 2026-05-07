import { XMarkIcon } from "@heroicons/react/24/solid"
import { Avatar, Button } from "@heroui/react"
import { DrawerComponent, TimeSelector } from "../../../components"
import { formatCurrency } from "../../../lib/formatCurrency"
import DateSelector from "../../../components/DateSelector"

interface MentorSideDrawerProps {
    isOpen: boolean
    onClose: () => void
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
}

const MentorSideDrawer = ({ isOpen, onClose, size = "lg" }: MentorSideDrawerProps) => {
    return (
        <DrawerComponent
            isOpen={isOpen}
            onClose={onClose}
            position="right"
            size={size}
            showCloseButton={false}
            header={
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-base font-semibold">Book a consultation</h2>
                    <Button onPress={onClose} isIconOnly radius="full" size="sm"
                        className="bg-gray-200 text-black">
                        <XMarkIcon className="size-4" />
                    </Button>
                </div>
            }
            footer={
                <div className="flex flex-col items-center justify-center space-y-2 pb-0 mb-0">
                    <Button size="sm" color="primary" radius="sm" className="bg-black text-white 
                    text-[12px] h-10 w-full max-w-[350px]">
                        Continue {formatCurrency(1000)}
                    </Button>
                    <p className="text-[12px] font-light text-[#74767E]">
                        The selected date and time will be held for 1 hour.
                    </p>
                </div>
            }>

            <div className="space-y-10 py-3">

                <div className="flex items-start gap-2">
                    <Avatar src="https://i.pravatar.cc/150?u=a04224d"
                        size="lg"
                        classNames={{
                            base: 'shrink-0',
                            img: 'shrink-0'
                        }}
                    />
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-semibold text-[#29282B]">During our meeting</h2>
                        <p className="text-xs text-[#29282B]">“Let's collaborate to determine the ideal job search strategy for achieving your career goals. I'll review your resume and discuss your career goals, whether a federal government or corporate job. ”.</p>
                    </div>
                </div>

                <div className="px-8 space-y-6">

                    {/* =============== How long would you like to meet for? =============== */}
                    <div className="space-y-2 border-b border-[#DADADA] pb-6">

                        <h2 className="text-xs font-medium text-[#29282B]">
                            How long would you like to meet for?
                        </h2>

                        <div className="text-center text-xs border p-2 border-[#B5B6BA]
                        text-[#404145]">
                            30 minutes ($30)
                        </div>

                    </div>

                    {/* =============== Select a date and time =============== */}
                    <div className="space-y-5 border-b border-[#DADADA] pb-6">

                        <h2 className="text-xs font-medium text-[#29282B]">
                            How long would you like to meet for?
                        </h2>

                        <DateSelector frequency="one-time" onDateSelect={(time) => console.log(time)} />

                    </div>

                    {/* =============== Select a time =============== */}
                    <div className="space-y-5 border-b border-[#DADADA] pb-6">

                        <h2 className="text-xs font-medium text-[#29282B]">
                            Choose a time on Sep 20
                        </h2>

                        <TimeSelector timeArray={[
                            "2026-09-20T09:00:00",
                            "2026-09-20T10:00:00",
                            "2026-09-20T11:00:00",
                            "2026-09-20T12:00:00",
                            "2026-09-20T13:00:00",
                            "2026-09-20T14:00:00",
                            "2026-09-20T15:00:00",
                            "2026-09-20T16:00:00",
                        ]} 
                        selectedTime={""} 
                        onTimeSelect={() => {}} />

                    </div>

                </div>

            </div>

        </DrawerComponent>
    )
}

export default MentorSideDrawer
