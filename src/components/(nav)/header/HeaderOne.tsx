'use client'


import { Button } from '@heroui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../../constant'
import NavSearchBar from './search'
import { Bars2Icon } from '@heroicons/react/24/solid'
import MobileNav from './MobileNav'

const HeaderOne = () => {

    const { pathname } = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <header className={`sticky top-0 z-50 transition-colors duration-200 ${isSticky ? 'bg-white' : 'bg-transparent'}`}>

            <div className="container mx-auto px-6 py-3">

                <div className="flex items-center justify-between">

                    <Link to="/" className="flex items-center gap-3">
                        <img className='h-auto w-16 md:w-[4.5rem]' src='/logo/BX_1.png' alt='Buddiex-x'
                            width={94} height={72} />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-x-16 text-xs -ml-10 xl:-ml-16">

                        <div className="flex items-center gap-x-8">
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.href)
                                return (
                                    <div key={link.id} className="relative">
                                        <Link to={link.href} className={`text-gray-900 hover:text-gray-700 transition-colors ${active ? 'font-mediumn text-primary' : 'font-normal'}`}>
                                            {link.label}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <Button className="bg-primary text-[12px] h-9 text-white z-10" radius="sm">
                            Get Started
                        </Button>

                    </nav>

                    <NavSearchBar className='sm:block hidden' inputClassName="w-80 md:w-96 xl:w-[500px]" />

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

export default HeaderOne