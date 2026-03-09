import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiTruck, HiCube, HiMapPin, HiCheckCircle } from 'react-icons/hi2';

interface DashboardData {
    totalDistributions: number;
    pendingDistributions: number;
    pickedDistributions: number;
    inTransitDistributions: number;
    deliveredDistributions: number;
    availableBatches: number;
}

const DistributorDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/distributor/dashboard');
                setData(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    const statCards = [
        { label: 'Total Distribusi', value: data?.totalDistributions || 0, icon: HiTruck, iconBg: 'bg-blue-100 text-blue-600', color: 'from-blue-500 to-indigo-600' },
        { label: 'Batch Tersedia', value: data?.availableBatches || 0, icon: HiCube, iconBg: 'bg-green-100 text-green-600', color: 'from-green-500 to-emerald-600' },
        { label: 'Dalam Perjalanan', value: data?.inTransitDistributions || 0, icon: HiMapPin, iconBg: 'bg-purple-100 text-purple-600', color: 'from-purple-500 to-violet-600' },
        { label: 'Terkirim', value: data?.deliveredDistributions || 0, icon: HiCheckCircle, iconBg: 'bg-amber-100 text-amber-600', color: 'from-amber-500 to-orange-600' },
    ];

    const chartData = [
        { name: 'Pending', value: data?.pendingDistributions || 0, color: '#eab308' },
        { name: 'Picked', value: data?.pickedDistributions || 0, color: '#6366f1' },
        { name: 'In Transit', value: data?.inTransitDistributions || 0, color: '#a855f7' },
        { name: 'Delivered', value: data?.deliveredDistributions || 0, color: '#22c55e' },
    ];
    const maxVal = Math.max(...chartData.map(d => d.value), 1);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Dashboard Distributor</h1>
                <p className="text-surface-500 text-sm mt-1">Ringkasan distribusi Anda</p>
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

            <div className="bg-white rounded-xl border border-surface-200 p-6">
                <h3 className="text-sm font-semibold text-surface-700 mb-4">Status Distribusi</h3>
                <div className="space-y-4">
                    {chartData.map((item) => (
                        <div key={item.name}>
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-surface-600">{item.name}</span>
                                <span className="text-sm font-semibold text-surface-800">{item.value}</span>
                            </div>
                            <div className="w-full h-6 bg-surface-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${(item.value / maxVal) * 100}%`, backgroundColor: item.color }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistributorDashboard;
