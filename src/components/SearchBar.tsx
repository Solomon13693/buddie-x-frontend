import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { cn } from '../lib';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch, className }) => {

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);

    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedQuery);
        }
    }, [debouncedQuery, onSearch]);

    return (
        <div className={cn("relative w-80", className)}>

            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </div>

            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 w-full !py-2 text-xs text-gray-900 border border-[#9CA3AF80] rounded-lg bg-gray-50 focus:shadow-md  focus:border-primary "
                placeholder={placeholder}
                required
            />

        </div>
    );
};

export default SearchBar;
