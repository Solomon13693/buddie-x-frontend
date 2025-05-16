import { ExploreView, MentorDetailsPage } from "../pages";

export const LandingPageRoutes = [
    {
        path: "",
        // element: <MenteeDashboard />
    },
    {
        path: "explore",
        element: <ExploreView />
    },
    {
        path: "mentor/:slug",
        element: <MentorDetailsPage />
    },
];
