"use client";

import { Card } from "@/components/ui/Card";
import { Building2, Users, GraduationCap, Activity, FileText, Send, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function ParentCompanyDashboard() {
    const quickActions = [
        { name: "New Report", icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-surface-container hover:bg-blue-50 dark:hover:bg-blue-900/20" },
        { name: "Send Notice", icon: Send, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-surface-container hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
        { name: "Alerts", icon: Bell, color: "text-amber-600 dark:text-amber-400", bg: "bg-surface-container hover:bg-amber-50 dark:hover:bg-amber-900/20" },
        { name: "Settings", icon: Settings, color: "text-purple-600 dark:text-purple-400", bg: "bg-surface-container hover:bg-purple-50 dark:hover:bg-purple-900/20" },
    ];

    const stats = [
        { name: "Schools", value: "24", icon: Building2 },
        { name: "Students", value: "14,231", icon: Users },
        { name: "Staff", value: "842", icon: GraduationCap },
        { name: "Revenue", value: "$1.2M", icon: Activity },
    ];

    return (
        <div className="space-y-8 pb-32 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2 pt-4 px-4"
            >
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                    Overview
                </h1>
                <p className="text-gray-500 text-base font-medium">Your organization snapshot</p>
            </motion.div>

            {/* Quick Actions - Google Photos style 2x2 flat horizontal pills */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4"
            >
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <div
                            key={i}
                            className={`flex flex-row items-center gap-3 p-4 rounded-3xl cursor-pointer shadow-sm border border-black/5 dark:border-white/5 transition-colors ${action.bg}`}
                        >
                            <Icon className={`w-6 h-6 shrink-0 ${action.color}`} strokeWidth={1.5} />
                            <span className={`font-medium tracking-tight text-sm truncate ${action.color}`}>{action.name}</span>
                        </div>
                    );
                })}
            </motion.div>

            {/* Stats Overview - Google Photos "Albums" Square Grid style */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[19px] font-medium text-foreground">Core Metrics</h2>
                    <span className="text-sm font-medium text-primary-600 cursor-pointer hover:underline">View all</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                            >
                                <div className="aspect-square flex flex-col justify-between p-5 bg-surface-container rounded-[28px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-black/5 dark:border-white/5 shadow-sm">
                                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 opacity-90" strokeWidth={1.5} />
                                    <div>
                                        <h3 className="text-3xl font-semibold tracking-tight text-foreground mb-1">{stat.value}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Finance Chart Section - Mapped cleanly mapping Google structure */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-4"
            >
                <Card className="flex flex-col p-6 rounded-[32px] shadow-sm min-h-[350px] border border-black/5 dark:border-white/10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[19px] font-medium tracking-tight">Finance Overview</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
                            +12.4%
                        </span>
                    </div>

                    {/* Mock Finance Chart Visualization */}
                    <div className="flex-1 w-full bg-surface-container/50 rounded-[28px] flex items-end p-4 gap-2 h-full overflow-hidden relative border border-black/5 dark:border-white/5">
                        {/* Fake bars for the chart */}
                        {[30, 45, 25, 60, 40, 75, 55, 90, 65, 80, 50, 85].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.05), type: "spring" }}
                                    className="w-full bg-primary-200 dark:bg-primary-900/40 rounded-t-[10px] group-hover:bg-primary-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
