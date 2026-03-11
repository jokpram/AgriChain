import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { HiUser, HiEnvelope, HiLockClosed } from 'react-icons/hi2';

const Profile = () => {
    const { user, login } = useAuth(); // We might need to refresh user data context if name changes
    const { showToast } = useToast();

    // Form fields
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Sync state if user context updates late
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.put('/profile', { name, email, password: password || undefined });
            showToast('Profil berhasil diperbarui!', 'success');
            // If the backend returns a new token, update it. If not, maybe just reload to get new details or update state.
            if (res.data.token) {
                login(res.data.token, res.data.user);
            } else if (res.data.user && user) {
                // Try updating user object locally if login allows it, or just reload page
                window.location.reload();
            }
            setPassword(''); // Clear password field
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal memperbarui profil', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="space-y-6" aria-labelledby="profile-title">
            <header className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
                <div className="p-3 bg-primary-50 rounded-xl">
                    <HiUser className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                    <h1 id="profile-title" className="text-2xl font-bold text-surface-800">Profil Saya</h1>
                    <p className="text-surface-500 text-sm mt-1">Perbarui nama, email, dan kata sandi akun Anda</p>
                </div>
            </header>

            <section className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden max-w-2xl">
                <form onSubmit={handleSave} className="p-6 space-y-5">

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1.5 flex items-center gap-2">
                            <HiUser className="text-surface-400" /> Nama Lengkap
                        </label>
                        <input
                            id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
                            className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-300"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1.5 flex items-center gap-2">
                            <HiEnvelope className="text-surface-400" /> Alamat Email
                        </label>
                        <input
                            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-300"
                            placeholder="email@contoh.com"
                        />
                    </div>

                    <div className="pt-2 border-t border-surface-100">
                        <label htmlFor="password" className="block text-sm font-medium text-surface-700 mb-1.5 flex items-center gap-2">
                            <HiLockClosed className="text-surface-400" /> Kata Sandi Baru
                        </label>
                        <input
                            id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-300"
                            placeholder="Biarkan kosong jika tidak ingin mengubah kata sandi"
                        />
                        <p className="text-xs text-surface-400 mt-2">Gunakan kombinasi yang kuat (huruf, angka, simbol) jika mengganti kata sandi.</p>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit" disabled={loading}
                            className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-700 hover:shadow-primary-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Profile;
