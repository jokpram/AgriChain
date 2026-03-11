import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiPlus, HiTag, HiOutlinePhotograph, HiTrash } from 'react-icons/hi';
import { useToast } from '../../context/ToastContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    created_at: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });
    const [images, setImages] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data);
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal memuat produk', 'error');
        } finally { setLoading(false); }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Array.from(e.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/products', {
                ...form,
                price: parseFloat(form.price),
                stock: parseFloat(form.stock),
                images
            });
            showToast('Produk berhasil ditambahkan', 'success');
            setForm({ name: '', description: '', price: '', stock: '' });
            setImages([]);
            setShowForm(false);
            fetchProducts();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal menambah produk', 'error');
        } finally { setSubmitting(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus produk ini?')) return;
        try {
            await api.delete(`/products/${id}`);
            showToast('Produk berhasil dihapus', 'success');
            fetchProducts();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Gagal menghapus produk', 'error');
        }
    };

    return (
        <section className="space-y-6" aria-labelledby="products-title">
            <header className="flex items-center justify-between bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
                <div>
                    <h1 id="products-title" className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Marketplace / Etalase</h1>
                    <p className="text-surface-500 text-sm mt-1">Kelola produk yang Anda jual di marketplace</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all"
                >
                    <HiPlus className="w-5 h-5" />
                    {showForm ? 'Batal' : 'Tambah Produk'}
                </button>
            </header>

            {showForm && (
                <section className="bg-white rounded-2xl border border-surface-200 p-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300" aria-label="Form Tambah Produk">
                    <h3 className="text-lg font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <HiTag className="w-5 h-5 text-primary-500" />
                        Tambah Produk Baru
                    </h3>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1.5">Nama Produk</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-400"
                                    placeholder="Contoh: Beras Organik Premium" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Harga (Rp)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Stok</label>
                                    <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 mb-1.5">Deskripsi Produk</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-surface-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all min-h-[120px] resize-y"
                                    placeholder="Jelaskan detail produk Anda..." required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">Galeri Foto (Kamera / Galeri)</label>
                            <div className="border-2 border-dashed border-surface-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-surface-50 hover:bg-surface-100 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    aria-label="Upload foto dari kamera atau galeri"
                                />
                                <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                                    <HiOutlinePhotograph className="w-8 h-8 text-primary-500" aria-hidden="true" />
                                </div>
                                <p className="text-sm font-medium text-surface-700">Ambil foto atau pilih dari galeri</p>
                                <p className="text-xs text-surface-500 mt-1">Maksimal 5MB per foto</p>
                            </div>

                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-surface-200 shadow-sm">
                                            <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                            <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <HiTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-surface-100 flex justify-end">
                            <button type="submit" disabled={submitting}
                                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0">
                                {submitting ? 'Menyimpan...' : 'Simpan Produk'}
                            </button>
                        </div>
                    </form>
                </section>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-40" role="status" aria-label="Loading"><div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" /></div>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Daftar Produk Anda">
                    {products.map((product) => (
                        <article key={product.id} className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-300 group">
                            <figure className="aspect-[4/3] bg-surface-100 relative overflow-hidden m-0">
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-surface-400" aria-label="Tidak ada gambar">
                                        <HiOutlinePhotograph className="w-12 h-12 opacity-50" aria-hidden="true" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-xl shadow-sm hover:bg-red-50 transition-colors" aria-label="Hapus produk">
                                        <HiTrash className="w-4 h-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </figure>
                            <div className="p-5">
                                <h3 className="font-bold text-surface-800 text-lg mb-1 truncate">{product.name}</h3>
                                <div className="flex flex-col mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </span>
                                        <span className="text-sm text-surface-500">/kg</span>
                                    </div>
                                    <span className="text-xs text-surface-400 mt-0.5">
                                        (Rp {(product.price / 1000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} /gram)
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-surface-100 pt-4">
                                    <span className="text-surface-500">Stok: <span className="font-semibold text-surface-800">{product.stock}</span></span>
                                    <span className="text-surface-400 text-xs">{new Date(product.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                    {products.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-surface-200 border-dashed" role="status">
                            <div className="w-20 h-20 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HiTag className="w-10 h-10 text-surface-300" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-bold text-surface-800 mb-1">Belum Ada Produk</h3>
                            <p className="text-surface-500">Mulai unggah produk Anda untuk ditampilkan di Marketplace.</p>
                        </div>
                    )}
                </section>
            )}
        </section>
    );
};

export default Products;
