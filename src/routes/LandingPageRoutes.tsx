import { ExploreView, HomeView, MentorDetailsPage, MentorServicesBooking } from "../pages";

export const LandingPageRoutes = [
    {
        path: "",
        element: <HomeView />
    },
    {
        path: "explore",
        element: <ExploreView />
    },
    {
        path: "mentor/:slug",
        element: <MentorDetailsPage />
    },
    {
        path: "mentor/:slug/:id",
        element: <MentorServicesBooking />
    },
];
