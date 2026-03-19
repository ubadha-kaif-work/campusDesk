"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Shield, KeyRound, Mail, LogOut, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground">
                        Profile Settings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Manage your account preferences securely.</p>
                </div>
                <Button className="shrink-0 group bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50">
                    <LogOut className="w-5 h-5 text-current" /> Sign Out
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Account Details Form Block */}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
                    <Card className="p-8 shadow-sm border border-black/5 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                <Shield className="w-6 h-6 text-current" />
                            </div>
                            <h2 className="text-2xl font-medium">Personal Information</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" defaultValue="Admin User" />
                                <Input label="Role" defaultValue="Super Administrator" disabled />
                            </div>
                            <Input label="Email Address" icon={<Mail className="w-5 h-5 text-current" />} defaultValue="admin@campusdesk.edu" />

                            <div className="pt-4 flex justify-end">
                                <Button className="pl-3 pr-5">
                                    <CheckCircle2 className="w-5 h-5 text-current" /> Save Updates
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 shadow-sm border border-black/5 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl">
                                <KeyRound className="w-6 h-6 text-current" />
                            </div>
                            <h2 className="text-2xl font-medium">Security & Password</h2>
                        </div>
                        <div className="space-y-6">
                            <Input label="Current Password" type="password" placeholder="••••••••" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="New Password" type="password" placeholder="••••••••" />
                                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button variant="secondary">Change Password</Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Aesthetic Profile Snapshot Widget */}
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-8 flex flex-col items-center text-center shadow-sm border border-black/5 dark:border-white/10">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container flex items-center justify-center text-5xl font-bold text-gray-400 mb-6 border-4 border-surface shadow-md">
                            A
                        </div>
                        <h3 className="text-xl font-medium text-foreground mb-1">Admin User</h3>
                        <p className="text-sm font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40 px-3 py-1 rounded-full mb-6">System Owner</p>

                        <div className="w-full text-left space-y-4 pt-6 border-t border-black/5 dark:border-white/5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Account Created</p>
                                <p className="text-sm font-medium">March 15, 2026</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Last Login</p>
                                <p className="text-sm font-medium">Today at 9:42 AM</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
