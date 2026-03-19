"use client";

import { Bell, CircleUser } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function TopNavbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-transparent px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex justify-between items-center max-w-7xl mx-auto"
        >
            {/* Left side: Name without logo, specifically using light gray coloring */}
            <Link href="/parent-company" className="flex items-center group">
                <span className="text-xl font-bold tracking-tight text-gray-500 hover:text-gray-400 transition-colors">campusDesk</span>
            </Link>

            {/* Right side: Notifications & Profile Links via standard Next.js Router pointing to respective newly created directories */}
            <div className="flex items-center gap-2">
                <Link href="/parent-company/notifications" className="p-2.5 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors relative" title="Notifications">
                    <Bell className="w-5 h-5 text-current" />
                    {/* Unread notification badge */}
                    <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
                </Link>
                <Link href="/parent-company/profile" className="p-2 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors" title="Profile">
                    <CircleUser className="w-6 h-6 text-current" />
                </Link>
            </div>
        </motion.nav>
    );
}
