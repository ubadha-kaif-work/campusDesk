"use client";

import { Bell, CircleUser } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function InstitutionTopNavbar() {
    const pathname = usePathname();

    // Hide Top Navbar on the login/portal screen
    if (pathname === "/institution/login") return null;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-transparent px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex justify-between items-center max-w-7xl mx-auto"
        >
            {/* Left side: Name without logo, mapping to local dashboard */}
            <Link href="/institution/dashboard" className="flex items-center group">
                <span className="text-xl font-bold tracking-tight text-gray-500 hover:text-gray-400 transition-colors">campusDesk</span>
            </Link>

            {/* Right side: Notifications & Profile Links securely isolated to local institution endpoints */}
            <div className="flex items-center gap-2">
                <Link href="/institution/notifications" className="p-2.5 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors relative" title="Branch Notifications">
                    <Bell className="w-5 h-5 text-current" />
                    {/* Unread notification badge */}
                    <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
                </Link>
                <Link href="/institution/profile" className="p-2 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors" title="Branch Profile">
                    <CircleUser className="w-6 h-6 text-current" />
                </Link>
            </div>
        </motion.nav>
    );
}
