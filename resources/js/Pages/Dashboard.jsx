import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from "../Layouts/AppLayout";

export default function Dashboard() {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
        <AppLayout title={'Dashboard'}>
            
            <div className="min-h-screen bg-gray-100">
        
                {/* Main Content */}
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    ¡Bienvenido al Dashboard!
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Has iniciado sesión correctamente como <strong>{auth.user.email}</strong>
                                </p>
                                <div className="bg-indigo-50 rounded-md p-4">
                                    <p className="text-indigo-800">
                                        Este es tu panel de control. Aquí puedes agregar el contenido 
                                        y funcionalidades de tu aplicación.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            </AppLayout>
        </>
    );
}