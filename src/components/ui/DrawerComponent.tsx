import { cn } from "../../lib";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/react";
import { ReactNode } from "react";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    position?: "left" | "right" | "top" | "bottom";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
    children?: ReactNode;
    showCloseButton?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
}

const sizeClasses = {
    xs: "w-64",
    sm: "w-80",
    md: "w-96",
    lg: "w-[28rem]",
    xl: "w-[32rem]",
    full: "w-full",
};

const DrawerComponent = ({
    isOpen,
    onClose,
    position = "right",
    size = "md",
    className = "",
    children,
    showCloseButton = true,
    header,
    footer,
}: DrawerProps) => {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            classNames={{
                closeButton: "hidden",
                footer: '!block !pt-3',
                base: '!rounded-none'
            }}
            placement={position}
            className={cn("py-4", sizeClasses[size], className)}>
            <DrawerContent>
                {showCloseButton && (
                    <div className="flex justify-end px-2">
                        <button
                            onClick={onClose}
                            className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full p-1 hover:bg-gray-300" >
                            <XMarkIcon className="h-4 w-4 text-black" />
                        </button>
                    </div>
                )}

                {header && (
                    <DrawerHeader className="px-4 py-2 border-b border-gray-200">
                        {header}
                    </DrawerHeader>
                )}

                <DrawerBody className="px-4 py-2 flex-1">
                    {children}
                </DrawerBody>

                {footer && (
                    <DrawerFooter className="!justify-between px-4 py-2 border-t border-gray-200">
                        {footer}
                    </DrawerFooter>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComponent;
