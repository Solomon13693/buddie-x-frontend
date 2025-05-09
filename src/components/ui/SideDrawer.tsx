import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerBody,
    DrawerFooter,
} from "@heroui/react";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "full";
    placement?: "left" | "right" | "top" | "bottom";
    title?: string;
    footerContent?: React.ReactNode;
    motionProps?: {
        variants: {
            enter: { opacity: number; x: number; duration: number };
            exit: { x: number; opacity: number; duration: number };
        };
    };
    children: React.ReactNode;
    backdrop?: "transparent" | "opaque" | "blur";
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    hideCloseButton?: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
    isOpen,
    onClose,
    size = "md",
    placement = "right",
    footerContent,
    motionProps,
    children,
    backdrop = "opaque",
    isDismissable = false,
    isKeyboardDismissDisabled = true,
    hideCloseButton = false,
}) => {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            placement={placement}
            motionProps={motionProps}
            backdrop={backdrop}
            isDismissable={isDismissable}
            isKeyboardDismissDisabled={isKeyboardDismissDisabled}
            classNames={{
                closeButton: hideCloseButton ? 'hidden' : '!bg-gray-200 p-3 text-lg text-black',
            }}
            className="rounded-none">
            <DrawerContent>
                <>

                    <DrawerBody className={hideCloseButton ? "pt-6" : "pt-16"}>
                        {children}
                    </DrawerBody>

                    {footerContent && (
                        <DrawerFooter className="flex flex-col gap-1">{footerContent}</DrawerFooter>
                    )}

                </>
            </DrawerContent>
        </Drawer>
    );
};

export default SideDrawer;
