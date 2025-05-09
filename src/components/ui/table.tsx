import React from "react";
import { cn } from "../../lib";

const Table: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <div className="">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto scrollbar-thin">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <table className={cn("min-w-full divide-y divide-gray-200 tracking-wide", className)}>
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TableBody: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <tbody className={cn("divide-y divide-gray-200", className)}>
            {children}
        </tbody>
    );
};

const TableHead: React.FC<{
    children?: React.ReactNode;
    className?: string;
    scope?: "col" | "row";
}> = ({ children, className = '', scope = "col" }) => {
    return (
        <th scope={scope} className={cn("py-3 text-left whitespace-nowrap font-medium", className)}>
            {children}
        </th>
    );
};

const TableHeader: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <thead className={cn("bg-white text-gray-700 border-t border-gray-200 text-xs !font-medium", className)}>
            {children}
        </thead>
    );
};

const TableRow: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <tr className={cn(className)}>
            {children}
        </tr>
    );
};

const TableCell: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <td className={cn("py-3 !text-xs whitespace-nowrap", className)}>
            {children}
        </td>
    );
};

export {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
};
