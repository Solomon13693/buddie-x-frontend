import { useCallback, useEffect, useState } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

const defaultOptions: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
}

export const useEmblaNavigation = (options: EmblaOptionsType = defaultOptions) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)

        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    return {
        emblaRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
    }
}
