"use client";

import { Pagination as HeroPagination } from "@heroui/react";
import { useEffect, useState } from "react";
import { cn } from "../lib";
import { useQueryParams } from "../utils";

interface PaginationProps {
    initialPage?: number;
    total: number;
    size?: "sm" | "md" | "lg";
    perPage?: number;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    initialPage = 1,
    total,
    size = "sm",
    perPage = 1,
    className
}) => {

    const { searchParams, updateQueryParams } = useQueryParams();
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        const pageFromQuery = Number(searchParams.get("page")) || initialPage;
        setCurrentPage(pageFromQuery);
    }, [searchParams, initialPage]);

    const totalPages = Math.ceil(total / perPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateQueryParams({ page, perPage });
    };

    return (
        <div className={cn("flex justify-center py-4", className)}>
            <HeroPagination
                total={totalPages}
                page={currentPage}
                size={size}
                onChange={handlePageChange}
                showControls
            />
        </div>
    );
};

export default Pagination;
