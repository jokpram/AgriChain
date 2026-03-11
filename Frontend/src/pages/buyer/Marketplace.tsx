import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiShoppingCart, HiXMark, HiOutlinePhoto } from 'react-icons/hi2';
import { useToast } from '../../context/ToastContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    created_at: string;
    farmer: { name: string; email: string };
    batch: any;
}

declare global {
    interface Window {
        snap: any;
    }
}

const Marketplace = () => {
    const { showToast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderForm, setOrderForm] = useState<{ product: Product; quantity: number } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [distributors, setDistributors] = useState<any[]>([]);
    const [selectedDistributor, setSelectedDistributor] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [distanceUnit, setDistanceUnit] = useState<'km' | 'm'>('km');

    useEffect(() => {
        fetchProducts();
        fetchDistributors();
    }, []);

    const fetchDistributors = async () => {
        try {
            const res = await api.get('/buyer/distributors');
            setDistributors(res.data.data);
        } catch (err) { console.error('Gagal memuat distributor', err); }
    };

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products/marketplace');
            setProducts(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleOrder = async () => {
        if (!orderForm) return;
        setSubmitting(true);
        try {
            const res = await api.post('/payments/buy', {
                product_id: orderForm.product.id,
                quantity: orderForm.quantity,
                distributor_id: selectedDistributor ? parseInt(selectedDistributor) : null,
                distance: distance ? parseFloat(distance) : 0,
                distance_unit: distanceUnit
            });

            const transactionToken = res.data.data.token;
            setOrderForm(null);
            setSelectedDistributor('');
            setDistance('');

            window.snap.pay(transactionToken, {
                onSuccess: function (result: any) {
                    showToast('Pembayaran berhasil!', 'success');
                    fetchProducts();
                },
                onPending: function (result: any) {
                    showToast('Menunggu pembayaran Anda!', 'warning');
                    fetchProducts();
                },
                onError: function (result: any) {
                    showToast('Pembayaran gagal!', 'error');
                },
                onClose: function () {
                    showToast('Anda menutup popup tanpa menyelesaikan pembayaran', 'info');
                }
            });
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal memproses pembayaran', 'error');
        } finally { setSubmitting(false); }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>;

    return (
        <section className="space-y-6" aria-labelledby="marketplace-title">
            <header>
                <h1 id="marketplace-title" className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Marketplace</h1>
                <p className="text-surface-500 text-sm mt-1">Jelajahi dan beli hasil pertanian langsung dari petani</p>
            </header>

            {orderForm && (
                <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-surface-800">Checkout Produk</h3>
                            <button onClick={() => { setOrderForm(null); setSelectedDistributor(''); setDistance(''); }} className="p-2 rounded-xl hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors">
                                <HiXMark className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex gap-4 mb-6 p-4 bg-surface-50 rounded-2xl border border-surface-100">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm border border-surface-200">
                                {orderForm.product.images && orderForm.product.images.length > 0 ? (
                                    <img src={orderForm.product.images[0]} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-surface-300">
                                        <HiOutlinePhoto className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-surface-800 line-clamp-1">{orderForm.product.name}</h4>
                                <p className="text-sm text-surface-500 mt-0.5">Petani: {orderForm.product.farmer.name}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-2">Kuantitas Pembelian</label>
                                <div className="relative">
                                    <input type="number"
                                        value={orderForm.quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val > 0 && val <= orderForm.product.stock) {
                                                setOrderForm({ ...orderForm, quantity: val });
                                            }
                                        }}
                                        min="1"
                                        max={orderForm.product.stock}
                                        className="w-full px-4 py-3 border border-surface-200 rounded-xl text-lg font-bold focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 text-sm font-medium">
                                        Maks {orderForm.product.stock}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-2">Pilih Kurir / Distributor</label>
                                <select
                                    value={selectedDistributor}
                                    onChange={(e) => setSelectedDistributor(e.target.value)}
                                    className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                                    <option value="">Pilih Distributor</option>
                                    {distributors.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {d.name} (Rp {d.delivery_fee_per_km || 0}/KM)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedDistributor && (
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-2">Estimasi Jarak Pengiriman</label>
                                    <div className="flex gap-2">
                                        <input type="number"
                                            value={distance}
                                            onChange={(e) => setDistance(e.target.value)}
                                            min="0" step="0.1"
                                            placeholder="Jarak"
                                            className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all" />

                                        <select
                                            value={distanceUnit}
                                            onChange={(e) => setDistanceUnit(e.target.value as 'km' | 'm')}
                                            className="w-2/5 px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-surface-50 font-medium text-surface-700">
                                            <option value="km">KM</option>
                                            <option value="m">Meter</option>
                                        </select>
                                    </div>
                                    <p className="text-xs text-surface-500 mt-2">Biaya dihitung otomatis berdasarkan tarif per-KM Distributor.</p>
                                </div>
                            )}

                            <div className="p-4 bg-primary-50 text-primary-900 rounded-xl space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-primary-700">Subtotal Produk</span>
                                    <span className="font-semibold">Rp {(orderForm.product.price * orderForm.quantity).toLocaleString('id-ID')}</span>
                                </div>
                                {selectedDistributor && distance && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-primary-700">Ongkos Kirim</span>
                                        <span className="font-semibold">
                                            Rp {(
                                                Math.round((distributors.find(d => d.id === parseInt(selectedDistributor))?.delivery_fee_per_km || 0) * (distanceUnit === 'km' ? parseFloat(distance) : parseFloat(distance) / 1000))
                                            ).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                )}
                                <div className="pt-2 border-t border-primary-200 flex justify-between items-center">
                                    <span className="text-sm font-bold">Total Pembayaran</span>
                                    <span className="text-xl font-bold">
                                        Rp {(
                                            (orderForm.product.price * orderForm.quantity) +
                                            (selectedDistributor && distance ? Math.round((distributors.find(d => d.id === parseInt(selectedDistributor))?.delivery_fee_per_km || 0) * (distanceUnit === 'km' ? parseFloat(distance) : parseFloat(distance) / 1000)) : 0)
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button onClick={() => { setOrderForm(null); setSelectedDistributor(''); setDistance(''); }}
                                className="flex-1 py-3.5 border border-surface-200 text-surface-600 text-sm font-bold rounded-xl hover:bg-surface-50 transition-colors">
                                Batal
                            </button>
                            <button onClick={handleOrder} disabled={submitting}
                                className="flex-[2] py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold rounded-xl shadow-md shadow-primary-500/30 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0">
                                {submitting ? 'Memproses...' : 'Bayar Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Daftar Produk">
                {products.map((product) => (
                    <article key={product.id} className="bg-white rounded-3xl border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                        <figure className="aspect-[4/3] bg-surface-100 relative overflow-hidden m-0">
                            {product.images && product.images.length > 0 ? (
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-surface-400" aria-label="Tidak ada gambar">
                                    <HiOutlinePhoto className="w-12 h-12 opacity-50" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </figure>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-surface-800 text-lg mb-1 line-clamp-2 leading-tight">{product.name}</h3>
                            <p className="text-sm text-surface-500 mb-4 font-medium flex-1">Petani: {product.farmer.name}</p>

                            <div className="flex flex-col mb-5">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </span>
                                    <span className="text-sm text-surface-500 font-medium">/kg</span>
                                </div>
                                <span className="text-xs text-surface-400 mt-0.5">
                                    (Rp {(product.price / 1000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} /gram)
                                </span>
                            </div>

                            <button
                                onClick={() => setOrderForm({ product, quantity: 1 })}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-surface-900 text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-600 hover:shadow-primary-500/30 transition-all"
                            >
                                <HiShoppingCart className="w-5 h-5" />
                                Beli Sekarang
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {products.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-surface-200 border-dashed" role="status" aria-live="polite">
                    <div className="w-20 h-20 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HiShoppingCart className="w-10 h-10 text-surface-300" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-800 mb-2">Marketplace Kosong</h3>
                    <p className="text-surface-500 max-w-sm mx-auto">Saat ini belum ada produk yang dijual oleh petani. Silakan kembali lagi nanti.</p>
                </div>
            )}
        </section>
    );
};

export default Marketplace;
