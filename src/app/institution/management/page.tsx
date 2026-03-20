"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, ShieldAlert, Plus, X, Search, BadgeCheck, Loader2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Firebase Integration
import { db } from "@/lib/firebase/config";
import { collection, query, getDocs, addDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";

interface Employee {
    id: string;
    name: string;
    role: string;
    code: string;
    status: "Active" | "Inactive";
}

export default function ManagementPage() {
    const [branchName, setBranchName] = useState("");
    const [branchId, setBranchId] = useState("");

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Form State
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        role: "Teacher"
    });

    // Helper function targeting the deeply nested branch users explicitly
    const getUsersCollection = (bId: string) => {
        // We use a mock DEV_COMPANY ID since login was bypassed.
        return collection(db, "companies", "DEV_COMPANY", "branches", bId, "users");
    };

    const fetchEmployees = async (bId: string) => {
        try {
            const usersRef = getUsersCollection(bId);
            const snapshot = await getDocs(query(usersRef));
            const fetched = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Employee[];
            setEmployees(fetched);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        const name = localStorage.getItem("active_institution_name");
        const bId = localStorage.getItem("active_institution_id");
        if (name) setBranchName(name);
        if (bId) {
            setBranchId(bId);
            fetchEmployees(bId);
        } else {
            setIsLoadingData(false); // Failsafe if completely unauthenticated
        }
    }, []);

    const handleAddEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!branchId) return;

        setIsSaving(true);
        try {
            const usersRef = getUsersCollection(branchId);
            const newEmp = {
                name: formData.name,
                code: formData.code,
                role: formData.role,
                status: "Active",
                createdAt: Timestamp.now()
            };
            const docRef = await addDoc(usersRef, newEmp);

            setEmployees(prev => [{ id: docRef.id, ...newEmp } as Employee, ...prev]);
            setFormData({ name: "", code: "", role: "Teacher" });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Error adding employee:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteEmployee = async (employeeId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!branchId) return;

        setIsDeleting(employeeId);
        try {
            const userDocRef = doc(db, "companies", "DEV_COMPANY", "branches", branchId, "users", employeeId);
            await deleteDoc(userDocRef);
            setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
        } catch (error) {
            console.error("Error deleting employee:", error);
        } finally {
            setIsDeleting(null);
        }
    };

    const getRoleColor = (role: string) => {
        if (role?.toLowerCase().includes("admin") || role?.toLowerCase().includes("hr")) return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800";
        if (role?.toLowerCase().includes("fee") || role?.toLowerCase().includes("accountant")) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
        if (role?.toLowerCase().includes("teacher")) return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800";
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-32 max-w-6xl mx-auto px-4">

            {/* Header Structure */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-normal tracking-tight text-foreground">
                        Staff Management
                    </h1>
                    <p className="text-foreground/70 text-[17px] font-medium mt-1">
                        Control RBAC assignments for {branchName || "your branch"}.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="shrink-0 h-12 px-6 rounded-full text-[15px] font-bold tracking-wide shadow-sm"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Employee
                </Button>
            </div>

            {/* Quick Metrics (Visual Flairs) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: "Total Staff", count: employees.length, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
                    { title: "Academic Faculty", count: employees.filter(e => e.role?.toLowerCase() === "teacher").length, icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                    { title: "Local Admins", count: employees.filter(e => e.role?.toLowerCase().includes("admin")).length, icon: ShieldAlert, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" }
                ].map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="py-5 px-6 bg-surface-container-low rounded-[28px] flex items-center gap-5 hover:bg-surface-container transition-colors cursor-pointer border border-black/5 dark:border-white/5"
                    >
                        <div className={`w-14 h-14 rounded-full flex shrink-0 items-center justify-center ${item.bg}`}>
                            <item.icon className={`w-7 h-7 ${item.color}`} strokeWidth={1.5} />
                        </div>
                        <div>
                            {isLoadingData ? (
                                <Loader2 className="w-6 h-6 animate-spin text-foreground/40 mb-1" />
                            ) : (
                                <h3 className="text-2xl font-normal tracking-tight text-foreground leading-none">{item.count}</h3>
                            )}
                            <p className="text-foreground/70 font-medium tracking-wide mt-1 text-[13px] uppercase">{item.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Employee Directory List */}
            <div className="bg-surface-container-lowest dark:bg-surface-container rounded-[32px] shadow-sm border border-black/5 dark:border-white/5 overflow-hidden mt-6">
                <div className="p-4 sm:p-6 border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-container-lowest dark:bg-surface-container sticky top-0 z-10">
                    <h2 className="text-[20px] font-medium text-foreground px-2">Role Directory</h2>
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, role, or code..."
                            className="w-full pl-11 pr-4 py-3 bg-surface-container-high rounded-full text-sm font-medium focus:outline-none focus:ring-2 ring-primary-500/20 text-foreground placeholder-foreground/50 transition-all border border-transparent focus:border-black/5 dark:focus:border-white/10"
                        />
                    </div>
                </div>

                <div className="divide-y divide-black/5 dark:divide-white/5 min-h-[300px]">
                    {isLoadingData ? (
                        <div className="h-full w-full flex flex-col items-center justify-center p-20 opacity-50">
                            <Loader2 className="w-10 h-10 animate-spin text-primary-600 mb-4" />
                            <p className="font-medium tracking-wide">Syncing Firebase roles...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredEmployees.map((emp) => (
                                <motion.div
                                    key={emp.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center justify-between p-4 sm:p-6 hover:bg-surface-container/50 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-lg border border-primary-200 dark:border-primary-800 shadow-sm shrink-0">
                                            {emp.name?.charAt(0) || "?"}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[16px] font-medium text-foreground">{emp.name}</h3>
                                                {emp.role?.toLowerCase().includes("admin") && <BadgeCheck className="w-4 h-4 text-primary-500" />}
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[13px] font-medium text-foreground/50 font-mono tracking-wide">{emp.code}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`hidden sm:inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${getRoleColor(emp.role)}`}>
                                            {emp.role}
                                        </span>
                                        <button
                                            disabled={isDeleting === emp.id}
                                            onClick={(e) => handleDeleteEmployee(emp.id, e)}
                                            className="p-2.5 text-error-600/60 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                            title="Revoke Role Access & Delete Employee"
                                        >
                                            {isDeleting === emp.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}

                    {!isLoadingData && filteredEmployees.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center">
                            <Users className="w-12 h-12 text-foreground/20 mb-3" />
                            <p className="text-foreground/60 font-medium tracking-wide">No localized employees strictly match your search resolution.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MD3 Ultra-Modern Dialog / Bottom-Sheet Hybrid */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/40 dark:bg-black/60"
                            onClick={() => !isSaving && setIsAddModalOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-lg bg-background rounded-t-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Mobile Pull-Tab Indicator */}
                            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
                                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full" />
                            </div>

                            <div className="px-6 sm:px-8 pt-4 sm:pt-8 pb-2 flex justify-between items-center bg-background z-10">
                                <div>
                                    <h2 className="text-[26px] font-normal tracking-tight text-foreground">Add Employee</h2>
                                    <p className="text-[14px] font-medium text-foreground/60 mt-0.5">Define new localized staff permissions.</p>
                                </div>
                                <button disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="hidden sm:flex p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground/50 hover:text-foreground">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddEmployee} className="px-6 sm:px-8 pb-8 pt-4 overflow-y-auto w-full no-scrollbar flex flex-col gap-5 bg-background">
                                <div className="flex flex-col gap-1.5 focus-within:gap-2 transition-all">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 ml-1 opacity-80">Full Name</label>
                                    <input
                                        required
                                        disabled={isSaving}
                                        placeholder="e.g. Seymour Skinner"
                                        className="w-full h-14 bg-surface-container-highest dark:bg-surface-container-high rounded-2xl px-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5 focus-within:gap-2 transition-all">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 ml-1 opacity-80">System Code</label>
                                    <input
                                        required
                                        disabled={isSaving}
                                        placeholder="e.g. EMP-105"
                                        className="w-full h-14 bg-surface-container-highest dark:bg-surface-container-high rounded-2xl px-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all font-mono"
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5 focus-within:gap-2 transition-all">
                                    <label className="text-[12px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 ml-1 opacity-80">Role Tag Array</label>
                                    <input
                                        required
                                        disabled={isSaving}
                                        placeholder="e.g. Fee Manager"
                                        className="w-full h-14 bg-surface-container-highest dark:bg-surface-container-high rounded-2xl px-4 text-[16px] text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 border border-transparent transition-all"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>

                                <div className="pt-6 mt-2 flex justify-between items-center gap-4">
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="w-1/3 py-3.5 rounded-full text-[15px] font-bold tracking-wide text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 py-3.5 bg-primary text-on-primary rounded-full text-[15px] font-bold tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Employee"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
