"use client";

import { motion } from "framer-motion";
import { CircleUser, ShieldCheck, Mail, Building2, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
    const [branchName, setBranchName] = useState("Local Branch User");

    useEffect(() => {
        // Securely map the specific UI credential cached explicitly at local authentication mapping
        const name = localStorage.getItem("active_institution_name");
        if (name) setBranchName(name);
    }, []);

    return (
        <div className="space-y-8 pb-32 max-w-4xl mx-auto">
            <div className="flex flex-col gap-1 mb-8 pt-4">
                <h1 className="text-4xl font-normal tracking-tight text-foreground">
                    Branch Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                    Manage your localized credentials perfectly isolated from primary parent systems.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-surface-container-low rounded-[36px] border border-black/5 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
                <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900/30 flex shrink-0 items-center justify-center relative overflow-hidden group border-4 border-surface shadow-sm">
                    <CircleUser className="w-20 h-20 text-primary-500/50" strokeWidth={1} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-bold tracking-wider uppercase">Edit</span>
                    </div>
                </div>

                <div className="flex-1 w-full text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h2 className="text-3xl font-normal tracking-tight text-foreground">{branchName}</h2>
                        <ShieldCheck className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-xs font-bold tracking-widest text-foreground/70 uppercase">Local Admin Token</span>

                    <div className="mt-8 space-y-4 max-w-lg">
                        <Input
                            label="Account Contact"
                            value="admin@branch.edu"
                            readOnly
                            icon={<Mail className="w-5 h-5 text-current" />}
                        />
                        <Input
                            label="Host Organization Mapping"
                            value="Springfield Education Group"
                            readOnly
                            icon={<Building2 className="w-5 h-5 text-current" />}
                        />
                        <div className="pt-2">
                            <button className="flex items-center gap-2 text-sm font-bold tracking-wide text-error-600 hover:text-error-700 hover:bg-error-50 dark:hover:bg-error-900/20 px-4 py-2 rounded-full transition-colors ml-[-12px]">
                                <KeyRound className="w-4 h-4" /> Reset Security Code
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
