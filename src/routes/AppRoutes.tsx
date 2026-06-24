import { MentorChats, MentorDashboard, MentorReviewsView, MentorSessions, MentorSettingsView, MentorTransaction, NotificationView, WalletView, BookingView, CommunitiesView, CommunityDetailsView, PostDetailsView } from "../pages";

export const AppRoutes = [
    {
        path: "",
        element: <MentorDashboard />
    },
    {
        path: "messages",
        element: <MentorChats />
    },
    {
        path: "sessions",
        element: <MentorSessions />
    },
    {
        path: "bookings",
        element: <BookingView />
    },
    {
        path: "transactions",
        element: <MentorTransaction />
    },
    {
        path: "wallet",
        element: <WalletView />
    },
    {
        path: "reviews",
        element: <MentorReviewsView />
    },
    {
        path: "notifications",
        element: <NotificationView />
    },
    {
        path: "settings",
        element: <MentorSettingsView />
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
