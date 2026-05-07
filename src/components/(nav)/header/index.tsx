import HeaderOne from './HeaderOne'
import HeaderTwo from './HeaderTwo'
import { matchPath, useLocation } from 'react-router-dom'

const HEADER_TWO_PATHS = ['/explore', '/mentor/:id']

const Header = () => {
    const { pathname } = useLocation()

    const shouldUseHeaderTwo = HEADER_TWO_PATHS.some((routePattern) =>
        Boolean(matchPath({ path: routePattern, end: true }, pathname))
    )

    return (
        shouldUseHeaderTwo ? <HeaderTwo /> : <HeaderOne />
    )
}

export default Header