import { Link } from "react-router-dom";

interface AuthRedirectProps {
    text: string;
    linkText: string;
    linkHref: string;
}

export default function AuthRedirect({
    text,
    linkText,
    linkHref,
}: AuthRedirectProps) {
    return (
        <p className="text-xs text-center mt-7">
            {text}{" "}
            <Link to={linkHref} className="text-primary font-medium underline underline-offset-2">
                {linkText}
            </Link>
        </p>
    );
}