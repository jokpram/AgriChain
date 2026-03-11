import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { HiCog6Tooth, HiTruck } from 'react-icons/hi2';

const Settings = () => {
    const { showToast } = useToast();
    const [fee, setFee] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/distributor/settings');
            if (res.data.data && res.data.data.delivery_fee_per_km !== null) {
                setFee(res.data.data.delivery_fee_per_km.toString());
            }
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal memuat pengaturan', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/distributor/settings', {
                delivery_fee_per_km: parseFloat(fee) || 0
            });
            showToast('Pengaturan berhasil disimpan', 'success');
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal menyimpan pengaturan', 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;
    }

    return (
        <main className="space-y-6" aria-labelledby="settings-title">
            <header className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
                <div className="p-3 bg-primary-50 rounded-xl">
                    <HiCog6Tooth className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                    <h1 id="settings-title" className="text-2xl font-bold text-surface-800">Pengaturan Distributor</h1>
                    <p className="text-surface-500 text-sm mt-1">Atur profil dan tarif pengiriman Anda</p>
                </div>
            </header>

            <section className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-surface-100 flex items-center gap-2">
                    <HiTruck className="w-5 h-5 text-surface-400" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-surface-800">Tarif Pengiriman</h2>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSave} className="max-w-md space-y-4">
                        <div>
                            <label htmlFor="delivery_fee" className="block text-sm font-medium text-surface-700 mb-1.5">
                                Tarif per Kilometer (Rp/KM)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 font-medium select-none">Rp</span>
                                <input
                                    id="delivery_fee"
                                    type="number"
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                    placeholder="Contoh: 5000"
                                    min="0"
                                    step="100"
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-300"
                                />
                            </div>
                            <p className="text-xs text-surface-500 mt-2">
                                Tarif ini akan digunakan untuk menghitung total biaya ongkir yang dibayarkan pembeli berdasarkan estimasi jarak lokasi.
                            </p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-700 hover:shadow-primary-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Settings;
