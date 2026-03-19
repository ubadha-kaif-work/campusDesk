"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowLeft, Landmark, FileText, UserCircle, Users, BookOpen, Clock, Settings, Mic, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const shouldFocus = searchParams.get('focus') === 'true';
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            // Delay ensures the focal input renders sequentially over dynamic framer transitions
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [shouldFocus]);

    const categories = [
        { id: "institutions", title: "Institutions", icon: Landmark, color: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
        { id: "staff", title: "Staff", icon: UserCircle, color: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400" },
        { id: "students", title: "Students", icon: Users, color: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" },
        { id: "reports", title: "Reports", icon: FileText, color: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400" },
        { id: "courses", title: "Courses", icon: BookOpen, color: "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400" },
        { id: "settings", title: "Settings", icon: Settings, color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" },
    ];

    const recentSearches = ["Attendance Logs", "Springfield High", "Dean Skinner", "Finance Report Q3"];

    // Mock search results
    const mockResults = [
        { id: 1, title: "Springfield High School", type: "Institution", icon: Landmark },
        { id: 4, title: "Shelbyville Elementary", type: "Institution", icon: Landmark },
        { id: 2, title: "Principal Seymour Skinner", type: "Staff", icon: UserCircle },
        { id: 3, title: "Q3 Finance Report", type: "Report", icon: FileText },
    ];

    const finalResults = searchQuery.trim().length > 0
        ? mockResults.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || r.type.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : [];

    return (
        <div className="min-h-[100dvh] pb-32 bg-background flex flex-col">
            {/* Google Photos Abstract Floating Pill */}
            <div className="sticky top-0 z-50 px-4 pt-4 pb-2 bg-background/90 backdrop-blur-xl">
                <div className="max-w-3xl mx-auto flex items-center bg-surface-container hover:bg-black/5 dark:hover:bg-white/5 transition-colors p-2 rounded-full shadow-sm border border-black/5 dark:border-white/5">
                    <button onClick={() => router.back()} className="p-2.5 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <input
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your workspace"
                        className="flex-1 bg-transparent text-[17px] text-foreground placeholder-foreground/50 focus:outline-none px-2"
                        autoFocus={!shouldFocus}
                    />
                    <div className="flex items-center gap-1 pr-1 shrink-0">
                        {searchQuery ? (
                            <button onClick={() => setSearchQuery("")} className="p-2.5 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        ) : (
                            <button className="p-2.5 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <Mic className="w-5 h-5" />
                            </button>
                        )}
                        <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-sm ml-1 font-medium font-sans border border-black/10">
                            A
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-3xl mx-auto w-full px-4 overflow-hidden pt-4">
                <AnimatePresence mode="popLayout">
                    {searchQuery.trim().length === 0 ? (
                        <motion.div
                            key="abstract-grid"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Horizontal Recent Queries Slider */}
                            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                                {recentSearches.map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSearchQuery(term);
                                            inputRef.current?.focus();
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-medium text-foreground hover:bg-surface-container hover:shadow-sm whitespace-nowrap transition-all"
                                    >
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        {term}
                                    </button>
                                ))}
                            </div>

                            {/* Massive Categorical Grid (Google Photos style constraint) */}
                            <div>
                                <h2 className="text-[19px] font-medium text-foreground mb-4 pl-1">Categories</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {categories.map((cat, i) => {
                                        const Icon = cat.icon;
                                        return (
                                            <motion.button
                                                key={cat.id}
                                                whileHover={{ scale: 0.98 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSearchQuery(cat.title);
                                                    inputRef.current?.focus();
                                                }}
                                                className={`aspect-square rounded-[24px] ${cat.color} flex flex-col items-center justify-center gap-3 p-4 shadow-sm border border-black/5 transition-transform overflow-hidden`}
                                            >
                                                <Icon className="w-10 h-10" strokeWidth={1.5} />
                                                <span className="font-semibold tracking-tight text-sm">{cat.title}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="search-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 mt-2"
                        >
                            {finalResults.map((result) => {
                                const Icon = result.icon;
                                return (
                                    <div key={result.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 rounded-full bg-surface-container group-hover:bg-white dark:group-hover:bg-black/30 flex items-center justify-center shrink-0 transition-colors">
                                            <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary-600 transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-medium text-foreground truncate">{result.title}</h4>
                                            <p className="text-sm text-gray-500 truncate">{result.type}</p>
                                        </div>
                                    </div>
                                );
                            })}

                            {finalResults.length === 0 && (
                                <div className="text-center py-20">
                                    <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-foreground">No matches found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Try searching for something else</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
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
