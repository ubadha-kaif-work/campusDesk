"use client";

import { motion } from "framer-motion";
import { Landmark } from "lucide-react";

export default function InstitutionDashboardPlaceholder() {
    return (
        <div className="min-h-[100dvh] bg-surface flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center max-w-lg"
            >
                <div className="w-24 h-24 rounded-[36px] bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-8 border border-black/5 dark:border-white/5">
                    <Landmark className="w-12 h-12 text-primary-600 dark:text-primary-400" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground mb-4">
                    Local Dashboard
                </h1>
                <p className="text-lg text-foreground/60 font-medium">
                    This is your specific localized Institution Workspace securely partitioned completely separately from the primary Parent Dashboards.
                </p>

                <div className="mt-12 opacity-50 px-6 py-3 bg-surface-container rounded-full text-sm font-bold tracking-widest uppercase">
                    Module In Development
                </div>
            </motion.div>
        </div>
    );
}
