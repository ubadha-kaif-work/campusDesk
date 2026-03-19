"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, KeyRound, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { db } from "@/lib/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const auth = getAuth();

            // 1. Establish the native User Profile
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Build Document Reference mapped specifically tracking Company properties
            await setDoc(doc(db, "companies", user.uid), {
                companyName,
                email,
                createdAt: new Date().toISOString()
            });

            // 3. Kick them cleanly into the Dashboard application flow naturally tracking auth cookies
            router.push('/parent-company');
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || 'Failed to create organization. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md my-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8"
                >
                    <div className="mx-auto bg-primary-100 dark:bg-primary-900/30 w-20 h-20 rounded-[28px] flex items-center justify-center mb-6 border-4 border-surface shadow-sm hover:scale-105 transition-transform">
                        <Building2 className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
                        Create Organization
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Setup your administrator account and workspace
                    </p>
                </motion.div>

                <Card animate className="w-full shadow-sm relative overflow-visible">
                    {/* Error Banner Injection */}
                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-14 left-0 right-0 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-[16px] p-3 text-sm text-center font-bold tracking-tight shadow-md z-10">
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleRegister} className="flex flex-col gap-6 p-2">

                        <div>
                            <div className="flex items-center gap-3 pb-3 border-b border-black/5 dark:border-white/5 mb-4">
                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold shadow-sm">1</div>
                                <h3 className="font-semibold text-foreground tracking-tight">Organization Profile</h3>
                            </div>

                            <Input
                                label="Company Name"
                                placeholder="e.g. Springfield Education Group"
                                icon={<Building2 className="w-5 h-5 text-current" />}
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-3 pb-3 border-b border-black/5 dark:border-white/5 pt-2 mb-4">
                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-bold shadow-sm">2</div>
                                <h3 className="font-semibold text-foreground tracking-tight">Administrator Gateway</h3>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Secure Email Address"
                                    type="email"
                                    placeholder="john@springfield.edu"
                                    icon={<Mail className="w-5 h-5 text-current" />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Input
                                    label="Master Password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={<KeyRound className="w-5 h-5 text-current" />}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-2 py-6 text-lg tracking-wide rounded-[20px]"
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-current" /> : "Complete Registration"}
                        </Button>

                    </form>
                </Card>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 text-center text-sm font-medium text-gray-500">
                    Already have an established Organization?{' '}
                    <Link href="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 hover:underline transition-colors block mt-1 font-bold">
                        Navigate to Workspace Login
                    </Link>
                </motion.p>
            </div>
        </div>
    );
}
