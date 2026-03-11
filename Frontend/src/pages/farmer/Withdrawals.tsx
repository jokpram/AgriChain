import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiBanknotes, HiClock, HiCheckCircle } from 'react-icons/hi2';
import { useToast } from '../../context/ToastContext';

interface DashboardData {
    totalEarnings: number;
    availableBalance: number;
    totalWithdrawn: number;
    pendingWithdrawal: number;
    withdrawals: any[];
}

const Withdrawals = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();

    useEffect(() => { fetchDashboard(); }, []);

    const fetchDashboard = async () => {
        try {
            const res = await api.get('/withdrawals/my');
            setData(res.data.data);
        } catch (err: any) {
            showToast('Gagal memuat data penarikan', 'error');
        } finally { setLoading(false); }
    };

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/withdrawals/request', { amount: parseFloat(amount) });
            showToast('Penarikan berhasil diajukan', 'success');
            setAmount('');
            fetchDashboard();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal mengajukan penarikan', 'error');
        } finally { setSubmitting(false); }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400 opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Dompet Keuangan</h1>
                    <p className="text-primary-200 mb-8 opacity-90">Kelola penghasilan dan penarikan saldo marketplace Anda.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <p className="text-primary-200 text-sm font-medium mb-1">Saldo Tersedia (Bisa Ditarik)</p>
                            <p className="text-3xl font-bold text-white tracking-tight">Rp {data?.availableBalance.toLocaleString('id-ID') || 0}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <p className="text-primary-200 text-sm font-medium mb-1">Total Penghasilan (Sukses)</p>
                            <p className="text-2xl font-bold text-white/90">Rp {data?.totalEarnings.toLocaleString('id-ID') || 0}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <p className="text-primary-200 text-sm font-medium mb-1">Total Ditarik</p>
                            <p className="text-2xl font-bold text-white/90">Rp {data?.totalWithdrawn.toLocaleString('id-ID') || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Penarikan */}
                <div className="lg:col-span-1 bg-white rounded-2xl border border-surface-200 p-6 shadow-sm h-fit">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary-50 rounded-xl">
                            <HiBanknotes className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-bold text-surface-800">Tarik Saldo</h3>
                    </div>

                    <form onSubmit={handleRequest} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-2">Jumlah Penarikan (Rp)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 font-medium">Rp</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-lg font-semibold text-surface-800 transition-all placeholder:font-normal placeholder:text-surface-400"
                                    placeholder="0"
                                    min="10000"
                                    max={data?.availableBalance || 0}
                                    required
                                />
                            </div>
                            <p className="text-xs text-surface-500 mt-2">Minimal penarikan Rp 10.000</p>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting || !data?.availableBalance || parseFloat(amount) > (data?.availableBalance || 0)}
                            className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold shadow-md shadow-primary-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {submitting ? 'Memproses...' : 'Ajukan Penarikan'}
                        </button>
                    </form>
                </div>

                {/* Riwayat Penarikan */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <HiClock className="w-5 h-5 text-primary-500" />
                        Riwayat Penarikan
                    </h3>

                    {loading ? (
                        <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div></div>
                    ) : data?.withdrawals && data.withdrawals.length > 0 ? (
                        <div className="space-y-4">
                            {data.withdrawals.map((w) => (
                                <div key={w.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-surface-100 bg-surface-50/50 hover:bg-surface-50 transition-colors gap-3">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className={`p-3 rounded-full shrink-0 ${w.status === 'processed' ? 'bg-green-100 text-green-600' : w.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                                            {w.status === 'processed' ? <HiCheckCircle className="w-5 h-5" /> : w.status === 'pending' ? <HiClock className="w-5 h-5" /> : <HiBanknotes className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-surface-800 truncate">Rp {parseFloat(w.amount).toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-surface-500 truncate">{new Date(w.created_at).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <div className="self-end sm:self-auto shrink-0">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${w.status === 'processed' ? 'bg-green-100 text-green-700' :
                                            w.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {w.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <HiBanknotes className="w-8 h-8 text-surface-300" />
                            </div>
                            <p className="text-surface-500">Belum ada riwayat penarikan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;
