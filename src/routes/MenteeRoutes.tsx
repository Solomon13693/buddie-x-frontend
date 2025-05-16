import { NotificationView, MenteeDashboard, MenteeChat, MenteeSettings, MenteeBookingView, MenteeTransactionView, WishListView } from "../pages";

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
];
