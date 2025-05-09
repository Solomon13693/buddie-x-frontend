import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type QueryUpdates = Record<string, string | number | null>;

export const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [params, setParams] = useState<URLSearchParams>(() => new URLSearchParams(location.search));

    const updateQueryParams = (updates: QueryUpdates): void => {
        const queryParams = new URLSearchParams(params.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value == null || value === '') {
                queryParams.delete(key);
            } else {
                queryParams.set(key, value.toString());
            }
        });

        setParams(queryParams);
        const newUrl = `${location.pathname}?${queryParams.toString()}${location.hash}`;
        navigate(newUrl, { replace: true });
    };

    const resetQueryParams = (): void => {
        setParams(new URLSearchParams());
        const newUrl = `${location.pathname}${location.hash}`;
        navigate(newUrl, { replace: true });
    };

    useEffect(() => {
        setParams(new URLSearchParams(location.search));
    }, [location.search]);

    return { searchParams: params, updateQueryParams, resetQueryParams };
};
