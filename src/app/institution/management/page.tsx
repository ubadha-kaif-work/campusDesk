"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, ShieldAlert, Plus, X, Search, MoreVertical, BadgeCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Employee {
    id: string;
    name: string;
    role: string;
    code: string;
    status: "Active" | "Inactive";
}

export default function ManagementPage() {
    const [branchName, setBranchName] = useState("");

    // Using explicit React state as a rapid-prototype proxy before wiring the strict Firebase endpoints natively
    const [employees, setEmployees] = useState<Employee[]>([
        { id: "1", name: "Seymour Skinner", role: "LocalAdmin", code: "EMP-001", status: "Active" },
        { id: "2", name: "Edna Krabappel", role: "Teacher", code: "EMP-042", status: "Active" },
        { id: "3", name: "Groundskeeper Willie", role: "Inventory", code: "EMP-099", status: "Active" },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Form State
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        role: "Teacher"
    });

    const availableRoles = [
        "LocalAdmin", "Teacher", "Fee Manager", "Accountant", "Librarian", "Hostel Warden", "Inventory", "HR"
    ];

    useEffect(() => {
        const name = localStorage.getItem("active_institution_name");
        if (name) setBranchName(name);
    }, []);

    const handleAddEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulating network delay for Firebase write
        setTimeout(() => {
            const newEmployee: Employee = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                code: formData.code,
                role: formData.role,
                status: "Active"
            };

            setEmployees(prev => [newEmployee, ...prev]);
            setFormData({ name: "", code: "", role: "Teacher" });
            setIsSaving(false);
            setIsAddModalOpen(false);
        }, 600);
    };

    const getRoleColor = (role: string) => {
        if (role === "LocalAdmin" || role === "HR") return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800";
        if (role === "Fee Manager" || role === "Accountant") return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
        if (role === "Teacher") return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800";
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800";
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.code.toLowerCase().includes(searchQuery.toLowerCase())
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
                    { title: "Academic Faculty", count: employees.filter(e => e.role === "Teacher").length, icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
                    { title: "Local Admins", count: employees.filter(e => e.role === "LocalAdmin").length, icon: ShieldAlert, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" }
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
                            <h3 className="text-2xl font-normal tracking-tight text-foreground leading-none">{item.count}</h3>
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

                <div className="divide-y divide-black/5 dark:divide-white/5">
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
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[16px] font-medium text-foreground">{emp.name}</h3>
                                            {emp.role === "LocalAdmin" && <BadgeCheck className="w-4 h-4 text-primary-500" />}
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
                                    <button className="p-2 text-foreground/40 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredEmployees.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center">
                            <Users className="w-12 h-12 text-foreground/20 mb-3" />
                            <p className="text-foreground/60 font-medium tracking-wide">No localized employees strictly match your search resolution.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MD3 Massive Dialog specific to Role Assignment Operations */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => !isSaving && setIsAddModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-surface-container-lowest dark:bg-surface-container rounded-[36px] shadow-2xl overflow-hidden"
                        >
                            <div className="px-8 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-surface-container-lowest dark:bg-surface-container z-10 border-b border-black/5 dark:border-white/5">
                                <h2 className="text-[24px] font-normal tracking-tight text-foreground">Add Employee Role</h2>
                                <button disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground/50 hover:text-foreground">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddEmployee} className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <Input
                                        label="Employee Name"
                                        required
                                        disabled={isSaving}
                                        placeholder="Full legal name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        label="System Employee Code"
                                        required
                                        disabled={isSaving}
                                        placeholder="e.g. EMP-105"
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    />

                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold uppercase tracking-wider text-foreground/50 ml-2">Assigned RBAC Role</label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableRoles.map((role) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    disabled={isSaving}
                                                    onClick={() => setFormData({ ...formData, role: role })}
                                                    className={`px-4 py-2 rounded-xl text-[13px] font-bold tracking-wide transition-all border ${formData.role === role
                                                            ? `${getRoleColor(role)} shadow-sm`
                                                            : "bg-surface-container text-foreground/70 hover:text-foreground border-transparent hover:border-black/10 dark:hover:border-white/10"
                                                        }`}
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 mt-2 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
                                    <Button type="submit" isLoading={isSaving} className="w-full h-14 rounded-full text-[16px] font-bold tracking-wide">
                                        Assign Employee Roles
                                    </Button>
                                    <Button type="button" variant="secondary" disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="w-full bg-transparent hover:bg-black/5 text-foreground/70 h-14 rounded-full font-bold">
                                        Cancel Protocol
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
