import { XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@heroui/react"
import { DrawerComponent } from "../../../components"
import { ReactNode } from "react"
import { formatCurrency } from "../../../lib/formatCurrency"

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
            }
        >
            <div className="space-y-2 py-2">
                <h3 className="text-sm font-medium text-[#141B34]">Session booking</h3>
                <p className="text-xs text-[#74767E]">
                    Select your preferred date and time to continue with this mentor.
                </p>
            </div>
        </DrawerComponent>
    )
}

export default MentorSideDrawer
