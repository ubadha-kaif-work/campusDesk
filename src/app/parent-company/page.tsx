"use client";

import { Card } from "@/components/ui/Card";
import { Building2, Users, GraduationCap, Activity, FileText, Send, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function ParentCompanyDashboard() {
    const quickActions = [
        { name: "New Report", icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
        { name: "Send Notice", icon: Send, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
        { name: "Alerts", icon: Bell, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
        { name: "Settings", icon: Settings, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
    ];

    const stats = [
        { name: "Total Schools", value: "24", icon: Building2 },
        { name: "Total Students", value: "14,231", icon: Users },
        { name: "Active Teachers", value: "842", icon: GraduationCap },
        { name: "Overall Revenue", value: "$1.2M", icon: Activity },
    ];

    return (
        <div className="space-y-8 pb-32">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2 pt-4"
            >
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
                    Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Your organization snapshot.</p>
            </motion.div>

            {/* Quick Actions Grid (2x2 on Mobile, 4x1 on Desktop) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <div key={i} className="flex flex-col items-center justify-center p-4 bg-surface rounded-[24px] cursor-pointer hover:bg-surface-container transition-colors shadow-sm">
                            <div className={`p-4 rounded-full mb-3 ${action.bg} ${action.color}`}>
                                <Icon className="w-6 h-6 text-current" />
                            </div>
                            <span className="font-medium text-sm text-foreground">{action.name}</span>
                        </div>
                    );
                })}
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                        >
                            <Card className="flex flex-col p-5 shadow-sm">
                                <Icon className="w-6 h-6 text-primary-600 opacity-80 mb-4" />
                                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Finance Chart Section */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="flex flex-col p-6 shadow-sm min-h-[350px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-medium tracking-tight">Finance Overview</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
                            +12.4%
                        </span>
                    </div>

                    {/* Mock Finance Chart Visualization */}
                    <div className="flex-1 w-full bg-surface-container rounded-[24px] flex items-end p-4 gap-2 h-full overflow-hidden relative">
                        {/* Fake bars for the chart */}
                        {[30, 45, 25, 60, 40, 75, 55, 90, 65, 80, 50, 85].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.05), type: "spring" }}
                                    className="w-full bg-primary-100 dark:bg-primary-900/30 rounded-t-lg group-hover:bg-primary-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
