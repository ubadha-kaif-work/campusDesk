"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

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
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem("active_institution_id", "dev_branch_001");
            localStorage.setItem("active_institution_name", formData.institutionName || "Development Branch");
            router.push("/institution/dashboard");
        }, 400);
    };

    return (
        <div className="min-h-[100dvh] bg-surface flex flex-col md:flex-row">

            {/* Left Minimalist Branding Panel */}
            <div className="flex-1 bg-surface-container-lowest hidden md:flex flex-col justify-between p-12 border-r border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-xl font-medium tracking-tight text-foreground">campusDesk</span>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-normal tracking-tight text-foreground leading-[1.1]">
                        Streamline your branch operations.
                    </h1>
                    <p className="mt-6 text-lg text-foreground/60 leading-relaxed font-medium">
                        Securely authenticate into your localized institution portal to access Role-Based staff management, academic tracking, and real-time attendance streams.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-foreground/40 font-medium text-sm">
                    <ShieldCheck className="w-4 h-4" /> Enterprise Grade RBAC Security
                </div>

                {/* Massive Watermark Icon */}
                <Building2 className="absolute -bottom-24 -left-24 w-[500px] h-[500px] text-black/[0.02] dark:text-white/[0.02] pointer-events-none" />
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 xl:px-32 bg-surface">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="md:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-xl font-medium tracking-tight text-foreground">campusDesk</span>
                    </div>

                    <h2 className="text-3xl font-normal tracking-tight text-foreground mb-2">
                        Branch Login
                    </h2>
                    <p className="text-foreground/60 text-[15px] font-medium tracking-wide mb-10">
                        Enter your secure organizational credentials.
                    </p>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-4 bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Parent Organization</label>
                                <input
                                    required
                                    placeholder="e.g. Springfield Education"
                                    className="w-full h-14 bg-surface-container-highest dark:bg-surface-container rounded-2xl px-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all"
                                    value={formData.parentCompany}
                                    onChange={(e) => setFormData({ ...formData, parentCompany: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Branch Name</label>
                                <input
                                    required
                                    placeholder="e.g. Springfield High"
                                    className="w-full h-14 bg-surface-container-highest dark:bg-surface-container rounded-2xl px-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all"
                                    value={formData.institutionName}
                                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1 flex justify-between">
                                    <span>System Code</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="Enter your security token"
                                        className="w-full h-14 bg-surface-container-highest dark:bg-surface-container rounded-2xl pl-11 pr-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all"
                                        value={formData.systemCode}
                                        onChange={(e) => setFormData({ ...formData, systemCode: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-primary text-on-primary rounded-full text-[16px] font-medium tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Log In to Branch <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
