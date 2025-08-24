import { NotificationView, MenteeDashboard, MenteeChat, MenteeSettings, MenteeBookingView, MenteeTransactionView, WishListView, CommunitiesView, CommunityDetailsView, PostDetailsView } from "../pages";

export const MenteeRoutes = [
    {
        path: "",
        element: <MenteeDashboard />
    },
    {
        path: "messages",
        element: <MenteeChat />
    },
    {
        path: "wishlists",
        element: <WishListView />
    },
    {
        path: "bookings",
        element: <MenteeBookingView />
    },
    {
        path: "transactions",
        element: <MenteeTransactionView />
    },
    {
        path: "notifications",
        element: <NotificationView />
    },
    {
        path: "settings",
        element: <MenteeSettings />
    },
    {
        path: "communities",
        element: <CommunitiesView />
    },
    {
        path: "communities/:communityId",
        element: <CommunityDetailsView />
    },
    {
        path: "communities/:communityId/posts/:postId",
        element: <PostDetailsView />
    },
];
