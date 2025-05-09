import { Breadcrumbs, Pagination } from "../../components";
import { MentorTransTable } from "../../components/dashboard/mentor";
import EmptyState from "../../components/EmptyState";
import { TableSkeleton } from "../../components/skeleton";
import { useGetMentorTransactions } from "../../services";
import { useQueryParams } from "../../utils";

const breadcrumbItems = [
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Transactions" },
];

const MentorTransaction = () => {

    const { searchParams } = useQueryParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;

    const params = {
        page: currentPage,
        perPage
    }

    const { response, isLoading } = useGetMentorTransactions(params)
    const { data, total } = response || {}

    return (
        <>

            <Breadcrumbs items={breadcrumbItems} />

            <div className="bg-white rounded-2xl p-5">


                {isLoading ? (

                    <TableSkeleton />

                ) : data && data.length > 0 ? (

                    <>

                        <MentorTransTable transactions={data} />

                        <Pagination className="mt-10" perPage={perPage} total={total || 0} />

                    </>

                ) : (

                    <EmptyState emptyText="No Transaction Yet" />

                )}

            </div>


        </>
    )
}

export default MentorTransaction