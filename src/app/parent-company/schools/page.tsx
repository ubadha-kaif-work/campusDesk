"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit2, MapPin, Users, Building, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SchoolsPage() {
    const [schools, setSchools] = useState([
        { id: "1", name: "Springfield High School", code: "SHS-01", location: "Springfield", principal: "Seymour Skinner", students: 1205 },
        { id: "2", name: "Shelbyville Elementary", code: "SHE-02", location: "Shelbyville", principal: "Chalmers", students: 840 },
        { id: "3", name: "Oakridge Academy", code: "OAK-03", location: "Oakridge", principal: "Eleanor Vance", students: 650 },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", code: "", location: "", principal: "", students: 0 });

    const handleOpenAdd = () => {
        setFormData({ name: "", code: "", location: "", principal: "", students: 0 });
        setEditingId(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (school: any) => {
        setFormData({ ...school });
        setEditingId(school.id);
        setIsFormOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setSchools(schools.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
        } else {
            setSchools([...schools, { ...formData, id: Date.now().toString() }]);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground">
                        School Branches
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Manage all your affiliated institutions.</p>
                </div>
                <Button onClick={handleOpenAdd} className="shrink-0">
                    <Plus className="w-5 h-5 text-current" /> Add Branch
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map(school => (
                    <motion.div key={school.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <Card className="flex flex-col p-6 shadow-sm relative group">
                            <button
                                onClick={() => handleOpenEdit(school)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-surface-container opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-100 text-primary-600 dark:hover:bg-primary-900/40"
                            >
                                <Edit2 className="w-4 h-4 text-current" />
                            </button>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                    <Building className="w-6 h-6 text-current" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-lg text-foreground leading-tight">{school.name}</h3>
                                    <p className="text-sm font-medium text-gray-500">{school.code}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <MapPin className="w-4 h-4 text-current opacity-70" />
                                    <span>{school.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Users className="w-4 h-4 text-current opacity-70" />
                                    <span>{school.students.toLocaleString()} Students</span>
                                </div>
                                <div className="pt-3 mt-3 border-t border-black/5 dark:border-white/5">
                                    <p className="text-sm text-gray-500">
                                        Principal: <span className="font-medium text-foreground">{school.principal}</span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsFormOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-surface rounded-[28px] shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-black/5 dark:border-white/5 bg-surface-container/50">
                                <h2 className="text-2xl font-medium text-foreground">{editingId ? "Edit Branch" : "Add New Branch"}</h2>
                                <button onClick={() => setIsFormOpen(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-foreground">
                                    <X className="w-5 h-5 text-current" />
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="School Name"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        label="Branch Code"
                                        required
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    />
                                </div>
                                <Input
                                    label="Location"
                                    required
                                    icon={<MapPin className="w-5 h-5 text-current" />}
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Principal Name"
                                        required
                                        value={formData.principal}
                                        onChange={e => setFormData({ ...formData, principal: e.target.value })}
                                    />
                                    <Input
                                        label="Total Students"
                                        type="number"
                                        required
                                        value={formData.students}
                                        onChange={e => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                    <Button type="submit">{editingId ? "Save Changes" : "Create Branch"}</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
