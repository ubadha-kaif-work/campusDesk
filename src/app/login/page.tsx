"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, User, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
    const [institutionCode, setInstitutionCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call for login
        setTimeout(() => {
            setIsLoading(false);
            // In reality, this would integrate with Firebase Auth and redirect
            console.log('Logging in with', { institutionCode, username, password });
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 overflow-hidden relative">

            {/* Decorative floating orbs */}
            <motion.div
                animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -z-10"
            />

            <motion.div
                animate={{
                    x: [-20, 20, -20],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px] -z-10"
            />

            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="mx-auto bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/20 mb-4 backdrop-blur-md shadow-2xl">
                        <Building2 className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
                        Welcome to CampusDesk
                    </h1>
                    <p className="text-foreground/70">
                        Enter your institution details to access the ERP.
                    </p>
                </motion.div>

                <Card animate className="w-full">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        <Input
                            label="Institution Code"
                            placeholder="e.g. SCHOOL-123"
                            icon={<Building2 className="w-5 h-5" />}
                            value={institutionCode}
                            onChange={(e) => setInstitutionCode(e.target.value)}
                            required
                        />

                        <Input
                            label="Username"
                            placeholder="Enter your username or email"
                            icon={<User className="w-5 h-5" />}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                icon={<KeyRound className="w-5 h-5" />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="w-full flex justify-end">
                                <a href="#" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            isLoading={isLoading}
                        >
                            Sign In
                            {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                        </Button>

                    </form>
                </Card>
            </div>
        </div>
    );
}
