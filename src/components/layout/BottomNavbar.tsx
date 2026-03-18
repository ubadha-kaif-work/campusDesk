"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, School, PieChart, Settings } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNavbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/parent-company", icon: Home },
        { name: "Schools", href: "/parent-company/schools", icon: School },
        { name: "Reports", href: "/parent-company/reports", icon: PieChart },
        { name: "Settings", href: "/parent-company/settings", icon: Settings },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-card flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl">
                {navItems.map((item) => {
                    // Exact match for home, startsWith for others
                    const isActive = item.href === "/parent-company"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex items-center justify-center p-3 rounded-full transition-colors"
                            aria-label={item.name}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-active-pill"
                                    className="absolute inset-0 bg-primary-500/10 rounded-full"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <Icon
                                className={`relative z-10 w-6 h-6 transition-colors duration-300 ${isActive ? "text-primary-600" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
