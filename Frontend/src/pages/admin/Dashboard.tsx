import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiUsers, HiCube, HiTruck, HiBanknotes } from 'react-icons/hi2';

interface Stats {
    totalFarmers: number;
    totalDistributors: number;
    totalBuyers: number;
    totalUsers: number;
    totalBatches: number;
    activeBatches: number;
    totalDistributions: number;
    totalOrders: number;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    const statCards = [
        { label: 'Total Petani', value: stats?.totalFarmers || 0, icon: HiUsers, color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-100 text-green-600' },
        { label: 'Total Batch', value: stats?.totalBatches || 0, icon: HiCube, color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-100 text-blue-600' },
        { label: 'Total Distribusi', value: stats?.totalDistributions || 0, icon: HiTruck, color: 'from-purple-500 to-violet-600', iconBg: 'bg-purple-100 text-purple-600' },
        { label: 'Total Transaksi', value: stats?.totalOrders || 0, icon: HiBanknotes, color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-100 text-amber-600' },
    ];

    const barData = [
        { name: 'Petani', value: stats?.totalFarmers || 0, color: '#22c55e' },
        { name: 'Distributor', value: stats?.totalDistributors || 0, color: '#3b82f6' },
        { name: 'Pembeli', value: stats?.totalBuyers || 0, color: '#f59e0b' },
    ];

    const maxBarValue = Math.max(...barData.map(d => d.value), 1);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Dashboard Admin</h1>
                <p className="text-surface-500 text-sm mt-1">Ringkasan sistem AgriBatch Traceability</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}>
                                <span className="text-white font-bold text-sm">{card.value}</span>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-surface-800">{card.value}</p>
                        <p className="text-xs text-surface-500 mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-surface-200 p-6">
                    <h3 className="text-sm font-semibold text-surface-700 mb-4">Users per Role</h3>
                    <div className="space-y-4">
                        {barData.map((item) => (
                            <div key={item.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-surface-600">{item.name}</span>
                                    <span className="text-sm font-semibold text-surface-800">{item.value}</span>
                                </div>
                                <div className="w-full h-6 bg-surface-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${(item.value / maxBarValue) * 100}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-surface-200 p-6">
                    <h3 className="text-sm font-semibold text-surface-700 mb-4">Status Batch</h3>
                    <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4"
                                    strokeDasharray={`${((stats?.activeBatches || 0) / Math.max(stats?.totalBatches || 1, 1)) * 88} 88`}
                                    strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-surface-800">{stats?.totalBatches || 0}</span>
                                <span className="text-[10px] text-surface-400">Total Batch</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs text-surface-600">Aktif: {stats?.activeBatches || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-surface-300" />
                            <span className="text-xs text-surface-600">Lainnya: {(stats?.totalBatches || 0) - (stats?.activeBatches || 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
