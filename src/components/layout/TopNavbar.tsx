"use client";

import { Bell, CircleUser, GraduationCap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function TopNavbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-transparent px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex justify-between items-center max-w-7xl mx-auto"
        >
            {/* Left side: Logo & Name */}
            <Link href="/parent-company" className="flex items-center gap-2.5 group">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl group-hover:scale-105 transition-transform duration-200">
                    <GraduationCap className="w-5 h-5 text-current" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">campusDesk</span>
            </Link>

            {/* Right side: Notifications & Profile */}
            <div className="flex items-center gap-2">
                <button className="p-2.5 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors relative" title="Notifications">
                    <Bell className="w-5 h-5 text-current" />
                    {/* Unread notification badge */}
                    <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
                </button>
                <button className="p-2 text-gray-500 hover:text-foreground hover:bg-surface-container rounded-full transition-colors" title="Profile">
                    <CircleUser className="w-6 h-6 text-current" />
                </button>
            </div>
        </motion.nav>
    );
}
