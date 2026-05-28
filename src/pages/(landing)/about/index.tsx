import RevealOnScroll from '../../../components/RevealOnScroll'
import { CoreServices, JoinConversation, SuccessStory, TrustBy } from '../home/section'
import { AboutBanner, AboutIntro } from './components'

const index = () => {
    return (
        <div className="space-y-20">

            <AboutBanner />

            <RevealOnScroll delay={0.08}>
                <AboutIntro />
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
                <TrustBy />
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
                <CoreServices />
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
                <SuccessStory />
            </RevealOnScroll>

            <RevealOnScroll delay={0.14}>
                <JoinConversation />
            </RevealOnScroll>

        </div>
    )
}

export default index