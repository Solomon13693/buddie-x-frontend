export const NAV_LINKS: NavGroup[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'explore', label: 'Explore', href: '/explore' },
    { id: 'community', label: 'Community', href: '/community' },
]

export const LOGIN_CTA = {
    title: 'Login / Back Office',
    href: '/signin',
};

export type NavGroup = {
    id: string
    label: string
    href: string
    items?: NavGroup[]
}
