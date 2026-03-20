"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, ArrowRight, Building, Building2, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function InstitutionLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        parentCompany: "",
        institutionName: "",
        systemCode: ""
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- DEVELOPMENT BYPASS ENABLED ---
        // Temporarily skipping Firebase queries to allow rapid development of the Institution module
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem("active_institution_id", "dev_branch_001");
            localStorage.setItem("active_institution_name", formData.institutionName || "Development Branch");
            router.push("/institution/dashboard");
        }, 300); // Small artificial delay for UI transition smoothness
    };

    return (
        <div className="min-h-[100dvh] bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* MD3 Abstract Decorative Background Ambient Lighting Layer */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary-100/40 dark:bg-primary-900/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-secondary-100/40 dark:bg-secondary-900/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                className="w-full max-w-md mx-auto relative z-10"
            >
                {/* Massive MD3 Elevated Container Form Base */}
                <div className="bg-surface-container-lowest dark:bg-surface-container rounded-[36px] shadow-lg border border-black/5 dark:border-white/5 overflow-hidden">
                    <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6">
                            <Landmark className="w-10 h-10 text-primary-700 dark:text-primary-300" strokeWidth={1.5} />
                        </div>
                        <h2 className="mt-2 text-[28px] font-normal tracking-tight text-foreground">
                            Institution Portal
                        </h2>
                        <p className="mt-2 text-[15px] font-medium text-foreground/60 tracking-wide leading-snug">
                            Secure local access ensuring structural isolation for branch operations.
                        </p>
                    </div>

                    <form className="px-8 pb-10 space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-4 bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300 rounded-[20px] text-sm font-medium tracking-wide text-center"
                            >
                                {error}
                            </motion.div>
                        )}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold uppercase tracking-wider text-foreground/50 ml-2">Parent Organization</label>
                                <Input
                                    required
                                    placeholder="e.g. Springfield Ed Group"
                                    icon={<Building className="w-5 h-5 text-current" />}
                                    value={formData.parentCompany}
                                    onChange={(e) => setFormData({ ...formData, parentCompany: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold uppercase tracking-wider text-foreground/50 ml-2">Local Branch Profile</label>
                                <Input
                                    required
                                    placeholder="e.g. Springfield High School"
                                    icon={<Building2 className="w-5 h-5 text-current" />}
                                    value={formData.institutionName}
                                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[12px] font-bold uppercase tracking-wider text-foreground/50 ml-2">Secure System Token</label>
                                <Input
                                    required
                                    type="password"
                                    placeholder="Branch authentication code"
                                    icon={<KeyRound className="w-5 h-5 text-current" />}
                                    value={formData.systemCode}
                                    onChange={(e) => setFormData({ ...formData, systemCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full h-14 rounded-full text-[17px] font-medium tracking-wide shadow-sm"
                        >
                            {!isLoading && (
                                <>
                                    Verify Local Access
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
