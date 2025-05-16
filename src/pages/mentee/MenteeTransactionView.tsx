import { Skeleton } from "@heroui/react";
import { Breadcrumbs, FilterController, Pagination } from "../../components";
import { MenteeTranTable } from "../../components/dashboard/mentee";
import { TableSkeleton } from "../../components/skeleton";
import { useQueryParams } from "../../utils";
import CountUp from "react-countup";
import { useGetTransactions, useGetTransactionsStats } from "../../services";
import EmptyState from "../../components/EmptyState";

const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Transactions" },
];

const filters = [
    {
        label: "Filter By",
        param: "status",
        items: [
            { key: "failed", text: "Failed" },
            { key: "successful", text: "Successful" },
            { key: "refunded", text: "Refunded" },
        ],
    }
];

const MenteeTransactionView = () => {

    const { searchParams } = useQueryParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;
    const status = searchParams.get("status");

    const params = {
        page: currentPage,
        perPage,
        status
    }


    const { response, isLoading } = useGetTransactions(params)
    const { data, meta } = response || {}

    const { response: stats, isLoading: loading } = useGetTransactionsStats()
    const { all, succeeded, refunded, failed } = stats || {}

    const statsData = [
        { label: 'All', value: all },
        { label: 'Successful', value: succeeded },
        { label: 'Refunded', value: refunded },
        { label: 'Failed', value: failed },
    ];

    return (
        <>

            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-10">

                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="rounded-2xl">
                            <div className="h-20 rounded-2xl bg-gray-500" />
                        </Skeleton>
                    ))
                ) : (

                    statsData.map(({ label, value }, i) => (
                        <div key={i} className="relative flex flex-col w-full bg-white shadow-soft-xl rounded-2xl bg-clip-border p-4">

                            <div className="flex items-center flex-row">
                                <div className="flex-none ml-6 lg:ml-1">
                                    <p className="text-black text-xs sm:text-sm leading-normal">{label}</p>
                                    <h5 className="mb-0 font-semibold text-primary text-xl">
                                        <CountUp end={Number(value)} />
                                    </h5>
                                </div>
                            </div>

                        </div>
                    ))

                )}

            </div>

            <FilterController filters={filters} />

            <div className="p-3 bg-white rounded-lg mt-6">
                {isLoading ? (
                    <TableSkeleton />
                ) : data?.length ? (
                    <MenteeTranTable transaction={data} />
                ) : (
                    <EmptyState emptyText="No Transactions Yet" />
                )}
            </div>

            <Pagination className="mt-10" perPage={perPage} total={meta?.total || 0} />

        </>
    )
}

export default MenteeTransactionView