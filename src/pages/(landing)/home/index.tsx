import RevealOnScroll from "../../../components/RevealOnScroll"
import { HeroBanner } from './components'
import { CoreServices, FaqSection, HowItWorks, JoinConversation, LearnDirectly, MarketPlace, NeedsHelpwith, PopularITRoles, SuccessStory, TrustBy } from './section'

const HomeView = () => {
    return (
        <>

            <div className="space-y-20">

                <HeroBanner />

                <RevealOnScroll delay={0.03}>
                    <TrustBy />
                </RevealOnScroll>

                <RevealOnScroll delay={0.05}>
                    <NeedsHelpwith />
                </RevealOnScroll>

                <RevealOnScroll delay={0.07}>
                    <CoreServices />
                </RevealOnScroll>

                <RevealOnScroll delay={0.09}>
                    <LearnDirectly />
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <PopularITRoles />
                </RevealOnScroll>

                <RevealOnScroll delay={0.12}>
                    <MarketPlace />
                </RevealOnScroll>

                <RevealOnScroll delay={0.14}>
                    <JoinConversation />
                </RevealOnScroll>

                <RevealOnScroll delay={0.16}>
                    <HowItWorks />
                </RevealOnScroll>

            </div>

            <RevealOnScroll delay={0.12}>
                <SuccessStory />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
                <FaqSection />
            </RevealOnScroll>

        </>

    )
}

export default HomeView