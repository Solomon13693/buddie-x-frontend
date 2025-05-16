import { Breadcrumbs } from "../../components";
import EmptyState from "../../components/EmptyState";
import { useGetWishlist } from "../../services";
import { MentorCardSkeleton } from "../../components/skeleton";
import { MentorCard } from "../../components/explore";

const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Wishlists" },
];

const WishListView = () => {

    const { response, isLoading } = useGetWishlist();
    const wishlist = response || [];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />

            <section className="board">
                {isLoading ? (
                    <div className="grid gap-4">

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <MentorCardSkeleton key={index} />
                            ))}
                        </div>

                    </div>

                ) : wishlist.length ? (

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                        {wishlist.map((item: any, index: number) => (
                            <MentorCard key={index} mentor={item} />
                        ))}
                    </div>

                ) : (

                    <EmptyState emptyText="No items in your wishlist yet." />

                )}
            </section>
        </>
    );
};

export default WishListView;
