import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiPlus, HiMapPin } from 'react-icons/hi2';

interface Farm {
    id: number;
    farm_name: string;
    location: string;
    size: number;
    created_at: string;
}

const Farms = () => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ farm_name: '', location: '', size: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => { fetchFarms(); }, []);

    const fetchFarms = async () => {
        try {
            const res = await api.get('/farmer/farms');
            setFarms(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await api.post('/farmer/farms', { ...form, size: parseFloat(form.size) });
            setForm({ farm_name: '', location: '', size: '' });
            setShowForm(false);
            fetchFarms();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gagal menambah lahan');
        } finally { setSubmitting(false); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-surface-800">Manajemen Lahan</h1>
                    <p className="text-surface-500 text-sm mt-1">Kelola lahan pertanian Anda</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-sm"
                >
                    <HiPlus className="w-4 h-4" />
                    {showForm ? 'Batal' : 'Tambah Lahan'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl border border-surface-200 p-6">
                    <h3 className="text-sm font-semibold text-surface-700 mb-4">Tambah Lahan Baru</h3>
                    {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{error}</div>}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Nama Lahan</label>
                            <input type="text" value={form.farm_name} onChange={(e) => setForm({ ...form, farm_name: e.target.value })}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Lokasi</label>
                            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Ukuran (Ha)</label>
                            <input type="number" step="0.01" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
                                className="w-full px-4 py-2.5 border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" required />
                        </div>
                        <div className="md:col-span-3">
                            <button type="submit" disabled={submitting}
                                className="px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60">
                                {submitting ? 'Menyimpan...' : 'Simpan Lahan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {farms.map((farm) => (
                        <div key={farm.id} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                                    <HiMapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-surface-800">{farm.farm_name}</h3>
                                    <p className="text-xs text-surface-400">{farm.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                                <div>
                                    <p className="text-xs text-surface-400">Ukuran</p>
                                    <p className="text-sm font-semibold text-surface-700">{farm.size} Ha</p>
                                </div>
                                <p className="text-xs text-surface-400">{new Date(farm.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                    {farms.length === 0 && (
                        <div className="col-span-full text-center py-16">
                            <HiMapPin className="w-12 h-12 text-surface-300 mx-auto" />
                            <p className="text-surface-500 mt-3">Belum ada lahan terdaftar</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Farms;
