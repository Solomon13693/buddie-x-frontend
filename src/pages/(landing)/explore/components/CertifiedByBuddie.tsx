import { Image } from "@heroui/react"

const CERTIFIED_MENTORS = [
    {
        name: "Stanley Nwobo",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
        name: "Eunice Peter",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
        name: "Pascal Flourish",
        image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
]

const CertifiedByBuddie = () => {
    return (
        <div className="rounded-3xl bg-white p-5 shadow-[0px_4px_30px_0px_#9E9D9D1A] sm:p-8 lg:p-10 overflow-hidden">

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">

                <div className="space-y-3 text-center lg:text-left">
                    <h2 className="text-xl font-medium sm:text-2xl">
                        In-Demand Skills,
                        <span className="text-primary">{' '}Expert Mentors</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-xs text-[#74767E] lg:mx-0">
                        Learn directly from professionals shaping today’s most valuable industries, get guidance that’s practical, relevant, and immediately applicable.
                    </p>
                </div>

                <div className="flex w-full flex-col items-center justify-center space-y-5 sm:space-y-7 lg:w-auto">

                    <div className="w-full pb-2 lg:w-auto">
                        <div className="flex  items-center justify-center gap-3 px-2 sm:gap-4 lg:gap-0 lg:px-0">
                        {CERTIFIED_MENTORS.map((mentor, index) => {
                            const cardVariantClasses = [
                                "z-20",
                                "z-10 lg:scale-90 -ml-8",
                                "lg:scale-80 -ml-10",
                            ]
                            const imageSizes = [80, 70, 80]
                            const imageSize = imageSizes[index] ?? 80
                            const cardClassName = cardVariantClasses[index] ?? "lg:scale-80 lg:-ml-10"

                            return (
                            <div
                                key={mentor.name}
                                className={`flex shrink-0 h-[180px] w-[150px] flex-col items-center justify-center gap-y-2 rounded-xl bg-white p-4 shadow-[0px_16px_60px_0px_#00000033] sm:h-[200px] sm:w-[170px] sm:p-5 ${cardClassName}`}>
                                <Image
                                    src={mentor.image}
                                    alt={mentor.name}
                                    width={imageSize}
                                    height={imageSize}
                                    radius="full"
                                />

                                <h5 className="text-xs font-medium sm:text-sm">{mentor.name}</h5>

                                <div className="w-full space-y-2.5">
                                    <div className="h-1.5 w-full rounded-full bg-[#E4E6E5]" />
                                    <div className="h-1.5 w-[60%] rounded-full bg-[#E4E6E5]" />
                                </div>
                            </div>
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