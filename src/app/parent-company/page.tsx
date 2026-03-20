"use client";

import { Card } from "@/components/ui/Card";
import { Building2, Users, GraduationCap, Activity, FileText, Send, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ParentCompanyDashboard() {
    const router = useRouter();
    const [branchCount, setBranchCount] = useState<number | string>("...");

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const snap = await getDocs(collection(db, "companies", user.uid, "branches"));
                    setBranchCount(snap.size);
                } catch (error) {
                    console.error("Error fetching branch count:", error);
                    setBranchCount(0);
                }
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);
    const quickActions = [
        { name: "New Report", icon: FileText, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Send Notice", icon: Send, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Alerts", icon: Bell, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Settings", icon: Settings, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
    ];

    const stats = [
        { name: "Schools Managed", value: branchCount, icon: Building2 },
        { name: "Total Students", value: "14,231", icon: Users },
        { name: "Active Staff", value: "842", icon: GraduationCap },
        { name: "Net Revenue", value: "$1.2M", icon: Activity },
    ];

    return (
        <div className="space-y-8 pb-32 max-w-5xl mx-auto px-4 pt-6">
            {/* Header - MD3 Large Display Typography */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1 mb-6"
            >
                <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-foreground">
                    Overview
                </h1>
                <p className="text-foreground/70 text-lg font-medium">Your organization snapshot</p>
            </motion.div>

            {/* Quick Actions - MD3 Tonal Buttons/Cards */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <div
                            key={i}
                            className={`flex flex-col items-start gap-4 p-5 rounded-[28px] cursor-pointer transition-colors ${action.bg} hover:brightness-95 dark:hover:brightness-110`}
                        >
                            <Icon className={`w-7 h-7 ${action.color}`} strokeWidth={2} />
                            <span className={`font-medium tracking-tight text-base ${action.color}`}>{action.name}</span>
                        </div>
                    );
                })}
            </motion.div>

            {/* Stats Overview - MD3 Elevated Cards */}
            <div>
                <h2 className="text-xl font-medium text-foreground mb-4 pl-1">Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                            >
                                <div className="flex flex-col justify-between p-6 bg-surface-container-low rounded-[32px] hover:bg-surface-container transition-colors cursor-pointer shadow-sm relative overflow-hidden h-[160px]">
                                    {/* Abstract corner backdrop icon marking MD3 aesthetic depth */}
                                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-10 pointer-events-none">
                                        <Icon className="w-32 h-32 text-foreground" />
                                    </div>
                                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" strokeWidth={1.5} />
                                    <div>
                                        <h3 className="text-3xl font-normal tracking-tight text-foreground">{stat.value}</h3>
                                        <p className="text-sm text-foreground/70 font-medium tracking-wide mt-1">{stat.name}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Finance Chart Section - MD3 Elevated Card Layout */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col p-6 sm:p-8 bg-surface-container-low rounded-[36px] shadow-sm min-h-[350px]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[22px] font-normal tracking-tight text-foreground">Finance Overview</h3>
                        <span className="px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-full text-sm font-bold tracking-wider">
                            +12.4%
                        </span>
                    </div>

                    {/* Mock Finance Chart Visualization via Fluid Graph Mapping */}
                    <div className="flex-1 w-full bg-surface-container rounded-[24px] flex items-end p-4 sm:p-6 gap-2 sm:gap-4 h-full overflow-hidden">
                        {[30, 45, 25, 60, 40, 75, 55, 90, 65, 80, 50, 85].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.05), type: "spring" }}
                                    className="w-full bg-primary-200 dark:bg-primary-800 rounded-t-full group-hover:bg-primary-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
