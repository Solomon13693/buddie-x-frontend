import { ExploreView, HomeView, MentorDetailsView, MentorsView } from "../pages";

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
        path: "mentors",
        element: <MentorsView />
    },
    {
        path: "mentor/:idOrSlug",
        element: <MentorDetailsView />
    }
];
