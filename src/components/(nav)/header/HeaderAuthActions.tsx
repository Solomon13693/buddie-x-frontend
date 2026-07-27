import { Button } from "@heroui/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

type HeaderAuthActionsProps = {
    variant?: "desktop" | "mobile"
    onNavigate?: () => void
}

const HeaderAuthActions = ({ variant = "desktop", onNavigate }: HeaderAuthActionsProps) => {
    const { token, role } = useSelector((state: RootState) => state.auth)
    const dashboardPath = role === "mentor" ? "/mentor/dashboard" : "/dashboard"

    if (token) {
        if (variant === "mobile") {
            return (
                <Button as={Link} to={dashboardPath} onPress={onNavigate} className="col-span-2 w-full bg-black text-xs text-white font-medium"
                    radius="sm">
                    Dashboard
                </Button>
            )
        }

        return (
            <Button as={Link} to={dashboardPath} variant="bordered" className="border-1 border-[#29282B] text-[12px] h-9 z-10 font-medium text-[#29282B]" radius="full">
                Dashboard
            </Button>
        )
    }

    if (variant === "mobile") {
        return (
            <>
                <Button as={Link} to="/login" onPress={onNavigate} variant="light" className="text-xs font-medium">
                    Sign in
                </Button>
                <Button as={Link} to="/register" onPress={onNavigate} variant="flat" color="primary" className="text-xs font-medium text-black">
                    Sign up
                </Button>
            </>
        )
    }

    return (
        <>
            <Button as={Link} to="/login" variant="light" className="text-[12px] h-9 z-10 font-semibold text-[#74767E]" radius="full">
                Sign in
            </Button>
            <Button as={Link} to="/register" variant="bordered" className="border-1 border-[#29282B] text-[12px] h-9 z-10" radius="full">
                Sign up
            </Button>
        </>
    )
}

export default HeaderAuthActions
