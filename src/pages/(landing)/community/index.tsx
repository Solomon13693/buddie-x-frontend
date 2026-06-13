import { GradientHeroBanner } from "../components"
import { JoinConversation } from "../home/section"
import { BlogSection, TopCommunities } from "./sections"

const CommunityView = () => {
    return (
        <div className="space-y-20">

            <GradientHeroBanner
                title="Buddie-X Community"
                description="Connect with like-minded mentors, ask questions, and learn from experienced buddies in our thriving community."
                stats="20,000+ Users. 1,000+ Mentors. Hundreds of communities, jobs, news, latest ideas. All in one place."
                chip="Mentorship"
                cardTitle="Buddie-X Mentorship Circles & Live Sessions"
                cardDescription="Join our community-led mentorship circles and live sessions to accelerate your professional growth and career journey."
                buttonLabel="View Mentorship"
                buttonHref="/mentors"
                imageAlt="Global mentorship network"
            />

            {/* <ActiveDiscussions /> */}

            <TopCommunities />

            <JoinConversation />

            <BlogSection />
            
        </div>
    )
}

export default CommunityView
