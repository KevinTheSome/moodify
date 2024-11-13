import { useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    useEffect(() => {
        // Apply overflow-hidden to body
        document.body.style.overflow = 'hidden';

        // Cleanup: remove overflow-hidden when component is unmounted
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold leading-tight text-white pt-8 pl-6">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div 
                className="relative py-12 bg-cover bg-center min-h-screen" 
                style={{ backgroundImage: 'url(/images/bg3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Overlay div to darken the background behind the header */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
                    {/* Content section */}
                    <div className="bg-[#191414] bg-opacity-45 p-12 rounded-lg shadow-lg text-center">
                        <h3 className="text-4xl font-semibold text-white">
                            Welcome to Your Dashboard!
                        </h3>
                        <p className="mt-4 text-xl text-white">
                            You're logged in and ready to explore!
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
