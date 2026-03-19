"use client";

import { Card } from "@/components/ui/Card";
import { BarChart3, TrendingUp, Download, PieChart, ArrowUpRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
    const recentReports = [
        { id: 1, title: "Q3 Academic Performance", date: "Oct 12, 2026", type: "Academic", status: "Ready" },
        { id: 2, title: "Annual Financial Overview", date: "Oct 10, 2026", type: "Finance", status: "Ready" },
        { id: 3, title: "Teacher Attrition Analysis", date: "Oct 05, 2026", type: "HR", status: "Processing" },
        { id: 4, title: "Campus Facilities Safety Review", date: "Sep 28, 2026", type: "Operations", status: "Ready" },
    ];

    const stats = [
        { name: "Total Reports Generated", value: "1,284", icon: FileText, change: "+12%" },
        { name: "Average Grade Trajectory", value: "B+", icon: TrendingUp, change: "+3.2%" },
        { name: "Budget Utilization", value: "84%", icon: PieChart, change: "-2.1%" },
    ];

    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground">
                        Reports & Analytics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Insights and generated data for your organization.</p>
                </div>
                <Button className="shrink-0 group">
                    <BarChart3 className="w-5 h-5 text-current" /> Generate New Report
                </Button>
            </div>

            {/* Top Level Analytic Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    const isPositive = stat.change.startsWith("+");
                    return (
                        <motion.div key={stat.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="flex flex-col p-6 shadow-sm border border-black/5 dark:border-white/10 group cursor-pointer hover:bg-surface-container transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                        <Icon className="w-6 h-6 text-current" />
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight text-foreground mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* List of Mock Extracted Reports */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="flex flex-col shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-surface-container/30">
                        <h3 className="text-xl font-medium tracking-tight">Recent Reports</h3>
                        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="divide-y divide-black/5 dark:divide-white/5">
                        {recentReports.map((report) => (
                            <div key={report.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-surface-container group-hover:bg-white dark:group-hover:bg-black/40 rounded-full transition-colors">
                                        <FileText className="w-5 h-5 text-gray-500 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground text-lg">{report.title}</h4>
                                        <p className="text-sm text-gray-500">{report.date} • {report.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${report.status === 'Ready'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                                        }`}>
                                        {report.status}
                                    </span>
                                    {report.status === 'Ready' && (
                                        <button className="p-2 text-gray-400 hover:text-foreground transition-colors" title="Download">
                                            <Download className="w-5 h-5 text-current" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
