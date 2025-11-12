import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface MobileNavProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const NAV_LINKS = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'explore', label: 'Explore', href: '/explore' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];

const MobileNav: React.FC<MobileNavProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, role } = useSelector((state: RootState) => state.auth);
    const onClose = () => setOpen(false);

    const getDashboardPath = () => {
        return role === 'mentor' ? '/mentor/dashboard' : '/dashboard';
    };

    const isActive = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

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
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <div className="absolute right-3 top-3">
                            <Button
                                onPress={onClose}
                                isIconOnly
                                className="bg-gray-100 hover:bg-gray-200"
                                radius="full"
                                size="sm"
                            >
                                <XMarkIcon className="size-4 text-gray-700" />
                            </Button>
                        </div>

                        <div className="space-y-1 py-5 mt-8">
                            {NAV_LINKS.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.id}
                                        to={link.href}
                                        className={`block p-2.5 rounded-lg text-xs transition-colors ${
                                            active
                                                ? 'text-primary font-medium bg-primary/10'
                                                : 'text-gray-900 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                        onClick={onClose}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-2 border-t border-gray-200 pt-5">
                            {token ? (
                                <Button
                                    className="w-full px-4 h-10 text-xs"
                                    color="primary"
                                    radius="sm"
                                    onPress={() => {
                                        onClose();
                                        navigate(getDashboardPath());
                                    }}
                                    endContent={<ArrowRightIcon className="w-3.5 h-3.5 text-white/70" />}
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <Button
                                    className="w-full px-4 h-10 text-xs"
                                    color="primary"
                                    radius="sm"
                                    onPress={() => {
                                        onClose();
                                        navigate('/login');
                                    }}
                                    endContent={<ArrowRightIcon className="w-3.5 h-3.5 text-white/70" />}
                                >
                                    Get Started / Login
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MobileNav;

