"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit2, MapPin, Users, Landmark, X, Loader2, BookOpen, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

interface Institution {
    id: string;
    name: string;
    code: string;
    location: string;
    students: number;
    staffCount?: number;
    departmentCount?: number;
    type?: "School" | "College" | "University";
}

export default function InstitutionsPage() {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Institution, 'id'>>({
        name: "", code: "", location: "",
        students: 0, staffCount: 0, departmentCount: 0, type: "School"
    });

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const fetchInstitutions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "schools"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Institution[];
            setInstitutions(data);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAdd = () => {
        setFormData({
            name: "", code: "", location: "",
            students: 0, staffCount: 0, departmentCount: 0, type: "School"
        });
        setEditingId(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (inst: Institution) => {
        setFormData({
            name: inst.name, code: inst.code, location: inst.location,
            students: inst.students, staffCount: inst.staffCount || 0, departmentCount: inst.departmentCount || 0, type: inst.type || "School"
        });
        setEditingId(inst.id);
        setIsFormOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            if (editingId) {
                const docRef = doc(db, "schools", editingId);
                await updateDoc(docRef, formData);
                setInstitutions(institutions.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
            } else {
                const docRef = await addDoc(collection(db, "schools"), formData);
                setInstitutions([...institutions, { ...formData, id: docRef.id }]);
            }
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error saving institution:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper functions for conditionally rendered terminology
    const getStaffLabel = (type?: string) => type === 'School' ? 'Teachers' : 'Professors';
    const getDeptLabel = (type?: string) => type === 'School' ? 'Departments' : 'Faculties';

    const getTypeStyles = (type?: string) => {
        switch (type) {
            case 'University': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400';
            case 'College': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
            default: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400';
        }
    };

    return (
        <div className="space-y-8 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                <div>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground">
                        Institutions
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">Manage all your affiliated branches and campuses.</p>
                </div>
                <Button onClick={handleOpenAdd} className="shrink-0">
                    <Plus className="w-5 h-5 text-current" /> Add Institution
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                </div>
            ) : institutions.length === 0 ? (
                <div className="text-center p-12 bg-surface-container rounded-[24px]">
                    <p className="text-gray-500 font-medium">No institutions found. Add one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {institutions.map(inst => (
                        <motion.div key={inst.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <Card className="flex flex-col p-6 shadow-sm relative group cursor-pointer hover:bg-surface-container transition-colors border border-black/5 dark:border-white/10">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(inst); }}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-surface-container opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-100 text-primary-600 dark:hover:bg-primary-900/40 z-10"
                                >
                                    <Edit2 className="w-4 h-4 text-current" />
                                </button>
                                <div className="flex items-start justify-between mb-4 pr-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                                            <Landmark className="w-6 h-6 text-current" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg text-foreground leading-tight">{inst.name}</h3>
                                            <p className="text-sm font-medium text-gray-500">{inst.code}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Tier/Type Badge */}
                                <div className="mb-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${getTypeStyles(inst.type)}`}>
                                        {inst.type || "School"}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 text-current opacity-70" />
                                        <span>{inst.location}</span>
                                    </div>

                                    {/* Sub-Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                                <Users className="w-3.5 h-3.5" /> Students
                                            </span>
                                            <span className="font-medium text-foreground text-sm">{inst.students.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                                <UserCircle className="w-3.5 h-3.5" /> {getStaffLabel(inst.type)}
                                            </span>
                                            <span className="font-medium text-foreground text-sm">{inst.staffCount || 0}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 pt-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                                <BookOpen className="w-3.5 h-3.5" /> {getDeptLabel(inst.type)}
                                            </span>
                                            <span className="font-medium text-foreground text-sm">{inst.departmentCount || 0}</span>
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => !isSaving && setIsFormOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-surface rounded-[28px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-black/5 dark:border-white/5 bg-surface-container/50 sticky top-0 z-10 backdrop-blur-md">
                                <h2 className="text-2xl font-medium text-foreground">{editingId ? "Edit Institution" : "Add New Institution"}</h2>
                                <button disabled={isSaving} onClick={() => setIsFormOpen(false)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-foreground disabled:opacity-50">
                                    <X className="w-5 h-5 text-current" />
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-6">

                                {/* Institution Type Interactive Segmented Selector */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-2">Institution Tier</label>
                                    <div className="flex gap-2 p-1 bg-surface-container rounded-full">
                                        {["School", "College", "University"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                disabled={isSaving}
                                                onClick={() => setFormData({ ...formData, type: type as any })}
                                                className={`flex-1 py-1.5 px-4 rounded-full text-sm font-medium transition-all ${formData.type === type
                                                        ? "bg-white dark:bg-black/40 text-primary-600 shadow-sm"
                                                        : "text-gray-500 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Institution Name"
                                        required
                                        disabled={isSaving}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        label="System Code"
                                        required
                                        disabled={isSaving}
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    />
                                </div>
                                <Input
                                    label="Location & Region"
                                    required
                                    disabled={isSaving}
                                    icon={<MapPin className="w-5 h-5 text-current" />}
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label={`Total ${getDeptLabel(formData.type)}`}
                                        type="number"
                                        required
                                        disabled={isSaving}
                                        value={formData.departmentCount}
                                        onChange={e => setFormData({ ...formData, departmentCount: parseInt(e.target.value) || 0 })}
                                    />
                                    <Input
                                        label={`Active ${getStaffLabel(formData.type)}`}
                                        type="number"
                                        required
                                        disabled={isSaving}
                                        value={formData.staffCount}
                                        onChange={e => setFormData({ ...formData, staffCount: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <Input
                                        label="Total Students"
                                        type="number"
                                        required
                                        disabled={isSaving}
                                        value={formData.students}
                                        onChange={e => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex justify-end gap-3">
                                    <Button type="button" variant="secondary" disabled={isSaving} onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                    <Button type="submit" isLoading={isSaving}>{editingId ? "Save Changes" : "Create Institution"}</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
