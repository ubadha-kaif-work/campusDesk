"use client";

import { Card } from "@/components/ui/Card";
import { Users, GraduationCap, Activity, Bell, FileText, Settings, Sparkles, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function InstitutionDashboard() {
    const [branchName, setBranchName] = useState("Local Dashboard");

    useEffect(() => {
        // Securely pull the localized credentials cached at login mapping dynamic identities
        const name = localStorage.getItem("active_institution_name");
        if (name) setBranchName(name);
    }, []);

    const quickActions = [
        { name: "Take Attendance", icon: ClipboardCheck, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Gradebook", icon: FileText, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Notice Board", icon: Bell, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
        { name: "Settings", icon: Settings, color: "text-primary-700 dark:text-primary-300", bg: "bg-primary-100 dark:bg-primary-900/30" },
    ];

    const stats = [
        { name: "Total Enrolled", value: "854", icon: Users },
        { name: "Active Faculty", value: "32", icon: GraduationCap },
        { name: "Daily Attendance", value: "96%", icon: Activity },
        { name: "Classes Today", value: "18", icon: Sparkles },
    ];

    return (
        <div className="space-y-8 pb-32 max-w-6xl mx-auto px-4 sm:px-6 pt-6 w-full">
            {/* Header - MD3 Large Display Typography mapping cached identities natively */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1 mb-6"
            >
                <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-foreground truncate">
                    {branchName}
                </h1>
                <p className="text-foreground/70 text-lg font-medium">Your branch operational overview</p>
            </motion.div>

            {/* Quick Actions - MD3 Tonal Cards perfectly mirroring global styles but scaling localized workflows */}
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

            {/* Core Metrics - MD3 Elevated Cards scaling abstract generic data mapping explicitly mapped localized metrics */}
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

            {/* Attendance Chart Section bypassing parent corporate mapping for explicitly localized workflow parameters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col p-6 sm:p-8 bg-surface-container-low rounded-[36px] shadow-sm min-h-[350px]">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[22px] font-normal tracking-tight text-foreground">Monthly Attendance</h3>
                        <span className="px-4 py-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 rounded-full text-sm font-bold tracking-wider">
                            96.4% AVG
                        </span>
                    </div>

                    <div className="flex-1 w-full bg-surface-container rounded-[24px] flex items-end p-4 sm:p-6 gap-2 sm:gap-4 h-full overflow-hidden">
                        {[90, 95, 92, 98, 94, 97, 89, 93, 96, 91, 95, 96].map((height, i) => (
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
