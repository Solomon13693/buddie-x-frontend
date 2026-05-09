import { HomeView, MentorDetailsPage, MentorServicesBooking, ContactView, MenteeDetailsPage, ServicesView, ExploreView } from "../pages";

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
    {
        path: "services",
        element: <ServicesView />
    },
    {
        path: "mentee/:slug",
        element: <MenteeDetailsPage />
    },
];
