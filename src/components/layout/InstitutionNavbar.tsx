"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

export function InstitutionNavbar() {
    const pathname = usePathname();
    const router = useRouter();

    // Prevent rendering the dashboard navigation while on the secure login screen
    if (pathname === "/institution/login") return null;

    const navItems = [
        { name: "Home", href: "/institution/dashboard", icon: Home },
        { name: "Management", href: "/institution/management", icon: Users },
        { name: "Reports", href: "/institution/academics-report", icon: BookOpen },
    ];

    const handleSearchClick = () => {
        router.push("/institution/search");
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
            {/* Pronounced Frosted Glass Navbar - Isolated to Institution Maps */}
            <div className="bg-surface/40 dark:bg-black/40 backdrop-blur-[24px] flex items-center p-2 rounded-full shadow-lg border border-black/5 dark:border-white/10 text-foreground">
                {navItems.map((item) => {
                    const isActive = item.href === "/institution/dashboard"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex items-center justify-center px-5 py-2.5 rounded-full transition-colors font-medium text-sm gap-2 ${isActive ? "text-primary-700 dark:text-primary-100" : "text-gray-700 dark:text-gray-300 hover:text-foreground"
                                }`}
                            aria-label={item.name}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-active-md3-inst"
                                    className="absolute inset-0 bg-primary-100 dark:bg-primary-600/30 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {isActive && <Icon className="w-5 h-5 relative z-10 text-current transition-all duration-200" />}
                            <span className="relative z-10 transition-colors duration-200">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Localized Floating Search FAB securely restricted to /institution boundaries */}
            <div
                onClick={handleSearchClick}
                className="bg-surface/40 dark:bg-black/40 backdrop-blur-[24px] hover:bg-surface/70 p-4 rounded-full shadow-lg border border-black/5 dark:border-white/10 cursor-pointer transition-colors text-gray-800 dark:text-gray-200 hover:text-foreground"
                title="Click to search local records"
            >
                <Search className="w-5 h-5 text-current" />
            </div>
        </div>
    );
}
