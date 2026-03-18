"use client";

import { Input } from "@/components/ui/Input";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const shouldFocus = searchParams.get('focus') === 'true';
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            // Slight delay ensures the motion div renders first
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [shouldFocus]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-[calc(100vh-120px)] pt-4"
        >
            <div className="flex items-center gap-4 mb-8 bg-surface p-2 rounded-full shadow-sm border border-black/5 dark:border-white/5">
                <Link href="/parent-company" className="p-3 rounded-full hover:bg-surface-container transition-colors shrink-0">
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div className="flex-1 pr-2">
                    <input
                        ref={inputRef}
                        placeholder="Search for schools, teachers, or reports..."
                        className="w-full bg-transparent text-lg text-foreground placeholder-gray-500 focus:outline-none py-2"
                        autoFocus={!shouldFocus} // If focus=false, it still auto-focuses as a default search page behavior, or we respect the param entirely.
                    />
                </div>
                <div className="pr-4">
                    <SearchIcon className="w-5 h-5 text-primary-600" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                <h3 className="text-gray-500 font-medium mb-4 ml-2 text-sm uppercase tracking-wider">Recent Searches</h3>
                <div className="space-y-2">
                    {["Springfield High School", "Q3 Revenue Report", "Active Teachers count", "Student attendance stats"].map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={item}
                            className="flex items-center gap-4 p-4 rounded-3xl hover:bg-surface-container transition-colors cursor-pointer group"
                        >
                            <div className="p-3 bg-surface-container group-hover:bg-white dark:group-hover:bg-black/30 rounded-full transition-colors">
                                <SearchIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                            </div>
                            <span className="font-medium text-foreground text-lg">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
