import { Image } from "@heroui/react"
import { Link } from "react-router-dom"
import { CertifiedByBuddieSkeleton } from "../../../../components/skeleton"
import { useExploreCertifiedMentors } from "../../../../services/explore"

const CertifiedByBuddie = () => {
    const { mentors, isLoading } = useExploreCertifiedMentors()

    if (isLoading) return <CertifiedByBuddieSkeleton />
    if (!mentors.length) return null

    const doubled = [...mentors, ...mentors]

    return (
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-[0px_4px_30px_0px_#9E9D9D1A] sm:p-8 lg:p-10">
            <style>{`
                @keyframes mentor-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .mentor-ticker {
                    animation: mentor-scroll 25s linear infinite;
                    will-change: transform;
                }
                .mentor-ticker:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="space-y-3 text-center lg:text-left">
                    <h2 className="text-xl font-medium sm:text-2xl">
                        Explore,
                        <span className="text-primary">  In-Demand Expertise</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-xs text-[#74767E] lg:mx-0">
                        Find mentors with practical experience across career, technology, business, product, data, and personal growth, and get the guidance, clarity, and support you need to make your next move with confidence.
                    </p>
                </div>

                <div className="flex w-full flex-col items-center justify-center space-y-5 sm:space-y-7 lg:w-auto">
                    <div className="w-full pb-2 lg:w-[440px]">
                        <div className="overflow-hidden">
                            <div className="mentor-ticker flex w-max items-center gap-3 sm:gap-4">
                                {doubled.map((mentor, index) => (
                                    <Link
                                        key={`${mentor.mentor_id}-${index}`}
                                        to={`/mentor/${mentor.slug}`}
                                        className="flex h-[180px] w-[150px] shrink-0 flex-col items-center justify-center gap-y-2 rounded-xl bg-white p-4 shadow-[0px_16px_60px_0px_#00000033] transition-transform hover:-translate-y-0.5 sm:h-[200px] sm:w-[170px] sm:p-5"
                                    >
                                        <Image
                                            src={mentor.avatar}
                                            alt={mentor.name}
                                            width={80}
                                            height={80}
                                            radius="full"
                                        />
                                        <h5 className="text-center text-xs font-medium sm:text-sm">{mentor.name}</h5>
                                        <div className="w-full space-y-2.5">
                                            <div className="h-1.5 w-full rounded-full bg-[#E4E6E5]" />
                                            <div className="h-1.5 w-[60%] rounded-full bg-[#E4E6E5]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-[#B5B6BA]">Featured mentors across Buddie-X</p>
                </div>
            </div>
        </div>
    )
}

export default CertifiedByBuddie
