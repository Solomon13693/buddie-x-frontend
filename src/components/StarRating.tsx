import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface StarRatingProps {
    initialValue?: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
    initialValue = 0,
    onRatingChange,
    readonly = false,
}) => {
    
    const [rating, setRating] = useState(initialValue);

    useEffect(() => {
        setRating(initialValue);
    }, [initialValue]);

    const handleRating = (value: number) => {
        if (readonly) return;
        setRating(value);
        if (onRatingChange) {
            onRatingChange(value);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const fullStar = Math.floor(rating);
            const fraction = rating - fullStar;
            const isCurrentStar = i === fullStar + 1;

            if (i <= fullStar) {

                stars.push(
                    <div key={i} className={`cursor-pointer text-yellow-600 ${readonly ? 'cursor-default' : ''}`} onClick={() => handleRating(i)}>
                        <StarIcon className="size-4 bg-transparent" />
                    </div>
                );
            } else if (isCurrentStar && fraction > 0) {

                stars.push(
                    <div key={i} className={`relative cursor-pointer text-yellow-600 ${readonly ? 'cursor-default' : ''}`} onClick={() => handleRating(i)}>
                        <div className="relative h-6 w-6">
                            <StarIcon className="absolute text-gray-300 size-4" />
                            <div
                                className="absolute overflow-hidden text-yellow-600"
                                style={{ width: `${fraction * 100}%` }}>
                                <StarIcon className="size-4 bg-transparent" />
                            </div>
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <div key={i} className={`cursor-pointer text-gray-300 ${readonly ? 'cursor-default' : ''}`} onClick={() => handleRating(i)}>
                        <StarIcon className="size-4" />
                    </div>
                );
            }
        }
        return stars;
    };

    return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
