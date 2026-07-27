import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

const scrollToTopImmediate = () => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

/** Scroll to top on route change, query change, and first paint (refresh). */
const ScrollToTop = () => {
    const { pathname, search } = useLocation()

    useLayoutEffect(() => {
        scrollToTopImmediate()
    }, [pathname, search])

    return null
}

export default ScrollToTop
export { scrollToTopImmediate }
