"use client";

import { Card } from "@/components/ui/Card";
import { Building2, Users, GraduationCap, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ParentCompanyDashboard() {
    const stats = [
        { name: "Total Schools", value: "24", icon: Building2, change: "+3", trend: "up", color: "text-blue-600 dark:text-blue-400" },
        { name: "Total Students", value: "14,231", icon: Users, change: "+12%", trend: "up", color: "text-indigo-600 dark:text-indigo-400" },
        { name: "Active Teachers", value: "842", icon: GraduationCap, change: "+5", trend: "up", color: "text-purple-600 dark:text-purple-400" },
        { name: "Overall Revenue", value: "$1.2M", icon: Activity, change: "-2%", trend: "down", color: "text-pink-600 dark:text-pink-400" },
    ];

    const recentActivity = [
        { title: "New school 'Springfield High' onboarded", time: "2 hours ago", type: "success" },
        { title: "Quarterly revenue report generated", time: "5 hours ago", type: "info" },
        { title: "System maintenance completed", time: "1 day ago", type: "default" },
        { title: "Subscription renewed for 'Oakridge Academy'", time: "2 days ago", type: "success" },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between md:items-end gap-4"
            >
                <div>
                    <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-foreground">
                        Overview
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Welcome back to the global dashboard.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Quick Action Buttons */}
                    <button className="px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm active:scale-95">
                        Add Entity
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full flex flex-col justify-between p-6 hover:bg-surface-container transition-colors duration-300 group cursor-pointer shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div className={`p-4 rounded-[20px] bg-surface-container dark:bg-black/20 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${stat.trend === "up" ? "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30" : "text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/30"
                                        }`}>
                                        {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-3xl font-medium tracking-tight text-foreground mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.name}</p>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Charts/Main Data */}
                <div className="lg:col-span-2">
                    <Card className="h-[400px] flex flex-col p-6 shadow-sm">
                        <h3 className="text-xl font-medium mb-6 tracking-tight">Growth Trajectory</h3>
                        <div className="flex-1 rounded-[24px] bg-surface-container flex items-center justify-center">
                            <p className="text-gray-600 dark:text-gray-400 font-medium">Chart visualization will be implemented here</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-1">
                    <Card className="h-[400px] flex flex-col p-6 shadow-sm">
                        <h3 className="text-xl font-medium mb-6 tracking-tight">Recent Activity</h3>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full mt-1 ${activity.type === "success" ? "bg-emerald-500" :
                                            activity.type === "info" ? "bg-blue-500" :
                                                "bg-gray-400"
                                            }`} />
                                        {i !== recentActivity.length - 1 && <div className="w-px h-full bg-black/10 dark:bg-white/10 mt-2" />}
                                    </div>
                                    <div className="pb-5">
                                        <p className="text-sm font-medium text-foreground leading-tight">{activity.title}</p>
                                        <p className="text-xs text-gray-500 mt-1.5 font-medium">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
