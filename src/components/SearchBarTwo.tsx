import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import { useState } from "react";
import { cn } from "../lib";

interface SearchBarTwoProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
}

const SearchBarTwo = ({ className, inputClassName, placeholder = "Search mentors, courses, topics..." }: SearchBarTwoProps) => {
    const [search, setSearch] = useState<string>("");

    const handleSubmit = () => {
        if (search.trim() === "") return;
        console.log(search);
    };

    return (
        <div className={cn("relative", className)}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="size-4 text-[#525252]" />
            </div>

            <input
                type="search"
                placeholder={placeholder}
                className={cn(
                    "w-full md:w-96 py-2 bg-white border border-[#EBEBEB] rounded-full text-[12px] text-[#525252] shadow-[0px_10px_20px_0px_#00000017] pl-8 pr-8",
                    inputClassName
                )}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="absolute inset-y-0 right-0 flex items-center mr-2">
                <Button onPress={handleSubmit} type="submit" size="sm" isIconOnly className="bg-[#FFE6D4] z-10" radius="full">
                    <ArrowRightIcon className="size-4 text-[#525252]" />
                </Button>
            </div>
        </div>
    );
};

export default SearchBarTwo;
