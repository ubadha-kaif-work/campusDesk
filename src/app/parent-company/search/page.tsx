"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, ArrowLeft, Landmark, FileText, UserCircle, Users, BookOpen, Settings, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const shouldFocus = searchParams.get('focus') === 'true';
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Institutions", "Reports", "Staff", "Students"];

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [shouldFocus]);

    const mockResults = [
        { id: 1, title: "Springfield High School", subtitle: "SHS-01 • Springfield", type: "Institution", icon: Landmark },
        { id: 4, title: "Shelbyville Elementary", subtitle: "SBE-02 • Shelbyville", type: "Institution", icon: Landmark },
        { id: 2, title: "Principal Seymour Skinner", subtitle: "Administration • Springfield High", type: "Staff", icon: UserCircle },
        { id: 3, title: "Q3 2026 Finance Report", subtitle: "Generated Oct 12, 2026", type: "Report", icon: FileText },
        { id: 5, title: "Bart Simpson", subtitle: "Grade 4 • Springfield High", type: "Student", icon: Users },
    ];

    const filteredResults = activeFilter === "All"
        ? mockResults
        : mockResults.filter(r => r.type === activeFilter || r.type + "s" === activeFilter);

    const finalResults = searchQuery.trim().length > 0
        ? filteredResults.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) || r.subtitle.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : filteredResults;

    return (
        <div className="min-h-[100dvh] pb-32 bg-background flex flex-col">
            {/* MD3 Massive Search Bar Base Layer Container */}
            <div className="sticky top-0 z-50 pt-4 pb-2 px-4 bg-background/90 backdrop-blur-md">
                <div className="max-w-4xl mx-auto flex flex-col gap-4">

                    {/* Native thick MD3 Search Bar replacing the floating detached pill layout  */}
                    <div className="flex items-center gap-2 bg-surface-container-highest px-4 py-3 sm:py-4 rounded-full transition-shadow focus-within:ring-2 ring-primary-500/20">
                        <button onClick={() => router.back()} className="p-2 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search your workspace..."
                            className="flex-1 bg-transparent text-[19px] font-normal text-foreground placeholder-foreground/60 focus:outline-none px-2"
                            autoFocus={!shouldFocus}
                        />
                        {searchQuery ? (
                            <button onClick={() => setSearchQuery("")} className="p-2 rounded-full text-foreground/70 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        ) : (
                            <div className="p-2 rounded-full text-foreground/50 pointer-events-none">
                                <SearchIcon className="w-6 h-6" />
                            </div>
                        )}
                        {/* Standard Default Generic Profile Icon representation  */}
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 flex items-center justify-center shadow-sm ml-2 font-medium font-sans border border-primary-200 dark:border-primary-900">
                            A
                        </div>
                    </div>

                    {/* MD3 Tonal Filter Chips overriding Google abstract category sets natively  */}
                    <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-[12px] text-sm font-medium whitespace-nowrap transition-all border border-transparent ${activeFilter === filter
                                        ? "bg-primary-100 text-primary-900 dark:bg-primary-900/60 dark:text-primary-100 border-primary-200 dark:border-primary-800"
                                        : "bg-surface-container text-foreground hover:bg-surface-container-highest border-black/5 dark:border-white/5"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* MD3 Standard List Items Render Pipeline  */}
            <div className="flex-1 max-w-4xl mx-auto w-full px-2 sm:px-4 pt-4">
                <div className="space-y-1">
                    <AnimatePresence mode="popLayout">
                        {finalResults.map((result, i) => {
                            const Icon = result.icon;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    key={result.id}
                                >
                                    <div className="flex items-center gap-4 p-4 rounded-[28px] hover:bg-surface-container transition-colors cursor-pointer group shadow-sm border border-transparent hover:border-black/5 dark:hover:border-white/5">
                                        {/* Classic Material Design 3 Leading Icon Container Mapping */}
                                        <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex flex-col items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-primary-700 dark:text-primary-300" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[17px] tracking-tight font-normal text-foreground truncate">{result.title}</h4>
                                            <p className="text-[13px] font-medium text-foreground/60 truncate tracking-wide mt-0.5">{result.subtitle}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {finalResults.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                            <div className="mx-auto w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
                                <SearchIcon className="w-10 h-10 text-foreground/40" />
                            </div>
                            <h3 className="text-xl font-normal text-foreground mb-2 tracking-tight">No results found</h3>
                            <p className="text-foreground/60 text-sm font-medium">Try checking your spelling or selecting different chips.</p>
                        </motion.div>
                    )}
                </div>
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
            <SearchContent />
        </Suspense>
    );
}
