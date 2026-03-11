import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Order {
    id: number;
    quantity: number;
    price: number;
    total_price: number;
    payment_status: 'pending' | 'paid' | 'failed' | 'expired';
    delivery_status: 'pending' | 'shipped' | 'delivered';
    payment_token: string;
    product: {
        name: string;
        farmer: { name: string };
    };
    created_at: string;
}

const paymentStatusBadge: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    failed: 'bg-red-100 text-red-700',
    expired: 'bg-surface-100 text-surface-600',
};

const formatPaymentStatus = (status: string) => {
    switch (status) {
        case 'pending': return 'Menunggu Pembayaran';
        case 'paid': return 'Lunas';
        case 'failed': return 'Gagal';
        case 'expired': return 'Kadaluarsa';
        default: return status;
    }
};

const deliveryStatusBadge: Record<string, string> = {
    pending: 'bg-surface-100 text-surface-700',
    shipped: 'bg-blue-100 text-blue-700',
    delivered: 'bg-emerald-100 text-emerald-700',
};

const formatDeliveryStatus = (status: string) => {
    switch (status) {
        case 'pending': return 'Belum Dikirim';
        case 'shipped': return 'Dalam Perjalanan';
        case 'delivered': return 'Telah Diterima';
        default: return status;
    }
};

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/buyer/orders').then((res: any) => { setOrders(res.data.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const handlePay = (token: string) => {
        window.snap.pay(token, {
            onSuccess: () => { window.location.reload(); },
            onPending: () => { window.location.reload(); },
            onError: () => { alert('Pembayaran gagal'); },
        });
    };

    const handleCompleteOrder = async (id: number) => {
        if (!confirm('Tandai pesanan telah diterima?')) return;
        try {
            await api.patch(`/buyer/orders/${id}/complete`);
            const res = await api.get('/buyer/orders');
            setOrders(res.data.data);
        } catch (err: any) { alert(err.response?.data?.message || 'Gagal'); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-surface-800">Pesanan Saya</h1>
                <p className="text-surface-500 text-sm mt-1">Riwayat pembelian Anda</p>
            </div>

            <div className="bg-white rounded-3xl border border-surface-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-surface-50 border-b border-surface-200">
                                    <th className="text-left px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">ID Pesanan</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Produk</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Kuantitas</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Total Harga</th>
                                    <th className="text-center px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Status Pembayaran</th>
                                    <th className="text-center px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Status Pengiriman</th>
                                    <th className="text-right px-6 py-4 text-xs font-bold text-surface-500 uppercase tracking-wider whitespace-nowrap">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-surface-100 hover:bg-surface-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-surface-800">#{order.id}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-surface-800">{order.product.name}</div>
                                            <div className="text-xs text-surface-500 mt-0.5">Petani: {order.product.farmer.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-surface-700 font-medium">{order.quantity} x <span className="text-surface-400 text-xs">Rp {order.price.toLocaleString()}</span></span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">Rp {(order.total_price).toLocaleString('id-ID')}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${paymentStatusBadge[order.payment_status] || 'bg-surface-100 text-surface-600'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${order.payment_status === 'paid' ? 'bg-emerald-500' :
                                                    order.payment_status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                                                    }`} />
                                                {formatPaymentStatus(order.payment_status)}
                                            </span>
                                            {order.payment_status === 'pending' && order.payment_token && (
                                                <button
                                                    onClick={() => handlePay(order.payment_token)}
                                                    className="mt-2 text-[11px] font-bold text-primary-600 hover:text-primary-700 underline block w-full"
                                                >
                                                    Lanjutkan Bayar
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${deliveryStatusBadge[order.delivery_status] || 'bg-surface-100 text-surface-600'}`}>
                                                {formatDeliveryStatus(order.delivery_status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            {order.delivery_status === 'delivered' && (
                                                <button
                                                    onClick={() => handleCompleteOrder(order.id)}
                                                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 rounded-xl text-xs font-bold transition-all"
                                                >
                                                    Selesaikan
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan={7} className="px-6 py-12 text-center text-surface-400 text-sm font-medium">Belum ada riwayat pesanan</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
