import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import type { RootState } from "../redux/store"

interface ProtectedRouteProps {
    requiredRole?: "mentor" | "mentee"
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    
    const { token, role, loading } = useSelector((state: RootState) => state.auth)
    const location = useLocation()

    if (loading) {
        return <Outlet />
    }

    if (!token) {
        const callbackUrl = encodeURIComponent(location.pathname + location.search)
        return <Navigate to={`/login?callbackUrl=${callbackUrl}`} replace />
    }

    if (requiredRole && role !== requiredRole) {

        if (role === "mentor") {
            return location.pathname.startsWith("/mentor") ? <Outlet /> : <Navigate to="/mentor/dashboard" replace />
        }

        if (role === "mentee") {
            return location.pathname.startsWith("/dashboard") ? <Outlet /> : <Navigate to="/dashboard" replace />
        }

        return <Navigate to="/" replace />
    }

    return <Outlet />
}
