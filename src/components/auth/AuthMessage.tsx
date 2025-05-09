import React from "react";

interface AuthMessageProps {
    heading: string;
    description: string;
    className?: string;  // Add className as an optional prop
}

const AuthMessage: React.FC<AuthMessageProps> = ({ heading, description, className }) => {
    return (
        <div className={`pb-8 ${className}`}>
            <p className="pt-3 font-bold text-lg font-lora">{heading}</p>
            <p className="pt-1 text-slate-400 font-light text-sm">{description}</p>
        </div>
    );
};

export default AuthMessage;
