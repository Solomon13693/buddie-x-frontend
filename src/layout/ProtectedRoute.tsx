import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
    requiredRole?: "admin" | "mentor" | "user";
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
    
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const location = useLocation();

    const callbackUrl = encodeURIComponent(location.pathname);

    if (!token) {
        return <Navigate to={`/login?callbackUrl=${callbackUrl}`} replace />;
    }

    if (requiredRole && role !== requiredRole) {

        if (role == "mentor" && !location.pathname.startsWith("/mentor")) {
            return <Navigate to="/mentor/dashboard" replace />;
        }

        // if (role !== "mentor" && location.pathname.startsWith("/mentor")) {
        //     return <Navigate to="/dashboard" replace />;
        // }

    }

    return <Outlet />;
};
