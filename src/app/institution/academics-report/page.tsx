"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, CheckCircle } from "lucide-react";

export default function AcademicsReportPage() {
    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col gap-1 mb-6 pt-4">
                <h1 className="text-4xl font-normal tracking-tight text-foreground">
                    Academics Report
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                    Review overarching gradebooks, attendance mappings, and class schedules natively.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Active Classes", count: 18, icon: BookOpen, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
                    { title: "Daily Clearances", count: "96%", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-surface-container-low rounded-[32px] flex items-center gap-6 hover:bg-surface-container transition-colors cursor-pointer border border-black/5 dark:border-white/5"
                    >
                        <div className={`w-16 h-16 rounded-full flex shrink-0 items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-8 h-8 ${item.color}`} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-normal tracking-tight text-foreground">{item.count}</h3>
                            <p className="text-foreground/70 font-medium tracking-wide mt-1">{item.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-12 bg-surface-container rounded-[36px] flex flex-col items-center justify-center text-center">
                <FileText className="w-16 h-16 text-foreground/20 mb-4" />
                <h2 className="text-xl font-medium tracking-tight text-foreground">Academic Matrices Pending</h2>
                <p className="text-foreground/60 text-sm mt-2 max-w-sm">
                    Deploy native MD3 Lists and charting matrices explicitly aggregating local `attendance` and `academics` data architectures.
                </p>
            </div>
        </div>
    );
}
