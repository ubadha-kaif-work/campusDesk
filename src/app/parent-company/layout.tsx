import { ReactNode } from "react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

export default function ParentCompanyLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen pb-32">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-8 lg:pt-12">
                {children}
            </main>
            <BottomNavbar />
        </div>
    );
}
