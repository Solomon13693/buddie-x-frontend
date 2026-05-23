import { Image } from "@heroui/react"
import { Link } from "react-router-dom"
import { CertifiedByBuddieSkeleton } from "../../../../components/skeleton"
import { useExploreCertifiedMentors } from "../../../../services/explore"

const cardVariantClasses = ["z-20", "z-10 lg:scale-90 -ml-8", "lg:scale-80 -ml-10"]
const imageSizes = [80, 70, 80]

const CertifiedByBuddie = () => {
    const { mentors, isLoading } = useExploreCertifiedMentors()

    if (isLoading) {
        return <CertifiedByBuddieSkeleton />
    }

    if (!mentors.length) {
        return null
    }

    return (
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-[0px_4px_30px_0px_#9E9D9D1A] sm:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="space-y-3 text-center lg:text-left">
                    <h2 className="text-xl font-medium sm:text-2xl">
                        In-Demand Skills,
                        <span className="text-primary"> Expert Mentors</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-xs text-[#74767E] lg:mx-0">
                        Learn directly from professionals shaping today’s most valuable industries, get
                        guidance that’s practical, relevant, and immediately applicable.
                    </p>
                </div>

                <div className="flex w-full flex-col items-center justify-center space-y-5 sm:space-y-7 lg:w-auto">
                    <div className="w-full pb-2 lg:w-auto">
                        <div className="flex items-center justify-center gap-3 px-2 sm:gap-4 lg:gap-0 lg:px-0">
                            {mentors.map((mentor, index) => {
                                const imageSize = imageSizes[index] ?? 80
                                const cardClassName = cardVariantClasses[index] ?? "lg:scale-80 lg:-ml-10"

                                return (
                                    <Link
                                        key={mentor.mentor_id}
                                        to={`/mentor/${mentor.slug}`}
                                        className={`flex h-[180px] w-[150px] shrink-0 flex-col items-center justify-center gap-y-2 rounded-xl bg-white p-4 shadow-[0px_16px_60px_0px_#00000033] transition-transform hover:-translate-y-0.5 sm:h-[200px] sm:w-[170px] sm:p-5 ${cardClassName}`}
                                    >
                                        <Image
                                            src={mentor.avatar}
                                            alt={mentor.name}
                                            width={imageSize}
                                            height={imageSize}
                                            radius="full"
                                        />
                                        <h5 className="text-center text-xs font-medium sm:text-sm">{mentor.name}</h5>
                                        <div className="w-full space-y-2.5">
                                            <div className="h-1.5 w-full rounded-full bg-[#E4E6E5]" />
                                            <div className="h-1.5 w-[60%] rounded-full bg-[#E4E6E5]" />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <p className="text-center text-xs text-[#B5B6BA]">Our amazing mentors, certified by Buddie-X</p>
                </div>
            </div>
        </div>
    )
}

export default CertifiedByBuddie
