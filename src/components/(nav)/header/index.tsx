import HeaderOne from './HeaderOne'

const Header = ({ variant = 'app' }: { variant?: 'landing' | 'app' }) => {
    void variant
    return (
        <HeaderOne />
    )
}

export default Header