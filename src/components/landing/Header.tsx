import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MobileNav from "./MobileNav";
import { useState } from "react";

const NAV_LINKS = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'explore', label: 'Explore', href: '/explore' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { token, role } = useSelector((state: RootState) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    const getDashboardPath = () => {
        return role === 'mentor' ? '/mentor/dashboard' : '/dashboard';
    };

    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-20 md:h-22">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            className="w-20"
                            src="/logo/BX_1.png"
                            alt="Buddie-X Logo"
                            width={160}
                            height={60}
                        />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-x-12 text-sm">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <div key={link.id} className="relative">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}>
                                        <Link
                                            to={link.href}
                                            className={`text-gray-900 hover:text-gray-700 transition-colors ${
                                                active ? 'font-bold' : 'font-normal'
                                            }`}>
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-x-3">
                        <Button
                            isIconOnly
                            className="lg:hidden flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100"
                            variant="light"
                            onPress={() => setIsMobileMenuOpen(true)}
                        >
                            <Bars2Icon className="w-5 h-5" />
                        </Button>

                        {token ? (
                            <Button
                                className="hidden lg:inline-flex px-6 h-10 text-xs gap-x-2"
                                color="primary"
                                radius="sm"
                                size="lg"
                                onPress={() => navigate(getDashboardPath())}
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <Button
                                className="hidden lg:inline-flex px-4 h-10 text-xs gap-x-2"
                                color="primary"
                                radius="sm"
                                size="lg"
                                onPress={() => navigate('/login')}
                            >
                                Get Started / Login
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <MobileNav open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />

        </header>
    );
};

export default Header;
