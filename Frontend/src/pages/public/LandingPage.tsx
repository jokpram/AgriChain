import { Link } from 'react-router-dom';
import { HiShieldCheck, HiGlobeAsiaAustralia, HiCubeTransparent, HiChartBar } from 'react-icons/hi2';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-surface-50 font-sans selection:bg-primary-500 selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-surface-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <span className="text-white font-bold text-lg">AC</span>
                            </div>
                            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-900 tracking-tight">
                                AgriChain
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-surface-600 hover:text-primary-600 font-semibold text-sm transition-colors">
                                Masuk
                            </Link>
                            <Link to="/register" className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm shadow-md shadow-primary-500/20 hover:bg-primary-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                Mulai Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-300/30 rounded-full blur-[120px] opacity-70"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-balance flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                        Selamat Datang di Masa Depan Pertanian
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-surface-900 tracking-tight mb-8 animate-fade-in-up [animation-delay:100ms]">
                        Rantai Pasok Transparan untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">Pertanian Global</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-surface-600 leading-relaxed mb-10 animate-fade-in-up [animation-delay:200ms]">
                        Lacak hasil pertanian Anda secara aman dari lahan hingga ke tangan konsumen. Berdayakan petani, pastikan kualitas, dan bangun kepercayaan melalui sistem rantai pasok yang dapat diverifikasi.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
                        <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-surface-200 text-surface-700 font-bold text-lg hover:border-surface-300 hover:bg-surface-50 transition-all text-center">
                            Akses Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">Mengapa Memilih AgriChain?</h2>
                        <p className="text-surface-500 max-w-2xl mx-auto text-lg">Platform kami menawarkan fitur lengkap untuk mengelola ekosistem pertanian secara efektif.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-surface-50 p-8 rounded-3xl border border-surface-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HiGlobeAsiaAustralia className="w-7 h-7 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">Pelacakan Tiap Tahap</h3>
                            <p className="text-surface-600 leading-relaxed text-sm">Pantau asal-usul produk dan siklus hidupnya di setiap tahap perjalanan distribusi.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-surface-50 p-8 rounded-3xl border border-surface-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HiShieldCheck className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">Jaminan Kualitas</h3>
                            <p className="text-surface-600 leading-relaxed text-sm">Berikan jaminan kepada pembeli tentang kualitas sumber, memverifikasi produsen asli, dan praktik pertanian.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-surface-50 p-8 rounded-3xl border border-surface-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HiCubeTransparent className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">Batch yang Abadi</h3>
                            <p className="text-surface-600 leading-relaxed text-sm">Simpan catatan digital yang aman untuk setiap batch tanaman guna menghindari pemalsuan produk.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-surface-50 p-8 rounded-3xl border border-surface-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HiChartBar className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-surface-900 mb-3">Analitik Mendalam</h3>
                            <p className="text-surface-600 leading-relaxed text-sm">Lihat analitik distribusi  yang komprehensif untuk memaksimalkan hasil pertanian Anda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-surface-900"></div>
                <div className="absolute inset-x-0 bottom-0 top-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Siap Mendigitalkan Pertanian Anda?</h2>
                    <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">Bergabunglah dengan ribuan pemangku kepentingan yang saat ini memverifikasi asal produk otentik di seluruh dunia.</p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-800 font-bold text-lg hover:bg-primary-50 hover:scale-105 transition-all shadow-xl">
                        Bergabung Menjadi Anggota Hari Ini
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-900 py-12 border-t border-surface-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-600">
                            <span className="text-white font-bold text-xs">AC</span>
                        </div>
                        <span className="text-xl font-bold text-white">AgriChain</span>
                    </div>
                    <p className="text-surface-400 text-sm">
                        &copy; {new Date().getFullYear()} AgriChain Traceability System. Hak cipta dilindungi undang-undang.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
