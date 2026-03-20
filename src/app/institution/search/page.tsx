"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowLeft, Users, GraduationCap, BookOpen, Settings, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LocalSearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const shouldFocus = searchParams.get('focus') === 'true';
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Students", "Staff", "Classes"];

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [shouldFocus]);

    const mockResults = [
        { id: 1, title: "Bart Simpson", subtitle: "Grade 4 • ID: 10423", type: "Student", icon: Users },
        { id: 2, title: "Lisa Simpson", subtitle: "Grade 2 • ID: 10424", type: "Student", icon: Users },
        { id: 3, title: "Edna Krabappel", subtitle: "Faculty • Department of Sciences", type: "Staff", icon: GraduationCap },
        { id: 4, title: "Advanced Chemistry", subtitle: "Room 402 • 10:00 AM", type: "Class", icon: BookOpen },
    ];

    const filteredResults = activeFilter === "All"
        ? mockResults
        : mockResults.filter(r => r.type === activeFilter || r.type + "s" === activeFilter || r.type + "es" === activeFilter);

    const finalResults = searchQuery.trim().length > 0
        ? filteredResults.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || r.subtitle.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : filteredResults;

    return (
        <div className="min-h-[100dvh] flex flex-col pb-32">
            {/* Top Navigation Frame mirroring strict MD3 Heights */}
            <div className="sticky top-0 z-50 pt-2 pb-2 px-2 sm:px-4 sm:pt-4 bg-background/95 backdrop-blur-xl border-b border-black/5 dark:border-white/5 md:border-none">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-3">
                    <div className="flex items-center bg-transparent w-full h-14 rounded-full transition-all focus-within:shadow-md px-1 sm:px-2 border border-black/10 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20">
                        <button onClick={() => router.back()} className="p-2 sm:p-3 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0">
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search your localized branch data..."
                            className="flex-1 min-w-0 bg-transparent text-base sm:text-[17px] font-normal text-foreground placeholder-foreground/60 focus:outline-none px-2"
                        />

                        <div className="flex items-center shrink-0 pr-1">
                            {searchQuery ? (
                                <button onClick={() => setSearchQuery("")} className="p-2 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            ) : (
                                <div className="p-2 hidden sm:block rounded-full text-foreground/50 pointer-events-none">
                                    <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex overflow-x-auto gap-2 pb-1 px-1 no-scrollbar">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 sm:px-5 py-2 rounded-xl text-[13px] sm:text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${activeFilter === filter
                                    ? "bg-primary-100 text-primary-900 dark:bg-primary-900/60 dark:text-primary-100 border-primary-200 dark:border-primary-800 shadow-sm"
                                    : "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5 border-black/10 dark:border-white/10"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                    <AnimatePresence mode="popLayout">
                        {finalResults.map((result, i) => {
                            const Icon = result.icon;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    key={result.id}
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-4 p-3 sm:p-4 rounded-[20px] sm:rounded-[28px] hover:bg-surface-container hover:shadow-sm transition-all cursor-pointer group border border-transparent hover:border-black/5 dark:hover:border-white/5 bg-transparent lg:bg-surface-container-low lg:border-black/5 dark:lg:border-white/5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex flex-col items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700 dark:text-primary-300" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[16px] sm:text-[17px] tracking-tight font-normal text-foreground truncate group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">{result.title}</h4>
                                            <p className="text-[12px] sm:text-[13px] font-medium text-foreground/60 truncate tracking-wide mt-[1px]">{result.subtitle}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                {finalResults.length === 0 && (
                    <div className="text-center py-20 px-4 w-full h-full flex flex-col items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container rounded-full flex flex-col items-center justify-center mb-6 shadow-sm border border-black/5 dark:border-white/5">
                            <SearchIcon className="w-8 h-8 sm:w-10 sm:h-10 text-foreground/40" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-normal text-foreground mb-2 tracking-tight">No localized results</h3>
                        <p className="text-foreground/60 text-sm font-medium">Try broadening your search term across different branch entities.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        }>
            <LocalSearchContent />
        </Suspense>
    );
}
