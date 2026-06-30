import React, { useState } from 'react';
import { PopupModal, Button } from '../ui';
import StarRating from '../StarRating';
import { usePostReview } from '../../services';
import { getErrorMessage } from '../../utils';
import toast from 'react-hot-toast';

interface ReviewModalProps {
    open: boolean;
    close: () => void;
    mentor_id: string;
    onSuccess?: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    open,
    close,
    mentor_id,
    onSuccess
}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { mutate: postReview, isPending } = usePostReview();

    const handleSubmit = () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (!review.trim()) {
            toast.error('Please write a review');
            return;
        }

        postReview(
            {
                mentor_id,
                rating,
                review: review.trim()
            },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || 'Review submitted successfully');
                    setRating(0);
                    setReview('');
                    close();
                    if (onSuccess) {
                        onSuccess();
                    }
                },
                onError: (error) => {
                    toast.error(getErrorMessage(error));
                }
            }
        );
    };

    const handleClose = () => {
        if (!isPending) {
            setRating(0);
            setReview('');
            close();
        }
    };

    return (
        <PopupModal
            size='lg'
            isOpen={open}
            onClose={handleClose}
            placement='center'
            className='max-h-[95vh] bg-[#fafcfc]'
        >
            <div className="py-6 space-y-6 mt-3">
                <div>
                    <h2 className='text-black font-medium text-base sm:text-lg mb-2'>
                        Write a Review
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Share your experience with this mentor
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-gray-700 text-sm font-medium mb-2 block">
                            Rating
                        </label>
                        <StarRating
                            initialValue={rating}
                            onRatingChange={setRating}
                            readonly={false}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label text-xs mb-1">Review</label>
                        <textarea
                            placeholder="Write your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={6}
                            className="form-control !rounded-xl shadow-none w-full"
                            disabled={isPending}
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="light"
                        className="flex-1"
                        onClick={handleClose}
                        isDisabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        className="flex-1"
                        onClick={handleSubmit}
                        loading={isPending}
                        isDisabled={isPending || rating === 0 || !review.trim()}
                    >
                        Submit Review
                    </Button>
                </div>
            </div>
        </PopupModal>
    );
};

export default ReviewModal;

