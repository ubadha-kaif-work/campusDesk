"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Bell, Check, FileText, AlertCircle, Info, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationsPage() {
    const notifications = [
        { id: 1, type: "alert", title: "System Maintenance Scheduled", message: "Server maintenance will occur tonight at 02:00 AM UTC. Expect 15 minutes of downtime.", time: "1 hour ago", icon: AlertCircle, color: "text-red-600 bg-red-100 dark:bg-red-900/30" },
        { id: 2, type: "report", title: "Annual Financial Report Generated", message: "Your requested Q3 2026 academic performance datasets are ready to download.", time: "3 hours ago", icon: FileText, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
        { id: 3, type: "branch", title: "New Branch Authenticated", message: "Springfield High School has successfully completed their initial database seeding.", time: "1 day ago", icon: Building2, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" },
        { id: 4, type: "info", title: "Welcome to campusDesk", message: "Your global administrator toolkit is fully configured. Start adding branches from the Schools tab.", time: "3 days ago", icon: Info, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30" },
    ];

    return (
        <div className="space-y-8 pb-32 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground flex items-center gap-3">
                        Notifications
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">1 New</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">View system alerts and branch activity.</p>
                </div>
                <Button variant="secondary" className="shrink-0 text-sm">
                    <Check className="w-5 h-5 text-current" /> Mark All as Read
                </Button>
            </div>

            {/* List Layout Component Tracking chronological Mock System Notifications  */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="flex flex-col shadow-sm border border-black/5 dark:border-white/10 overflow-hidden divide-y divide-black/5 dark:divide-white/5">
                    {notifications.map((notification, idx) => {
                        const Icon = notification.icon;
                        return (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`p-6 flex gap-5 hover:bg-surface-container transition-colors group cursor-pointer ${idx === 0 ? 'bg-surface-container/30' : ''}`}
                            >
                                <div className={`p-3 shrink-0 rounded-full h-fit mt-1 shadow-sm transition-transform group-hover:scale-110 ${notification.color}`}>
                                    <Icon className="w-6 h-6 text-current" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className={`text-lg transition-colors ${idx === 0 ? 'font-semibold text-foreground' : 'font-medium text-gray-800 dark:text-gray-300'}`}>
                                        {notification.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">{notification.message}</p>
                                    <p className="text-sm font-medium text-gray-500 pt-1 uppercase tracking-wider">{notification.time}</p>
                                </div>
                                {idx === 0 && (
                                    <div className="shrink-0 flex items-center justify-center p-3 h-fit">
                                        <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </Card>
            </motion.div>
        </div>
    );
}
