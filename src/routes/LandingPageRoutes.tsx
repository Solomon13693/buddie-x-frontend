import { ExploreView, HomeView, MentorDetailsPage, MentorServicesBooking, ContactView } from "../pages";

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
    {
        path: "contact",
        element: <ContactView />
    },
];
