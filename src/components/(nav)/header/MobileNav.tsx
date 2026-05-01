import { Link, useLocation } from 'react-router-dom'
import { Button } from '@heroui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../../../constant'
import NavSearchBar from './search'

interface MobileNavProps {
    open: boolean
    setOpen: (open: boolean) => void
}

const MobileNav: React.FC<MobileNavProps> = ({ open, setOpen }) => {
    const { pathname } = useLocation()
    const onClose = () => setOpen(false)

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <motion.div 
                        onClick={onClose} 
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.18 }} 
                    />

                    <motion.div 
                        className="fixed top-4 right-4 w-full max-w-[92%] rounded-xl bg-white p-5 shadow-lg" 
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}>

                        <div className="absolute right-3 top-3">
                            <Button  onPress={onClose}  isIconOnly  className='bg-gray-100 hover:bg-gray-200'  radius='full'  size='sm'>
                                <XMarkIcon className="size-4 text-gray-700" />
                            </Button>
                        </div>

                        <div className="mt-12">
                            <NavSearchBar inputClassName="w-full" />
                        </div>

                        <div className="space-y-2 py-5 mt-3">
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.href)
                                return (
                                    <Link key={link.id} to={link.href} className={`block p-2 rounded-lg text-xs transition-colors ${ active ? 'text-primary font-medium bg-primary/10' 
                                                : 'text-gray-900 hover:text-gray-700 hover:bg-gray-50'
                                        }`} 
                                        onClick={onClose}>
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="mt-2 border-t border-gray-200 pt-5 grid grid-cols-2 gap-2.5">

                            <Button as={Link} to="/login" onPress={onClose} variant='light' 
                            className='text-xs font-medium'>
                                Sign in
                            </Button>

                            <Button as={Link} to="/register" onPress={onClose} variant='flat' color='primary' 
                            className='text-xs font-medium text-black'>
                                Sign up
                            </Button>

                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default MobileNav


