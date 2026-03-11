import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HiGlobeAsiaAustralia } from 'react-icons/hi2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMsg(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const routes: Record<string, string> = {
                admin: '/admin/dashboard',
                petani: '/farmer/dashboard',
                distributor: '/distributor/dashboard',
                pembeli: '/buyer/marketplace',
            };
            navigate(routes[user.role] || '/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <HiGlobeAsiaAustralia className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">AgriChain</h1>
                    <p className="text-primary-200 text-sm">Traceability System</p>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                    <h2 className="text-xl font-bold text-surface-800 mb-1">Selamat Datang!</h2>
                    <p className="text-surface-500 text-sm mb-6">Masuk ke akun Anda</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-sm disabled:opacity-60 text-sm"
                        >
                            {loading ? 'Masuk...' : 'Masuk'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-surface-500">
                        Belum punya akun?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
