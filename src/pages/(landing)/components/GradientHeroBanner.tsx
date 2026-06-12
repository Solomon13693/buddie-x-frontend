import { Button, Chip } from "@heroui/react"
import { Link } from "react-router-dom"
import { ReactNode } from "react"

export type GradientHeroBannerProps = {
    title: string
    description: string
    stats?: string
    chip: ReactNode
    cardSubtitle?: string
    cardTitle: string
    cardDescription: string
    buttonLabel: string
    buttonHref: string
    imageSrc?: string
    imageAlt?: string
}

const GradientHeroBanner = ({
    title,
    description,
    stats,
    chip,
    cardSubtitle,
    cardTitle,
    cardDescription,
    buttonLabel,
    buttonHref,
    imageSrc = "/img/community.svg",
    imageAlt = "Community",
}: GradientHeroBannerProps) => {
    return (
        <div>
            <section className="relative overflow-hidden bg-[linear-gradient(166.37deg,_#FBA852_-17.29%,_#BE764F_47.52%)] py-12 lg:py-24 pb-16 lg:pb-24 text-white">
                <div className="container">
                    <div className="flex gap-6">
                        <div className="w-[2px] shrink-0 rounded-full bg-white" />

                        <div className="max-w-2xl space-y-2 py-2 lg:py-4">
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                {title}
                            </h1>

                            <p className="text-sm text-white/90 sm:text-base">
                                {description}
                            </p>

                            {stats && (
                                <p className="text-[13px] text-white/80">
                                    {stats}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container -mt-10 lg:-mt-16 relative z-10">
                <div className="rounded-[10px] bg-white p-5 shadow-[0px_4px_114px_0px_#00000017] px-8 lg:px-14">
                    <div className="grid items-center gap-x-8 gap-y-10 md:grid-cols-2">
                        <div className="w-full max-w-md space-y-2">
                            <Chip className="bg-[#FFF2DE] text-[#EF7420] text-[9px] font-semibold uppercase">
                                {chip}
                            </Chip>

                            {cardSubtitle && (
                                <p className="text-xs text-[#29282B]">
                                    {cardSubtitle}
                                </p>
                            )}

                            <h2 className="text-xl font-medium tracking-tight text-[#111827]">
                                {cardTitle}
                            </h2>

                            <p className="text-xs text-[#29282B] pb-2">
                                {cardDescription}
                            </p>

                            <Button
                                as={Link}
                                to={buttonHref}
                                color="primary"
                                size="sm"
                                className="h-10 px-6 text-xs bg-black text-white"
                                radius="sm"
                            >
                                {buttonLabel}
                            </Button>
                        </div>

                        <div className="flex justify-center md:justify-end">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="lg:w-[80%]"
                                width={494}
                                height={213}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GradientHeroBanner
