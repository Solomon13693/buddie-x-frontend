import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../../ui/table"
import moment from 'moment';
import { Chip, User } from "@heroui/react";
import { ReviewType } from "../../../types";
import { getStatusStyles } from "../../../utils";
import { Button } from "../../ui";
import { useApproveReview } from "../../../services";
import { getErrorMessage } from "../../../utils";
import toast from "react-hot-toast";

const ReviewTable = ({ reviews }: { reviews: ReviewType[] }) => {

    const { mutate: approveReview, isPending } = useApproveReview();

    const handleApprove = (reviewId: string) => {
        approveReview(reviewId, {
            onSuccess: (data) => {
                toast.success(data?.message || 'Review approved successfully');
            },
            onError: (error) => {
                toast.error(getErrorMessage(error));
            }
        });
    };

    return (
        <>

            <Table>

                <TableHeader className="bg-slate-100">

                    <TableRow>

                        <TableHead className="px-6">
                            Mentee (Reviewer)
                        </TableHead>

                        <TableHead className="px-6">
                            Rating
                        </TableHead>

                        <TableHead className="px-6">
                            Status
                        </TableHead>

                        <TableHead className="px-6">
                            Review
                        </TableHead>

                        <TableHead className="px-6">
                            Created Date
                        </TableHead>

                        <TableHead className="px-6">
                            Actions
                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {reviews.map((item, index) => (

                        <TableRow className="text-xs text-black" key={index}>

                            <TableCell className="px-6">
                                <User
                                    avatarProps={{
                                        src: item.user.avatar || '',
                                        size: 'sm'
                                    }}
                                    description={item.user.email}
                                    name={item.user.fullname}
                                />
                            </TableCell>


                            <TableCell className="px-6">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, idx) => (
                                        <span className="text-base" key={idx}>
                                            {idx < item.rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                            </TableCell>

                            <TableCell className="px-6 capitalize">
                                <Chip className={`text-[12px] font-light ${getStatusStyles(item?.status).bgColor} ${getStatusStyles(item?.status).textColor}`}>
                                    {item?.status}
                                </Chip>
                            </TableCell>

                            <TableCell className="px-6 !whitespace-normal !w-96 !min-w-[36rem]">
                                <p className="text-xs text-gray-700">{item.review}</p>
                            </TableCell>

                            <TableCell className="px-6">
                                {moment(item.created_at).format('LLL')}
                            </TableCell>

                            <TableCell className="px-6">
                                {(item.status === 'pending' || item.status === '0') ? (
                                    <Button
                                        size="sm"
                                        color="primary"
                                        onClick={() => handleApprove(item.id)}
                                        loading={isPending}
                                        isDisabled={isPending}
                                    >
                                        Approve
                                    </Button>
                                ) : (
                                    <Chip size="sm" color="success" variant="flat">
                                        Approved
                                    </Chip>
                                )}
                            </TableCell>

                        </TableRow >

                    ))}

                </TableBody >

            </Table>

        </>
    )
}

export default ReviewTable