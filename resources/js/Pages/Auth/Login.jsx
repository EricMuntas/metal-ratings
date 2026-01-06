import { useForm, Head, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Iniciar Sesión" />
            
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
                        <p className="text-gray-600 mt-2">Accede a tu cuenta</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="email"
                                autoFocus
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}