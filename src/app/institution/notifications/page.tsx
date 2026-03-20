"use client";

import { motion } from "framer-motion";
import { Bell, AlertCircle, Info, Calendar } from "lucide-react";

export default function NotificationsPage() {

    // Sample MD3 localized broadcasts
    const notifications = [
        { id: 1, title: "Emergency Faculty Meeting", time: "10 mins ago", type: "urgent", icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
        { id: 2, title: "Q3 Grades Submission Deadline", time: "2 hours ago", type: "warning", icon: Calendar, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
        { id: 3, title: "Welcome back all returning staff!", time: "1 day ago", type: "info", icon: Info, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" }
    ];

    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col gap-1 mb-6 pt-4">
                <h1 className="text-4xl font-normal tracking-tight text-foreground">
                    Notice Board
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                    Viewing localized internal branch broadcasts securely.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {notifications.map((notice, i) => (
                    <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-surface-container-low rounded-[24px] hover:bg-surface-container transition-colors cursor-pointer border border-black/5 dark:border-white/5 flex gap-4 items-center"
                    >
                        <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center ${notice.bg}`}>
                            <notice.icon className={`w-6 h-6 ${notice.color}`} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-lg font-medium tracking-tight text-foreground truncate">{notice.title}</h3>
                                <span className="text-xs font-bold text-foreground/50 whitespace-nowrap mt-1">{notice.time}</span>
                            </div>
                            <p className="text-foreground/70 text-sm mt-0.5 capitalize tracking-wide font-medium">{notice.type} priority Notice</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-12 flex flex-col items-center justify-center text-center opacity-60">
                <Bell className="w-12 h-12 text-foreground/30 mb-4" />
                <p className="text-sm font-medium text-foreground/70">You have no older notifications matching your routing token.</p>
            </div>
        </div>
    );
}
