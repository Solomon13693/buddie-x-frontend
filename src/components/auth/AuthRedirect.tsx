import { Link } from "react-router-dom";

interface AuthRedirectProps {
    text: string;
    linkText: string;
    linkHref: string;
    className?: string;
}

export default function AuthRedirect({
    text,
    linkText,
    linkHref,
    className = "",
}: AuthRedirectProps) {
    return (
        <p className={`text-xs ${className || "mt-7 text-center"}`.trim()}>
            {text}{" "}
            <Link to={linkHref} className="text-primary font-medium underline underline-offset-2">
                {linkText}
            </Link>
        </p>
    );
}