import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

interface AuthDirectProps {
    children: JSX.Element;
}

export const AuthDirect = ({ children }: AuthDirectProps) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const location = useLocation();

    if (token) {
        if (role === "mentor") {
            return <Navigate to="/mentor/dashboard" state={{ from: location }} replace />;
        } 
        if (role === "admin") {
            return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
        }
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return children;
};
