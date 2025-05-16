import { Button } from "@heroui/react";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { cn } from "../lib";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "../redux/store";
import { addFavourite, getFavourites, removeFavourite } from "../redux/features/favouriteSlice";
import { useQueryClient } from "@tanstack/react-query";

interface FavouriteButtonProps {
    isActive?: boolean;
    mentorId: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
};

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
    isActive = false,
    mentorId,
    size = "md",
    className,
}) => {

    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();
    const iconSize = sizeClasses[size];

    const handleClick = () => {

        const token = store.getState().auth.token;

        if (!token) {
            const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || window.location.pathname;
            window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
            return;
        }

        if (isActive && mentorId) {
            dispatch(removeFavourite(mentorId));
        } else {
            dispatch(addFavourite(mentorId));
        }

        dispatch(getFavourites())
        queryClient.invalidateQueries({ queryKey: ['wishlists'] });

    };

    return (
        <Button
            isIconOnly
            radius="full"
            size={size}
            className={cn("bg-white", className)}
            onPress={handleClick}>
            {isActive ? (
                <FilledHeartIcon className={cn(iconSize, "text-red-500")} />
            ) : (
                <HeartIconOutline className={iconSize} />
            )}
        </Button>
    );
};

export default FavouriteButton;
