import { ExploreView, HomeView, MentorDetailsView } from "../pages";

export const LandingRoutes = [
    {
        path: "",
        element: <HomeView />
    },
    {
        path: "explore",
        element: <ExploreView />
    },
    {
        path: "mentor/:idOrSlug",
        element: <MentorDetailsView />
    }
];
