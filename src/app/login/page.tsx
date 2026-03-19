"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, User, KeyRound } from 'lucide-react';
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
        setTimeout(() => {
            setIsLoading(false);
            console.log('Logging in with', { institutionCode, username, password });
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8"
                >
                    <div className="mx-auto bg-surface-container w-20 h-20 rounded-[28px] flex items-center justify-center mb-6">
                        <Building2 className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Enter your institution details to continue
                    </p>
                </motion.div>

                <Card animate className="w-full shadow-sm">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        <Input
                            label="Institution Code"
                            placeholder="e.g. SCHOOL-123"
                            icon={<Building2 className="w-5 h-5 text-current" />}
                            value={institutionCode}
                            onChange={(e) => setInstitutionCode(e.target.value)}
                            required
                        />

                        <Input
                            label="Username"
                            placeholder="Enter your username or email"
                            icon={<User className="w-5 h-5 text-current" />}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                icon={<KeyRound className="w-5 h-5 text-current" />}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="w-full flex justify-end pt-1">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 px-2 py-1 rounded-full hover:bg-primary-50 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            variant="primary"
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>

                    </form>
                </Card>
            </div>
        </div>
    );
}
