"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, School, PieChart, Settings, Search } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNavbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/parent-company" },
        { name: "Schools", href: "/parent-company/schools" },
        { name: "Reports", href: "/parent-company/reports" },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
            <div className="bg-surface/90 backdrop-blur-md flex items-center p-2 rounded-full shadow-sm border border-black/5 dark:border-white/5">
                {navItems.map((item) => {
                    const isActive = item.href === "/parent-company"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex items-center justify-center px-5 py-2.5 rounded-full transition-colors font-medium text-sm"
                            aria-label={item.name}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-active-pill"
                                    className="absolute inset-0 bg-primary-100 dark:bg-primary-600/30 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-primary-700 dark:text-primary-100" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                }`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Detached FAB like in the reference image */}
            <div className="bg-surface-container hover:bg-surface/80 p-3.5 rounded-full shadow-sm border border-black/5 dark:border-white/5 cursor-pointer transition-colors text-gray-700 dark:text-gray-300">
                <Search className="w-5 h-5" />
            </div>
        </div>
    );
}
