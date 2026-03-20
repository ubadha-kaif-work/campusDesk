import { InstitutionNavbar } from "@/components/layout/InstitutionNavbar";
import { InstitutionTopNavbar } from "@/components/layout/InstitutionTopNavbar";

export default function InstitutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout wrapper automatically applies the localized Navigation arrays
    // mimicking the Parent UI strictly without merging data layers natively.
    return (
        <div className="min-h-[100dvh] bg-surface relative pb-32">
            <InstitutionTopNavbar />
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-4">
                {children}
            </main>
            <InstitutionNavbar />
        </div>
    );
}
