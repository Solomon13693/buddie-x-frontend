import { ReactElement } from "react"
import AuthReviewCarousel from "./AuthReviewCarousel"

const ONBOARDING_GRADIENT = "linear-gradient(138deg, #191425 31.42%, #1F1F20 83.85%)"

const sidebarWidthClass =
    "w-[42%] max-w-[520px] xl:w-[40%] 2xl:w-[38%]"

type RegLayoutProps = {
    children: ReactElement
}

const RegLayout = ({ children }: RegLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Spacer so form column is not covered by fixed sidebar */}
            <div
                className={`hidden shrink-0 lg:block ${sidebarWidthClass}`}
                aria-hidden
            />

            <aside
                className={`fixed top-0 left-0 z-30 hidden h-screen flex-col overflow-y-auto p-8 pl-10 pr-12 lg:flex ${sidebarWidthClass}`}
                style={{ background: ONBOARDING_GRADIENT }}
            >
                <img
                    src="/img/effects/7.svg"
                    alt=""
                    width={450}
                    height={221}
                    className="pointer-events-none absolute left-0 top-0"
                />

                <img
                    src="/img/effects/7.svg"
                    alt=""
                    width={450}
                    height={221}
                    className="pointer-events-none absolute bottom-0 right-0 rotate-180"
                />

                <div className="relative z-10 mt-10 max-w-md flex-1 text-white">
                    <h2 className="font-lora text-2xl font-bold leading-snug 2xl:text-[1.75rem]">
                        Unlock Your Potential with Mentorship.
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                        Get access to curated mentorship from proven professionals, designed to help you
                        navigate challenges, seize opportunities, and achieve meaningful progress.
                    </p>
                </div>

                <div className="relative z-10">
                    <AuthReviewCarousel />
                </div>
            </aside>

            <div className="auth-scope flex min-h-screen min-w-0 flex-1 justify-center px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
                <div className="flex w-full max-w-lg flex-col py-4 xl:max-w-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default RegLayout
