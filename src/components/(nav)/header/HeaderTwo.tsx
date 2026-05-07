'use client'


import { Button } from '@heroui/react'
import { useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../../constant'
import SearchBarTwo from '../../SearchBarTwo'
import { Bars2Icon } from '@heroicons/react/24/solid'
import MobileNav from './MobileNav'

const HIDE_SEARCH_PATHS = ['/explore', '/mentor/:idOrSlug']

const HeaderTwo = () => {

    const { pathname } = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    const shouldHideSearch = HIDE_SEARCH_PATHS.some((routePattern) =>
        Boolean(matchPath({ path: routePattern, end: true }, pathname))
    )

    return (
        <header className='sticky top-0 z-50 transition-colors duration-200 bg-white border-b 
        border-[#E9ECF0]'>

            <div className="container mx-auto px-6 py-3">

                <div className="flex items-center justify-between">

                    <Link to="/" className="flex items-center gap-3">
                        <img className='h-auto w-16 md:w-[4.5rem]' src='/logo/BX_1.png' alt='Buddiex-x'
                            width={94} height={72} />
                    </Link>

                    {!shouldHideSearch && (
                        <SearchBarTwo className='sm:block hidden' inputClassName="w-80 md:w-96 xl:w-[400px]" />
                    )}

                    <nav className="hidden lg:flex items-center gap-x-16 text-xs">

                        <div className="flex items-center gap-x-8">
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.href)
                                return (
                                    <div key={link.id} className="relative">
                                        <Link to={link.href} className={`text-[#74767E] hover:text-gray-700 transition-colors ${active ? 'font-medium' : 'font-normal'}`}>
                                            {link.label}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex items-center gap-2 -ml-12">

                            <Button variant='light' className="text-[12px] h-9 z-10 font-semibold text-[#74767E]"
                                radius="full">
                                Sign in
                            </Button>

                            <Button variant='bordered' className="border-1 border-[#29282B] text-[12px] h-9 z-10"
                                radius="full">
                                Sign up
                            </Button>

                        </div>

                    </nav>

                    <Button isIconOnly className='lg:hidden flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100'
                        variant='light' onPress={() => setIsMobileMenuOpen(true)}>
                        <Bars2Icon className='size-4' />
                    </Button>

                </div>

            </div>

            <MobileNav open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />

        </header>
    )
}

export default HeaderTwo