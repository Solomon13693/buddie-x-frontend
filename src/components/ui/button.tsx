"use client"

import type React from "react"
import { Button, type ButtonProps, Spinner } from "@heroui/react"
import { cn } from "../../lib"

type CustomButtonColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger"
type NormalSizes = "xs" | "sm" | "md" | "lg" | "xl"
type ButtonVariants = "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow"
type SpinnerSizes = "sm" | "md" | "lg" | undefined

interface CustomButtonProps extends Omit<ButtonProps, "color" | "icon" | "size" | "disabled" | "variant"> {
    type?: "button" | "submit" | "reset"
    isDisabled?: boolean
    onClick?: any
    onPress?: ButtonProps["onPress"]
    color?: CustomButtonColor
    size?: NormalSizes
    className?: string
    loading?: boolean
    spinnerColor?: CustomButtonColor
    spinnerSize?: SpinnerSizes
    children?: React.ReactNode
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    bordered?: boolean
    variant?: ButtonVariants
}

const CustomButton: React.FC<CustomButtonProps> = ({
    type = "button",
    isDisabled = false,
    onClick,
    color = "primary",
    size = "md",
    className,
    loading = false,
    spinnerColor = "default",
    spinnerSize = "sm",
    children,
    startContent,
    endContent,
    bordered,
    variant = "solid",
    ...rest
}) => {
    const buttonClasses = cn(
        color === "danger" ? "bg-error-400 text-white" : "",
        color === "success" ? "bg-[#019712] text-white" : "",
        className,
    )

    return (
        <Button
            type={type}
            isDisabled={isDisabled || loading}
            onPress={onClick}
            color={color}
            variant={variant}
            className={cn("flex items-center gap-2 rounded-2xl text-xs", buttonClasses)}
            bordered={bordered}
            {...rest}
        >
            {loading ? (
                <Spinner color={spinnerColor} size={spinnerSize} />
            ) : (
                <>
                    {startContent && <span className="mr-2">{startContent}</span>}
                    {children}
                    {endContent && <span className="ml-2">{endContent}</span>}
                </>
            )}
        </Button>
    )
}

export default CustomButton
