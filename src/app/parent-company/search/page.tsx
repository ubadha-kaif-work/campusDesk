"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, ArrowLeft, Landmark, FileText, UserCircle, MapPin, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";

function SearchContent() {
    const searchParams = useSearchParams();
    const shouldFocus = searchParams.get('focus') === 'true';
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Institutions", "Reports", "Staff"];

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            // Delay ensures the focal input renders sequentially over dynamic framer transitions
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [shouldFocus]);

    const results = [
        { id: 1, type: "Institution", title: "Springfield High School", subtitle: "SHS-01 • Springfield", icon: Landmark, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40" },
        { id: 4, type: "Institution", title: "Shelbyville Elementary", subtitle: "SBE-02 • Shelbyville", icon: Landmark, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40" },
        { id: 2, type: "Report", title: "Q3 2026 Academic Performance", subtitle: "Generated Oct 12, 2026", icon: FileText, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/40" },
        { id: 3, type: "Staff", title: "Principal Seymour Skinner", subtitle: "Administration • Springfield High", icon: UserCircle, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/40" },
    ];

    const filteredResults = activeFilter === "All"
        ? results
        : results.filter(r => r.type === activeFilter);

    // Naively filter mock titles by actual query input
    const finalResults = searchQuery.trim().length > 0
        ? filteredResults.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : filteredResults;

    return (
        <div className="space-y-6 pb-32 pt-2 max-w-4xl mx-auto">
            {/* Focal Hero Search Element dynamically pinning to the window top */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sticky top-4 z-40"
            >
                <div className="flex items-center gap-3 bg-surface/80 dark:bg-surface-container/80 backdrop-blur-xl p-3 pr-4 rounded-full shadow-lg border border-black/5 dark:border-white/10 ring-1 ring-black/5 transition-all">
                    <Link href="/parent-company" className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 group">
                        <ArrowLeft className="w-6 h-6 text-gray-500 group-hover:text-foreground transition-colors" />
                    </Link>
                    <div className="flex-1 relative flex items-center pr-2">
                        <input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search institutions, reports, staff..."
                            className="w-full bg-transparent text-xl font-medium tracking-tight text-foreground placeholder-gray-400 focus:outline-none py-2"
                            autoFocus={!shouldFocus}
                        />
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-0 p-2 rounded-full text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5 text-current" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="shrink-0">
                        <div className="p-3 bg-primary-600 text-white rounded-full shadow-md cursor-pointer hover:bg-primary-700 hover:scale-105 transition-all duration-200">
                            <SearchIcon className="w-5 h-5 text-current" />
                        </div>
                    </div>
                </div>

                {/* Horizontal Quick Filter Slider mapping Categories */}
                <div className="flex overflow-x-auto gap-2 py-4 px-2 mt-2 no-scrollbar">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-all shadow-sm ${activeFilter === filter
                                    ? "bg-foreground text-background"
                                    : "bg-surface-container text-gray-600 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Sub-Render Frame displaying target payload matches dynamically */}
            <div className="px-2">
                <h3 className="text-gray-500 font-bold mb-4 ml-1 text-xs uppercase tracking-widest">
                    {searchQuery ? `Searching for "${searchQuery}"` : "Suggested Results"}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                        {finalResults.map((result, i) => {
                            const Icon = result.icon;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={result.id}
                                >
                                    <Card className="p-4 flex items-center justify-between gap-4 cursor-pointer group hover:bg-surface-container transition-colors shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
                                        <div className="flex items-center gap-5 overflow-hidden w-full">
                                            <div className={`p-4 rounded-[20px] shrink-0 transition-transform duration-300 group-hover:scale-110 ${result.color}`}>
                                                <Icon className="w-6 h-6 text-current" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xl font-medium text-foreground truncate group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                                    {result.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm font-medium text-gray-500 truncate min-w-0 max-w-[60%]">{result.subtitle}</span>
                                                    <span className="text-gray-300 dark:text-gray-600 shrink-0">•</span>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0">{result.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowLeft className="w-5 h-5 text-gray-300 dark:text-gray-600 rotate-135 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 shrink-0" />
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {finalResults.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 px-4">
                        <div className="mx-auto w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                            <SearchIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-foreground mb-2">No exact matches found</h3>
                        <p className="text-gray-500">Try adjusting your filters or refining your phrase.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
