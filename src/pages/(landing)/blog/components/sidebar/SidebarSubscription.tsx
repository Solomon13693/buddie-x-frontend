import { Button, Checkbox } from "@heroui/react"

const SidebarSubscription = () => {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#0E0E0E]">Subscription</h3>
                <p className="text-xs text-[#6B7280] leading-5">
                    Subscribe to our newsletter and receive a selection of cool articles every weeks
                </p>
            </div>

            <input
                type="email"
                placeholder="Enter your email"
                className="h-10 w-full rounded-md border border-[#E6E8EC] px-3 text-xs text-[#121624] outline-none placeholder:text-[#98A2B3]"
            />

            <Button className="w-full h-10 bg-[#0E0E0E] text-white text-xs" radius="sm">
                SUBSCRIBE
            </Button>

            <Checkbox
                className="items-start"
                size="sm"
                classNames={{ label: "text-[11px] text-[#9CA3AF] leading-4" }}
            >
                By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form.
            </Checkbox>
        </div>
    )
}

export default SidebarSubscription
