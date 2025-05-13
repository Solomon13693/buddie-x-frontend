import { useEffect, useState } from "react";
import { Breadcrumbs, Pagination, Tabs } from "../../components";
import { BookingCard } from "../../components/bookings";
import { useQueryParams } from "../../utils";
import { useGetBookings } from "../../services";
import { BookingType } from "../../types";
import { SessionCardSkeleton } from "../../components/skeleton";

const navItems = [
    { id: "pending", name: "Pending" },
    { id: "upcoming", name: "Upcoming" },
    { id: "in_progress", name: "In Progress" },
    { id: "history", name: "History" },
];

const breadcrumbItems = [
    { label: "Dashboard", href: "/mentor/dashboard" },
    { label: "Bookings" },
];


const BookingView: React.FC = () => {

    const { searchParams, updateQueryParams } = useQueryParams();
    const filterParam = searchParams.get("filter") || navItems[0].id;

    const [activeTab, setActiveTab] = useState<string>(filterParam);

    useEffect(() => {
        setActiveTab(filterParam);
    }, [filterParam]);

    const handleTabChange = (id: string | number) => {
        setActiveTab(String(id));
        updateQueryParams({ filter: id });
    };

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 6;

    const params = {
        page: currentPage,
        perPage,
        filter: activeTab,
    }

    const { response, isLoading } = useGetBookings(params)
    const { data, pagination } = response || {};

    return (
        <>

            <Breadcrumbs items={breadcrumbItems} />

            <div className="w-full max-w-4xl">

                <section className="board">

                    <Tabs initialActive={activeTab} items={navItems} onTabChange={handleTabChange} />

                    <div className="grid gap-3">

                        {isLoading ? (
                            Array.from({ length: 8 }, (_, i) => (
                                <SessionCardSkeleton key={i} />
                            ))
                        ) : data?.length > 0 ? (
                            data.map((session: BookingType) => (
                                <BookingCard role="mentor" item={session} key={session.id} />
                            ))
                        ) : (
                            <>

                                {/* <p className="text-sm font-medium text-slate-700 pl-2">
                                No sessions available for the selected filter - start sharing a conversation with a mentor..
                            </p>

                            <Button color='primary' className="text-xs max-w-xs">Explore</Button> */}

                                <p className="text-sm font-medium text-slate-700 pl-2">
                                    No sessions available for the selected filter.
                                </p>

                            </>
                        )}

                    </div>

                    <Pagination className="mt-10" perPage={perPage} total={pagination?.total || 0} />

                </section>

            </div>

        </>
    );
};

export default BookingView;
