"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, ShieldAlert } from "lucide-react";

export default function ManagementPage() {
    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col gap-1 mb-6 pt-4">
                <h1 className="text-4xl font-normal tracking-tight text-foreground">
                    Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                    Centralized directory for Students, Faculty, and Administrators.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Students", count: 854, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                    { title: "Faculty", count: 32, icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                    { title: "Administrators", count: 5, icon: ShieldAlert, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" }
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-surface-container-low rounded-[32px] hover:bg-surface-container transition-colors cursor-pointer border border-black/5 dark:border-white/5"
                    >
                        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center mb-6 ${item.bg}`}>
                            <item.icon className={`w-7 h-7 ${item.color}`} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-normal tracking-tight text-foreground">{item.count}</h3>
                        <p className="text-foreground/70 font-medium tracking-wide mt-1">{item.title}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-12 bg-surface-container rounded-[36px] flex flex-col items-center justify-center text-center">
                <Users className="w-16 h-16 text-foreground/20 mb-4" />
                <h2 className="text-xl font-medium tracking-tight text-foreground">Directory Logs Pending</h2>
                <p className="text-foreground/60 text-sm mt-2 max-w-sm">
                    Connect Firebase explicitly mapping `users` sub-collections natively resolving the local branch dataset.
                </p>
            </div>
        </div>
    );
}
