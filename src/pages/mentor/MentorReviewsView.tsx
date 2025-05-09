import { Breadcrumbs, FilterController, Pagination } from "../../components";
import { ReviewTable } from "../../components/dashboard";
import EmptyState from "../../components/EmptyState";
import { TableSkeleton } from "../../components/skeleton";
import { useGetReviews } from "../../services";
import { useQueryParams } from "../../utils";

const breadcrumbItems = [
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Reviews" },
];

const filters = [
    {
        label: "Filter By",
        param: "status",
        items: [
            { key: "pending", text: "Pending" },
            { key: "approved", text: "Approved" },
        ],
    }
];
const MentorReviewsView = () => {

    const { searchParams } = useQueryParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;
    const status = searchParams.get('status');

    const params = {
        page: currentPage,
        perPage,
        status
    }

    const { response, isLoading } = useGetReviews(params)
    const { data, pagination } = response || {};

    return (
        <>

            <Breadcrumbs items={breadcrumbItems} />

            <FilterController filters={filters} />

            <div className="p-3 bg-white rounded-2xl mt-5">

                <div className="p-3 bg-white rounded-2xl mt-5">
                    {isLoading ? (
                        <TableSkeleton />
                    ) : data?.length ? (
                        <ReviewTable reviews={data} />
                    ) : (
                        <EmptyState emptyText="No Rating Yet" />
                    )}
                </div>

            </div>

            <Pagination
                className="mt-10"
                perPage={perPage}
                total={pagination?.total || 0}
            />

        </>
    )
}

export default MentorReviewsView