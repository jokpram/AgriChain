import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiMap, HiCube, HiCheckCircle, HiBanknotes } from 'react-icons/hi2';

interface DashboardData {
    totalFarms: number;
    totalBatches: number;
    availableBatches: number;
    distributedBatches: number;
    soldBatches: number;
    recentBatches: any[];
}

const FarmerDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/farmer/dashboard');
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
        { label: 'Total Lahan', value: data?.totalFarms || 0, icon: HiMap, iconBg: 'bg-green-100 text-green-600', color: 'from-green-500 to-emerald-600' },
        { label: 'Total Batch', value: data?.totalBatches || 0, icon: HiCube, iconBg: 'bg-blue-100 text-blue-600', color: 'from-blue-500 to-indigo-600' },
        { label: 'Batch Tersedia', value: data?.availableBatches || 0, icon: HiCheckCircle, iconBg: 'bg-emerald-100 text-emerald-600', color: 'from-emerald-500 to-teal-600' },
        { label: 'Terjual', value: data?.soldBatches || 0, icon: HiBanknotes, iconBg: 'bg-amber-100 text-amber-600', color: 'from-amber-500 to-orange-600' },
    ];

    const chartData = [
        { name: 'Tersedia', value: data?.availableBatches || 0, color: '#22c55e' },
        { name: 'Distribusi', value: data?.distributedBatches || 0, color: '#3b82f6' },
        { name: 'Terjual', value: data?.soldBatches || 0, color: '#f59e0b' },
    ];
    const maxVal = Math.max(...chartData.map(d => d.value), 1);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Dashboard Petani</h1>
                <p className="text-surface-500 text-sm mt-1">Ringkasan produksi dan panen Anda</p>
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
                <h3 className="text-sm font-semibold text-surface-700 mb-4">Status Batch</h3>
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

export default FarmerDashboard;
