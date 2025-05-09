import { MentorChats, MentorDashboard, MentorReviewsView, MentorSessions, MentorSettingsView, MentorTransaction, NotificationView, WalletView } from "../pages";

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
];
