"use client";

import { Card } from "@/components/ui/Card";
import { Building2, Users, GraduationCap, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ParentCompanyDashboard() {
    const stats = [
        { name: "Total Schools", value: "24", icon: Building2, change: "+3", trend: "up", color: "text-blue-400" },
        { name: "Total Students", value: "14,231", icon: Users, change: "+12%", trend: "up", color: "text-indigo-400" },
        { name: "Active Teachers", value: "842", icon: GraduationCap, change: "+5", trend: "up", color: "text-purple-400" },
        { name: "Overall Revenue", value: "$1.2M", icon: Activity, change: "-2%", trend: "down", color: "text-pink-400" },
    ];

    const recentActivity = [
        { title: "New school 'Springfield High' onboarded", time: "2 hours ago", type: "success" },
        { title: "Quarterly revenue report generated", time: "5 hours ago", type: "info" },
        { title: "System maintenance completed", time: "1 day ago", type: "default" },
        { title: "Subscription renewed for 'Oakridge Academy'", time: "2 days ago", type: "success" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between md:items-end gap-4"
            >
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                        Overview
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Welcome back to the global dashboard.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Quick Action Buttons */}
                    <button className="px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors shadow-lg shadow-primary-500/20 active:scale-95">
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
                            <Card className="h-full flex flex-col justify-between p-6 hover:bg-white/[0.04] transition-colors border-white/[0.08] duration-300 group">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${stat.trend === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                                        }`}>
                                        {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-3xl font-bold tracking-tight text-white mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
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
                    <Card className="h-[400px] flex flex-col p-6">
                        <h3 className="text-xl font-bold mb-6 tracking-tight">Growth Trajectory</h3>
                        <div className="flex-1 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                            <p className="text-gray-500/80 font-medium">Chart visualization will be implemented here</p>
                        </div>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-1">
                    <Card className="h-[400px] flex flex-col p-6">
                        <h3 className="text-xl font-bold mb-6 tracking-tight">Recent Activity</h3>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-3 h-3 rounded-full mt-1 ${activity.type === "success" ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" :
                                                activity.type === "info" ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]" :
                                                    "bg-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.6)]"
                                            }`} />
                                        {i !== recentActivity.length - 1 && <div className="w-px h-full bg-white/10 mt-2 group-hover:bg-white/20 transition-colors" />}
                                    </div>
                                    <div className="pb-5">
                                        <p className="text-sm font-medium text-white/90 leading-tight">{activity.title}</p>
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
