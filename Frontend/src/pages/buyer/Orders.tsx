import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Order {
    id: number;
    price: number;
    quantity: number;
    status: string;
    created_at: string;
    batch: {
        batch_code: string;
        commodity: { name: string };
        farmer: { name: string };
    };
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
};

const statusLabels: Record<string, string> = {
    pending: 'Menunggu',
    confirmed: 'Dikonfirmasi',
    shipped: 'Dikirim',
    completed: 'Selesai',
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/buyer/orders').then((res: any) => { setOrders(res.data.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Pesanan Saya</h1>
                <p className="text-surface-500 text-sm mt-1">Riwayat pembelian Anda</p>
            </div>

            <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-50 border-b border-surface-200">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Batch</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Komoditas</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Petani</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Kuantitas</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Harga</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Status</th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                                <td className="px-5 py-3.5">
                                    <p className="text-sm font-bold text-surface-800 font-mono">{order.batch?.batch_code}</p>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-surface-600">{order.batch?.commodity?.name}</td>
                                <td className="px-5 py-3.5 text-sm text-surface-600">{order.batch?.farmer?.name}</td>
                                <td className="px-5 py-3.5 text-sm text-surface-600">{order.quantity}</td>
                                <td className="px-5 py-3.5 text-sm font-medium text-surface-700">
                                    Rp {order.price?.toLocaleString('id-ID')}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-surface-100 text-surface-600'}`}>
                                        {statusLabels[order.status] || order.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-surface-500">
                                    {new Date(order.created_at).toLocaleDateString('id-ID')}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr><td colSpan={7} className="px-5 py-10 text-center text-surface-400 text-sm">Belum ada pesanan</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
