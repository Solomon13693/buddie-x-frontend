import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { cn } from "../lib";

interface SearchBarTwoProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    defaultValue?: string;
    onSearch?: (value: string) => void;
    onClear?: () => void;
}

const SearchBarTwo = ({
    className,
    inputClassName,
    placeholder = "Search..",
    defaultValue = "",
    onSearch,
    onClear,
}: SearchBarTwoProps) => {
    const [search, setSearch] = useState<string>(defaultValue);

    useEffect(() => {
        setSearch(defaultValue);
    }, [defaultValue]);

    const handleSubmit = () => {
        const value = search.trim();
        if (!value) return;
        onSearch?.(value);
    };

    const handleClear = () => {
        setSearch("");
        onClear?.();
    };

    const hasValue = search.trim().length > 0;

    return (
        <div className={cn("relative", className)}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="size-4 text-[#525252]" />
            </div>

            <input
                type="text"
                placeholder={placeholder}
                className={cn(
                    "w-full md:w-96 py-2 bg-white border border-[#EBEBEB] rounded-full text-[12px] text-[#525252] shadow-[0px_10px_20px_0px_#00000017] pl-8",
                    hasValue ? "pr-20" : "pr-12",
                    inputClassName
                )}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                    if (e.key === "Escape") handleClear();
                }}
            />

            <div className="absolute inset-y-0 right-0 flex items-center gap-1 mr-2">
                {hasValue && (
                    <Button
                        onPress={handleClear}
                        type="button"
                        size="sm"
                        isIconOnly
                        variant="light"
                        className="z-10 min-w-0 text-[#74767E]"
                        radius="full"
                        aria-label="Clear search"
                    >
                        <XMarkIcon className="size-4" />
                    </Button>
                )}
                <Button onPress={handleSubmit} type="submit" size="sm" isIconOnly className="bg-[#FFE6D4] z-10" radius="full">
                    <ArrowRightIcon className="size-4 text-[#525252]" />
                </Button>
            </div>
        </div>
    );
};

export default SearchBarTwo;
