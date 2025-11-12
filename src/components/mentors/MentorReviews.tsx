import { User, Skeleton, Button } from "@heroui/react";
import { useGetMentorReviews } from "../../services";
import StarRating from "../StarRating";
import { ReviewType } from "../../types";
import ReviewModal from "../bookings/ReviewModal";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const MentorReviews = ({ mentor_id }: { mentor_id: string }) => {

    const { response, isLoading } = useGetMentorReviews(mentor_id || '');
    const [openedReview, { open: openReview, close: closeReview }] = useDisclosure();
    const { role, token } = useSelector((state: RootState) => state.auth);
    const isMentee = role === "mentee" && !!token;

    if (isLoading) {
        return (
            <div className="space-y-5 -mt-3 divide-y max-w-4xl">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="space-y-2 pt-5">
                        <Skeleton className="w-full h-10" />
                        <Skeleton className="w-3/4 h-4" />
                    </div>
                ))}
            </div>
        );
    }

    if (!response?.length) {
        return (
            <div className="max-w-4xl px-4 py-6 space-y-4 flex flex-col items-center text-center bg-gray-50 rounded-lg">

                <i className="text-5xl ri-box-3-fill"></i>

                <p className="text-sm text-gray-500">
                    There are no reviews available at the moment.
                </p>

            </div>
        );
    }

    return (
        <>
            <div className="space-y-5 -mt-3 divide-y max-w-4xl">
                {isMentee && (
                    <div className="pb-4 mb-4 border-b">
                        <Button
                            onPress={openReview}
                            color="primary"
                            size="sm"
                            className="rounded-md"
                            variant="solid"
                        >
                            Write a Review
                        </Button>
                    </div>
                )}

                {response.map((item: ReviewType, index: number) => (
                    <div key={index} className="space-y-2 pt-5">
                        <User
                            avatarProps={{
                                src: item?.user?.avatar || ''
                            }}
                            description={
                                <StarRating initialValue={item.rating} />
                            }
                            name={item?.user?.fullname}
                            classNames={{
                                name: 'font-medium text-sm pb-0.5'
                            }}
                        />
                        <p className="text-[13px] leading-5">
                            {item?.review}
                        </p>
                    </div>
                ))}
            </div>

            {isMentee && mentor_id && (
                <ReviewModal
                    open={openedReview}
                    close={closeReview}
                    mentor_id={mentor_id}
                    onSuccess={() => {
                        // Reviews will be refreshed automatically via query invalidation
                    }}
                />
            )}
        </>
    );
};

export default MentorReviews;
