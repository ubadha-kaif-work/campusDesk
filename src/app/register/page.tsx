"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, KeyRound, Mail, Loader2, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building, Briefcase, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { db } from "@/lib/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterWizard() {
    const router = useRouter();

    // Wizard Navigation State
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    // Registration Form State
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // SaaS Modules State
    const [hasParentCompany, setHasParentCompany] = useState(false);
    const [activeModules, setActiveModules] = useState<string[]>(['academics']);

    const toggleModule = (mod: string) => {
        if (mod === 'academics') return; // Core mechanics explicitly cannot be disabled
        setActiveModules(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
    };

    // Wizard Movement Logic
    const handleNext = () => {
        setDirection(1);
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    // Firebase Submission (Only triggers on Step 4)
    const handleRegister = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "companies", user.uid), {
                companyName,
                email,
                hasParentCompany,
                activeModules,
                createdAt: new Date().toISOString()
            });

            if (hasParentCompany) {
                router.push('/parent-company');
            } else {
                router.push('/institution/dashboard');
            }
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || 'Failed to create organization. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Dynamic Pricing Computation
    const calculateTotal = () => {
        let total = 49; // Platform base cost
        if (hasParentCompany) total += 99;
        if (activeModules.includes('hostel')) total += 29;
        if (activeModules.includes('canteen')) total += 19;
        return total;
    };

    // Framer Motion Animation Variants natively establishing smooth lateral sliding
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 80 : -80,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 80 : -80,
            opacity: 0
        })
    };

    return (
        <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:py-12 sm:px-8 bg-surface-container-lowest dark:bg-background overflow-y-auto">
            <div className="w-full max-w-2xl bg-white dark:bg-surface border border-black/5 dark:border-white/5 shadow-2xl rounded-[36px] sm:rounded-[48px] relative min-h-[500px] flex flex-col">

                {/* Global Wizard Top-Bar tracking Step Logic */}
                <div className="flex items-center justify-between px-8 sm:px-12 pt-8 z-20">
                    <button
                        onClick={handleBack}
                        disabled={step === 1 || isLoading}
                        className={`p-3 rounded-full transition-colors flex shrink-0 ${step === 1 ? 'opacity-0 cursor-default' : 'hover:bg-black/5 dark:hover:bg-white/5 text-foreground/50 hover:text-foreground'}`}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-primary-600 dark:bg-primary-500' : step > s ? 'w-4 bg-primary-300 dark:bg-primary-800' : 'w-2 bg-black/10 dark:bg-white/10'}`} />
                        ))}
                    </div>
                </div>

                <div className="relative flex-1 flex flex-col pt-4 overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="wait">

                        {/* STEP 1: WELCOME SCREEN */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex-1 w-full px-6 sm:px-16 flex flex-col justify-center items-center text-center pb-12 sm:pb-20"
                            >
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-8 border-[6px] border-white dark:border-surface shadow-xl">
                                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground mb-4 leading-tight">
                                    Build your <br className="hidden sm:block" /> Digital Campus.
                                </h1>
                                <p className="text-lg text-foreground/60 max-w-sm mb-12">
                                    A multi-tenant ecosystem designed entirely around exactly what you need. Nothing more, nothing less.
                                </p>
                                <Button onClick={handleNext} className="h-14 px-10 text-[17px] tracking-wide rounded-full font-bold shadow-md w-full sm:w-auto">
                                    Begin Setup <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <p className="mt-8 text-sm font-medium text-foreground/40">
                                    Already set up? <Link href="/login" className="text-primary-600 dark:text-primary-400 hover:underline">Log in</Link>
                                </p>
                            </motion.div>
                        )}


                        {/* STEP 2: MODULE SELECTION */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex-1 w-full px-6 sm:px-16 flex flex-col pb-12 sm:pb-20"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-medium tracking-tight text-foreground">Select your SaaS Modules</h2>
                                    <p className="text-foreground/60 mt-1 font-medium">Toggle exactly which features you require. Pricing adjusts dynamically.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* Parent Multi-Branch Toggle */}
                                    <div
                                        onClick={() => setHasParentCompany(!hasParentCompany)}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[24px] cursor-pointer transition-all border-2 ${hasParentCompany ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500/50 shadow-sm' : 'bg-surface-container-low border-transparent hover:bg-surface-container'}`}
                                    >
                                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shrink-0 shadow-sm">
                                                <Briefcase className={`w-6 h-6 ${hasParentCompany ? 'text-primary-600 dark:text-primary-400' : 'text-foreground/50'}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground text-[16px] flex items-center gap-2">
                                                    Multi-Branch Fleet <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[11px] font-bold tracking-widest uppercase text-foreground/50">Enterprise</span>
                                                </p>
                                                <p className="text-sm text-foreground/60 mt-0.5">Enables the Parent Company global tracking module allowing you to aggregate dozens of schools instantly.</p>
                                            </div>
                                        </div>
                                        <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-colors ${hasParentCompany ? 'bg-primary-600 text-white dark:bg-primary-500' : 'border-2 border-foreground/20'}`}>
                                            {hasParentCompany && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>

                                    {/* Hostel Toggle */}
                                    <div
                                        onClick={() => toggleModule('hostel')}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[24px] cursor-pointer transition-all border-2 ${activeModules.includes('hostel') ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500/50 shadow-sm' : 'bg-surface-container-low border-transparent hover:bg-surface-container'}`}
                                    >
                                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shrink-0 shadow-sm">
                                                <Building className={`w-6 h-6 ${activeModules.includes('hostel') ? 'text-primary-600 dark:text-primary-400' : 'text-foreground/50'}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground text-[16px]">Hostel Management</p>
                                                <p className="text-sm text-foreground/60 mt-0.5">Allocate dorms, manage rooms, and track localized student residential attendance natively.</p>
                                            </div>
                                        </div>
                                        <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-colors ${activeModules.includes('hostel') ? 'bg-primary-600 text-white dark:bg-primary-500' : 'border-2 border-foreground/20'}`}>
                                            {activeModules.includes('hostel') && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>

                                    {/* Canteen Toggle */}
                                    <div
                                        onClick={() => toggleModule('canteen')}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[24px] cursor-pointer transition-all border-2 ${activeModules.includes('canteen') ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500/50 shadow-sm' : 'bg-surface-container-low border-transparent hover:bg-surface-container'}`}
                                    >
                                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center shrink-0 shadow-sm">
                                                <CreditCard className={`w-6 h-6 ${activeModules.includes('canteen') ? 'text-primary-600 dark:text-primary-400' : 'text-foreground/50'}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground text-[16px]">Canteen & Store POS</p>
                                                <p className="text-sm text-foreground/60 mt-0.5">A complete Point-of-Sale tracking lunch distributions, stationary inventory bounds, and local commerce.</p>
                                            </div>
                                        </div>
                                        <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center transition-colors ${activeModules.includes('canteen') ? 'bg-primary-600 text-white dark:bg-primary-500' : 'border-2 border-foreground/20'}`}>
                                            {activeModules.includes('canteen') && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button onClick={handleNext} className="h-14 px-8 tracking-wide rounded-full font-bold shadow-md w-full sm:w-auto">
                                        Pricing Overview <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}


                        {/* STEP 3: PRICING REVIEW */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex-1 w-full px-6 sm:px-16 flex flex-col pb-12 sm:pb-20"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-medium tracking-tight text-foreground">Transparent Billing</h2>
                                    <p className="text-foreground/60 mt-1 font-medium">Billed monthly based purely on exactly what you explicitly configured.</p>
                                </div>

                                <div className="bg-surface-container-lowest dark:bg-surface-container border border-black/5 dark:border-white/5 shadow-sm rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/5">
                                        <p className="font-medium text-foreground/70">Core Base Platform (Academics & Operations)</p>
                                        <p className="font-medium text-foreground">$49.00</p>
                                    </div>

                                    {hasParentCompany && (
                                        <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/5">
                                            <p className="font-medium text-foreground/70 flex items-center gap-2">Multi-Branch Fleet <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Add-on</span></p>
                                            <p className="font-medium text-foreground">$99.00</p>
                                        </div>
                                    )}

                                    {activeModules.includes('hostel') && (
                                        <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/5">
                                            <p className="font-medium text-foreground/70 flex items-center gap-2">Hostel Management <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Add-on</span></p>
                                            <p className="font-medium text-foreground">$29.00</p>
                                        </div>
                                    )}

                                    {activeModules.includes('canteen') && (
                                        <div className="flex justify-between items-center pb-4 border-b border-black/5 dark:border-white/5">
                                            <p className="font-medium text-foreground/70 flex items-center gap-2">Canteen & Store POS <span className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">Add-on</span></p>
                                            <p className="font-medium text-foreground">$19.00</p>
                                        </div>
                                    )}

                                    <div className="pt-2 flex justify-between items-end">
                                        <p className="text-sm font-bold tracking-widest uppercase text-foreground/50">Total Monthly</p>
                                        <p className="text-4xl sm:text-5xl font-normal tracking-tight text-primary-600 dark:text-primary-400">
                                            ${calculateTotal()}<span className="text-xl text-foreground/40 font-medium">/mo</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button onClick={handleNext} className="h-14 px-10 tracking-wide rounded-full font-bold shadow-md w-full sm:w-auto">
                                        Continue to Account Setup <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}


                        {/* STEP 4: REGISTRATION EXECUTION */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0 px-8 sm:px-16 flex flex-col pb-24 overflow-y-auto no-scrollbar"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-medium tracking-tight text-foreground">Setup Administrator</h2>
                                    <p className="text-foreground/60 mt-1 font-medium">Configure your Master Global keys to immediately begin your free trial natively.</p>
                                </div>

                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-medium border border-red-200 dark:border-red-900/50 flex flex-col items-center text-center">
                                        <ShieldCheck className="w-6 h-6 mb-1 opacity-70" />
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleRegister} className="flex flex-col gap-6">
                                    <Input
                                        label="Organization/Company Name"
                                        placeholder="e.g. Springfield Education Group"
                                        icon={<Building2 className="w-5 h-5" />}
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />

                                    <Input
                                        label="Master Admin Email"
                                        type="email"
                                        placeholder="founder@springfield.edu"
                                        icon={<Mail className="w-5 h-5" />}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />

                                    <Input
                                        label="Master Key Password"
                                        type="password"
                                        placeholder="••••••••"
                                        icon={<KeyRound className="w-5 h-5" />}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />

                                    <div className="mt-4 flex justify-end">
                                        <Button type="submit" isLoading={isLoading} className="h-14 px-10 tracking-wide rounded-full font-bold shadow-md w-full">
                                            Complete Organization Launch <Sparkles className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
